'use strict';
module.exports = function(app) {
  app.controller('makeReviewController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.getReviews = function(resourceData){
     $http({
            method: 'GET',
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

    $scope.makeReview = function(resourceData){
      $http({
            method: 'POST',
            url: '/auth/login',
            data: resourceData
          })
          .success(function(response){
          console.log(response);
          // var responseCookie = $cookies.put('response', response.token);

          //$cookies.put("user", resourceData.user);
     })
          .error(function() {
          console.log("send login didn't work");
     })
};
}
