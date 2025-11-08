# Используем образ ноды как базовый
FROM node:22-alpine AS build

#Рабочая директория
WORKDIR /home/gasconsumer-ui

# COPY --chmod=777 . .
COPY package.json ./
COPY yarn.lock ./
COPY apps/doc/package.json ./apps/doc/package.json
COPY libs/components/package.json ./libs/components/package.json

RUN yarn install

COPY --chmod=777 . .
RUN yarn lib build-only:production
RUN yarn app build-only:production

FROM nginx:1.23
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=build /home/gasconsumer-ui/nginx_default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/gasconsumer-ui/apps/doc/dist /usr/share/nginx/html
EXPOSE 80