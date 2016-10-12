'use strict';
angular
  .module('app.state.auth', [
    'app.state.auth.controller',
    'app.state.auth.service'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('auth', {
        url : '/auth',
        templateUrl : 'states/auth/auth.html',
        controller : 'AuthController as controller',
        data : {
          stateToGoBack : 'home',
          public : true
        }
      });
  })
  .run(function (AuthService, $rootScope, $state, LoadingService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if(AuthService.isLogged() && AuthService.session) {
        AuthService.setUpAuthorizationHeaders();
      }else if(!toState.data.public){
        event.preventDefault();
        LoadingService.goto = toState.name;
        $state.go('loading');
      }
    });
  })
;
