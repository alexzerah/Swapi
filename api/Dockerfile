FROM node:14.17-alpine as build-stage2

WORKDIR /usr/src/app

RUN npm install nodemon -g

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm ci

COPY . /usr/src/app

EXPOSE 8000

CMD ["npm", "run", "dev"]
