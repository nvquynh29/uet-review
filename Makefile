WEB_IMAGE_NAME := uet-review_web
API_IMAGE_NAME := uet-review_api
IMAGE_TAG := latest

init:
	docker build -f ./client/Dockerfile.dev -t ${WEB_IMAGE_NAME}:${IMAGE_TAG} ./client
	docker build -f ./server/Dockerfile.dev -t ${API_IMAGE_NAME}:${IMAGE_TAG} ./server

docker-up:
	docker-compose -f docker-compose.dev.yml up -d

docker-down:
	docker-compose -f docker-compose.dev.yml down

docker-clear:
	@echo "Do you want to remove volumes? [y/N]" && read ans && [ $${ans:-N} = y ]
	docker-compose -f docker-compose.dev.yml down -v

docker-clear-all:
	docker-compose -f docker-compose.dev.yml down -v
	docker-compose -f docker-compose.dev.yml rm --force
	docker volume prune --force