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

  const db = client.db("alcohol"); //Creates and connects to db.
  console.log("I done connected to db");

  app.post('/api/list', function(req, res) {
    db.collection('list').insert(req.body, function(err, result) {
      if(err) {
        console.log(500);
        res.status(500);
        res.send()
        return;
      }

      console.log('Item saved to db');
      res.status(201);
      res.json(result.ops[0]);
    });
  });

  app.get('/api/list', function(req, res) {
    db.collection('list').find().toArray(function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }

      res.json(result);

    });
  });


  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });


});
