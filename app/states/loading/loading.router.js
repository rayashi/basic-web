angular
  .module('app.state.loading',
    ['app.state.loading.controller',
    'app.state.loading.service'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('loading', {
        cache: false,
        url : '/loading',
        templateUrl : 'states/loading/loading.html',
        controller : 'LoadingController as controller',
        data : {
          stateToGoBack : 'exit',
          public : true
        }
      });
  });
