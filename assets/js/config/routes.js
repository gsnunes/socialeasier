window.app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/site/home/index.html',
        controller: 'HomeCtrl'
      })
      .when('/how-it-works', {
        templateUrl: '/templates/site/how-it-works/index.html',
        controller: 'HowItWorksCtrl'
      })
      .when('/contact', {
        templateUrl: '/templates/site/contact/index.html',
        controller: 'ContactCtrl'
      })
      .when('/be-a-partner', {
        templateUrl: '/templates/site/be-a-partner/index.html',
        controller: 'BePartnerCtrl'
      })
      .when('/chat', {
        templateUrl: '/templates/chat/index.html',
        controller: 'ChatCtrl'
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
});