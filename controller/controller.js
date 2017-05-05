module.exports = function(app) {
	var dao = require('../database/dao.js');
	dao.connect();
	dao.getCol("table", { item: "12345"} );
	//dao.insertCol("table", {item: String}, {item: "12345", number: 1234});
	//console.log(data);
	dao.close();
}