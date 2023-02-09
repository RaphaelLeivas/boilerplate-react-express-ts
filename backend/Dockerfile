FROM node:14

RUN mkdir -p /usr/boilerplate/backend
WORKDIR /usr/boilerplate/backend

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8000
CMD ["yarn", "start"]
