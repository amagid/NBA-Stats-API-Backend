
  // server.js
 
'use strict'
var express = require("express");
var app     = express();
var bodyParser = require('body-parser')
var path    = require("path");
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/teams',function(req,res){
  res.sendFile(path.join(__dirname+'/public/teams.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/players',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/games',function(req,res){
  res.sendFile(path.join(__dirname+'/public/games.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/player1/:player',function(req,res){
var res;	
 var PythonShell= require('python-shell');
 var py = new PythonShell('Player.py');
 var message;
var player = req.params.player;
//console.log(player); 
var data = {name:player}
py.send(JSON.stringify(data));

py.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    res.send(JSON.stringify(message));
    
});

py.end(function (err) {
    if (err){
        throw err;
    };

    console.log('finished');
});



});

app.post('/teams',function(req,res){

});

app.listen(3000);

console.log("Running at Port 3000");
           
        

      
  
 