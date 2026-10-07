#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
SRC=".."
DST="app/src/main/assets/www"
rm -rf "$DST"
mkdir -p "$DST"
cp "$SRC/index.html" "$SRC/manifest.webmanifest" "$SRC/sw.js" "$DST/"
cp -R "$SRC/js" "$SRC/css" "$SRC/assets" "$SRC/data" "$DST/"
echo "[OK] Juego web sincronizado dentro del APK."
