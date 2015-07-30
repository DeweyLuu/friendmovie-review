module.exports = function(app) {

  app.controller('testController', ['$scope', 'resourceData', function($scope, resourceData) {

    var Review = resourceData('reviews');
    //not sure where or what this data exactly is or where it is coming from:

    var getAll = function(){
      Review.getAll(function(response){
        console.log("inside getall", response);
        $scope.reviews = response;
      });
    };
    getAll();

    $scope.submit = function(review) {
      console.log(review.movietitle);
      Review.submit(review, function(response){
        getAll();
      });
    };

    $scope.destroy = function(id) {
      console.log(id);
      Review.destroy(id, function(response){
        getAll();
      });
    };

}]);
}
