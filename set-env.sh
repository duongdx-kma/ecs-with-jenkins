#!/bin/bash

CONFIG_PATH='./config/env.json'

echo Start generating env var from codebuild

echo $CONFIG_PATH

mkdir config

echo '{}' >> $CONFIG_PATH

json -I -f $CONFIG_PATH -e "this.TYPE_ENV='$TYPE_ENV'" \
  -e "this.PRODUCT_NAME='$PRODUCT_NAME'"