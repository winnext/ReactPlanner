FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN rm yarn.lock && \
    rm package-lock.json

RUN npm install --legacy-peer-deps

RUN npm run build


FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

USER node

EXPOSE 9000

CMD ["npm", "run", "start-build"]
