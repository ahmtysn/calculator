let decimalBtn = document.getElementById("calc-decimal");
let clearBtn = document.getElementById("calc-clear");
let backspaceBtn = document.getElementById("calc-backspace");
let displayValElement = document.getElementById("calc-display-val");

let displayVal = "0";
let pendingVal;
let evalStringArray = [];

let calcNumBtns = document.getElementsByClassName("calc-btn-num");
let calcOperatorBtns = document.getElementsByClassName("calc-btn-operator");

function updateDisplayVal() {
  let btnText = this.innerText;
  if (displayVal === "0") {
    displayVal = "";
  }
  displayVal += btnText;
  displayValElement.innerText = displayVal;
}

function pushNewOperation(operationType) {
  pendingVal = displayVal;
  displayVal = "0";
  displayValElement.innerText = displayVal;
  evalStringArray.push(pendingVal);
  evalStringArray.push(operationType);
}
function equality() {
  evalStringArray.push(displayVal);
  let evaluation = eval(evalStringArray.join(" "));
  displayValElement.innerText = evaluation;
}
function performOperation() {
  let operator = this.innerText;
  switch (operator) {
    case "+":
      pushNewOperation("+");
      break;
    case "-":
      pushNewOperation("-");
      break;
    case "x":
      pushNewOperation("*");
      break;
    case "÷":
      pushNewOperation("/");
      break;
    case "=":
      equality();
  }
}
for (let i = 0; i < calcNumBtns.length; i++) {
  calcNumBtns[i].addEventListener("click", updateDisplayVal);
}
for (let i = 0; i < calcOperatorBtns.length; i++) {
  calcOperatorBtns[i].addEventListener("click", performOperation);
}
function clearBtnClick() {
  displayVal = "0";
  pendingVal = undefined;
  evalStringArray = [];
  displayValElement.innerText = displayVal;
}
function backSpaceClicked() {
  let lengthOfDisplayVal = displayVal.length;
  displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);

  if (displayVal === "") {
    displayVal = "0";
  }
  displayValElement.innerText = displayVal;
}
function decimalClick() {
  if (!displayVal.includes(".")) {
    displayVal += ".";
  }
  displayValElement.innerText = displayVal;
}

backspaceBtn.onclick = backSpaceClicked;
clearBtn.onclick = clearBtnClick;
decimalBtn.onclick = decimalClick;

document.addEventListener("keydown", event => {
  let key = event.key;
  if (key === "Backspace") {
    backSpaceClicked();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    pushNewOperation(key);
  } else if (!Number.isNaN(Number.parseInt(key))) {
    if (displayVal === "0") {
      displayVal = "";
    }
    displayVal += key;
    displayValElement.innerText = displayVal;
  } else if (key === ".") {
    decimalClick();
  } else if (key === "Delete") {
    clearBtnClick();
  } else if (key === "Enter") {
    equality();
  }
});
