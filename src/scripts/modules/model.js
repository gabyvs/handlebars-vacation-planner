var data = require('../../../data.json');

var model = {

    init: function () {},

    currentDate: new Date(),

    vacationDate: new Date(2017, 9, 13),

    choices: data.choices,

    choice: {
        place: undefined,
        count: undefined,
        id: undefined
    }

};

module.exports = model;