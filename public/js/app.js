'use strict';
console.log('loaded app.js')

const app = angular.module('ArticleApp', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.getHTMLText = function(){
    var baseUrl = 'http://gateway-a.watsonplatform.net/calls/url/URLGetText';
    var userUrl = $scope.website;
    var apiKey = '1228983088573368107c9bd01aef3f5c654df25e';

    $http({
      method: 'GET',
      url: baseUrl + '?url=' + userUrl + '&apikey=' + apiKey + '&outputMode=json'
    }).then(function successCallback(response){
      var articleText = response.data.text;

      // $http({
      //   method: 'POST',
      //   url: 'http://text-processing.com/api/sentiment/',
      //   data: {text: articleText}
      // }).then(function(res){
      //   console.log(res);
      // })

      console.log(response.data.text)
    }, function errorCallback(response){
      console.log('error');
    });
  };

  $scope.website = "";

}]);
