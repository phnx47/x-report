FROM node:lts-alpine as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --only=production
COPY --from=build /app/dist .

CMD [ "node", "index.js" ]
