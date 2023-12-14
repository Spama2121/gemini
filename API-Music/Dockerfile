FROM node:20

WORKDIR /API-Music
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN npm install   
EXPOSE 3030
CMD [ "npm","start" ]