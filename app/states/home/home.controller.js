'use strict';
angular
  .module('app.state.home.controller', [])
  .controller('HomeController', function ($state, HomeService, AuthService) {

    var controller = this;

    controller.init = function () {
      controller.loading = {};
      controller.authService = AuthService;
      controller.loading.active = true;
      controller.loading.text = 'Buscando tarefas ..';
      HomeService.getTodos()
        .then(function(response) {
          controller.todos = response.data;
          controller.loading.active = false;
        }, function(response) {
          controller.loading.active = false;
          SweetAlert.error("Erro ao tentar encontrar suas tarefas :(");
        });
    };
    controller.init();

  });
