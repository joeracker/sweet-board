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
}).
filter('Marioticons', function (MarioticonData) {
    return function (msg_text) {
        return MarioticonData.parseText(msg_text);
    };
}).
filter('Sent', function() {
    return function(input) {
        return moment(input).fromNow();
    };
});