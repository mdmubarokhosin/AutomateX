#!/usr/bin/env bash
# Cloudflare Pages বিল্ড স্ক্রিপ্ট — AutomateX
#
# গুরুত্বপূর্ণ: Cloudflare Pages স্বয়ংক্রিয়ভাবে `yarn install` চালায় এবং ডিপেন্ডেন্সি
# ইনস্টল করে। এই স্ক্রিপ্ট শুধু বিল্ড চালায় — পুনরায় install করে না।
#
# Cloudflare Pages ড্যাশবোর্ডে Build command হিসেবে ব্যবহার করুন:
#   bash cf-build.sh

set -e

echo "=== AutomateX Cloudflare Pages Build ==="

# প্যাকেজ ম্যানেজার সনাক্তকরণ (ইনস্টল করা ডিপেন্ডেন্সি ব্যবহার করে বিল্ড চালাবে)
if command -v yarn >/dev/null 2>&1; then
    echo "Using yarn for build..."
    yarn build
elif command -v npm >/dev/null 2>&1; then
    echo "Using npm for build..."
    # npm এর ক্ষেত্রে ডিপেন্ডেন্সি ইনস্টল করা না থাকলে ইনস্টল করুন
    if [ ! -d "node_modules" ]; then
        npm install --no-audit --no-fund
    fi
    npm run build
elif command -v pnpm >/dev/null 2>&1; then
    echo "Using pnpm for build..."
    if [ ! -d "node_modules" ]; then
        pnpm install --no-frozen-lockfile
    fi
    pnpm build
else
    echo "Error: No package manager found (yarn, npm, or pnpm)"
    exit 1
fi

echo "=== Build complete ==="
ls -la dist/ | head -20
