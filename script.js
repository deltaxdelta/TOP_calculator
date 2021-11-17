let calcBtns = document.querySelector("div.calcBtns");
let operandOne = document.getElementById("operandOne");
let operandTwo = document.getElementById("operandTwo");
let clr = document.getElementById("clr");
let equals = document.getElementById("equals");
let decimal = document.getElementById("decimal");
let bkspc = document.getElementById("bkspc");
let plusMinus = document.getElementById("plusMinus");

calcBtns.addEventListener("click", displayEntry);

function displayEntry(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  } else if (e.target == clr) {
    /* else if (operandOne.innerText == "0" && e.target.dataset.num == "0") {
    operandOne = "0";} */
    operandOne.innerText = "";
    return;
  }
  /* else if (e.target == decimal) {
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
  } */

  operandOne.innerText += e.target.innerText;
}
