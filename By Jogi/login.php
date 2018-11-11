
<html>
	<title>
		Room Booking System
		
	</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="index.css"></link>
	<body>
		<div class="container">
			<img src="logo.jpg">
			<form method="post">
				<div class="font-input">
					<i class="fa fa-user fa-2x cust" aria-hidden="true"></i>
					<input type="text" id="username"name="username" placeholder="Username" required><br/>
				</div>
				<div class="font-input">
					<i class="fa fa-lock fa-2x cust" aria-hidden="true"></i>
					<input type="password" name="password" placeholder="Password" required><br/>
				</div>
				<p><input type="checkbox" name="remember" value="1"> Remember Me</p><br/>
				<input type="submit" name="submit" value="Login" class="btn-login"><br>
				<a href="#"><p>forget password?</p></a>
			</form>
		</div>
	</body>
</html>

<?php
session_start();
$con=mysqli_connect("localhost:3306","root","");
mysqli_select_db($con,'booking');

if(isset($_POST['remember']))
{
	setcookie('username',$user, time()*60*60*7);
	
}
if(isset($_COOKIE['username'])){
	$username=$_COOKIE['username'];
	echo "<script>
	document.getElementById('username').value='$username'
	</script>";
}

if(isset($_POST['submit'])){
	$user=$_POST['username'];
	$psd=$_POST['password'];

	$result=mysqli_query($con,'select * from userdetails where username="'.$user.'" and pass="'.$psd.'"');
	if(mysqli_num_rows($result)==1){
			$_SESSION["user"]=$user;
		header('Location: welcome.php');
	}
	else
		echo "Account is invalid";
}
?>