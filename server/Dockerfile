FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build && \
    chgrp -R 0 /usr/src/app/dist && \
    chmod -R g=u /usr/src/app/dist

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 9001

CMD [ "node", "dist/main" ]

# docker container run -p 9001:9001 -e MONGODB_URI='mongodb://172.30.99.120:27017' -e DB_USER='user' -e DB_PASSWORD='pass' -e MONGO_GRIDFS_BUCKET_NAME='uploads' -e CACHE_TTL=3600 -e CACHE_HOST='172.30.99.120'  -e CACHE_PORT=6379 -e CACHE_MAX=1000000 -e PORT=9001 server1