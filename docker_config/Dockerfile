FROM node:14.15.1-alpine3.10
WORKDIR app/
EXPOSE 3000:3000
COPY ./docker_config/package.json ./package.json
COPY ./backend ./backend
COPY ./frontend ./frontend
COPY ./docker_config/babel.config.json ./babel.config.json
COPY ./docker_config/webpack.config.js ./webpack.config.js
RUN npm install
RUN npm run build