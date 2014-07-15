'use strict';
window.app.directive('language', function () {
    return {
      controller: function($scope, $filter, $translate, $element) {
        $scope.change = function (lang) {
          setLang(lang);
        };

        var elem = $($element),
        getCookie = function (key) {
          return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setLang = function (lang) {
          document.cookie='social-language=' + lang;
          if($.inArray(lang, locations) == -1 ) {
            lang = $translate.preferredLanguage();
          }
          elem.find('.current').html(elem.find('li > a.' + lang).clone());
          $scope.lang = lang;
          $translate(lang == 'en' ? 'lbEnglish' : 'lbPortuguese').then(function (translatedValue) {
            $scope.label = translatedValue;
          });
          $scope.imgPath = lang == 'en' ? 'http://static3.worldcrunch.com/images/flags/United_States_of_America.png' : 'http://pbs.twimg.com/profile_images/1896724890/flag-of-brazil-md.png';
          $translate.use(lang);
        },
        locations = ['en', 'pt'],
        lang = (getCookie('social-language') || window.navigator.language.substr(0,2));
        setLang(lang);
      },
      templateUrl: '/templates/directives/language.html',
      replace: true
    };
})