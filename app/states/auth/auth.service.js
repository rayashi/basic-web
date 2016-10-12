'use strict';
angular
  .module('app.state.auth.service', [])
  .service('AuthService', function ($http, apiHost, $cookies, $state) {

    var service = this;

    service.login = function(user) {
      return $http.post(apiHost + 'login/', user)
        .then(service.setUpAuthorizationHeaders)
        .then(service.getAuthenticatedUser);
    };

    service.logout = function() {
      $cookies.remove('token');
      delete service.session;
      $state.go('auth');
    };

    service.setUpAuthorizationHeaders = function(response) {
      if (!response) {
        if (!$cookies.get('token')) {
          console.log('It was not possible to set up authorization headers');
          return;
        }
      } else {
        $cookies.put('token', response.data.token);
      }
      if ($cookies.get('token').length > 1) {
        $http.defaults.headers.common.Authorization = 'Token ' + $cookies.get('token');
      } else {
        console.log('Token length is less than one, setting it to null');
        $http.defaults.headers.common.Authorization = null;
      }
    };

    service.getAuthenticatedUser = function() {
      return $http.get(apiHost + 'user/authenticated/').then(function(response) {
        service.session = { user : response.data };
        return response.data;
      }, function() {
        console.log('It was not possible to retrieve the authenticated user');
      });
    };

    service.isLogged = function () {
      return $cookies.get('token');
    };

  });
