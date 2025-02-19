# Use a minimal base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the entire application source code
COPY . .

# Install only production dependencies
RUN npm install --production

# Create and switch to a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser


# Copy environment variables from the compose file
ENV NODE_ENV=${NODE_ENV}
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}

CMD ["node", "server.js"]