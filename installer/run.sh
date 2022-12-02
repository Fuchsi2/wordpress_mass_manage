#!/bin/bash

echo "{\"cwd\":\"./\",\"domain\":\"$wmm_domain\"}" > /install/wmm-conf.json

echo "setting up pkg"
wget -q https://github.com/vercel/pkg-fetch/releases/download/v3.4/node-v16.16.0-linux-x64
wget -q https://github.com/vercel/pkg-fetch/releases/download/v3.4/node-v16.16.0-win-x64
wget -q https://github.com/vercel/pkg-fetch/releases/download/v3.4/node-v16.16.0-macos-x64
mv node-v16.16.0-* PKG_CACHE_PATH
echo "running build"
rm /install/build/*
npm run build
cp /install/build/* /workspace/
cp -r /workspace_/* /workspace/
sed -i 's/docker-test.net/'$wmm_domain'/g' /workspace/traefik/docker-compose.yml