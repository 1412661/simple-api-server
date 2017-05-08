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

	connect: function(callback)
	{
		console.log('[INFO] Connecting to database. Please wait ...');
		this.mongoose.connect(this.connString);
		this.mongoose.connection.on('error', console.error.bind(console, 'Error when connection to MongoDB:'));
		this.mongoose.connection.once('open', function(){
			console.log('[INFO] Connected to MongoDB simple-api-server with user quocbao');

			// After connect to DB, then execute any others
			callback();
		});
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

	/*
	*	in - slug: primary key của bảng services
	*	in - callback: callback function to retrun data as a object
	*/
	getService: function(slug, callback) {
		// DB structure for a service
		var PageSchema = new this.mongoose.Schema({
			slug : String,
			title: String,
			pathImg: String,
			detail: String
		});

		// Prevent recreating a singleton
		if (!this.Page)
			this.Page = this.mongoose.model('page', PageSchema);

		this.Page.find({'slug': slug}, function(err, data)
		{
			if (err) throw err;

			// Return data as a callback function
			//console.log(data[0]);
			callback(data[0]);
		});
	},

	/*
	*	in - slug: string
	*	in - startComment, endComment	-> hiển thị sizeDisComm comment từ startComment (bắt đầu là 0)
	*	out - {count: Int, [{id:String, pathAvatar: String, username: String, datePost: String, content: String},
	*		{id:String, pathAvatar: String, username: String, datePost: String, content:String}]}
	*	out - return null nếu không có kết quả
	*/
	getComment: function(slug, startComment, sizeDisComm, callback){
		var CommentSchema = new this.mongoose.Schema({
			slug: String,
			pathAvatar: String,
			username: String,
			datePost: String,
			content: String
		});

		if (!this.Comment)
			this.Comment = this.mongoose.model('Comment', CommentSchema);
		//console.log(sizeDisComm);
		//console.log(startComment);

		// Select all comment belong to splug, skip the first startComment comment,
		// don't take more then sizeDisComm comment
		this.Comment.find({'slug': slug})
		.sort({_id:-1})
		.skip(parseInt(startComment, 10))
		.limit(parseInt(sizeDisComm))
		.exec(function(err, data)
		{
			if (err) throw err;

			dao.Comment.find({'slug': slug}).exec(function(err, comments){
				// Return data as a callback function
				// data.length is the total of extracted comments
				console.log(comments);
				callback({total: comments.length, "comments": data});
			});

		});
	},

	/*
	*	Thêm comment vào database
	*	in: 	slug 		(string) 	-> Phần slug đường dẫn trang comment
	*	in: 	comment 	(String) 	-> Nội dung bình luận
	*	in: 	callback 	(function) 	-> hàm phải được gọi khi hết tiến trình
	*										callback được không tham số.
	*										callback();
	*	out: 	none
	*/
	addComment: function(slug, comment, callback){
		var CommentSchema = new this.mongoose.Schema({
			slug: String,
			pathAvatar: String,
			username: String,
			datePost: String,
			content: String
		});

		if (!this.Comment)
			this.Comment = this.mongoose.model('Comment', CommentSchema);

		var date = new Date();
		var strDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + date.getMonth() + "/" + date.getYear();

		var data = {
			"slug": slug,
			pathAvatar: "/images/avatar.jpg",
			username: "Customer",
			datePost: strDate,
			content: comment
		};

		this.Comment(data).save(function(err){
			if(err) throw err;
			callback();
		});
	},


	/*
	*	Xóa comment database
	*	in: 	slug: 		(string) 	-> Phần slug đường dẫn trang comment
	*	in: 	idComment: 	(int) 		-> id bình luận
	*	in: 	callback 	(function) 	-> hàm phải được gọi khi hết tiến trình
	*										callback được không tham số.
	*										callback();
	*	out: none
	*/
	deleteComment: function(slug, idComment, callback){
		/*var CommentSchema = new this.mongoose.Schema({
			_id: String,
			slug: String
		});

		if (!this.Comment)
			this.Comment = this.mongoose.model('Comment', CommentSchema);
		*/
		// We don't need to load this model of Comment because getComment() already load it first
		this.Comment.find()
		.where('_id').equals(idComment)
		.where('slug').equals(slug)
		.remove().exec(function(err, data) {
			//console.log(slug);
			//console.log(idComment);
			callback();
		});
	}
};

module.exports = dao;
