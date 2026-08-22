#!/bin/sh

set -e

# ── Runtime detection ──────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR"

# Use bun if available, otherwise fall back to node
if command -v bun >/dev/null 2>&1; then
    RUNTIME="bun"
else
    RUNTIME="node"
fi

# ── PID tracking & cleanup ─────────────────────────────────────────
pids=""

cleanup() {
    echo ""
    echo "🛑 Shutting down all services..."
    for pid in $pids; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "   Stopping PID $pid..."
            kill -TERM "$pid" 2>/dev/null || true
        fi
    done
    sleep 1
    # Force-kill any remaining
    for pid in $pids; do
        if kill -0 "$pid" 2>/dev/null; then
            kill -KILL "$pid" 2>/dev/null || true
        fi
    done
    echo "✅ All services stopped"
    exit 0
}

trap cleanup EXIT INT TERM HUP

# ── Database init ──────────────────────────────────────────────────
DB_DIR="/db"
DB_FILE="$DB_DIR/custom.db"
PACKAGED_DB="$BUILD_DIR/next-service-dist/db/custom.db"

mkdir -p "$DB_DIR"

if [ -f "$PACKAGED_DB" ] && [ ! -f "$DB_FILE" ]; then
    echo "🗄️  Initialising database from $PACKAGED_DB -> $DB_FILE"
    cp "$PACKAGED_DB" "$DB_FILE"
    echo "✅ Database ready"
elif [ -f "$DB_FILE" ]; then
    echo "🗄️  Database already exists at $DB_FILE, skipping copy"
else
    echo "⚠️  No packaged database found and no existing database – creating fresh one"
    touch "$DB_FILE"
fi

# ── Start Next.js server ──────────────────────────────────────────
echo "🚀 Starting Next.js server..."
cd "$BUILD_DIR" || exit 1

if [ -f "./next-service-dist/server.js" ]; then
    cd next-service-dist || exit 1

    export NODE_ENV=production
    export PORT="${PORT:-3000}"
    export HOSTNAME="${HOSTNAME:-0.0.0.0}"
    export DATABASE_URL="file:$DB_FILE"

    "$RUNTIME" server.js &
    NEXT_PID=$!
    pids="$NEXT_PID"

    sleep 2
    if kill -0 "$NEXT_PID" 2>/dev/null; then
        echo "✅ Next.js server running (PID: $NEXT_PID, Port: $PORT, Runtime: $RUNTIME)"
    else
        echo "❌ Next.js server failed to start"
        exit 1
    fi
    cd "$BUILD_DIR" || exit 1
else
    echo "⚠️  ./next-service-dist/server.js not found – skipping Next.js"
fi

# ── Start mini-services ───────────────────────────────────────────
if [ -f "./mini-services-start.sh" ]; then
    echo "🚀 Starting mini-services..."
    sh ./mini-services-start.sh &
    MINI_PID=$!
    pids="$pids $MINI_PID"
    sleep 1
    if kill -0 "$MINI_PID" 2>/dev/null; then
        echo "✅ mini-services running (PID: $MINI_PID)"
    else
        echo "⚠️  mini-services may have failed, continuing..."
    fi
elif [ -d "./mini-services-dist" ]; then
    echo "⚠️  mini-services-dist directory exists but no start script"
else
    echo "ℹ️  No mini-services to start"
fi

# ── Caddy (foreground) ────────────────────────────────────────────
if command -v caddy >/dev/null 2>&1; then
    echo ""
    echo "🚀 Starting Caddy (reverse proxy)..."
    echo "🎉 All services started!"
    echo ""
    echo "💡 Press Ctrl+C to stop all services"
    echo ""
    exec caddy run --config "$BUILD_DIR/Caddyfile" --adapter caddyfile
else
    echo ""
    echo "⚠️  Caddy not installed – running without reverse proxy"
    echo "🎉 All services started!"
    echo ""
    echo "💡 Press Ctrl+C to stop all services"
    echo ""
    # Wait forever (keep the script alive for background services)
    wait
fi