module.exports = function(app) {
	var dao = require('../database/dao');

	

	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/service/:slug', function(req, res){
		// Open connection to MongoDB server
		dao.connect();
		var pageComment = (req.query.pagecomment) ? req.query.pagecomment : 1;
		var countComment = (req.query.countcomment) ? req.query.countcomment : 5;
		var startComment = countComment * (pageComment-1);

		dao.getService(req.params.slug, function(data){
			console.log("2");
			var dataService = data;
			if (dataService == null){
				res.writeHead(404, {"Content-Type": "text/html"});
				res.end();
			}

			var comments = dao.getComment(req.params.slug, startComment, countComment);
			if (comments == null){
				res.writeHead(404, {"Content-Type": "text/html"});
				res.end();
			}

			res.render('service', {dataService: dataService, comments: comments, posComment: {start: startComment, countComment: countComment}});
			// Close connection to MongoDB server
			dao.close();
		});

	});

	app.get('*', function(req, res){
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end();
	});


	
}
