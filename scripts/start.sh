#!/bin/bash
npm install

cd ../docker/
mkdir mysql && mkdir www
chmod 777 mysql/ && chmod 777 www/
docker compose up -d
echo "docker compose : ok"
npm run dev
cd public/
npm install
npm run dev
echo "tout est lance"
# docker exec -i docker-myadmin-1 mysql -u root -p adminspotminder dbSpotMinder < ../backup/dbSpotMinder.sql