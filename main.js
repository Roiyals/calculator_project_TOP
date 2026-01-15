"use strict";

//====== VARIABLES ====== //

let calc = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  equalTo: "",
};

//====== QUERY SELECTORS ====== //
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  let buttonContent = button.textContent.trim();

  button.addEventListener("click", () => {
    updateCalc(buttonContent);
    // displayNumber(buttonContent); Old code that displays number by creating multiple <p> elements
  });
});

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  let buttonContent = button.textContent.trim();

  button.addEventListener("click", () => {
    // Functions as a secondary "equal" for continuous operations
    if (calc.firstNumber !== "" && calc.secondNumber !== "") {
      operate(calc.firstNumber, calc.secondNumber, calc.operator);
    }

    updateCalc(buttonContent);
  });
});

let equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  if (calc.firstNumber !== "" && calc.secondNumber !== "") {
    operate(calc.firstNumber, calc.secondNumber, calc.operator);
  }
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

  clearDisplayOnly();
  displayNumber(calc.equalTo);

  calc.firstNumber = calc.equalTo;
  calc.operator = "";
  calc.secondNumber = "";

  console.log(calc, clearDisplayOnly);
}

// Functions that displays/clears/resets the screen

function displayNumber(value) {
  // Old code that displays number by creating multiple <p> elements
  // let number = document.createElement("p");
  // number.textContent += buttonContent;
  // display.appendChild(number);

  display.textContent = value;
}

function reset() {
  display.textContent = "";
  calc = {
    firstNumber: "",
    secondNumber: "",
    operator: "",
    equalTo: "",
  };
  console.log(calc, clearDisplayOnly);
}

function clearDisplayOnly() {
  display.textContent = "";
}

// Function to update the calc object

function updateCalc(button) {
  // When clicking operators
  if (button === "+" || button === "-" || button === "*" || button === "/") {
    //Prevents updating calc.operator w/o calc.firstNumber
    if (calc.firstNumber !== "") {
      calc.operator = button;
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
    displayNumber(calc.firstNumber);
  } else {
    clearDisplayOnly();
    calc.secondNumber += button;
    displayNumber(calc.secondNumber);
  }

  console.log(calc, clearDisplayOnly);
}
