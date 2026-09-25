@echo off
node tools\sync-potree.js --soft
start ./node_modules/electron/dist/electron.exe ./main
