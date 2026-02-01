"use strict";

//====== VARIABLES ====== //

let calc = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  equalTo: "",
};

let justOperated = false;

//====== QUERY SELECTORS ====== //
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  let buttonContent = button.textContent.trim();

  button.addEventListener("click", () => {
    // Resets the calc when clicking number buttons AFTER operating (instead of appending them)
    if (calc.equalTo !== "" && justOperated === true) {
      justOperated = false;
      reset();
    }

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
    justOperated = false; //Prevents resetting when chaining a calculation
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

function roundTo(num) {
  const factor = Math.pow(10, 10);
  return Math.round(num * factor) / factor;
}

function operate(a, b, operator) {
  // Converts string to integer
  a = +a;
  b = +b;

  if (operator === "+") calc.equalTo = addition(a, b);
  if (operator === "-") calc.equalTo = subtraction(a, b);
  if (operator === "*") calc.equalTo = multiplication(a, b);
  if (operator === "/") {
    if (b === 0) {
      reset();
      display.textContent = "You can't divide with 0. Silly!";
      return;
    } else {
      calc.equalTo = division(a, b);
    }
  }

  clearDisplayOnly();
  calc.equalTo = roundTo(calc.equalTo);
  displayNumber(calc.equalTo);

  calc.firstNumber = calc.equalTo;
  calc.operator = "";
  calc.secondNumber = "";
  justOperated = true;

  console.log(calc);
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
  display.textContent = "0";
  calc = {
    firstNumber: "",
    secondNumber: "",
    operator: "",
    equalTo: "",
  };
  justOperated = false;
  console.log(calc);
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
      console.log(calc);
      return;
    } else {
      console.log(calc);
      return;
    }
  }

  // Prevents multiple decimal points and appends 0
  function decimalPoint(value) {
    if (button === "." && value.includes(".")) {
      return false;
    }
    return true;
  }

  function appendZero(value) {
    if (button === "." && value === "") {
      return false;
    }
    return true;
  }

  // When clicking number buttons
  if (calc.operator === "") {
    if (!appendZero(calc.firstNumber)) return (calc.firstNumber += "0.");
    if (!decimalPoint(calc.firstNumber)) return;
    calc.firstNumber += button;
    displayNumber(calc.firstNumber);
  } else {
    if (calc.secondNumber === "") {
      clearDisplayOnly();
    }
    appendZero(calc.secondNumber);
    if (!appendZero(calc.secondNumber)) return (calc.firstNumber += "0.");
    if (!decimalPoint(calc.secondNumber)) return;
    calc.secondNumber += button;
    displayNumber(calc.secondNumber);
  }

  console.log(calc);
}
