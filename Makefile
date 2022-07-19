install:
	npm ci

start-backend:
	npx start-server -p 5001

start-frontend:
	npm run dev

deploy:
	git push heroku main

lint:
	npm run lint

build:
	npm run build