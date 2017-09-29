#!/bin/bash

restart() {
    docker-compose -f docker/dev.yml -p mundorecarga_web stop \
    && docker-compose -f docker/dev.yml -p mundorecarga_web up -d
}

cd /home/yosmanyga/Work/Projects/intermaple/mundorecarga-web/code

while true
do
    restart

    read -p "Reset?" answer
done
