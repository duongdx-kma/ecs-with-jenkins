FROM node:16-alpine

WORKDIR app

COPY package.json .

RUN npm install

COPY .env.example .env

COPY . ./

EXPOSE 8088

CMD ["npm", "start"]