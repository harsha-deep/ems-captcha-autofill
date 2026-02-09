#!/usr/bin/env bash
set -e


NAME="ems-captcha-autofill"
DIST="dist"

VERSION=$(grep '"version"' manifest.json | head -1 | sed -E 's/.*"([^"]+)".*/\1/')
ZIP="$DIST/$NAME-v$VERSION.zip"

rm -rf "$DIST"
mkdir -p "$DIST"

zip -r "$ZIP" \
  manifest.json \
  *.js \
  *.html \
  icons/*.png \
  LICENSE

echo "Built $ZIP"
