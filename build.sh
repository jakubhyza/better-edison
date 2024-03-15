#!/bin/ash

echo "Running: Copy assets"
rm -rf build
cp -R src/public build

echo "Running: Compile TypeScript"
tsc

echo "Running: Bundle"
rollup build/temp-ts/src/index.js --file build/better-edison-bootstrap.js --format iife

echo "Running: Compile SASS"
sass src/style:build

echo "Running: Clean up"
rm -R build/temp-ts

echo "Done!"
