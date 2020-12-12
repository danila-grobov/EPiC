FROM node:14.15.1-alpine3.10
WORKDIR app/
EXPOSE 3000:3000
COPY backend/app.js app.js
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY babel.config.json babel.config.json
RUN npm install
RUN npm run build