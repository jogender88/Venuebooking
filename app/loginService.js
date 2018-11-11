app.factory('loginService',function($scope,$http,$location,sessionService){ //$cookies,
  return{
    login: function(data,scope){
      $http.post("http://localhost:8084/login",$scope.myLogin).then(function(res)
      {
         if(res.data.err==0)
         {
             if(res.data.rol=="admin")
             {
           $cookies.put('email',res.data.msg);
           //$location.url('/read');
           location.href="/admin";
             }
             if(res.data.rol=="user")
             {
           //$cookies.put('email',res.data.msg);
           sessionService.set('email',res.data.msg)
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
    },
  logout: function(){
    sessionService.destroy('email');
    location.path('/');
  },
  islogged: function(){
    if(sessionService.get('email')) return true;
  }
}
})
