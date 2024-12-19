# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

 
# Production Stage
FROM nginx:stable-alpine AS production
# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx config into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]