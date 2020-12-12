FROM node:14.15.1-alpine3.10
WORKDIR app/
EXPOSE 3000:3000
COPY ./docker_config/package.json ./package.json
COPY ./docker_config/package-lock.json ./package-lock.json
COPY ./backend ./backend
COPY ./docker_config/babel.config.json ./babel.config.json
RUN npm install
RUN npm run build