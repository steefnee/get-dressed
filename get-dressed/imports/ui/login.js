Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = $('#email').val();
    var passwordVar = $('#password').val();
    Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
      if ( error == null ) {
        Router.go('/dashboard');
      }
    });
  }
});