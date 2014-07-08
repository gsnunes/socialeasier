window.app = angular.module('siteApp', ['ngRoute', 'pascalprecht.translate'])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/site/home/index.html',
        controller: 'HomeCtrl'
      })
      .when('/:lang', {
        templateUrl: '/templates/site/home/index.html',
        controller: 'HomeCtrl'
      })
      .when('/:lang/contact', {
        templateUrl: '/templates/site/contact/index.html',
        controller: 'ContactCtrl'
      })
      // .when('/:lang/how-it-works', {
      //   templateUrl: '/templates/site/how-it-works/index.html',
      //   controller: 'HowCtrl'
      // })
      // .when('/:lang/partner', {
      //   templateUrl: '/templates/site/partner/index.html',
      //   controller: 'PartnerCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider.translations('en', {
      lbHowWorks: 'How it works',
      lbContact: 'Contact',
      lbPartner: 'Be a partner'
    });
    $translateProvider.translations('pt', {
      lbHowWorks: 'Como funciona',
      lbContact: 'Contato',
      lbPartner: 'Seja um parceiro'
    });
    $translateProvider.preferredLanguage('en');
})