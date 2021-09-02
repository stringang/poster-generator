#!/bin/bash

webhook=${WEBHOOK_ADDRESS}
picture_address=${PICTURE_ADDRESS}
host=${HOST}

node /poster/src/index.js
generator_path=/poster/poster.png
pic_base64=$(base64 ${generator_path} | tr -d '\n')
pic_md5=$(md5sum ${generator_path} | awk '{ print $1 }')

# tencent wecom webhook
echo '{ "msgtype": "image", "image": { "base64": "'$pic_base64'", "md5": "'$pic_md5'" } }' |
curl -s $webhook -X POST \
  -H 'Content-Type: application/json' \
  -d @- || exit 1

# archive to tencent COS
if [ ${host} ]; then
  year=$(date '+%Y')
  month=$(date '+%m')
  fileName=$(date '+%d')
  curl -s --location --request POST "${host}" \
    --form "file_data=@"${generator_path}"" \
    --form 'fileExt="png"' \
    --form "uploadPath="/poster/${year}/${month}/"" \
    --form "fileName="${fileName}.png""
fi
