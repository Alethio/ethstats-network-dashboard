### Stage 1: buildtime

FROM node:9-alpine

RUN apk update && \
    apk add git python g++ make

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn global add node-gyp && \
    yarn add sha3
RUN yarn

ADD . .

COPY config.js.example config.js

RUN yarn build

### Stage 2: just use the built assets

FROM nginx:1.15-alpine

RUN apk update && \
    apk add nodejs

WORKDIR /usr/share/nginx/html

COPY --from=0 /app/config.js.example .
COPY --from=0 /app/set-env-vars.js .
COPY --from=0 /app/entrypoint.sh .
COPY --from=0 /app/dist .
COPY --from=0 /app/maintenance ./maintenance

ENTRYPOINT ["./entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
