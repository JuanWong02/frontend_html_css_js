// Global variables
let startMarking = false;
let adjacent = [];
let markedId = [];
let sizePanel;
let classMarked;
let idInterval;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const fillUserForm = () => {
  document.getElementById("nick").value = nick;
  document.getElementById("avatarImg").src = avatarImg;
  sizePanel = parseInt(size);
};

const paintGamePanel = () => {
  document.getElementById("game").style.gridTemplateColumns =
    "repeat(" + size + ",1fr)";
  document.getElementById("game").style.gridTemplateRows =
    "repeat(" + size + ",1fr)";
  // Automatic elements
  let items = "";
  let color = ["red", "green"];
  let colorRnd = 0;
  for (let index = 0; index < parseInt(size) * parseInt(size); index++) {
    if (index % 2 > 0) colorRnd = getRandomInt(2);
    items += `<div class="containerItem"><div id="${index}" class="item ${color[colorRnd]}"></div></div>`;
  }

  document.getElementById("game").innerHTML = items;
};

// Calculate the array of adjacent elements
const calculateAdjacent = (idMark) => {
  adjacent = [];

  // Upper adjacent
  if (idMark - sizePanel >= 0) adjacent.push(idMark - sizePanel);

  // Lower adjacent
  if (idMark + sizePanel < sizePanel * sizePanel)
    adjacent.push(idMark + sizePanel);

  // Left adjacent
  if (idMark % sizePanel > 0) adjacent.push(idMark - 1);

  // Right adjacent
  if ((idMark + 1) % sizePanel > 0) adjacent.push(idMark + 1);
};

// Countdown for the game
const countdown = () => {
  let timeLeft = parseInt(document.getElementById("time").value) - 1;
  document.getElementById("time").value = timeLeft;

  if (timeLeft == 0) {
    clearInterval(idInterval);
    // End all the events
    const items=document.getElementsByClassName('item');
    for (let item of items) {
      item.removeEventListener("mousedown", startMark);
      item.removeEventListener("mouseover", continueMark);
    }
    document.removeEventListener("mouseup", endMark);
    // change panels z-index
    document.getElementById("gameOver").classList.add('gameOverColor');
    document.getElementById("gameOver").style.zIndex = "2";
    document.getElementById("game").style.zIndex = "1";
    document.getElementById("newGame").addEventListener("click",(e)=> location.reload());
  }
}

// Add events to the game
const programGameEvents = () => {
  const items = document.getElementsByClassName("item");
  for (let item of items) {
    item.addEventListener("mousedown", startMark);
    item.addEventListener("mouseover", continueMark);
  }
  document.addEventListener("mouseup", endMark);

  // Countdown
  idInterval = setInterval(countdown, 1000);
};

// Game Functions

// Initiate the marking of the points
const startMark = (event) => {
  let item = event.target;
  let containerItem = event.target.parentElement;
  if (item.classList.contains("red")) {
    classMarked = "red";
    containerItem.classList.add("red");
  } else {
    classMarked = "green";
    containerItem.classList.add("green");
  }
  if (!startMarking) startMarking = true;

  //Guardo los marcados
  markedId.push(parseInt(item.id));
  //Comienzo a calcular adyacentes
  calculateAdjacent(parseInt(item.id));
};

// Continue the marking of the points
const continueMark = (event) => {
  if (startMarking) {
    let item = event.target;
    let newId = parseInt(item.id);

    //Adjacent?
    if (adjacent.includes(newId) && item.classList.contains(classMarked)) {
      let containerItem = event.target.parentElement;
      if (item.classList.contains("red")) containerItem.classList.add("red");
      else containerItem.classList.add("green");
      //Save the marked
      markedId.push(parseInt(item.id));
      calculateAdjacent(parseInt(item.id));
    }
  }
};

// End the marking of the points
const endMark = (event) => {
  startMarking = false;
  adjacent = [];
  const scoreInput = document.getElementById("score");
  if (markedId.length > 1) {
    scoreInput.value = parseInt(scoreInput.value) + markedId.length;
  }

  // Working with markings
  for (let index = 0; index < markedId.length; index++) {
    let itemMarked = document.getElementById(markedId[index]);
    itemMarked.parentElement.classList.remove(classMarked);
    // change the color of the objects randomly
    let color = ["red", "green"];
    let colorRnd = getRandomInt(2);
    itemMarked.classList.remove(classMarked);
    itemMarked.classList.add(color[colorRnd]);
  }
  markedId = [];
};

/*
 * MAIN
 */

// Capture user data
getUserData();
// Check user data

if (!userDataCheck()) location = "index.html";

// Fill the form
fillUserForm();
paintGamePanel();
programGameEvents();
