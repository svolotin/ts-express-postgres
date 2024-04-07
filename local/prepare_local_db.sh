#!/bin/bash
set -eu

echo "📦 Starting postgres container"

docker compose up -d

container_id=$(docker compose ps -q pg)

echo "Container ID : ${container_id}"

echo "🏁 Waiting for container ready"

while [ "`docker inspect -f {{.State.Status}} ${container_id}`" != "running" ]; do sleep 1; done

echo "🐘 Waiting for postgres"

while ! docker exec "${container_id}" pg_isready; do sleep 1; done

echo "🚧 Create database table (create_table.sql)"

docker cp create_table.sql postgres:/;
docker exec postgres psql -U postgres -d example -f create_table.sql > /dev/null


echo "📝 Insert data for local testing (data.sql)"

docker cp data.sql postgres:/;
docker exec postgres psql -U postgres -d example -f data.sql > /dev/null


