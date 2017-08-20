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
    var list = Speakers.find();
    console.log("ahaaa");
    console.log(list);
    return Speakers.find({}, { sort: { createdAt: -1 } });
  },
  myspeakers: [
    { text: 'This is speaker 1' },
    { text: 'This is speaker 2' },
    { text: 'This is speaker 3' },
  ],
});

Template.admin_speaker.events({
  'submit .new-speaker'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('speakers.insert', text);

    // Clear form
    target.text.value = '';
  },
});
