/**
 * This will hold all the application data.
 */

var data = require('../../../data.json');

var model = {

    /**
     * Todays date
     */
    currentDate: new Date(),

    /**
     * Vacation date
     */
    vacationDate: new Date(2017, 9, 13),

    /**
     * All possible places to go on vacation
     * @type {Array<{place, count, id}>}
     */
    choices: data.choices,

    /**
     * Latest voted place
     * @type {{place, count, id}}
     */
    choice: {
        place: undefined,
        count: undefined,
        id: undefined
    }

};

module.exports = model;