const mongoose = require('mongoose');
const {conUrl,dbName} = require('./config/db.config.js');
mongoose.connect(`${conUrl}/${dbName}`,{useCreateIndex:true,useNewUrlParser:true},function(err,done){
	if(err){
		console.log('db connection failed');
	}
	else{
		console.log('db connection success');
	}
});