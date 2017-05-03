var express = require('express');
var app = express();

var server = app.listen(8080, function()
{
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening on ' + host + ':' + port);
});

app.use(express.static('public'));


var tv = [{lg:'LG'}, {samsung:'Samsung'}, {sharp:'Sharp'}, {sony:'Sony'}, {panasonic:'Panasonic'}, {tcl:'TCL'}];

app.get('/process', function(req, res)
{
		if (req.query.list == 1)
		{
			res.contentType('application/json');
			res.send(JSON.stringify(tv));
		} else if (req.query.tv)
		{
			var tv_type = req.query.tv;

			tv.forEach(function(element, index, array)
			{
			    if (tv_type in element)
					{
						res.sendFile(__dirname + '/public/'+ tv_type + '.html');
					}
			});
		} else {
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end();
		}
});
