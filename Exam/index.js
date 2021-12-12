var express = require('express')
var app = express();
var MongoClient = require('mongodb').MongoClient;


var url = "mongodb+srv://ryerson:sandwich08@cluster0.cq2bw.mongodb.net/mydb?retryWrites=true&w=majority";

app.get('/', function(req,res){
    res.sendfile('index.html');
})
app.get('/register', function(req,res){
    res.sendfile('registration.html');
})

var ema = document.getElementById('user').value;
var pw = document.getElementById('password').value;
var na = document.getElementById('name').value;
var ln = document.getElementById('inputLastName').value;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { 
    email: ema,
    password: pw,
    name: na,
    last_name: ln,
 };
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

app.listen(3000,()=>{
    console.log("server is up");
})