var app = angular.module('rooombooking',['ngRoute','ngStorage','angularjs-datetime-picker','ngFileUpload',]) //,'ngMaterial','ngAria', 'ngMessages', 'material.svgAssetsCache'

 app.config(function($routeProvider)
{
 $routeProvider
 .when("/",
 {
   templateUrl:'front.html',
 })
 .when("/register",
 {
     templateUrl:'register.html',
     controller:'regisCtrl'
 })
 .when("/login",
 {
     templateUrl:'login.html',
     controller:'loginCtrl'
 })
 .when("/UploadReport",
 {
     templateUrl:'UploadReport.html',
     controller:'UploadReportCtrl'
 })
 .when("/bookedSuccessfully",
 {
     template:'booked Successfully',
     /*controller:function($scope,$cookies)
     {
        $scope.user=$cookies.get('email');
     }*/
 })
 .when("/book",
 {
     templateUrl:'book.html',
     controller:'bookCtrl'
 })
 .when("/contact",{
   templateUrl:'contact.html'
 })
 .when("/help",{
   templateUrl:'help.html'
 })
 .otherwise({redirectTo: '/login'})
})

angular.module('MyApp', []).controller('AppCtrl', function() {

});
app.controller('UploadReportCtrl', ['$scope', 'Upload',function($scope){
  $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    // for multiple files:
    // $scope.uploadFiles = function (files) {
    //   if (files && files.length) {
    //     for (var i = 0; i < files.length; i++) {
    //       Upload.upload({..., data: {file: files[i]}, ...})...;
    //     }
        // or send them all together for HTML5 browsers:
      //   Upload.upload({..., data: {file: files}, ...})...;
      // }
    // }
}]);



app.controller('bookCtrl',function($scope,$http,$location,dataService,$localStorage)
{
  //mdcontent date start
/*
  this.myDate = new Date();

  this.minDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth() - 2,
    this.myDate.getDate()
  );

  this.maxDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth() + 2,
    this.myDate.getDate()
  );

  this.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };*/
  //mdcontent date ends

     //this.myDate = new Date();
    //  console.log("in book "+$localStorage.email);
    $scope.email = dataService.retrieveEmail();
    var counter = 0;
    $scope.timing = [{slot:'08:30 am',val:'1'},{slot:'09:30 am',val:'2'},{slot:'10:30 am',val:'3'},{slot:'11:30 am',val:'4'},{slot:'12:30 pm',val:'5'},{slot:'01:30 pm',val:'6'},{slot:'02:30 pm',val:'7'},{slot:'03:30 pm',val:'8'}];
    $scope.society = ["Abhimanch","ACM","CSI","Enactus","Vibings","other"]
    $scope.venue = ['Auditorium','seminar hall', 'Meeting room', 'other']
      $scope.CheckAvailability = function()
      {
          console.log("in checkstatus");
          console.log($scope.checkBook)
        	$http.post("http://localhost:8084/CheckAvailability",$scope.checkBook).then(function(res)
        	{
            console.log("in CheckAvailability's then");
            if(res.data.err==0){
              console.log("responses are:");
            console.log(res.data.data);
            $scope.showStatus = res.data;
            }
             //$scope.booked = res.data.slots;
        	})
      }

      $scope.logout = function(){
        $localStorage.email = "";
    //    loginService.logout();
    console.log("logout");

      }

    $scope.booking = function()
    {
      $scope.myBooking.email = $scope.email;
    //console.log($scope.myBooking.startTime[11]);

      console.log("user email:"+$scope.myBooking.email)
      // var ed = $scope.myBooking.eventDate.split("-");
      // var dd = ed[0];
      // var mm = ed[1];
      // var yyyy = ed[2];
      // var eventDate = String(dd+"-"+mm+"-"+yyyy);
      // console.log("event Date:" + eventDate);
      //var startTime = startTimeStamp[1].split(":");
      //var hours = parseInt(startTime[0])+5;
      //var minutes = parseInt(startTime[1]) + 30;
      /*if(minutes>59){
        hours=hours + 1;
        minutes = minutes-30;
      }*/
      //var endHr = hours+Math.ceil($scope.myBooking.duration);
      //console.log(typeof(endHr));
      //var eventStartTime =  new Date(yyyy,mm - 1,dd,hours,minutes);
      //var addon = new Date(0,0,0,5,30);
      //var eventStartTime = est +  addon;
      console.log("effective eventStartTime: ");
      console.log($scope.myBooking.startTime);
      EndTime = $scope.myBooking.EndTime;
      if($scope.myBooking.EndTime[4]=="p" || $scope.myBooking.EndTime[5]=="p"){
        console.log("in EndTime if");
        EndTimeSplit = EndTime.split(":");
        Hr = parseInt(EndTimeSplit[0])
        if (Hr!=12) {
          Hr += parseInt(12)
        }
        Min  = EndTimeSplit[1][0] + EndTimeSplit[1][1]*10
        EndTime = Hr + ":" + Min
      }
      StartTime = $scope.myBooking.startTime;
      if($scope.myBooking.startTime[4]=="p" || $scope.myBooking.startTime[5]=="p")
      {
        console.log("in StartTime if");
        startTimeSplit = StartTime.split(":");
        Hr = parseInt(startTimeSplit[0])
        if (Hr!=12) {
          Hr += parseInt(12)
        }
        Min  = startTimeSplit[1][0] + startTimeSplit[1][1]*10
        StartTime = Hr + ":" + Min
      }

      // if($scope.myBooking.startTime[5] =="a")
      // {
      // var st = ($scope.myBooking.startTime[0]*10 + $scope.myBooking.startTime[1])*60
      // }
      /*if(endHr>24)
      {
        endHr = endHr - 24;
      }*/
      //console.log("start hour: "+hours+" EndTime : "+$scope.myBooking.EndTime);
      console.log("EndTime: ", EndTime);
      console.log("StartTime: ", StartTime);
      var booking = {email:$scope.myBooking.email, venue:$scope.myBooking.venue, society:$scope.myBooking.society, eventEndTime:EndTime, eventStartTime:StartTime, purpose:$scope.myBooking.purpose, date:$scope.myBooking.eventDate}
      $http.post("http://localhost:8084/bookings",booking).then(function(res)
     {
        console.log(res);
        if(res.data.err==0)
        {
          $scope.data=res.data;
          $scope.myBooking={};
          //location.href="/bookedSuccessfully";
          console.log("Venue Booked Successfully - post then");
        }
        if(res.data.err==1)
        {
             console.log("Error while booking the Venue");
             $scope.data=res.data.msg;
        }
     })
    }
});

app.controller('regisCtrl',function($scope,$http)
{
  $scope.regis = function()
  {
      var fn = $scope.myData.fn;
      var ln = $scope.myData.ln;
      var email = $scope.myData.email;
      var pass = $scope.myData.pass;
      var cpass = $scope.myData.cpass;
      var society = $scope.myData.society;
      var fcoordinator = $scope.myData.fcoordinator;
      console.log( "in app.js" );
      if(pass == cpass)
      {
        console.log("in if");
         data = {fnn:fn, lnn:ln, emaill:email, passs:pass, society:society, fcoordinator:fcoordinator};
         $http.post("http://localhost:8084/regis",data).then(function(res)
          {
              console.log("in post");
              console.log(res.data);
              $scope.data=res.data;
              $scope.myData={};
          })
      }
      else
      {
          $scope.data={err: 1, msg: "Pass & cpass does not match"};
          console.log("hello");
      }
  }
});
app.controller('loginCtrl',function($scope,$http,$location,$localStorage,$sessionStorage,dataService)//$cookies,
{  //,'sessionService','loginService'  //,sessionService,loginService
    //$scope.$storage = $localStorage;

    $scope.login=function()
    {$localStorage.email = $scope.myLogin.email;
      //loginService.login();
      //  console.log("email in session:" + $storage.email);
      console.log("in login ");
      dataService.saveData($scope.myLogin.email);
      console.log("in login "+$localStorage.email);
      $http.post("http://localhost:8084/login",$scope.myLogin).then(function(res)
      {
        console.log("in post ");
         if(res.data.err==0)
         {
             if(res.data.rol=="admin")
             {
               //$cookies.put('email',res.data.msg);
               //$location.url('/read');
               location.href="/admin";
             }
             if(res.data.rol=="user")
             {
               //$cookies.put('email',res.data.msg);
               //sessionService.set('email',res.data.msg)
               $location.url('/book');
             }
         }
         if(res.data.err==1)
         {
              console.log("hello2");
              $scope.mesg=res.data.msg;
              $location.url('/login');
         }
      })
     }
})

 app.run(['$rootScope', '$location', 'PermissionsService', function($rootScope,  $location, PermissionsService) {
    $rootScope.actBook = function() {
      document.getElementById("LoginList").innerHTML = "<a href="+"#!/login"+">log out</a>";
      document.getElementById("UploadReport").innerHTML = "<a href="+"#!/UploadReport"+">Upload Report</a>";
      PermissionsService.setPermission('book', true);
      PermissionsService.setPermission('UploadReport', true);
      $location.path('/book');

    };
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      if (next.templateUrl === "book.html") {
        if(!PermissionsService.getPermission('book')) {
          $location.path('/');
        }
        PermissionsService.setPermission('book', false);
      }
      if (next.templateUrl === "UploadReport.html") {
        if(!PermissionsService.getPermission('UploadReport')) {
          $location.path('/');
        }
        PermissionsService.setPermission('UploadReport', false);
      }
    });
  }])
  app.service('PermissionsService', [function() {
    var permissions = {
      edit: false
    };
    this.setPermission = function(permission, value) {
      permissions[permission] = value;
    }
    this.getPermission = function(permission) {
      return permissions[permission] || false;
    }
  }])
  app.service('dataService',function(){
   var email;
   this.saveData = function(data){
      email = data;
   };

   this.retrieveEmail = function(){
      return email;
   };

});
