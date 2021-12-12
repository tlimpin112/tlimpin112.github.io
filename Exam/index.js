var express = require('express')
var app = express();
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
var Schema = mongoose.Schema
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://ryerson:sandwich08@cluster0.cq2bw.mongodb.net/mydb?retryWrites=true&w=majority";

app.get('/', function(req,res){
    res.sendfile('index.html');
})
app.get('/register', function(req,res){
    res.sendfile('registration.html');
})

mongoose.connect(url, {useNewUrlParser:true});

app.set('view enging', 'html')
app.use(bodyParser.urlencoded({extended:true}));


var UsersSchema = new mongoose.Schema({
  user: String,
  password: String,
  fname: String,
  lname: String}
);

var comments = mongoose.model('UserSchema',UsersSchema);
//handles registration
app.post('/register',(req,res)=>{
  var info = {
    user: req.body.user,
    password: req.body.password,
    fname: req.body.fname,
    lname: req.body.lname
  };
  var me = new comments (info);
  me.save(function (err){
    if(err){
      console.log('error');
    }
    else{
      console.log('Done!');
    }
  });
  res.sendfile('index.html');
});

//handles login
app.post('/',(req,res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    //Find all documents in the customers collection:
    dbo.collection("userschema").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
})


app.listen(3000,()=>{
    console.log("server is up");
});