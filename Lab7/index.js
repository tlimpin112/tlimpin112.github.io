var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ryerson:rooftop1@cluster0.qojfn.mongodb.net/mydb2?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb2");
    var myobj = { title: "League of Legends", author: "Kristopher Felician" };
    dbo.collection("books").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted!");
      db.close();
    });
  });