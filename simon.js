const offOnSwitches = document.querySelectorAll(".off_on"); //if using all the same elements, ensure you use querySelectorAll
const gameSwitches = document.querySelectorAll('.game_switch')
const skillLevels = document.querySelectorAll('.skill_level')
const lastButton = document.querySelector('#last')
const startButton = document.querySelector('#start')
const longestButton = document.querySelector('#longest')
const redButton = document.querySelector('#red')
const yellowButton = document.querySelector('#yellow')
const blueButton = document.querySelector('#blue')
const greenButton = document.querySelector('#green')
const gameButtons = document.querySelectorAll('.game_button') //Since gameButtons is a collection obtained using querySelector, 
//you need to use querySelectorAll instead of querySelector to select all the elements with the class "game_button". 
let toggleGameState = 1;
let toggleSkillLevelState = 1;
let playGame = document.getElementById("play_game");
let isOn=false;
let yourNumbers = [];
let luckyNumbers = [];//how do arrays work inside function
let finish=false;
let matchCount = 0;
let matchLoss = 0;
let selectionOfButtons = [yellowButton, greenButton, blueButton, redButton]; //connects with lucky function
let speed = 500;
// Define the function before adding it as an event listener

//the below onFunction was to move a single element
/*const onFunction = () => {
  onOffSwitch.classList.toggle('move_right');
};*/

const onFunction = () => {
  // Toggle the boolean value
  isOn = !isOn;
  // Loop through each onOffSwitch element and toggle the class based on the boolean value
  offOnSwitches.forEach(onOffSwitch => {
    finish=false;
    
    if (isOn) {
      onOffSwitch.classList.add('move_right2');
      resetGame();
    } else {
      onOffSwitch.classList.remove('move_right2');
      console.log(onOffSwitch); 
    }
  });
   resetGame();//why reset isn't working
};

const gameFunction = () => {
  // Check the current toggleState and toggle classes accordingly
  if (toggleGameState === 1) {
    gameSwitches.forEach(gameSwitch => { //forEach was add for multiple gameSwitches; this row could be 
      gameSwitch.classList.add('move_right2');
      toggleGameState = 2;
      speed = 500;
    });
    
  } else if (toggleGameState === 2) {
    gameSwitches.forEach(gameSwitch => {
      gameSwitch.classList.add('move_right3');
      gameSwitch.classList.remove('move_right2');
       toggleGameState = 3;
       speed = 300;
    });
   
  } else if (toggleGameState === 3) {
    gameSwitches.forEach(gameSwitch => {
      gameSwitch.classList.remove('move_right3');
      toggleGameState = 1;
      speed = 150;
    });
    
  }
};


const lucky = async () => {
  let patternLength = 1;
    switch (toggleSkillLevelState) {
      case 1:
        patternLength = 4;
        break;
      case 2:
        patternLength = 5;
        break;
      case 3:
        patternLength = 10;
        break;
      case 4:
        patternLength = 15;
        break;
    }

  for (let i = 1; i <= patternLength; i++) {
    const randomIndex = Math.floor(Math.random() * 4); 
    const button = selectionOfButtons[randomIndex]; // stores the button selected into selectionOfButtons
    await new Promise(resolve => setTimeout(resolve, speed)); // Wait for 400ms before each button press
    luckyNumbers.push(button.id);
    
    button.classList.add("button_push");
    setTimeout(() => {
      button.classList.remove("button_push");
    }, 200); // Remove the class after 200ms
    console.log(luckyNumbers);
  }

  playGame.textContent = "Play Again Soon!";
  finish = true;
  yours(); // Call the yours function after the game loop is finished
};

const skillLevelFunction = () => {
  // Check the current toggleState and toggle classes accordingly
  switch (toggleSkillLevelState) {
    case 1:
      skillLevels.forEach(skillLevel => {
        toggleSkillLevelState = 2;
        skillLevel.classList.add('move_right2');
       
      });
      break;

    case 2:
      skillLevels.forEach(skillLevel => {
        skillLevel.classList.add('move_right3');
        skillLevel.classList.remove('move_right2');
        toggleSkillLevelState = 3;
      });
      break;

    case 3:
      skillLevels.forEach(skillLevel => {
        skillLevel.classList.add('move_right4');
        skillLevel.classList.remove('move_right3');
        toggleSkillLevelState = 4;
      });
      break;

    case 4:
      skillLevels.forEach(skillLevel => {
        skillLevel.classList.remove('move_right4');
        toggleSkillLevelState = 1; 
      });
      break;
  }
};


const buttonPushFunction = (buTton) => { //buTton is a parameter and not associated with button 
  if(isOn){buTton.classList.add("button_push");
  // Set a time delay of 400 milliseconds (0.4 seconds) before removing the class
  setTimeout(() => {
    buTton.classList.remove("button_push");
  }, 200);
};}

//remember gameSwitch is the argument for the function gameSwitches. You can name the next two gameSwitch different from above
gameSwitches.forEach(gameSwitch => { //this works using one class, but selecting multiple I have to use the other code
  gameSwitch.addEventListener("click", gameFunction); //gameFunction is the arguement, so it is calling that function
});

//this addEventListener, it is inside a function, so what I call a variable of a function is a parameter (onOffSwitch())
offOnSwitches.forEach(onOffSwitch => { // for each variable offOnSwitches button, this anonymous function listens for onOffSwitch in this function
  onOffSwitch.addEventListener("click", onFunction); //gameFunction is the arguement, so it is calling that function
});

skillLevels.forEach(skillLevel => { //for each variable skillLevels button, this anonymous function listens for skillLevel in this function
  skillLevel.addEventListener("click", skillLevelFunction); //listen and call skillLevelFunction when click
})

// the addEventListeners; ex. lastButton is the button that is listening for the click event.  When clicked, activate buttonPushFuction
lastButton.addEventListener("click", () => {
  buttonPushFunction(lastButton); //(lastButton) is the connection to the HTML element; the argument inside () is a placeholder for what is executing in buttonPushFuction parameter
playLastGame();

}); //function parameter inside an eventListener has to be the for what your calling.

startButton.addEventListener("click", () => { //listen for the startButton. When clicked, 
  if(isOn){buttonPushFunction(startButton);  //actives buttonPushFuction function and included the variable startButton argument in its function
  startGame(); }//activates startGame function and doesn't return or include an argument
  
});

longestButton.addEventListener("click", () => {
  buttonPushFunction(longestButton);
});


function resetGame() {
    yourNumbers = [];
    luckyNumbers = []; 
  
  };


/*
  gameButtons.forEach(button => { button.addEventListener("click", () => {  buttonPushFunction(button); yours(button); });});
  gameButtons.forEach(button => { button.addEventListener(button);}); //it is an anonymous function so doesn't have a function name and it has a single parameter so it parameter, so it doesn't need ()
  gameButtons.forEach(button) */ 


  //for each gameButtons you want to listen for both functions, buttonPushFunction and yours, when it is clicked
  gameButtons.forEach(button => { //it is an anonymous function calls a parameter button
    button.addEventListener("click", () => { //not returning a parameter, it is just listening(addEventListener) becuase it is an anonymous function; this and the top parameter called button are linked since it is a parameter in an anonymous function
      buttonPushFunction(button); //these are functions so it is calling parameter button because the top to button are linked
      yours(button);
    })
   }
  )
/*ex. 
these are all the same anonymous function
      function (event) {}
      (event) => {}
      event => {} */
    
      const yours = (button) => {
        if (finish) {
          yourNumbers.push(button.id);// it includes all buttons, will fix later
          console.log(yourNumbers);
          console.log(luckyNumbers);
          checkMatch();
        }
      };
        
      let gameStarted = false;
      
      const startGame = () => {
        if (!gameStarted && isOn) { // Check if the game is not already started and the switch is on
          gameStarted = true; // Set the flag to true to indicate the game has started
          playGame.textContent = "Good Luck";
          lucky(); // Start the game loop with the first iteration
        } else {
          playGame.textContent = "Play Again Soon!";
          resetGame();
        }
      };
      
      const checkMatch = () => {
        let match = true;
          if (yourNumbers.length !== luckyNumbers.length) {
            match = false;
          } else {
            for (let i = 0; i < yourNumbers.length; i++) {
              if (yourNumbers[i] !== luckyNumbers[i]) {
                match = false;
                break;
              }
            }
          }
      
        if (match) {
          matchCount++;
          finish =false;
          window.alert("Congratulations! You win! You won " + matchCount + " times\nYou lost " + matchLoss + " times");
          gameStarted = false;
          if (lastButton) {
              playLastGame();
          } else {
              resetGame();
          }
        } else if (yourNumbers.length === luckyNumbers.length && !match){
          matchLoss++;
          finish = false;
          window.alert("Sorry, you lose! " + "You loss " + matchLoss + " times\nYou won " + matchCount + " times");
          resetGame();
          gameStarted = false;
        }
      
      }
      
      const playLastGame = () => {
        gameStarted = true;
        for (let i = 0; i < luckyNumbers.length; i++){//determines the number of rounds
          setTimeout((index)=>{ buttonPushFunction(document.getElementById(luckyNumbers[index]));
            console.log(luckyNumbers[index]);
          },200*i,i)//setTimeout works as follow: function,time, parameter,parameter,etc)
         // setTimeout((index)=>{console.log(luckyNumbers[index])},200*i,i) ; only displaying the number each time
            //buttonPushFunction(document.getElementById(luckyNumbers[i]));
          
            }
       /*When you use setTimeout, the second argument specifies the delay (in milliseconds) 
       after which the provided function will be executed. By multiplying the delay (200ms) 
       with the loop index i, you create an increasing delay for each iteration.*/
        
        }
      
      