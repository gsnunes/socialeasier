window.app = angular.module('socialApp', ['ngRoute', 'pascalprecht.translate', 'btford.socket-io'])
.factory('socket', function (socketFactory) {
  return socketFactory();
});;