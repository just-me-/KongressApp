import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';
import { Sponsors } from '../../../../imports/collections/sponsors.js';
import { Rooms } from '../../../../imports/collections/rooms.js';

Template.keynote.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
  Meteor.subscribe('rooms');
  Meteor.subscribe('sponsors');
});

Template.keynote.onRendered(function(){
  // template logic needs a delay
  setTimeout( function(){
    var swiper1 = new Swiper('#left.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        speed: 1000
    });
    var swiper2 = new Swiper('#middle.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        speed: 1000,
        initialSlide: 1
    });
    var swiper3 = new Swiper('#right.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        speed: 1000,
        initialSlide: 2
    });
  }  , 500 );
  document.title = document.title+" - Keynote";
});

Template.keynote.helpers({
  questions() {
    return Questions.find({program: Template.instance().data._id, status: "live"}, { sort: { lastChange: -1 } });
  },
  sponsors() {
    return Sponsors.find({}, { sort: { createdAt: -1 } });
  },
  currentURL() {
    return Meteor.absoluteUrl().replace(/^https?\:\/\//i, "")+"ask/"+Template.instance().data.shortlink;
  }
});
