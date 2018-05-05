var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");

var application = express();

application.set("view engine", "ejs");
application.set("views", "./app/views/ejs");

application.use(express.static('./app/public'));
application.use(bodyParser.urlencoded({extended : true}));
application.use(bodyParser.json({ 'Content-type': 'application/json' }));

//Carregamento consign
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(application);

application.use(function(req,res,next){
    res.status(404).redirect('/');
    next();
});
/*application.use(function(error, req, res, next){
    if(process.env.NODE_ENV == 'production'){
        res.send("Production -> Erro 500");
        return;
    }else{
        res.send("Dev -> Erro 500-> " + error);
        return;
    }
    next(error);
});*/

module.exports = application;
