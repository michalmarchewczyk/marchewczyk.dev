FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG MAIL_URL

ENV VITE_MAIL_URL=$MAIL_URL

RUN npm run build


FROM nginx:1.23.2-alpine as run

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
