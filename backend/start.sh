#!/bin/sh

# 1. Start Tailscale daemon and explicitly expose a local SOCKS5 proxy on port 1055
tailscaled --tun=userspace-networking --socks5-server=localhost:1055 &

# Wait for the daemon to initialize
sleep 5 

# 2. Authenticate to the tailnet
tailscale up --authkey=${TS_AUTHKEY} --hostname=do-backend

# 3. Start Spring Boot, explicitly passing the proxy arguments to the JVM
exec java -DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1055 -jar app.jar