PORT:=3000

build-dev:
	docker network create convcourse-network || true
	docker compose -f docker-compose.yaml build

rb-dev:
	docker compose -f docker-compose.yaml up -d --build
	@echo "Se esta ejecutando en el puerto: " $(PORT)

start-dev:
	docker compose -f docker-compose.yaml up -d

stop-dev:
	docker compose -f docker-compose.yaml stop

stop-dev-container:
	echo "El front no tiene volumenes"


build-prod:
	docker network create convcourse-network || true
	docker compose -f docker-compose-prod.yaml build

start-prod:
	docker compose -f docker-compose-prod.yaml up -d

stop-prod:
	docker compose -f docker-compose-prod.yaml stop

stop-prod-container:
	echo "El front no tiene volumenes"

