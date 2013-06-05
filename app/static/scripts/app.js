'use strict';

angular.module('SweetBoard', ['SweetBoardDirectives', 'SweetBoardFilters', 'SweetBoardServices'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/views/main.html',
        controller: 'SBCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
