# BUILD IMAGE
FROM node:14.17-alpine3.13 as build-stage

# Use work directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# npm ci is meant to be use for clean install
RUN npm ci

# Build
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
