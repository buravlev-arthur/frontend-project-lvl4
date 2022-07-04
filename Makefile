start-backend:
	npx start-server

start-frontend:
	npm start

remote-start:
	make start-backend -s ./build

deploy:
	git push heroku main