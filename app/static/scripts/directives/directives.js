angular.module('SweetBoardDirectives', []).

    directive('mainSweets', function (MessageData) {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'static/directives/mainSweets.html',
            link: function (scope, element, attrs) {
                scope.MessageData = MessageData;
            }
        };
    }).
    directive('sweetTicker', function (MessageData, TickerList, $timeout, $rootScope) {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'static/directives/sweetTicker.html',
            link: function (scope, element, attrs) {
                scope.TickerList = TickerList;
                scope.MessageData = MessageData;
                
                var runIncrement = function () {
                    TickerList.incrementMessage();
                    $timeout(runIncrement, TickerList.TICKER_DELAY);
                };
                
                runIncrement();
            }
        };
    }).
    directive('sprite', function () {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            templateUrl: 'static/directives/sprite.html',
            link: function (scope, element, attrs) {
                scope.classList = attrs["spriteDescription"];
            }
        };
    });