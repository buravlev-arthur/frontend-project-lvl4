start-backend:
	npx start-server -p 5001

start-frontend:
	npm start

remote-start:
	make start-backend -s ./build

deploy:
	git push heroku main