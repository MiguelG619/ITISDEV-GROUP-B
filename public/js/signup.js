$(document).ready(function () {
    $('#email').keyup(function () {

        // get the value entered the user in the `<input>` element
        var email = $('#email').val();
        if (email.includes(" ")){
            $('#emailError').text('Email is invalid');
            $('#submit').css('background-color', 'grey');
            $('#submit').prop('disabled', true);
        }
        else {
            $.get('/getCheckEmail', {email: email}, function (result) {
                
                if(result.email == email) {
                    $('#email').css('border', 'red');
                    $('#emailError').text('Email already registered');
                    $('#submit').css('background-color', 'grey');
                    $('#submit').prop('disabled', true);
                }
                
                else {
                    $('#email').css('border', 'white');
                    $('#emailError').text('');
                    $('#submit').css('background-color', '#0275d8');
                    $('#submit').prop('disabled', false);
                }
            });
        }
    });

     $('#password').keyup(function() {
        var password = $("#password").val();

        if (password.length < 8) {
            $('#passwordError').text('Password must contain at least 8 characters');
            $('#submit').css('background-color', 'grey');
            $('#submit').prop('disabled', true);
        }
        else {
            $('#passwordError').text('');
            $('#submit').css('background-color', '#0275d8');
            $('#submit').prop('disabled', false);
        }
    });
});