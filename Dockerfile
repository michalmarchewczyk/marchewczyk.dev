FROM node:18-alpine as build

WORKDIR /app

RUN apk add libwebp libwebp-tools

COPY package*.json ./

RUN npm ci

COPY . .

ARG MAIL_URL

ENV VITE_MAIL_URL=$MAIL_URL

RUN npm run build

RUN \
   for file in /app/dist/assets/*.png /app/dist/assets/*.jpg; do \
     cwebp -q 80 "$file" -o "$file.webp"; \
   done


FROM nginx:1.23.2-alpine as run

COPY --from=build /app/dist /usr/share/nginx/html

ADD default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
