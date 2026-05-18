#!/bin/sh
# Start Tailscale daemon
tailscaled --tun=userspace-networking &
sleep 2

# Authenticate to tailnet
tailscale up --authkey=${TS_AUTHKEY} --hostname=do-backend

# Start Spring Boot
exec java -jar app.jar
