docker-compose stop
docker rmi -f mailnophone03/uet-review-frontend:latest
docker rmi -f mailnophone03/uet-review-backend:latest
docker-compose rm -f
docker-compose up -d
