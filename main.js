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
    displayNumber(buttonContent);
    updateCalc(buttonContent);
  });
});

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  let buttonContent = button.textContent.trim();

  button.addEventListener("click", () => {
    updateCalc(buttonContent);
  });
});

// let equalButton = document.querySelector(".equal");

// let clearButton = document.querySelector(".clear");

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
  if (operator === "+") return addition(a, b);
  if (operator === "-") return subtraction(a, b);
  if (operator === "*") return multiplication(a, b);
  if (operator === "/") return division(a, b);
}

// Functions that displays/clears the screen

function displayNumber(buttonContent) {
  let number = document.createElement("p");
  number.textContent += buttonContent;
  display.appendChild(number);
}

// Function to update the calc object

function updateCalc(button) {
  console.log(button);

  // When clicking operators
  if (button === "+" || button === "-" || button === "*" || button === "/") {
    calc.operator = button;
    console.log(calc);
    return;
  }

  // When clicking number buttons
  if (calc.operator === "") {
    calc.firstNumber += button;
  } else {
    calc.secondNumber += button;
  }

  console.log(calc);
}
