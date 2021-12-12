const express = require('express'),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");

    //var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ryerson:sandwich08@cluster0.cq2bw.mongodb.net/mydb?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true }); 
var app = express();
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(require("express-session")({
    secret: "Any normal Word",       //decode or encode session
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
/*
passport.serializeUser(Word.serializeUser());       //session encoding
passport.deserializeUser(Word.deserializeUser());   //session decoding
passport.use(new LocalStrategy(Word.authenticate()));*/

app.get("/", (req, res) => {
    res.render("home");
})
app.get("/userprofile", (req, res) => {
    res.render("userprofile");
})
app.get("/search", (req,res)=>{
    res.render("search");
}) 
//Auth Routes
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",(req,res)=>{
    
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })    
    })
})

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/search",
    failureRedirect:"/login",
}),function (req, res){
});
/*
app.post("/search",(req,res)=>{
    Word.register(new Word({word: req.body.word})),function(err,word){
        if(err){
            console.log(err);
        }
    }
})
*/
app.get("/logout",(req,res)=>{
    if(err){
        res.redirect("/");
    }
    req.logout();
});
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started At Port 3000");
    }
});