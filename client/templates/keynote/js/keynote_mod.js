import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.keynote_mod.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
});

// drag n drop
Template.keynote_mod.onRendered(function(){
  // target elements with the "draggable" class
  interact('.draggable').draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      autoScroll: true,
      onstart: function (event) {
          console.log('onstart');

      },
      onmove: dragMoveListener,
      onend: function (event) {
          console.log('onend');
      }
  });

  // enable draggables to be dropped into this
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    ondropactivate: function (event) {
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;

      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
      draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function (event) {
      event.relatedTarget.textContent = 'Dropped';
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });
  function dragMoveListener (event) {
      console.log('dragMoveListener');
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
          target.style.transform =
              'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
  }
});


Template.keynote_mod.helpers({
  new_questions() {
    return Questions.find({program: Template.instance().data._id, status: "new"}, { sort: { createdAt: -1 } });
  },
  nice_questions() {
    return Questions.find({program: Template.instance().data._id, status: "nice"}, { sort: { lastChange: -1 } });
  },
  live_questions() {
    return Questions.find({program: Template.instance().data._id, status: "live"}, { sort: { lastChange: -1 } });
  },
  crap_questions() {
    return Questions.find({program: Template.instance().data._id, status: "crap"}, { sort: { lastChange: -1 } });
  },
});


Template.keynote_mod.events({
  // menu bar
  'click #button_group #start_session': function(){
    Meteor.call('programs.changeStatus', Template.instance().data._id, true);
  },
  'click #button_group #stop_session': function(){
    Meteor.call('programs.changeStatus', Template.instance().data._id, false);
  },
  // move questions
  'click .question i.add_nice': function(){
    Meteor.call('questions.changeStatus', this._id, 'nice');
  },
  'click .question i.add_live': function(){
    Meteor.call('questions.changeStatus', this._id, 'live');
  },
  'click .question i.add_crap': function(){
    Meteor.call('questions.changeStatus', this._id, 'crap');
  }
});
