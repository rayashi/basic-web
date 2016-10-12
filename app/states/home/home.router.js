'use strict';
angular
  .module('app.state.home', [
    'app.state.home.controller',
    'app.state.home.service'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url : '/home',
        templateUrl : 'states/home/home.html',
        controller : 'HomeController as controller',
        data : {
          stateToGoBack : 'auth',
          public : false
        }
      });
  });
 