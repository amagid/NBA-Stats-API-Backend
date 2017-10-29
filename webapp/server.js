// server.js
 
'use strict'
var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static(path.join(__dirname, '/public')));

app.get('/',function(req,res){
  
 var spawn = require('child_process').spawn,
                py    = spawn('python', ['Player.py']),
              data = ["Lebron James", "Chris Paul"],
              dataString = '';
              
              /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
             py.stdout.on('data', function(data){
            dataString = data.toString();
             });
           /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
             py.stdout.on('end', function(){
             console.log('Sum of numbers=',dataString);
            });
              
               py.stdin.write(JSON.stringify(data));
              py.stdin.end();
  res.sendFile(path.join(__dirname+'public/index'));
  //__dirname : It will resolve to your project folder.
});
app.listen(3000);

console.log("Running at Port 3000");
           
        

      
  
 