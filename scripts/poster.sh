#!/bin/sh

webhook=${WEBHOOK_ADDRESS}
picture_address=${PICTURE_ADDRESS}

node /poster/src/index.js

pic_base64=$(base64 /poster/poster.png | tr -d '\n')
pic_md5=$(md5sum /poster/poster.png | awk '{ print $1 }')

echo '{ "msgtype": "image", "image": { "base64": "'$pic_base64'", "md5": "'$pic_md5'" } }' |
  curl $webhook -X POST \
    -H 'Content-Type: application/json' \
    -d @- || exit 1
