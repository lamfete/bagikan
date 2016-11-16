import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';
//import { UserList } from '../../api/userlist.js';

import template from './bagikan.html';

class BagikanCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.hideCompleted = false;

    this.helpers({
      tasks() {
        const selector = {};

        //if hide completed is checked, filter tasks
        if(this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        //if only me is checked, filter tasks
        if(this.getReactively('onlyMe')) {
          return Tasks.find(
            { assignTo: Meteor.user().username }
          )
        }

        //show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser() {
        return Meteor.user();
      },
      users() {
        return Meteor.users.find();
      }
    })
  }

  addTask(newTask) {
    //insert a task into the collection
    Tasks.insert({
      text: newTask.text,
      createdAt: new Date,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      assignTo: newTask.assignToUsername
    });

    //clear form
    this.newTask = '';
  }

  setChecked(task) {
    //set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      },
    });
  }

  removeTask(task) {
    Tasks.remove(task._id);
  }
}

export default angular.module('bagikan', [
  angularMeteor
])
.component('bagikan', {
  templateUrl: 'imports/components/bagikan/bagikan.html',
  controller: ['$scope', BagikanCtrl]
});
