#FROM node:12.18.1

#for production
FROM node:17-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production
#RUN yarn install --production --ignore-optional --pure-lockfile --non-interactive

COPY . .

ARG BUILD_ENV

ENV NODE_ENV=$BUILD_ENV

RUN echo "BUILD_ENV $BUILD_ENV"

EXPOSE 3000

CMD node index.js
