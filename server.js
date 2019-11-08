const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const assert = require('assert');

let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

var MongoClient = require('mongodb').MongoClient; 
// Connection URL
var url = 'mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CONTAINER_NAME}:${MONGO_PORT}/${MONGO_DB_NAME}';
 

class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = '${API_LOGIN_NAME}';
    let mockedPassword = '${API_LOGIN_PASSWORD}';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  requestData (req, res, next){
      var weatherinfoSource = {
        uri: "${SOURCE_API_URL}?id=${SOURCE_API_LOCATION_ID}&APPID=${SOURCE_API_APIKEY}",
        body: "",
        method: 'GET',
        headers: {}
      }
      request(weatherinfoSource, function (error, response) {
        if(response != null){
          var weatherinfo = response.body
          console.log('weatherinfo: ',response.body);
          MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            console.log('Database created');
            var dbase = db.db("${MONGO_DB_NAME}");

            dbase.collection('${MONGO_COLLECTION_NAME}', {strict:true}, function(err, col3) {

              // Create the collection
              dbase.createCollection('${MONGO_COLLECTION_NAME}', function(err, result) {
  
              });
            });

            var myobj = JSON.parse(weatherinfo);
            dbase.collection("${MONGO_COLLECTION_NAME}").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("Insert One Data to colleciton '${MONGO_COLLECTION_NAME}'");
              db.close();
            });
          });
        } else {
          console.log('Error: ');
        }
        req.requestData =  weatherinfo;
        next();
      });
  }
  async weather (req, res) {
    var responseText=req.requestData
    if(req.requestData == null){
      console.log('Cannot get from api, trying to get last updated Data from Mongo');
      const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
      if (!client) {
        return;
      }
      try {
        const db = client.db("${MONGO_DB_NAME}");
        //still not figure out how to get the lastest record
        let result = await db.collection("${MONGO_COLLECTION_NAME}").findOne({})
        delete result._id
        responseText = JSON.stringify(result)
        console.log(responseText);
      } catch (err) {
        console.log(err);
      } finally {
        client.close();
      }
    }
    res.send(responseText)
  }
}

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  // Routes & Handlers
  app.post('/login', handlers.login);
  app.use(handlers.requestData)
  app.get('/weather', middleware.checkToken, handlers.weather );
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
