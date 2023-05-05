# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /src
EXPOSE 3000
COPY . .
RUN yarn install --production
CMD ["npm", "start"]
