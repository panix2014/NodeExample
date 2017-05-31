const writeable = require('stream').Writable;

const util = require('util');

function countstream(matchtext, options){
    writeable.call(this,options);
    this.count = 0;
    this.matcher = new RegExp(matchtext, 'ig');
}

countstream.prototype._write = function(chunk,encoding,cb){
    let matches = chunk.toString().match(this.matcher);
    if(matches){this.count += matches.length}
    cb();
}

countstream.prototype.end = function(){
    this.emit('total',this.count);
}

util.inherits(countstream,writeable);



module.exports = countstream;