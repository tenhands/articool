'use strict';
console.log('loaded app.js')

const app = angular.module('ArticleApp', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.getHTMLText = function(){
    var baseUrl = 'https://gateway-a.watsonplatform.net/calls/url/URLGetText';
    var userUrl = $scope.website;
    var apiKey = '1228983088573368107c9bd01aef3f5c654df25e';

    $scope.rating = "";

    $http({
      method: 'GET',
      url: baseUrl + '?url=' + userUrl + '&apikey=' + apiKey + '&outputMode=json'
    }).then(function successCallback(response){
      var articleText = response.data.text;

      // $scope.words = articleText.split(" ")
      // console.log($scope.words);

      // console.log(response.data.text);

      $http({
        method: 'POST',
        url: '/api/sentiment',
        data: {text: articleText}
      }).then(function(response){
        if (response.data.label == "pos") {
          $scope.rating = "positive";
        } else if (response.data.label == "neg") {
          $scope.rating = "negative";
        } else {
          $scope.rating = "neutral";
        }
      })

    }, function errorCallback(response){
      console.log('error');
    });



  };



  $scope.website = "";


}]);
