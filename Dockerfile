FROM node:10-alpine as react-builder
WORKDIR /usr/src/app
#RUN rm -rf /usr/src/app/*
#COPY package.json /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#RUN npm update
# COPY . /app
# RUN npm run build

FROM httpd:2.4
COPY --from=react-builder /usr/src/app/build/ /usr/local/apache2/htdocs/