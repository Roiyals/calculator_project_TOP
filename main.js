"use strict";

//====== VARIABLES ====== //

let calc = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  equalTo: "",
};

let clearDisplayOnly = false;

//====== QUERY SELECTORS ====== //
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  let buttonContent = button.textContent.trim();

  button.addEventListener("click", () => {
    updateCalc(buttonContent);
    displayNumber(buttonContent);
  });
});

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  let buttonContent = button.textContent.trim();

  button.addEventListener("click", () => {
    updateCalc(buttonContent);

    // Functions as a secondary "equal" for continuous operations
    if (calc.firstNumber !== "" && calc.secondNumber == !"") {
      clearDisplayOnly = true;
      operate(calc.firstNumber, calc.secondNumber, calc.operator);
    } else {
      return;
    }
  });
});

let equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  clearDisplayOnly = true;
  operate(calc.firstNumber, calc.secondNumber, calc.operator);
});

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  reset();
});

let display = document.querySelector(".display");

//====== FUNCTIONS====== //

// Mathermatical functions

function addition(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
function multiplication(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  // Converts string to integer
  a = +a;
  b = +b;

  if (operator === "+") calc.equalTo = addition(a, b);
  if (operator === "-") calc.equalTo = subtraction(a, b);
  if (operator === "*") calc.equalTo = multiplication(a, b);
  if (operator === "/") calc.equalTo = division(a, b);

  reset();
  displayNumber(calc.equalTo);

  calc.firstNumber = calc.equalTo;
  calc.secondNumber = "";

  console.log(calc, clearDisplayOnly);
}

// Functions that displays/clears/resets the screen

function displayNumber(buttonContent) {
  let number = document.createElement("p");
  number.textContent += buttonContent;
  display.appendChild(number);
}

function reset() {
  if (clearDisplayOnly) {
    display.textContent = "";
    clearDisplayOnly = false;
    console.log(calc, clearDisplayOnly);
  } else {
    // Clears display and resets calc
    display.textContent = "";
    calc = {
      firstNumber: "",
      secondNumber: "",
      operator: "",
      equalTo: "",
    };
    clearDisplayOnly = false;
    console.log(calc, clearDisplayOnly);
  }
}

// Function to update the calc object

function updateCalc(button) {
  // When clicking operators
  if (button === "+" || button === "-" || button === "*" || button === "/") {
    //Prevents updating calc.operator w/o calc.firstNumber
    if (calc.firstNumber !== "") {
      calc.operator = button;
      clearDisplayOnly = true;
      console.log(calc, clearDisplayOnly);
      return;
    } else {
      console.log(calc, clearDisplayOnly);
      return;
    }
  }

  // When clicking number buttons
  if (calc.operator === "") {
    calc.firstNumber += button;
  } else {
    reset(); //Clears display then updates it with the calc.secondNumber
    calc.secondNumber += button;
  }

  console.log(calc, clearDisplayOnly);
}
