#!/bin/bash

echo "{\"cwd\":\"./\",\"domain\":\"$wmm_domain\"}" > /install/wmm-conf.json

echo "setting up pkg"
mv node-v16.16.0-* ~/.pkg-cache/v3.4/
mv ~/.pkg-cache/v3.4/node-v16.16.0-* ~/.pkg-cache/v3.4/fetched-node-v16.16.0-*
echo "running build"
rm /install/build/*
npm run build
cp /install/build/* /workspace/
cp -r /workspace_/* /workspace/
sed -i 's/docker-test.net/'$wmm_domain'/g' /workspace/traefik/docker-compose.yml