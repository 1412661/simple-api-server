module.exports = function(app) {
	var dao = require('../database/dao1');

	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/service/:slug', function(req, res){
		// Open connection to MongoDB server
		var pageComment = (req.query.pagecomment) ? req.query.pagecomment : 1;
		var countComment = (req.query.countcomment) ? req.query.countcomment : 5;
		var startComment = countComment * (pageComment-1);

		dao.connect();

		var dataService = dao.getService(req.params.slug);
		var comments = dao.getComment(req.params.slug, startComment, countComment);

		if (dataService == null || comments == null){
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end();
			console.log('[WARN] Service or Comments is NULL');
		} else
			res.render('service', {dataService: dataService, comments: comments, posComment: {start: startComment, countComment: countComment}});

		// Close connection to MongoDB server
		dao.close();
	});

	app.get('*', function(req, res){
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end();
	});
}
