if(Meteor.isClient){
    Template.register.events({
      'submit form': function(event) {
        Router.go('/login');
        event.preventDefault();
        var nameVar = event.target.registerName.value;
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
          name: nameVar,
          email: emailVar,
          password: passwordVar

        });
      }
    });

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

    Template.dashboard.events({
      'click .logout': function(event){
          event.preventDefault();
          Meteor.logout();
      }
    });

    Template.additem.events({
        'click .capture': function(){
          console.log("Button clicked.");
          MeteorCamera.getPicture({}, function(error, data){
            Session.set('photo', data);
          });
        } 
    });

    Template.additem.helpers({
      'photo': function(){
        return Session.get('photo');
      }
    });
}

if(Meteor.isServer){
    // server code goes here
}


Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
} , {except:['register']});


Router.route('/dashboard', {
  template: 'dashboard',
  name: 'dashboard',
  action: function() {
    if ( Meteor.userId() == null ) {
      Router.go('/login');
    }
    else {
      this.render();
    }
  }
});

Router.route('/occasion-choices', function () {
  this.render('occasion-choices');
});

Router.route('/select-outfit', function () {
  this.render('select-outfit');
});

Router.route('/outfits', function () {
  this.render('outfits');
});

Router.route('/login', {
  name: 'login',
  template: 'login',

  action: function() {
    if ( Meteor.userId() != null ) {
      Router.go('/dashboard');
    }
    else {
      this.render();
    }
  }
});

Router.route('/register', function () {
  name: 'register',
  this.render('register');
});

Router.route('/add-item-tag', function () {
  this.render('add-item-tag');
});

Router.route('/', function () {
  this.render('login');
});

Router.route('/additem', function () {
  name: 'additem',
  this.render('additem');
});

