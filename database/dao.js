var dao = {
	mongoose: require('mongoose'),
	connString: "mongodb://nvh_user:123456@ds131511.mlab.com:31511/nvh_test",

	connect: function(){
		this.mongoose.connect(this.connString);
	},

	close: function(){
		this.mongoose.connection.close();
	},
	/*
	*	In - table: String
	*	In - struct: json	-> cấu trúc của data {keydata: type,...}
	*	In - data: json
	*/
	insertCol: function(table, struct, data){
		var schema = new this.mongoose.Schema(struct);
		var model = this.mongoose.model(table, schema);
		var itemOne = model(data).save(function(err){
			if(err) throw err;
			console.log('saved');
		});
	},

	/*
	*	In - table: String
	*	In - condition: json
	*/
	getCol: function(table, condition){
		var schema = new this.mongoose.Schema();
		var model = this.mongoose.model(table,schema);
		var itemOne = model.find(condition, function(err, data){
			if(err) throw err;
			console.log(data);
			return data;
		});
	},

	deleteCol: function(table, condition){
		var schema = new this.mongoose.Schema();
		var model = this.mongoose.model(table,schema);
		var itemOne = model.find(condition).remove(function(err, data){
			if(err) throw err;
			console.log(data);
			return data;
		});
	},


	/* input the required method from controler*/

	/*
	*	in - slug: primary key của bảng services
	*	out: {slug:String, pathImg: String, detail: String}
	*/
	getService: function(slug){
		return {}
	}

	/*
	*	in - slug: string
	*	in - startComment, endComment	-> hiển thị comment từ startComment đến endComment (bắt đầu là 0)
	*	out - [{id:String, pathAvatar: String, username: String, datePost: String, content: String}, 
	*		{id:String, pathAvatar: String, username: String, datePost: String, content:String}]
	*/
	getComment: function(slug, startComment, endComment){

	}



	/* end input the required method */

};
module.exports = dao;