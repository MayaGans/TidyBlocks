// --------------------
// co-bluebird module
// --------------------

// modules
var co = require('co-use'),
    Bluebird = require('bluebird');

// exports
module.exports = co.use(Bluebird);
