import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Speakers } from '../../imports/api/speakers.js';

// import './admin_speaker.html';

Template.admin_speaker.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('speakers');
});

Template.admin_speaker.helpers({
  speakers() {
    return Speakers.find({}, { sort: { createdAt: -1 } });
  },
});

Template.admin_speaker.events({
  'submit form#save-speaker'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    //const text = target.text.value;

    // Insert a speaker into the collection
    var speakerData = {
    	'name': target.name.value,
      'firstname': target.firstname.value,
      'login': target.login.value,
      'password': target.password.value,
      'description': target.description.value
    }
    // should there be an id => update; else => insert a new one
    if(target.id.value != ""){
      Meteor.call('speakers.update', target.id.value, speakerData);
    } else {
      Meteor.call('speakers.insert', speakerData);
    }

    // Clear form
    for (var key in speakerData){
      eval("target." + key + ".value = ''");
    }
    target.id.value="";

    // show saved alert for x secounds
    $("#saved-alert").fadeIn().delay(3000).fadeOut();

  },
  'click td.edit': function(){
    // copy inputs & id for db => but not pw
    var copyInputs = ['name', 'firstname', 'login', 'description'];
    for (input of copyInputs) {
      console.log(input);
      eval(`$('#save-speaker #`+input+`').val(this.`+input+`)`);
    }
    $('#save-speaker #password').val("");
    $('#save-speaker #id').val(this._id);
  },
  'click td.delete': function(){
    Meteor.call('speakers.remove', this._id);
  }
});


// 2do: pflichtfelder ...
