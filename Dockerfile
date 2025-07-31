# Use lightweight Nginx image
FROM nginx:alpine

# Copy all files to Nginx's default serving directory
COPY . /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
