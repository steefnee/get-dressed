    Template.dashboard.events({
      'click .logout': function(event){
          event.preventDefault();
          Meteor.logout();
      }
    });

    Template.dashboard.helpers({
      'firstName': function(){
        return Meteor.user().name;
      }
    });