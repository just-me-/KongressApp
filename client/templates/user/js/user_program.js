import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'

import { Programs } from '../../../../imports/collections/programs.js';
import { Speakers } from '../../../../imports/collections/speakers.js';
import { Rooms } from '../../../../imports/collections/rooms.js';

Template.user_program.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  // check if persistant reference alrdy exists...  if not: create
  if (typeof mySession == "undefined") {
    mySession = new PersistentReactiveDict('mysession')
  }

  Meteor.subscribe('programs');
  Meteor.subscribe('speakers');
  Meteor.subscribe('rooms');
});

Template.user_program.helpers({
  programs() {
    return Programs.find({}, { sort: { startTime: -1 } });
  },
  speakername(id) {
    var speaker = Speakers.findOne(id);
    return speaker.firstname + " " + speaker.name;
  },
  roomname(id) {
    var room = Rooms.findOne(id);
    return room.name;
  },
  isFavorit: function (id) {
    return mySession.get('isFavorit_'+this._id);
  },
  isOnlyFavorit: function () {
    return mySession.get('isOnlyFavorit');
  },
  dateHelper: function (dateTime) {
    return moment(dateTime).format('DD.MM.YYYY HH:mm');
  }
});

Template.user_program.events({
   'click #show_all': function(){
     mySession.setPersistent('isOnlyFavorit', false);
   },
   'click #show_favorit': function(){
     mySession.setPersistent('isOnlyFavorit', true);
   },
   'click .favorit': function(){
     if ( $(event.target).closest('.program').hasClass( "isFavorit" ) ) {
       mySession.setPersistent('isFavorit_'+this._id, false);
       $(event.target).closest('.program').removeClass('isFavorit');
     } else {
       mySession.setPersistent('isFavorit_'+this._id, true);
       $(event.target).closest('.program').addClass('isFavorit');
     }
   },
   'click .ical': function(){
     var cal = ics();
     var description = this.description ? this.description : "Keine Beschreibung vorhanden."
     description += " \n " + Meteor.absoluteUrl() + "ask/"+this.shortlink; // add question link
     cal.addEvent(this.title, description, this.room, this.startTime, this.endTime); // all fields are required
     cal.download();
   }
});
