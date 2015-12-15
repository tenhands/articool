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

      $scope.words = articleText.split(" ")
      console.log($scope.words);

      $scope.timer = 1000;
      $scope.interval = function() {
        $scope.timer +=1000;
      }


    }, function errorCallback(response){
      console.log('error');
    });
  };

  $scope.website = "";

}]);
