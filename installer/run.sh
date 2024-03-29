#!/bin/bash

echo "{\"cwd\":\"./\",\"domain\":\"$wmm_domain\"}" > /install/wmm-conf.json

echo "setting up pkg"
mkdir -p ~/.pkg-cache/v3.4/
mv /install/node-v16.16.0-* ~/.pkg-cache/v3.4/
mv ~/.pkg-cache/v3.4/node-v16.16.0-linux-x64 ~/.pkg-cache/v3.4/fetched-v16.16.0-linux-x64
mv ~/.pkg-cache/v3.4/node-v16.16.0-win-x64 ~/.pkg-cache/v3.4/fetched-v16.16.0-win-x64
mv ~/.pkg-cache/v3.4/node-v16.16.0-macos-x64 ~/.pkg-cache/v3.4/fetched-v16.16.0-macos-x64

echo "running build"
rm /install/build/*
npm run build
cp /install/build/* /workspace/

echo "Using Domain: $wmm_domain"

while getopts 'x' OPTION; do
    case $OPTION in
        x)
            echo "only updating executable!"
            ;;
        *) 
            cp -r /workspace_/* /workspace/
            sed -i 's/docker-test.net/'$wmm_domain'/g' /workspace/traefik/docker-compose.yml
            ;;
    esac
    
done
