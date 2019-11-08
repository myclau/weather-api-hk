#!/bin/sh
set -e
sed -i 's#${SOURCE_API_URL}#'${SOURCE_API_URL}'#g' /usr/src/app/server.js
sed -i 's#${SOURCE_API_LOCATION_ID}#'${SOURCE_API_LOCATION_ID}'#g' /usr/src/app/server.js
sed -i 's#${SOURCE_API_APIKEY}#'${SOURCE_API_APIKEY}'#g' /usr/src/app/server.js
sed -i 's#${MONGO_USER}#'${MONGO_USER}'#g' /usr/src/app/server.js
sed -i 's#${MONGO_PASSWORD}#'${MONGO_PASSWORD}'#g' /usr/src/app/server.js
sed -i 's#${MONGO_CONTAINER_NAME}#'${MONGO_CONTAINER_NAME}'#g' /usr/src/app/server.js
sed -i 's#${MONGO_PORT}#'${MONGO_PORT}'#g' /usr/src/app/server.js
sed -i 's#${MONGO_DB_NAME}#'${MONGO_DB_NAME}'#g' /usr/src/app/server.js
sed -i 's#${MONGO_COLLECTION_NAME}#'${MONGO_COLLECTION_NAME}'#g' /usr/src/app/server.js
sed -i 's#${API_LOGIN_NAME}#'${API_LOGIN_NAME}'#g' /usr/src/app/server.js
sed -i 's#${API_LOGIN_PASSWORD}#'${API_LOGIN_PASSWORD}'#g' /usr/src/app/server.js
exec "$@"
