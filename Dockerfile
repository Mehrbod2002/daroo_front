FROM nginx:1.25
RUN rm -rf /usr/share/nginx/html/*
COPY /demo /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

# sudo docker run -d --rm -p 4000:80/tcp --name daroo-container daroo-image:latest
# sudo docker build --no-cache --pull --rm -f "Dockerfile" -t daroo-image:latest "."
