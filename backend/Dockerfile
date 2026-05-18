# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
# Install Tailscale
RUN apk add --no-cache tailscale iproute2
COPY --from=build /app/build/libs/*.jar app.jar

# Startup script
COPY start.sh .
RUN chmod +x start.sh
ENTRYPOINT ["./start.sh"]
