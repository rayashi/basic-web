'use strict';
angular
  .module('app.state.auth.controller', [])
  .controller('AuthController', function ($state, AuthService, $stateParams, SweetAlert, toastr) {

    var controller = this;

    controller.init = function(){
      controller.loading = {};
      controller.authService = AuthService;
    };

    controller.login = function () {
      controller.loading.active = true;
      controller.loading.text = 'Carregando dados..';
      AuthService.login(controller.user)
        .then(function(user) {
          controller.loading.active = false;
          toastr.success('', 'Tudo bem com você '+user.name+'?');
          $state.go('home');
        }, function(response) {
          controller.loading.active = false;
          SweetAlert.error("Que pena, tente zup@email.com com qualquer senha");
        });
    };

    controller.init();


  });
