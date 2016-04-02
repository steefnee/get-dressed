import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

Template.additem.events({
    'click .capture': function(){
      console.log("Button clicked.");

      var cameraOptions = {
        quality: 80,
        width: 640,
        height: 640,
        destinationType: Camera.DestinationType.DATA_URL
      };
      MeteorCamera.getPicture(cameraOptions, function(error, data){
        myDataRef.push({image: data});
      });



    } 
});

Template.additem.helpers({
  'photo': function(){
    return Session.get('photo');
  }
});

