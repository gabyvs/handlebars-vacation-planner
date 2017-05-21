var helper = require('./helper');

var view = {

    init: function () {
        view.showConuntdown();
        view.registerClick();
    },

    registerClick: function () {
        var id;
        var listItems = document.querySelectorAll('#choices li');

        listItems.forEach(function (item) {
            item.addEventListener('click', function () {
                id = this.getAttribute('data-id');
                helper.setCurrent(id);
                helper.increment();
                view.updateCount();
            });
        });
    },

    updateCount: function () {
        var choice = helper.getCurrent();
        var li = document.querySelector('[data-id="' + choice.id + '"]');
        var count = li.querySelector('.choice-count');
        count.innerHTML = choice.count;
    },

    showConuntdown: function () {

        var diff = helper.dateDiff();

        document.querySelector('#months').innerHTML = diff.months;
        document.querySelector('#days').innerHTML = diff.days;
        document.querySelector('#hours').innerHTML = diff.hours;

    }

};

module.exports = view;