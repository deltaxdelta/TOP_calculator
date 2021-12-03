const calcBtns = document.querySelector("div.calcBtns");
const operandOne = document.getElementById("operandOne");
const operandTwo = document.getElementById("operandTwo");
const clr = document.getElementById("clr");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const bkspc = document.getElementById("bkspc");
const plusMinus = document.getElementById("plusMinus");
const eqBtn = document.getElementById("equals");
const calcOutput = document.querySelector("div.calcOutput");

calcBtns.addEventListener("click", displayEntry);

//this code structure seems clunky, but I don't know enough to think of alternatives yet

function displayEntry(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  } else if (e.target == document.querySelector('[data-num="0"]')) {
    if (operandOne.innerText === "0") {
      return;
    }
  } else if (e.target == clr) {
    operandOne.innerText = "";
    operandTwo.innerText = "";
    return;
  } else if (e.target == decimal) {
    operandOne.innerText.includes(".")
      ? (operandOne.innerText += "")
      : (operandOne.innerText += ".");
    return;
  } else if (e.target == bkspc) {
    operandOne.innerText = operandOne.innerText.substring(
      0,
      operandOne.innerText.length - 1
    );
    return;
  } else if (e.target == plusMinus) {
    operandOne.innerText.includes("-")
      ? (operandOne.innerText = operandOne.innerText.replace("-", ""))
      : (operandOne.innerText = "-" + operandOne.innerText);
    return;
  } else if (e.target.classList.value == "move") {
    if (operandOne.innerText === "" && operandTwo.innerText === "") {
      return;
    } else if (operandTwo.innerText.match(/[x\+\-\÷]/gi)) {
      return;
    } else if (operandTwo.innerText !== "" && operandOne.innerText === "") {
      operandTwo.innerText += " " + e.target.innerText;
      return;
    } else if (
      operandTwo.innerText.match(/[x\+\-\÷]/gi) &&
      operandOne.innerText !== ""
    ) {
      getSoln(operandTwo.innerText, operandOne.innerText);
      operandTwo.innerText += " " + e.target.innerText;
      return;
    }

    operandOne.innerText += " " + e.target.innerText;
    operandTwo.innerText = operandOne.innerText;
    operandOne.innerText = "";
    return;
  } else if (e.target == eqBtn) {
    getSoln(operandTwo.innerText, operandOne.innerText);

    return;
  } else if (
    operandOne.innerText == "0" &&
    e.target.innerText.match(/([1-9])/g)
  ) {
    operandOne.innerText = e.target.innerText;
    return;
  }
  operandOne.innerText += e.target.innerText;
  e.preventDefault();
}

function getSoln(x, y) {
  let numOne = parseFloat(x);
  let numTwo = parseFloat(y);
  let operator = x.slice(-1);

  if (numOne == NaN || numTwo == NaN) {
    operandOne.innerText = "ERROR";
  } else if (operator == "÷" && numTwo == 0) {
    divideByZero();
    return;
  }

  switch (operator) {
    case "+":
      operandOne.innerText = numOne + numTwo;
      operandTwo.innerText = "";
      break;
    case "-":
      operandOne.innerText = numOne - numTwo;
      operandTwo.innerText = "";
      break;
    case "x":
      operandOne.innerText = numOne * numTwo;
      operandTwo.innerText = "";
      break;
    case "÷":
      operandOne.innerText = numOne / numTwo;
      operandTwo.innerText = "";
      break;
  }
}

//this gets repetitive in ways that calls code structure into question

let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let allOps = ["+", "-", "x", "*", "/", "÷"];

window.addEventListener("keyup", function (event) {
  calcOutput.classList.add("glow");

  if (operandOne.innerText === "0" && event.key == "0") {
    return;
  } else if (nums.includes(event.key)) {
    operandOne.innerText += event.key;
    return;
  } else if (event.key == ".") {
    operandOne.innerText.includes(".")
      ? (operandOne.innerText += "")
      : (operandOne.innerText += ".");
  } else if (allOps.includes(event.key)) {
    if (operandOne.innerText === "" && operandTwo.innerText === "") {
      return;
    } else if (operandTwo.innerText.match(/[x\+\-\÷\*\/]/gi)) {
      return;
    } else if (operandTwo.innerText == "" && operandOne.innerText !== "") {
      console.log(event.key);
      if (event.key == "*") {
        operandOne.innerText += " x";
        operandTwo.innerText = operandOne.innerText;
        operandOne.innerText = "";
        return;
      } else if (event.key == "/") {
        operandOne.innerText += " ÷";
        operandTwo.innerText = operandOne.innerText;
        operandOne.innerText = "";
        return;
      }
      operandOne.innerText += " " + event.key;
      operandTwo.innerText = operandOne.innerText;
      operandOne.innerText = "";
      return;
    } else if (operandTwo.innerText !== "" && operandOne.innerText === "") {
      operandTwo.innerText += " " + event.key;
      return;
    } else if (operandOne.innerText == "0" && event.key.match(/([1-9])/g)) {
      operandOne.innerText = e.target.innerText;
      return;
    }
  }

  switch (event.key) {
    case "Enter":
      getSoln(operandTwo.innerText, operandOne.innerText);
      break;
    case "=":
      getSoln(operandTwo.innerText, operandOne.innerText);
      break;
    case "Backspace":
      operandOne.innerText = operandOne.innerText.substring(
        0,
        operandOne.innerText.length - 1
      );
      break;
    case "Escape":
      operandOne.innerText = "";
      operandTwo.innerText = "";
      break;
    case "*":
      operandTwo.innerText += " x";
      break;
    case "/":
      operandTwo.innerText += " ÷";
      break;
    default:
      return;
  }
});

function divideByZero() {
  //universe ends
  let body = document.querySelector("body");
  body.style.display = "none";
}

calcOutput.addEventListener("click", glow);

function glow() {
  calcOutput.classList.toggle("glow");
}

//keydown sets focus to appropriate button?

window.addEventListener("keydown", setFocus);

function setFocus(event) {
  switch (event.key) {
    case "Enter":
      equals.focus();
      console.log(document.activeElement);
      break;
    default:
      return;
  }
}
