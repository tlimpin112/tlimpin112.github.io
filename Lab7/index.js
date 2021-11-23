var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ryerson:rooftop1@cluster0.qojfn.mongodb.net/mydb?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
