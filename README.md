# weather-api-hk

# How to use
1. git clone repo
2. make sure you install docker and docker-compose
3. go to the work directory of the git
4. Edit the docker-compose.yml
  a. SOURCE_API_APIKEY: this is the apikey from openweathermap.org
  b. other can keep default
5. run `docker-compose build`
6. run `docker-compose up -d`
7. then you need to get the token before using the API
`curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"password":"password", "username":"admin"}' \
  http://localhost:8000/login
`
8. then you will see the token and use the api like that
`
curl -X GET -H 'Authorization: Bearer <token from above>' http://localhost:8000/weather
`
# How to test
1. once run
`
curl -X GET -H 'Authorization: Bearer <token from above>' http://localhost:8000/weather
`
2. if you connect to the mongodb you will see there is new entry or from log you will see
`
Insert One Data to colleciton 'hk'
`
3. to test if openweathermap.org cannot be call if it can get data from mongodb
4. first edit the docker-compose.yml change SOURCE_API_URL to http://aaaaaaaapi.openweathermap.org/data/2.5/weather
5. then run again if you can see data means it is work

# prerequirement
1. install docker
2. install docker compose


# environment variable

| Env var | Description |
| SOURCE_API_URL | api url of openweathermap.org |
| SOURCE_API_LOCATION_ID | openweathermap.org's location ID |
| SOURCE_API_APIKEY | you need get an openweathermap.org account and you will have the api key |
| MONGO_USER | your local mongo db user name |
| MONGO_PASSWORD | your local mongo db user password |
| MONGO_CONTAINER_NAME | the name of the monogo db container name |
| MONGO_PORT | the port of mongo db |
| MONGO_DB_NAME | the db name (weather) |
| MONGO_COLLECTION_NAME | the collection name in db |
| API_LOGIN_NAME | this is user name for loin using JWT |
| API_LOGIN_PASSWORD | this is password for loin using JWT|



