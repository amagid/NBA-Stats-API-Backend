// server.js
 
'use strict'
var data
const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
 
const server = new Hapi.Server();
 
server.connection({
    host: '127.0.0.1',
    port: 3000
});
 
// Register vision for our views
server.register(Vision, (err) => {
    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',
    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
       reply("homepage");
    }
});

server.route({
    method: 'GET',
    path: '/teams',
    handler: function (request, reply) {
  
            var spawn = require('child_process').spawn,
                py    = spawn('python', ['teams.py']),
              data = [1,2,3,4,5,6,7,8,9],
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
              reply("teams");
        });
    }
});
 
server.start((err) => {
    if (err) {
        throw err;
    }
 
    console.log(`Server running at: ${server.info.uri}`);
   
});
 