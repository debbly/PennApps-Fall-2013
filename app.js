var mongoose = require("mongoose");

mongoose.connect("localhost", "Flyerthing");

mongoose.connection.once("open", function(){
	console.log("connected to database");
	});

var Flyer = require("./flyer");

var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , xPos = 0
    , yPos = 0

app.use(express.static('scripts'))
app.use('/public', express.static(__dirname + '/public'))

app.configure(function(){
	console.log("Configuring");
	app.use(express.bodyParser());
});

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html')
});

/*
// Static Route -- Change to real Data
app.get('/api/flyers', function(req, res){
    res.sendfile(__dirname + '/flyers.json')
});
*/


// Static Route -- Change to real Data
app.get('/api/add-flyer', function(req, res){
});

app.get('/api/flyers', function(req, res){
	Flyer.find({},
	   function(error, results){
		var output = []; 
		results.forEach(function(result){
			output.push(result.toObject({
			virtuals: true
			})
		);
		});
		res.send({flyers:output.reverse()});
	   });
	});


app.post('/create', function(req, res){
	console.log(req.body);
	var flyer = new Flyer();
        flyer.name = req.body.name;
		flyer.description = req.body.description;
		flyer.image = req.body.image;
		flyer.date = req.body.date;
		//flyer._date = req.body.date;
        flyer.save(function(error, flyer){
		console.log(error);
		res.send(flyer.toObject({
		virtuals: true
		}));
	});
	});

server.listen(3000);
