#!/bin/bash

echo "{\"cwd\":\"./\",\"domain\":\"$wmm_domain\"}" > /install/wmm-conf.json
rm /install/build/*
npm run build
cp /install/build/* /workspace/
cp -r /workspace_/* /workspace/