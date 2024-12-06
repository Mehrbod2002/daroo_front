FROM nginx:1.25
RUN rm -rf /usr/share/nginx/html/*
COPY /demo /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

# sudo docker run -d --rm -p 4000:80/tcp --name daroo-container daroo-image:latest
# sudo docker build --no-cache --pull --rm -f "Dockerfile" -t daroo-image:latest "."

# FROM python:3.10-slim
# WORKDIR /root/daroo_front

# COPY server.py .
# COPY demo ./demo

# EXPOSE 4000

# CMD ["python3", "server.py"]

# docker run -d --rm -p 4000:4000 --name custom-http-container custom-http-server