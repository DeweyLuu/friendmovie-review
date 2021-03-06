'use strict';

console.log("load client.js");

require('angular/angular');
require('angular-route/angular-route');
require('angular-cookies/angular-cookies')
// var myApp = angular.module('friendReview', ['testController']);

var movieApp = angular.module('movieApp', ['ngRoute', 'ngCookies']);
console.log("picking up the Angular module");
//services
// require('./services/app_resource')(movieApp);

// //controllers
// require('./controllers/testController')(movieApp);
console.log("Controllers are Required");
require('./controllers/loginController')(movieApp);
//Directives
// Nothing yet to add :

//config - - routeProvider set-up:
movieApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  // Home Initial Login or Create
.when('/', {
  templateUrl: './templates/login.html',
  controller: 'loginController'
})
 //Profile Page
.when('/profile', {
  templateUrl: '/templates/profile.html',
  controller: 'loginController'
})
// Page with all of the users, where you can check out the users
.when('/users', {
  templateUrl: '/templates/users.html',
  controller: 'loginController'
})
.otherwise({
  redirectTo: "/"
});
}]);
