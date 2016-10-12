angular.module("toast-config", [])
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-right',
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    })
  });


