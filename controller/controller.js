module.exports = function(app) {
	var dao = require('../database/dao.js');
	dao.connect();




	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/services/:slug', function(req, res){
		var dataService = dao.getService(req.params.slug);
		var comments = dao.getComment(req.params.slug, 0, 9);
		res.render('service', {dataService: dataService, comments: comments});
	});





	app.get('*', function(req, res){
		res.send('ERROR 404', 404);
	});


	dao.close();
}