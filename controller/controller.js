module.exports = function(app) {
	var dao = require('../database/dao.js');
	dao.connect();




	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/service/:slug', function(req, res){
		var dataService = dao.getService(req.params.slug);
		var comments = dao.getComment(req.params.slug, 0, 2);
		res.render('service', {dataService: dataService, comments: comments, posComment: {start: 0, sizeDisComm: 3}});
	});





	app.get('*', function(req, res){
		res.send('ERROR 404', 404);
	});


	dao.close();
}