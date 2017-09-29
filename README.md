# Dev

docker-compose \
-f docker/dev.yml \
-p mundorecarga_web \
stop && docker-compose \
-f docker/dev.yml \
-p mundorecarga_web \
up -d

# Prod

docker-compose \
-f docker/prod.yml \
-p mundorecarga_web \
up -d --remove-orphans --force-recreate

## Db

https://www.mundorecarga.com/db

## Tmp

Service worker patch
https://github.com/facebook/create-react-app/issues/5890#issuecomment-450915616