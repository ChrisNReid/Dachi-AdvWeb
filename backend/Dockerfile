# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /
EXPOSE 8080
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]
