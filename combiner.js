var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');
var through = require('through');
var currentObject;

module.exports = function() {
    return combine(split(), 
		   through(write, end), 
		   zlib.createGzip());
};

function write(buffer){
    if(buffer.length > 0){
	var obj = JSON.parse(buffer.toString());
	if(obj.type === 'genre') {
	    if(currentObject){
		this.queue(JSON.stringify(currentObject) + '\n');
	    }
	    currentObject = { name: obj.name, books: [] };
	}
	else if (obj.type === 'book'){
	    currentObject.books.push(obj.name);
	}
    }
};

function end(){
    if(currentObject){
	this.queue(JSON.stringify(currentObject) + '\n');	
    }
    this.queue(null);
};
