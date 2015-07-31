'use strict';
module.exports = function(app) {
  app.controller('makeReviewController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    var userToken = $cookies.get('response');
    $scope.getToken = userToken;

// console.log("I'm in Review Controller");
// var responseKey = $cookies.get('response');
// console.log(responseKey);
 $http.defaults.headers.common['x-access-token'] = userToken;

  $scope.getReviews = function(resourceData){
      $http({
            method: 'GET',
            url: '/api/users/user',
            headers: {'x-access-token': userToken}
          })
     .success(function(data){
          console.log(data);
          console.log(resourceData);

     })
     .error(function(err){
      console.log("It failed");
     });
   };

    $scope.makeReview = function(resourceData){
      $http({
            method: 'POST',
            url: '/api/users/review',
            data: resourceData
          })
          .success(function(response){
          console.log(response);
          // var responseCookie = $cookies.put('response', response.token);

          //$cookies.put("user", resourceData.user);
          })
          .error(function(err) {
            console.log(resourceData);
          console.log(err);
        });
    };
}]);
}
