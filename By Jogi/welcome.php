<?php
session_start();
if($_SESSION["user"]==true){
echo "Welcome.  ".$_SESSION['user'];
}
else
{
	header('location:login.php');
}

?>

<html>
<head>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
  
  <script>
  $(document).ready(function() {
    $("#datepicker").datepicker();
  });
  </script>
</head>
<body>
	<a href="logout.php">Logout</a>
<form>
    <input id="datepicker" />
</form>
</body>
</html>

