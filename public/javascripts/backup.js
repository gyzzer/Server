var loginBoxOpen = false;
var CreateBoxOpen = false;

var data = {state: 'Active'};

function returnToFrontpage() {
    for(var element of document.getElementsByClassName("show-frontpage")) {
        element.style.display = "unset"
    }

    for(var element of document.getElementsByClassName("show-main")) {
        element.style.display = "none"
    }
}

function loginButtonOpen() {
    if(loginBoxOpen == false) {
        for(var element of document.getElementsByClassName("login-box-control")) {
            element.style.maxHeight = "14rem"
            //element.style.border = "1px solid var(--color-button)"
        }
        loginBoxOpen = true
    }
    else {
        for(var element of document.getElementsByClassName("login-box-control")) {
            element.style.maxHeight = "0rem"
            //element.style.border = "none"
        }
        loginBoxOpen = false
    } 
}

function loginButton() {
    for(var element of document.getElementsByClassName("show-frontpage")) {
        element.style.display = "none"
    }
    for(var element of document.getElementsByClassName("show-main")) {
        element.style.display = "flex"
    }
    loginButtonOpen()
}

function createUserButtonOpen() {
    if(CreateBoxOpen == false) {
        for(var element of document.getElementsByClassName("create-profile-box")) {
            element.style.maxHeight = "24rem"
            //element.style.border = "1px solid var(--color-button)"
        }
        CreateBoxOpen = true
    }
    else {
        for(var element of document.getElementsByClassName("create-profile-box")) {
            element.style.maxHeight = "0rem"
            //element.style.border = "none"
        }
        CreateBoxOpen = false
    } 
}

function CreateProfile() {

}

function frontpageContentShift() {

}

$( document ).ready(function() {
    console.log( "ready!" );

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        console.log('The form is submitted');

        let test = $('#loginForm').serialize();
        console.log(test);

        $.ajax({
            url:'/users/login',
            type:'post',
            data:$('#loginForm').serialize(),
            success:function(data){
                console.log('It was successful');
                console.log(data);

                if (data == 'success'){
                    loginButton();
                } else {
                    // Handle an unsuccessful login
                }
            }
        });
    });

    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        console.log('The form is submitted');
        $.ajax({
            url:'/users/register',
            type:'post',
            data:$('#registrationForm').serialize(),
            success:function(data){
                console.log('success?');
            }
        });
    });


    $('#sData').on('click', function(e){
        console.log('we are testing now');
        e.preventDefault();
        $.ajax({
            url:'/users/test',
            type:'post',
            data:data,
            success:function(data){
                console.log('success?');
            }
        });
    });
});