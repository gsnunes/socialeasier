window.app = angular.module('socialApp', ['ngRoute', 'pascalprecht.translate', 'btford.socket-io', 'ui.bootstrap'])
.factory('socket', function (socketFactory) {
  return socketFactory();
});;