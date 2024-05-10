FROM nginx:1.25
RUN rm -rf /usr/share/nginx/html/*
COPY /demo /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

# sudo docker run --rm   -p 4000:80/tcp --name ng-nexct-approval-ui-container ng-nexct-approval-ui-image:latest
# sudo docker build --pull --rm -f "Dockerfile" -t ng-nexct-approval-ui-image:latest "."
