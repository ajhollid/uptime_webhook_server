FROM node:20


WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./index.js ./index.js

EXPOSE 5001

CMD ["node", "index.js"]