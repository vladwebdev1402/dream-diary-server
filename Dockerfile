FROM node:alpine

WORKDIR /app

EXPOSE 5000

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

CMD ["yarn", "start:dev"]

