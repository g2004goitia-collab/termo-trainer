#!/bin/bash
cd "$(dirname "$0")/dist"
python3 -m http.server 5173 &
sleep 2
xdg-open http://localhost:5173/
