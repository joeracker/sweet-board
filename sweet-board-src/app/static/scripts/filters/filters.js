'use strict';


angular.module('SweetBoardFilters', []).

filter('MessageFilter', function () {
    var helper = new Object();

    helper.isMessageInbound = function (message) {
        return (message.direction == "inbound");
    };

    helper.filter = function (messages, filter) {
        return _.filter(messages, function (message) {
            return helper.isMessageInbound(message);
        });
    }

    return helper.filter;
});