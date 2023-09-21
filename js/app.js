

// Initialization of variables, objects, DOM 
let nickInput;
let sizeInput; 
let emailInput;
let i   
let error;
let avatarItems;
let itemImg;
let avatarContainer;


// Check if there is an error on game.html 
if (sessionStorage.getItem('error')) {
    error.innerText = sessionStorage.getItem('error');
    sessionStorage.removeItem('error');
}

// Event Functions 
checkForm = (event) => {
    // Check changes 
    if (nickInput.value.match(/(?<!\S)[0-9]/))
    {
        console.log("Nick missing");
        nickInput.focus();
        event.preventDefault();
        error.innerText="The nick field cannot start with a number";
        return false;
    } else if (sizeInput.value == "0"){
        console.log("Size has not been selected");
        sizeInput.focus();
        event.preventDefault();
        error.innerText="You must select a panel size";
        return false;
    }
    // Correct info 
    userData(nickInput,sizeInput,emailInput);
    userHistory(nickInput);
    return true;
}

const movingImg = (event) => {
   itemImg = event.target;
}

const changeImg = (event) => {
    avatarContainer.src = itemImg.src;

}

//  Load objects from DOM, checks and form events 
const domLoaded = () => {
    // Capture all the elements
     nickInput = document.getElementById("nick");
     sizeInput = document.getElementById("size");
     emailInput = document.getElementById("email");
     inForm = document.getElementById("inForm");
     error = document.getElementById("error");


// Check if there is an error on game.html
    if(sessionStorage.getItem('error')!=null)
    {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

        inForm.addEventListener('submit', checkForm);

        avatarItems = document.getElementsByClassName("avatarImgItem");
        // D&D Events 
        for(let item of avatarItems) {
            item.addEventListener('dragstart', movingImg);
        }
        avatarContainer = document.getElementById("avatarImg");
        avatarContainer.addEventListener('dragover', e=>e.preventDefault());
        avatarContainer.addEventListener('drop', changeImg);
}       

// Start Event Load 
document.addEventListener('DOMContentLoaded', domLoaded);

// Geolocation 
geolocationData();