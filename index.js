var express = require('express');
var app = express();
var fs = require("fs")

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, cache-control, token');
	res.header('Access-Control-Expose-Headers', 'Row-Count');
	next();
};
app.use(allowCrossDomain);

app.get('/test.html', function (req, res) {
	res.send(fs.readFileSync('test.html').toString('UTF8'))
});


app.get('/', function (req, res) {
    res.setHeader('Connection', 'Transfer-Encoding');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('1. Inicio!');

	setTimeout(function(){
		res.write('2. tres segundos después');

		setTimeout(function(){
			res.write('3. Dos segundos más');
			res.end('4. Fin')
		},2000);
		
	},3000)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
