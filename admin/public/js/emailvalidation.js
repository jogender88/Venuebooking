$(document).ready(function(e) {
    $('#btnValidate').click(function() {
    var sEmail = $('#txtEmail').val();
    // Checking Empty Fields
    if ($.trim(sEmail).length == 0 || $("#fname").val()=="" || $("#lname").val()=="") {
    alert('All fields are mandatory');
    e.preventDefault();
    }
    if (validateEmail(sEmail)) {
    alert('Nice!! your Email is valid, now you can continue..');
    }
    else {
    alert('Invalid Email Address');
    e.preventDefault();
    }
    });
    });
    // Function that validates email address through a regular expression.
    function validateEmail(sEmail) {
    var filter = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
    return true;
    }
    else {
    return false;
    }
    }