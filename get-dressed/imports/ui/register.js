Template.register.events({
  'submit form': function(event) {
    Router.go('/login');
    event.preventDefault();
    var nameVar = event.target.registerName.value;
    var emailVar = event.target.registerEmail.value;
    var passwordVar = event.target.registerPassword.value;
    Accounts.createUser({
      username: nameVar,
      email: emailVar,
      password: passwordVar

    });
  }
});