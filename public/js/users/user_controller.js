app.controller('UserCtrl', ['$http', UserCtrl]);

function UserCtrl ($http) {
    var self = this;
    getUsers();
    function getUsers(){
      $http({
        method: 'GET',
        url: '/users'
      }).then function (res){
        self.all = res.data;
      }, function (err) {
        console.log(err);
      };
    }
}
