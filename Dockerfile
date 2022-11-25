FROM node:16.14.2

WORKDIR /app-open-food-challenge

COPY . .

RUN npm install

ENTRYPOINT npm start

EXPOSE 3000
