window.app.config(function ($translateProvider) {
    // English
    $translateProvider.translations('en', {
      lbHowWorks: 'How it works',
      lbContact: 'Contact',
      lbPartner: 'Be a partner'
    });

    // Portuguese
    $translateProvider.translations('pt', {
      lbHowWorks: 'Como funciona',
      lbContact: 'Contato',
      lbPartner: 'Seja um parceiro'
    });

    // Default Language
    $translateProvider.preferredLanguage('en');
});