const countstream = require('./countstream');

let app = {};

module.exports = function(){
    app.countstream = countstream;

    return app;
};