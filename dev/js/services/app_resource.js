'use strict'

module.exports = function(app) {
console.log("made it into app_resources");
var errorhandler = function(err) {
  console.log(err);
}
  app.factory('resourceData', ['$http', function($http){
    return function(resourceName) {
      return {
        getAll: function(callback){
          $http({
            method: 'GET',
            url: '/api/' + resourceName
          })
          .success(callback)
          .error(errorhandler);
        },
        // sendLogin: function(resourceData, callback) {
        //   $http({
        //     method: 'POST',
        //     url: '/auth/login',
        //     data: resourceData
        //   })
        //   .success(callback)
        //   .error(errorhandler);
        // },
        // newUser: function(resourceData, callback) {
        //   $http({
        //     method: 'POST',
        //     url: '/api/users/',
        //     data: resourceData
        //   })
        //   .success(callback)
        //   .error(errorhandler);
        // },
        submit: function(resourceData, callback){
          $http({
            method: 'POST',
            url: '/api/' + resourceName,
            data: resourceData
          })
          .success(callback)
          .error(errorhandler);
        },
        destroy: function(id, callback){
          $http({
            method: 'DELETE',
            url: '/api/' + resourceName + '/' + id,
            data: id
          })
          .success(callback)
          .error(errorhandler);
        },
        // Put
        edit: function(resourceData, callback){
          $http({
            method: 'PUT',
            url: '/api/' + resourceName + '/api' + resourceData._id,
              data: resourceData
          })
          .success(callback)
          .error(errorhandler);
          }
       }
      }
    }]);
}
