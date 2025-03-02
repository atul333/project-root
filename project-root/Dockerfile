# Use an official Node.js runtime as a parent image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy the root package.json (for workspaces)
COPY package.json ./

# Install root dependencies (including concurrently)
RUN npm install

# Copy backend and frontend folders
COPY backend ./backend
COPY frontend ./frontend

# Build frontend assets (optional; here we assume development mode)
WORKDIR /usr/src/app/frontend
RUN npm install && npm run build

# Set working directory back to root and expose backend port
WORKDIR /usr/src/app
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start", "--prefix", "backend"]
