var loginBoxOpen = false;
var CreateBoxOpen = false;

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