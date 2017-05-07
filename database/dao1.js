var dao = {
	mongoose: require('mongoose'),
	// Connection string to MongoDB server
	// mlab.com account:
	// + Username:  quocbao
	// + Password:  32jJrkxwc&7F74#
	// DB name:     simple-api-server
	// DB username: quocbao
	// DB password: NX6cN2f55Mvaxrk
	//connString: 'mongodb://nvh_user:123456@ds131511.mlab.com:31511/nvh_test',
	dbName: 'simple-api-server',
	dbUser: 'quocbao',
	dbPass: 'NX6cN2f55Mvaxrk',
	connString: 'mongodb://quocbao:NX6cN2f55Mvaxrk@ds127101.mlab.com:27101/simple-api-server',

	connect: function()
	{
		console.log('[INFO] Connecting to database. Please wait ...');
		this.mongoose.connect(this.connString);

		this.mongoose.connection.on('error', console.error.bind(console, 'Error when connection to MongoDB:'));
		this.mongoose.connection.once('open', function(){
			console.log('[INFO] Connected to MongoDB simple-api-server with user quocbao');
		});

		var PageSchema = new this.mongoose.Schema({
			slug : String,
			title: String,
			pathImg: String,
			detail: String
		});
		this.Page = this.mongoose.model('Page', PageSchema);

		var CommentSchema = new this.mongoose.Schema({
			id : Number,
			pathAvatar: String,
			username: String,
			datePost: String,
			content: String});
		this.Comment = this.mongoose.model('Comment', CommentSchema);
	},

	close: function()
	{
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
	*	out: {slug:String, title: String, pathImg: String, detail: String}
	*	out - return null nếu không có kết quả
	*/
	getService: function(slug, callback){
		this.Page.find({'slug': slug}, function(err, data)
		{
			if (err) throw err;
			callback(data[0])
		});
		//return {slug: "design", title: "Design Research", pathImg: "/images/design.jpg", detail: "We help you better understand the needs and goals of your customers, uncovering key insighs that drive innovative design ideas" };
	},

	/*
	*	in - slug: string
	*	in - startComment, endComment	-> hiển thị sizeDisComm comment từ startComment (bắt đầu là 0)
	*	out - {count: Int, [{id:String, pathAvatar: String, username: String, datePost: String, content: String},
	*		{id:String, pathAvatar: String, username: String, datePost: String, content:String}]}
	*	out - return null nếu không có kết quả
	*/
	getComment: function(slug, startComment, sizeDisComm){
		return {total: 20, comments: [
			{id: 0, pathAvatar: "/images/avatar.jpg", username: "Nhóm 10", datePost: "20:00 05/05/2017", content: "This is good article"},
			{id: 1, pathAvatar: "/images/avatar.jpg", username: "Nhóm 10", datePost: "20:01 05/05/2017", content: "This is good article"},
			{id: 2, pathAvatar: "/images/avatar.jpg", username: "Nhóm 10", datePost: "20:02 05/05/2017", content: "This is good article"}
		]};
	}

};

module.exports = dao;
