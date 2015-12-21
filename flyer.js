var mongoose = require("mongoose");

var Flyer = mongoose.Schema({
	name: String,
	date: String,
	description: String,
	image: String
	});

/*Flyer.virtual("date")
	.get(function(){
	 return this._date.toDateString();
	//return this._date;
	});
*/
module.exports = mongoose.model("Flyer", Flyer);

