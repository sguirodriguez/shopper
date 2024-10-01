#!/bin/sh

echo "Verificando a conexão com o banco de dados..."
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_USERNAME: $DB_USERNAME"

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME"; do
  echo "Aguardando o banco de dados estar disponível..."
  sleep 2
done

npm run build

npm run migrate

npm run seed

npm run dev
