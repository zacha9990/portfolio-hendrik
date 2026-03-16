dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up

dev-bg:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

logs:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

prod-build:
	docker compose build

deploy:
	bash deploy.sh
