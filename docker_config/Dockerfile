#Start from regular node image
FROM node:14.15.1-alpine3.10
#Set a default directory
WORKDIR app/
#Expose port 3000 to other container
EXPOSE 3000:3000
#Copy all of the files required for container from host
COPY ./package.json ./package.json
COPY ./backend ./backend
COPY ./frontend ./frontend
COPY ./server_config/babel.config.json ./babel.config.json
COPY ./server_config/webpack.config.js ./webpack.config.js
#Install all the npm modules
RUN npm install