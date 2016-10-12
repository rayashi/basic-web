angular
  .module('app.state.loading.controller', [])
  .controller('LoadingController', function ($state, AuthService, LoadingService) {

    var controller = this;

    controller.init = function () {
      if(AuthService.isLogged() && !AuthService.session) {
        controller.loading = {active: true, text: 'Carregando..'};
        AuthService.setUpAuthorizationHeaders();
        AuthService.getAuthenticatedUser()
          .then(function () {
            $state.go(LoadingService.goto);
          });
      }else if(AuthService.session){
        $state.go(LoadingService.goto);
      }else {
        $state.go('auth');
      }
    };
    controller.init();
  });