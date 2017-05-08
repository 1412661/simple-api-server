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

		dao.connect(function()
		{
			dao.getService(req.params.slug, function(dataService){
					dao.getComment(req.params.slug, startComment, countComment, function(comments){
						console.log(typeof(dataService));
						console.log(typeof(comments));
						if (dataService == null || comments == null){
							res.writeHead(404, {"Content-Type": "text/html"});
							res.end();
							console.log('[WARN] Service or Comments is NULL');
						} else
							res.render('service', {dataService: dataService, comments: comments, posComment: {start: startComment, countComment: countComment}});
						dao.close();
					});
			});
		});
	});

	app.get('*', function(req, res){
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end();
	});

		app.post('/add/comment/:slug', function(req, res){
		var slug = req.params.slug;
		var comment = req.body.comment;
		dao.addComment(slug, comment, function(){
			console.log("Comment:" + comment);
			res.redirect('/service/'+slug);
		});
		
	});

	app.delete('/delete/comment/:slug/:idComment', function(req, res){
		var slug = req.params.slug;
		var idComment = req.params.idComment;
		dao.deleteComment(slug, idComment, function(){
			console.log("Delete comment: " + idComment + " in slug: " + slug);
			res.redirect('/service/'+slug);
		});
	});

}
