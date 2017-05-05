module.exports = function(app) {
	var dao = require('../database/dao.js');
	dao.connect();




	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/services/:slug', function(req, res){
		var dataService = dao.getService()
	});





	dao.close();
}