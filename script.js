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
    } else if (operandTwo.innerText !== "" && operandOne.innerText === "") {
      operandTwo.innerText += " " + e.target.innerText;
      return;
    } else if (
      operandTwo.innerText.match(/[x\+\-\÷]/gi) &&
      operandOne.innerText !== ""
    ) {
      getSoln(operandTwo.innerText, operandOne.innerText);
      operandTwo.innerText = operandOne.innerText + " " + e.target.innerText;
      operandOne.innerText = "";
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
//using switch in case there are more edge case issues
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

//equals button generates sparkles!
//see https://css-tricks.com/playing-with-particles-using-the-web-animations-api/
document.querySelector("#equals").addEventListener("click", pop);

function pop(e) {
  // works on key event as well
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = document.querySelector("#equals").getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 40; i++) {
      createParticle(x, y);
    }
  } //with mouse click
  else {
    for (let i = 0; i < 40; i++) {
      createParticle(e.clientX, e.clientY);
    }
  }
}

//make random particles and move them with animations api
function createParticle(x, y) {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);

  // sizes
  const size = Math.floor(Math.random() * 20 + 5);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  //color
  particle.style.background = `hsl(0, 0%, 100%)`;

  // random desination 100px away
  const destinationX = x + (Math.random() - 0.5) * 2 * 100;
  const destinationY = y + (Math.random() - 0.5) * 2 * 100;

  const animation = particle.animate(
    [
      {
        //start position
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        opacity: 1,
      },
      {
        // finish position
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0,
      },
    ],
    {
      // Set a random duration from 500 to 1500ms
      duration: Math.random() * 1000 + 700,
      easing: "cubic-bezier(0, .9, .57, 1)",
      // Delay every particle with a random value of 200ms
      delay: Math.random() * 200,
    }
  );

  animation.onfinish = () => {
    particle.remove();
  };
}

//h1 is glittery on hover and page load

let sparkle = document.querySelector("#sparkleZone");
let rect = sparkle.getBoundingClientRect();

window.addEventListener("load", glitterTitle);
sparkle.addEventListener("mouseover", glitterTitle);

function glitterTitle() {
  for (let i = 0; i < 12; i++) {
    makeGlitter();
  }
}

function makeGlitter() {
  const glitter = document.createElement("glitter");
  document.body.appendChild(glitter);

  const size = Math.floor(Math.random() * 12 + 5);
  glitter.style.width = `${size}px`;
  glitter.style.height = `${size}px`;

  const locationX = Math.random() * (rect.right - rect.left) + rect.left; //left and right coords set as bounds
  const locationY = Math.random() * (rect.bottom - rect.top) + rect.top - 5; //set a little less than top and bottom values as bounds

  //sizes to shift doots during animation
  const scaler1 = Math.random() + 1;
  const scaler2 = Math.random() - 0.2;

  //glint the glitter
  const animation = glitter.animate(
    [
      {
        // Set the position and low opacity of the glitter doot
        transform: `translate(${locationX}px, ${locationY}px)`,
        opacity: 0.2,
      },
      {
        opacity: 0.7,
      },
      {
        opacity: 0.3,
      },
      {
        //shift size of doot
        opacity: 1,
        transform: `translate(${locationX}px, ${locationY}px) scale(${scaler1})`,
      },
      {
        opacity: 0.4,
      },
      {
        transform: `translate(${locationX}px, ${locationY}px) scale(${scaler2})`,
        opacity: 0,
      },
    ],
    {
      // Set a random duration
      duration: Math.random() * 3000 + 700,
      easing: "cubic-bezier(.27,.85,.84,.4)",
      // Delay glitter with a random value of up to 200ms
      delay: Math.random() * 200,
    }
  );

  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    glitter.remove();
  };
}
