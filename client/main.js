import angular from 'angular';
import angularMeteor from 'angular-meteor';
import bagikan from '../imports/components/bagikan/bagikan';
import '../imports/startup/accounts-config.js';

angular.module('bagikan-app', [
  angularMeteor,
  bagikan.name,
  'accounts.ui'
]);

function onReady() {

}
