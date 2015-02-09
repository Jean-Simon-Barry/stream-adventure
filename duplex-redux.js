var duplexer = require('duplexer');
var through = require('through');
var countries = {};

module.exports = function (counter){
    function write(obj){
	if (!(obj.country in countries)) {
	    countries[obj.country] = 0;
	}
	countries[obj.country]++;
}

    function end(){
	counter.setCounts(countries);
}

    return duplexer(through(write, end), counter);
};
