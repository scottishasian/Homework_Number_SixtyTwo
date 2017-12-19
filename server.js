const express = require('express');
const parser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

app.use(parser.json());
app.use(express.static('client/build'));
app.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client) {

  if(err) {
    console.log(err);
    return;
  }

  const db = client.db("alcohol");
  console.log("I done connected to db");


  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });


});
