include .env

DB_PATH=src/db/migrations
DB_URL=mysql://$(DB_USER):$(DB_PASSWORD)@tcp($(DB_HOST):$(DB_PORT))/$(DB_NAME)

migrateup:
	migrate -path $(DB_PATH) -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path $(DB_PATH) -database "$(DB_URL)" -verbose down

new_migration:
	migrate create -ext sql -dir $(DB_PATH) -seq $(name)