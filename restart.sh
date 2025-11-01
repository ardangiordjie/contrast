#!/bin/bash

echo "🔄 Restarting Contrast Demo Server..."
echo ""

# Kill existing processes
echo "📌 Stopping existing server..."
pkill -9 node 2>/dev/null
sleep 2

# Remove cache
echo "🧹 Clearing cache..."
rm -rf .next

# Start fresh
echo "🚀 Starting server..."
echo ""
pnpm dev

