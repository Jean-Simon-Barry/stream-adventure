var trumpet = require('trumpet');
var through = require('through');

var tr = trumpet();
var loudstream = tr.select('.loud').createStream();

loudstream.pipe(through(function(buffer){
    this.queue(buffer.toString().toUpperCase());
})).pipe(loudstream);

process.stdin.pipe(tr).pipe(process.stdout);

