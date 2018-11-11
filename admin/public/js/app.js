var myApp = angular.module("myApp", []);
myApp.controller("mycontroller", function ($scope,$http) {
    $scope.booking = bookings;

});
myApp.controller("usrcontroller", function ($scope,$http) {
    $scope.user = users;


$scope.addEmployee = function(id){
    console.log($scope.user);
    $http.post('/employee/'+id).then(function(response){
        console.log("confirmed");
        $scope.user = users;
        
    });
};

$scope.remove = function(id){
    console.log("id       "+id);
    $http.delete('/employee/'+id).then(function(response){
         $scope.user = users;
    });
}
});