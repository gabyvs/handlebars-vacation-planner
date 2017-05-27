/**
 * Handles templates data and interactions
 */

var service = require('./service');

/**
 * Given a list item, registers a click listener
 */
function addListener (listItem) {
    listItem.addEventListener('click', function () {
        var id = listItem.getAttribute('data-id');
        service.setCurrent(id);
        service.increment();
        updateCount();
    });
}

/**
 * Handles votes by listening to clicks on the choices
 */
function registerClick () {
    var listItems = document.querySelectorAll('#choices li');

    listItems.forEach(function (item) {
        addListener(item);
    });
}

/**
 * Updates element count after a click
 */
function updateCount () {
    var choice = service.getCurrent();
    var li = document.querySelector('[data-id="' + choice.id + '"]');
    var count = li.querySelector('.choice-count');
    count.innerHTML = choice.count;
}

/**
 * Shows months, days and hours until vacation
 */
function showCountdown () {

    var diff = service.dateDiff();

    document.querySelector('#months').innerHTML = diff.months;
    document.querySelector('#days').innerHTML = diff.days;
    document.querySelector('#hours').innerHTML = diff.hours;

}

var view = {

    init: function () {
        showCountdown();
        registerClick();
    }

};

module.exports = view;