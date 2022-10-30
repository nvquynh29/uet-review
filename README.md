# UET Review

## Using make
### Start
```bash
make init && make docker-up
```

### Stop
```bash
make docker-down
```

## Using docker-compose
### Start
```bash
docker build -f ./client/Dockerfile.dev -t uet-review_web:latest ./client
docker build -f ./server/Dockerfile.dev -t uet-review_api:latest ./server
docker-compose -f docker-compose.dev.yml up -d
```

### Stop
```bash
docker-compose -f docker-compose.dev.yml down
```
## Without docker

### Install dependencies
```bash
cd client && yarn
cd server && yarn
```

### Copy .env files
Copy file `.env.example` to file `.env` (both `client` and `server` folders)

### Start Front-end
```bash
yarn start
```

### Start Back-end
```bash
yarn dev
```

## URLs: 
- Front-end: http://localhost:3000
- Back-end: http://localhost:5000
