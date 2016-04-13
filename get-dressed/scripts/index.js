Items = new Mongo.Collection("items");



if(Meteor.isClient){





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

    Template.additem.helpers({
      photo: function () {
        return Session.get("photo");
      }

    });


    Template.additem.events({
        'click button': function(){
          var cameraOptions = {
            width: 340,
            height: 340
          };

          MeteorCamera.getPicture(cameraOptions, function(error, data){
            console.log(data);
            Session.set('photo', data);

            var imageFile = data;
            var newId = Items.insert({
              imageFile,
              createdAt: new Date(), // current time
              tags: [],
              userId: this.userId,
            });

            Router.go('addItemTag', { id: newId });
          });


        }
    });

    Template.addItemTag.events({
        'change #itemType': function() {
          var x = $('#itemType select').val();
          var lastItem = Router.current().params.id;
          Items.update({ _id: lastItem }, { 
            $push: {
              tags: x
            }
          });
        }
    });

    Template.addItemTag.helpers({
      photo: function () {
        return Session.get("photo");
      },

      lastItem: function() {
        return Items.findOne({}, {sort: {createdAt: -1, limit: 1}});
      }

    });


}  //here is the end of the client side

if(Meteor.isServer){

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

Router.route('/addItemTag/:id', function () {
  this.render('addItemTag');
}, {
  name: 'addItemTag'
});

/*
  /items          :: list items
  /item/:id       :: view item by :id
  /item/:id/tag   :: tag an item
  /item/add       :: add item
*/

Router.route('/', function () {
  this.render('login');
});

Router.route('/additem', function () {
  name: 'additem',
  this.render('additem');
});

