

// Initialization of variables, objects, DOM 
const nickInput = document.getElementById("nick");
const sizeInput = document.getElementById("size");
const inForm = document.getElementById("inForm");
const error = document.getElementById("error");

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
    return true;
}

// Start Event Load 
inForm.addEventListener('submit', checkForm);
