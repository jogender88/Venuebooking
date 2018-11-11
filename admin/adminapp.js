var app = angular.module('adminpanel',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"index.html",
    })
    .when("/cp",{
        templateUrl:"changePassword.html",
    })
    .when("http://localhost:8080/#!/",{
        templateUrl:"index.html",
    })
    .when("/logout",{
        templateUrl:"logout.html",
    })
    .when("/validateBook",{
        templateUrl:"validateBook.html",
        controller:"validateBookCtrl"
    })
    .otherwise("/");
    
});
app.controller('validateBookCtrl',function($scope,$http,$location,dataService,$localStorage)
{
    var counter = 0;
 
    
      $scope.CheckAvailability = function()
      {
          console.log("in checkstatus");
          console.log($scope.checkBook);
        	$http.post("http://localhost:8084/CheckAvailability",$scope.checkBook).then(function(res)
        	{
            console.log("in CheckAvailability's then");
            if(res.data.err==0){
              console.log("responses are:");
            console.log(res.data.data);
            $scope.showStatus = res.data;
            }
        	});
      };

      $scope.logout = function(){
        $localStorage.email = "";
    console.log("logout");

      };

    // $scope.booking = function()
    // {
    //   $scope.myBooking.email = $scope.email;
    // //console.log($scope.myBooking.startTime[11]);

    //   console.log("user email:"+$scope.myBooking.email)
    //   console.log("effective eventStartTime: ");
    //   console.log($scope.myBooking.startTime);
    //   EndTime = $scope.myBooking.EndTime;
    //   if($scope.myBooking.EndTime[4]=="p" || $scope.myBooking.EndTime[5]=="p"){
    //     console.log("in EndTime if");
    //     EndTimeSplit = EndTime.split(":");
    //     Hr = parseInt(EndTimeSplit[0])
    //     if (Hr!=12) {
    //       Hr += parseInt(12)
    //     }
    //     Min  = EndTimeSplit[1][0] + EndTimeSplit[1][1]*10
    //     EndTime = Hr + ":" + Min
    //   }
    //   StartTime = $scope.myBooking.startTime;
    //   if($scope.myBooking.startTime[4]=="p" || $scope.myBooking.startTime[5]=="p")
    //   {
    //     console.log("in StartTime if");
    //     startTimeSplit = StartTime.split(":");
    //     Hr = parseInt(startTimeSplit[0])
    //     if (Hr!=12) {
    //       Hr += parseInt(12)
    //     }
    //     Min  = startTimeSplit[1][0] + startTimeSplit[1][1]*10
    //     StartTime = Hr + ":" + Min
    //   }
    //   console.log("EndTime: ", EndTime);
    //   console.log("StartTime: ", StartTime);
    //   var booking = {email:$scope.myBooking.email, venue:$scope.myBooking.venue, society:$scope.myBooking.society, eventEndTime:EndTime, eventStartTime:StartTime, purpose:$scope.myBooking.purpose, date:$scope.myBooking.eventDate}
    //   $http.post("http://localhost:8084/bookings",booking).then(function(res)
    //  {
    //     console.log(res);
    //     if(res.data.err==0)
    //     {
    //       $scope.data=res.data;
    //       $scope.myBooking={};
    //       console.log("Venue Booked Successfully - post then");
    //     }
    //     if(res.data.err==1)
    //     {
    //          console.log("Error while booking the Venue");
    //          $scope.data=res.data.msg;
    //     }
    //  })
    // }
});