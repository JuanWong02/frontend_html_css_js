
let nick;
let size;
let email;
let geolocationTxt;
let avatarImg;


userData = (nick,size,email, avatarContainer) => {
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('size', size.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('geolocationTxt', geolocationTxt);
    sessionStorage.setItem('avatarImg', avatarContainer.src);
}


getUserData = () => {
    nick = sessionStorage.getItem('nick');
    size = sessionStorage.getItem('size');
    email = sessionStorage.getItem('email');
    avatarImg = sessionStorage.getItem('avatarImg');
}

// Check if user is null, then throw error 
userDataCheck = () => {
    if (nick == null) {
        sessionStorage.setItem('error', 'The form has not been filled in correctly');
        location = "index.html";
    }
    return true;
}

// If user activates geolocation, we get his current position and store it
geolocationData = () => {
    if (!navigator.geolocation) {
        geolocationTxt = "Web browser is not compatible with the geolocation API";
    } else {
        navigator.geolocation.getCurrentPosition(
            // success
            (position) => { geolocationTxt = 'Latitude: ' + position.coords.latitude + ', longitude: ' + position.coords.longitude },
            // Error 
            () => { geolocationTxt = "Geolocation cannot be done"; }

        )
    }
}

// localstorage

userHistory = (nick) => {
    let historicStorage = localStorage.getItem('historic');
    let historic;
    if (historicStorage == null) {
        historic = [];
    } else {
        historic = JSON.parse(historicStorage);
    }

    let userRegister = {
        user: nick.value,
        date: Date.now()
    }
    historic.push(userRegister);
    localStorage.setItem('historic', JSON.stringify(historic));
}