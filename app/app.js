'use strict';

require('./states/shared/toast');

require('./states/home/home.controller');
require('./states/home/home.router');
require('./states/home/home.service');

require('./states/auth/auth.controller');
require('./states/auth/auth.router');
require('./states/auth/auth.service');

require('./states/loading/loading.controller');
require('./states/loading/loading.router');
require('./states/loading/loading.service');

angular.module('app', [
  'ngCookies',
  'ui.router',
  'ngSweetAlert',
  'toastr',

  'toast-config',
  'app-config',
  'templates',
  'app.state.home',
  'app.state.loading',
  'app.state.auth'
]);