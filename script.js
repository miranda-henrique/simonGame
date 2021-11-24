//create holder for the randomly generated color order, the player's clicked order and the score
let order = [];
let clickedOrder = [];
let score = 0;

//0 = green
//1 = red
//2 = yellow
//3 = blue

//set variables representing divs in the html code
const green = document.querySelector(".green-button");
const red = document.querySelector(".red-button");
const yellow = document.querySelector(".yellow-button");
const blue = document.querySelector(".blue-button");

//function to start the game
let playGame = () => {
    alert("Welcome to the Simon Game! Let's start a new game!");
    score = 0;

    nextLevel();
}

//on to the next level
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//create random color order
let shuffleOrder = () => {
    //Math.random() * 4 because we need to generate an integer between 0 and 3, since there are four colors
    let colorOrder = Math.floor(Math.random() * 4);
    //adds the randomly generated number to the end of the list
    order[order.length] = colorOrder;

    //sets the holder for the player clicks
    clickedOrder = [];

    //order[] is updated and increased everytime shuffleOrder is called
    //iterate over order[] ligthing up the respective color
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//returns the color div based on the random number generated
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//light up the next color
let lightColor = (element, number) => {
    number = number * 500;

    //light on
    setTimeout(() => {
        element.classList.add("selected");
    }, number - 250);

    //light off
    setTimeout(() => {
        element.classList.remove("selected");
    }, number);
}

//event listeners for the items the player clicks
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//function to compute the color clicked by the user
let click = (color) => {
    //adds the color the player clicked on to the clickedOrder[]
    clickedOrder[clickedOrder.length] = color;
    //light the color clicked by the player
    createColorElement(color).classList.add("selected");

    //light off
    setTimeout(() => {
        createColorElement(color).classList.remove("selected");
        checkOrder();
    }, 250);
}

//checks if the order clicked by the player matches the one that was randomly generated
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Score: ${score}\nYou got it right! On to the next level!`);
        nextLevel();
    }
}

//game over
let gameOver = () => {
    alert(`Score: ${score}\nYou lost the game!\nClick to start a new game`);
    
    //resets original arrays
    order = [];
    clickedOrder = [];

    playGame();
}

//start the game
playGame();
