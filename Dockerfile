FROM node:14-alpine
WORKDIR /poster
# build node-canvas
# https://github.com/node-gfx/node-canvas-prebuilt/issues/77
RUN apk add --no-cache curl bash \
 && apk add --no-cache --virtual .build-deps build-base g++ \
 && apk add --no-cache --virtual .npm-deps cairo-dev libjpeg-turbo-dev pango-dev giflib-dev
ADD . .
RUN npm install && apk del .build-deps
ENTRYPOINT []
CMD ["bash"]

