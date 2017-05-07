module.exports = function(app) {
	var dao = require('../database/dao');

	// Open connection to MongoDB server
	dao.connect();

	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/service/:slug', function(req, res){
		var pageComment = (req.query.pagecomment) ? req.query.pagecomment : 1;
		var countComment = (req.query.countcomment) ? req.query.countcomment : 5;
		var startComment = countComment * (pageComment-1);

		var dataService = dao.getService(req.params.slug);
		if (dataService == null)
			res.send("ERROR 404", 404);

		var comments = dao.getComment(req.params.slug, startComment, countComment);
		if (comments == null)
			res.send("ERROR 404", 404);

		res.render('service', {dataService: dataService, comments: comments, posComment: {start: startComment, countComment: countComment}});
	});

	app.get('*', function(req, res){
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end();
	});


	// Close connection to MongoDB server
	dao.close();
}
