FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV ACCES_DATABASE=${ACCES_DATABASE}

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
