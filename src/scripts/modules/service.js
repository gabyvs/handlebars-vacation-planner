/**
 * Provides auxiliary functions
 * @requires countdown
 */

var countdown   = require('countdown');
var model       = require('./model');

var helper = {

    /**
     * Calculates difference between current date and vacation date
     * @returns {Countdown} An object representing countdown result
     */
    dateDiff: function () {
        return countdown(model.currentDate, model.vacationDate);
    },

    /**
     * Sets the currently selected choice into the model
     * @param {number} id - The id of the selected choice
     */
    setCurrent: function (id) {
        model.choice = model.choices.find(function (choice) {
            return choice.id == id;
        });
    },

    /**
     * Increments votes of the selected choice by one
     */
    increment: function () {
        model.choice.count += 1;
    },

    /**
     * Gets the currently selected choice
     * @returns {model.choice|{place, count, id}}
     */
    getCurrent: function () {
        return model.choice;
    }

};

module.exports = helper;