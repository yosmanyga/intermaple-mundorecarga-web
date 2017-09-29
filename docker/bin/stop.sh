#!/bin/bash

cd /home/yosmanyga/Work/Projects/intermaple/mundorecarga-web/code

docker-compose \
-f docker/dev.yml \
-p mundorecarga_web \
stop
