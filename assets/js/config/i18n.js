window.app.config(function ($translateProvider) {
    // English
    $translateProvider.translations('en', {
      lbHowWorks: 'How it works',
      lbContact: 'Contact',
      lbPartner: 'Be a partner',
      lbContactUs: 'Contact us',
      lbContactMessage: 'Send a message for us',
      lbPortuguese: 'Português',
      lbEnglish: 'English',
      lbYourName: 'Your name',
      lbYourEmail: 'Your e-mail',
      lbMessage: 'Message',
      lbSubmit: 'Submit',
      lbLogin: 'You need be logged!',
      lbUsername: 'Enter your name',
      lbOk: 'Ok',
      lbCancel: 'Cancel'
    });

    // Portuguese
    $translateProvider.translations('pt', {
      lbHowWorks: 'Como funciona',
      lbContact: 'Contato',
      lbPartner: 'Seja um parceiro',
      lbContactUs: 'Fale conosco',
      lbContactMessage: 'Deseja esclarecer uma dúvida, enviar alguma crítica ou sugestão, fique a vontade e nos envie uma menssagem.',
      lbPortuguese: 'Português',
      lbEnglish: 'English',
      lbYourName: 'Seu nome',
      lbYourEmail: 'Seu e-mail',
      lbMessage: 'Mensagem',
      lbSubmit: 'Enviar',
      lbLogin: 'Você precisa estar logado!',
      lbUsername: 'Insira seu nome',
      lbOk: 'Ok',
      lbCancel: 'Cancelar'
    });

    // Default Language
    $translateProvider.preferredLanguage('en');
});