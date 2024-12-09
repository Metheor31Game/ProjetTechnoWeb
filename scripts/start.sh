#!/bin/bash
npm install
echo "npm install : ok"

docker compose up -d
echo "docker compose : ok"

docker exec -i docker-myadmin-1 mysql -u root -p adminspotminder dbSpotMinder < ../backup/dbSpotMinder.sql