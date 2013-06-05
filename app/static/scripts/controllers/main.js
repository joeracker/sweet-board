'use strict';

angular.module('SweetBoard')
  .controller('SBCtrl', function ($scope, $timeout, MessageData) {
      $scope.awesomeThings = [ 'HTML5 Boilerplate','AngularJS','Karma'];
      
      var msgUpdate = function () {
          MessageData.updateLocalMessages();
          
          $timeout(msgUpdate, MessageData.UPDATE_INTERVAL);
      };
      
      msgUpdate();
  });
