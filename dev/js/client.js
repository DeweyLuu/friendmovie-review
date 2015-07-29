'use strict'

console.log("load client.js");

require('angular/angular');
require('angular/angular-route');

// var myApp = angular.module('friendReview', ['testController']);

var movieApp = angular.module('movieApp', ['ngRoute']);

//services
require('./services/app_resource')(movieApp);

//controllers
require('./controllers/testController')(movieApp);

//Directives
// Nothing yet to add :

//config - - routeProvider set-up:
movieApp.config(['$routeProvider', function($routeProvider){
  // Home Initial Login or Create
.when('/', {
  templateUrl: 'templates/login.html',
  controller: 'testController'
})
 // Profile Page
.when('/profile', {
  templateUrl: 'templates/profile.html',
  controller: 'testController'
})
// Page with all of the users, where you can check out the users
.when('/users', {
  templateUrl: 'templates/users.html',
  controller: 'testController'
})
.otherwise({
  redirectTo: "/"
});
}]);
