var model   = require('./modules/model');
var view    = require('./modules/view');

var app = {

    init: function () {
        model.init();
        view.init();
    }

};

app.init();