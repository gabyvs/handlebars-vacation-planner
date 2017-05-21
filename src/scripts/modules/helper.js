var countdown   = require('countdown');
var model       = require('./model');

var helper = {

    dateDiff: function () {
        return countdown(model.currentDate, model.vacationDate);
    },

    setCurrent: function (id) {
        model.choice = model.choices.find(function (choice) {
            return choice.id == id;
        });
    },

    increment: function () {
        model.choice.count += 1;
    },

    getCurrent: function () {
        return model.choice;
    }

};

module.exports = helper;