FROM node:14.11.0-alpine3.10

WORKDIR /usr/src/app

COPY ./dist ./
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./ormconfig.json ./

RUN npm install --production

CMD ["node", "./server.js"]
