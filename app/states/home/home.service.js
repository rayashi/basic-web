'use strict';
angular
  .module('app.state.home.service', [])
  .service('HomeService', function ($http, apiHost) {

    var service = this;

    service.getTodos = function() {
      return $http.get(apiHost + 'todos/');
    };

  });
