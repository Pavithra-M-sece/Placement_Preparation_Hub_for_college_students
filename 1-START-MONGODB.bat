@echo off
title MongoDB Server
echo ========================================
echo Starting MongoDB Server...
echo ========================================
echo.
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="C:\data\db" --bind_ip 127.0.0.1
