let calcBtns = document.querySelector("div.calcBtns");
let operandOne = document.getElementById("operandOne");
let operandTwo = document.getElementById("operandTwo");
let clr = document.getElementById("clr");
let equals = document.getElementById("equals");
let decimal = document.getElementById("decimal");
let bkspc = document.getElementById("bkspc");
let plusMinus = document.getElementById("plusMinus");
let eqBtn = document.getElementById("equals");

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
    //else if (
    //   parseInt(operandTwo.innerText) !== NaN &&
    //   operandOne.innerText !== ""
    // ) {
    //   operandOne.innerText += " " + e.target.innerText;
    //   operandTwo.innerText = operandOne.innerText;
    //   operandOne.innerText = "";
    //   return;
    // } else if (operandOne.innerText == "" && operandTwo.innerText !== "") {
    //   getSoln(operandTwo.innerText, operandOne.innerText);
    //   operandTwo.innerText += " " + e.target.innerText;
    //   return;
    // }

    operandOne.innerText += " " + e.target.innerText;
    operandTwo.innerText = operandOne.innerText;
    operandOne.innerText = "";
    return;
  } else if (e.target == eqBtn) {
    getSoln(operandTwo.innerText, operandOne.innerText);

    return;
  }
  operandOne.innerText += e.target.innerText;
}

function getSoln(x, y) {
  let numOne = parseFloat(x);
  let numTwo = parseFloat(y);
  let operator = x.slice(-1);

  if (numOne == NaN || numTwo == NaN) {
    return;
  }

  switch (operator) {
    case "+":
      operandTwo.innerText = numOne + numTwo;
      operandOne.innerText = "";
      break;
    case "-":
      operandTwo.innerText = numOne - numTwo;
      operandOne.innerText = "";
      break;
    case "x":
      operandTwo.innerText = numOne * numTwo;
      operandOne.innerText = "";
      break;
    case "÷":
      operandTwo.innerText = numOne / numTwo;
      operandOne.innerText = "";
      break;
  }
}
