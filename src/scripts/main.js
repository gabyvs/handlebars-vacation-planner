/**
 * Entry point for the JS code
 */
var controller = require('./modules/controller');

var app = {

    init: function () {
        controller.init();
    }

};

app.init();