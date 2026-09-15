const currentOperand = document.getElementById("current-operand"); // Display current number
const previousOperand = document.getElementById("previous-operand"); // Display previous number and operator
const numberButtons = document.querySelectorAll(".number"); // Get all number buttons
const decimalButton = document.querySelector(".decimal"); // Get decimal button
const clearButton = document.getElementById("clear"); // Get clear button
const operatorButtons = document.querySelectorAll(".operator"); // Get all operator buttons
const equalsButton = document.getElementById("equals"); // Get equals button

let currentInput = ""; // Current number being typed
let currentOperator = null; // Current operator (+, -, ×, ÷)
let previousInput = ""; // Previous number entered

// Function to calculate the result based on two numbers and an operator
function calculate(prev, current, operator) {
  const prevNum = parseFloat(prev);
  const currNum = parseFloat(current);

  if (isNaN(prevNum) || isNaN(currNum)) return "";

  let result;
  switch (operator) {
    case "+":
      result = prevNum + currNum;
      break;
    case "−": // minus sign (not hyphen)
      result = prevNum - currNum;
      break;
    case "×": // multiplication sign
      result = prevNum * currNum;
      break;
    case "÷": // division sign
      if (currNum === 0) {
        return "Cannot divide by 0"; // Handle division by zero
      }
      result = prevNum / currNum;
      break;
    default:
      return "";
  }

  return result.toString();
  
}

// Update the display to show both operands and operator
function updateDisplay() {
  currentOperand.textContent = currentInput || "0";
  if (currentOperator) {
    previousOperand.textContent = `${previousInput} ${currentOperator}`;
  } else {
    previousOperand.textContent = "";
  }
}

// Number button click handler - append the number to current input
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    updateDisplay();
  });
});

// Decimal button click handler - add decimal point only if not already present
decimalButton.addEventListener("click", () => {
  if (!currentInput.includes(".")) { // Check if decimal point already exists
    currentInput += ".";
    updateDisplay();
  }
});

// Clear button click handler - reset all values
clearButton.addEventListener("click", () => {
  currentInput = "";
  currentOperator = null;
  previousInput = "";
  updateDisplay();
});

// Operator button click handler - save operator and prepare for next number
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput === "") return; // Do nothing if no number entered
    
    // If we already have an operator, calculate the result first
    if (currentOperator && previousInput) {
      currentInput = calculate(previousInput, currentInput, currentOperator);
    }
    
    currentOperator = button.textContent;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay();
  });
});

// Equals button click handler - perform the calculation
equalsButton.addEventListener("click", () => {
  if (!currentOperator || currentInput === "" || previousInput === "") return;
  
  currentInput = calculate(previousInput, currentInput, currentOperator);
  currentOperator = null;
  previousInput = "";
  updateDisplay();
});

// Initial display update
updateDisplay();

document.addEventListener("keydown", (event) => { // Handle keyboard input for numbers, operators, and actions
  const key = event.key;
  if (key >= "0" && key <= "9") {
    currentInput += key;
    updateDisplay();
  } else if (key === ".") {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay();
    }
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    if (currentInput === "") return;
    
    if (currentOperator && previousInput) {
      currentInput = calculate(previousInput, currentInput, currentOperator);
    }
    
    currentOperator = key === "/" ? "÷" : key === "*" ? "×" : key;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay();
  } else if (key === "Enter" || key === "=") {
    if (!currentOperator || currentInput === "" || previousInput === "") return;
    
    currentInput = calculate(previousInput, currentInput, currentOperator);
    currentOperator = null;
    previousInput = "";
    updateDisplay();
  } else if (key === "Escape") {
    currentInput = "";
    currentOperator = null;
    previousInput = "";
    updateDisplay();
  }
  //backspace key to delete last character
  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }
});
