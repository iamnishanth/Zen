const valueElement = document.querySelector(".value");

const acElement = document.querySelector(".ac");
const pmElement = document.querySelector(".pm");
const percentElement = document.querySelector(".percent");

const additionElement = document.querySelector(".addition");
const subtractionElement = document.querySelector(".subtraction");
const multiplicationElement = document.querySelector(".multiplication");
const divisionElement = document.querySelector(".division");
const equalElement = document.querySelector(".equal");

const decimalElement = document.querySelector(".decimal");
const number0Element = document.querySelector(".number-0");
const number1Element = document.querySelector(".number-1");
const number2Element = document.querySelector(".number-2");
const number3Element = document.querySelector(".number-3");
const number4Element = document.querySelector(".number-4");
const number5Element = document.querySelector(".number-5");
const number6Element = document.querySelector(".number-6");
const number7Element = document.querySelector(".number-7");
const number8Element = document.querySelector(".number-8");
const number9Element = document.querySelector(".number-9");
const numberElementsArray = [
  number0Element,
  number1Element,
  number2Element,
  number3Element,
  number4Element,
  number5Element,
  number6Element,
  number7Element,
  number8Element,
  number9Element,
];

let currentInput = 0;

// functions
const checkOperator = () => {
  const operators = ["+", "-", "*", "/"];
  if (operators.includes(currentInput[currentInput.length - 1])) {
    return false;
  } else {
    return true;
  }
};
const updateCurrentInput = (newValue) => {
  if (currentInput === 0) {
    currentInput = newValue;
  } else {
    currentInput += newValue;
  }
  valueElement.textContent = currentInput;
};

const setCurrentInput = () => {
  valueElement.textContent = currentInput.toString();
};

// Add event listeners to numbers and decimal
for (let i = 0; i < numberElementsArray.length; i++) {
  const numberElement = numberElementsArray[i];
  numberElement.addEventListener("click", () => {
    updateCurrentInput(i.toString());
  });
}
decimalElement.addEventListener("click", () => {
  // Splitting the currentInput by all operators to find whether last element has decimal or not
  const filteredArr = currentInput
    .split("+")
    .join(",")
    .split("-")
    .join(",")
    .split("*")
    .join(",")
    .split("/")
    .join(",")
    .split(",");
  if (!filteredArr[filteredArr.length - 1].includes(".")) {
    updateCurrentInput(".");
  }
});

// Add event listeners to operators
additionElement.addEventListener("click", () => {
  if (checkOperator()) {
    updateCurrentInput("+");
  }
});
subtractionElement.addEventListener("click", () => {
  if (checkOperator()) {
    updateCurrentInput("-");
  }
});
multiplicationElement.addEventListener("click", () => {
  if (checkOperator()) {
    if (currentInput !== 0) {
      updateCurrentInput("*");
    }
  }
});
divisionElement.addEventListener("click", () => {
  if (checkOperator()) {
    if (currentInput !== 0) {
      updateCurrentInput("/");
    }
  }
});
equalElement.addEventListener("click", () => {
  const result = eval(currentInput);
  currentInput = (Math.round((result + Number.EPSILON) * 100) / 100).toString(); // Rounding the result
  setCurrentInput();
});

// Add event listeners to functions
acElement.addEventListener("click", () => {
  currentInput = 0;
  valueElement.textContent = 0;
});
pmElement.addEventListener("click", () => {
  currentInput = eval(currentInput).toString();
  if (currentInput.includes("-")) {
    currentInput = currentInput.replace("-", "");
  } else {
    currentInput = "-" + currentInput;
  }
  setCurrentInput();
});
percentElement.addEventListener("click", () => {
  currentInput = currentInput / 100;
  setCurrentInput();
});

// Add event listeners to keyboard press
document.addEventListener("keydown", (event) => {
  const digitsAllowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const keyPressed = event.key;
  if (digitsAllowed.includes(keyPressed)) {
    updateCurrentInput(keyPressed);
  } else if (keyPressed === "Enter") {
    currentInput = eval(currentInput).toString();
    setCurrentInput();
  } else if (
    keyPressed === "Shift" ||
    keyPressed === "Control" ||
    keyPressed === "Alt" ||
    keyPressed === "Tab"
  ) {
    return;
  } else {
    alert("Only digits are allowed!");
  }
});


