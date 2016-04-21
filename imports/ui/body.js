import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import {Concerts} from '../api/main.js';
import './detail.js';
import './body.html';


Template.AppBody.onCreated(function AppBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("Concerts");
});

Template.AppBody.helpers({
    concerts() {

      return Concerts.find({}).fetch();
      // Meteor.call('concerts.findAll');
    }
});

Template.AppBody.events({

});