import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
      $scope.viewModel(this);

      this.subscribe('tasks');

      this.hideCompleted = false;

      this.helpers({
        tasks() {
          const selector = {};

          // If hide completed is checked, filter tasks
          if (this.getReactively('hideCompleted')) {
            selector.checked = {
              $ne: true
            };
          }

          return Tasks.find(selector, {
            sort: {
              createdAt: -1
            }
          }
          );
        },
        incompleteCount() {
          return Tasks.find({
            checked: {
              $ne: true  //$eq
            }
          }).count();
        },
        currentUser() {
          return Meteor.user();
        }
      })
    }
  /*
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
  */
  addTask(newTask) {
    // Insert a task into the collection
    Meteor.call('tasks.insert', newTask);
    /*
    Tasks.insert({
      text: newTask,
      createdAt: new Date,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    */

    // Clear form
    this.newTask = '';
  }

  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', task._id, !task.checked);
    /*
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      },
    });
    */
  }

  removeTask(task) {
    Meteor.call('tasks.remove', task._id);
    // Tasks.remove(task._id);
  }

  setPrivate(task) {
    Meteor.call('tasks.setPrivate', task._id, !task.private);
  }

}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
    // controller: TodosListCtrl
  });
