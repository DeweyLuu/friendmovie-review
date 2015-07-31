'use strict';
module.exports = function(app) {
  app.controller('loginController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {

    $scope.newUser = function(resourceData){
     $http({
            method: 'POST',
            url: '/api/users/',
            data: resourceData
          })
     .success(function(data){
          console.log(data);
     })
     .error(function(err){
      console.log("It failed");
     });
   };

    // $cookies.put('response', response.token);
    // var responseKey = $cookies.get('response');

    $scope.sendLogin = function(resourceData){

      $http({
            method: 'POST',
            url: '/auth/login',
            data: resourceData,
          })
          .success(function(data){
          console.log(data);

          $cookies.put('response', data.token);
    // var responseCookie = $cookies.put('response',response.token);
    // var responseKey = $cookies.get('response');
    // console.log(responseKey);
    // $http.defaults.headers.common['x-access-token'] = responseKey;
    // console.log(responseKey);
          })
          .error(function(err) {
          console.log("send login didn't work" + err);
          })
          $location.url('/profile');
    };
    //   $http.post('/api/users/');
    //   console.log(username.logInName);
    //   username.submit(username, function(response){
    //     getAll();
    //   });
    // }
    // / newUser: function(resourceData, callback) {
    //     //
    //     //   .success(callback)
    //     //   .error(errorhandler);

    // $scope.refresh = function(user);
    // console.log(user.username);
    // console.log(user.password);
    // $http.post(user).success(function(response) {
    //   var responseCookie = $cookies.put('response', response.token);
    //   var responseKey = $cookies.get('response');
    //   $http.defaults.headers.common['x-access-token'] = responseKey;
    //   console.log("This is your cookie, don't lose it");
    //   $location.path('/to profile with this particular id')
    // });
  }]);
}
