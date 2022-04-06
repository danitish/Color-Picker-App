const userInp1 = document.getElementById("inp1");
const userInp2 = document.getElementById("inp2");
const userInp3 = document.getElementById("inp3");
const displayBtn1 = document.getElementById("display-btn1");
const displayBtn2 = document.getElementById("display-btn2");
let displayDiv1 = document.getElementById("color-display1");
let displayDiv2 = document.getElementById("color-display2");
let favBtn = document.getElementById("fav-btn");
let favSection = document.getElementById("fav-section");
let ssIndicatorsSection = document.getElementById("slideshow-indicators");
let ssIndicatorsClass = document.getElementsByClassName("slideshow-indicators");
let ssContent = document.getElementById("slideshow-content");
let ssContentClass = document.getElementsByClassName("slideshow-content");
let favBlankHeader = document.getElementById("fav-p");
let ssBtnLeft = document.getElementById("ss-btn1");
let ssBtnRight = document.getElementById("ss-btn2");

let startingId = 0;
let slideId = 1;
let flag1 = 0;
let flag2 = 0;
let flag3 = 0;
let divCounter = 0;

// *** Eventlisteners: ***
displayBtn1.addEventListener("click", colorChangerLeft);
displayBtn2.addEventListener("click", colorChangerRight);
favBtn.addEventListener("click", addToFavorites);

// *** Eventlisteners functions: ***
function colorChangerLeft() {
  let numberInp1 = Number(userInp1.value);
  let numberInp2 = Number(userInp2.value);
  let numberInp3 = Number(userInp3.value);
  if (!inputValidation(numberInp1, numberInp2, numberInp3)) {
    return;
  }
  displayDiv1.style.backgroundColor = numToRgb(
    numberInp1,
    numberInp2,
    numberInp3
  );
  displayDiv1.innerHTML = rgbToHex(numberInp1, numberInp2, numberInp3);
  displayColorNames(displayDiv1);
}

function colorChangerRight() {
  let numberInp1 = Number(userInp1.value);
  let numberInp2 = Number(userInp2.value);
  let numberInp3 = Number(userInp3.value);
  if (!inputValidation(numberInp1, numberInp2, numberInp3)) {
    return;
  }
  displayDiv2.style.backgroundColor = numToRgb(
    numberInp1,
    numberInp2,
    numberInp3
  );
  displayDiv2.innerHTML = rgbToHex(numberInp1, numberInp2, numberInp3);
  displayColorNames(displayDiv2);
}

function addToFavorites() {
  let numberInp1 = Number(userInp1.value);
  let numberInp2 = Number(userInp2.value);
  let numberInp3 = Number(userInp3.value);

  if (!inputValidation(numberInp1, numberInp2, numberInp3)) {
    return;
  }
  let hex = rgbToHex(numberInp1, numberInp2, numberInp3);
  ssIndicatorsSection.innerHTML += renderSSindicators();
  if (flag1 === 0) {
    ssIndicatorsSection.children[0].className = "active";
    flag1 = 1;
  }
  ssContent.innerHTML += renderSScontent(hex);
  if (flag2 === 0) {
    ssContent.children[0].className = "carousel-item active";
    ssBtnRight.className = "carousel-control-next";
    ssBtnLeft.className = "carousel-control-prev";
    flag2 = 1;
  }
  favBlankHeader.innerHTML = "My favorites:";
  let box2 = document.getElementsByClassName("box1");
  box2[divCounter++].innerHTML = hex;
  displaySliderColorName(box2);
}

// *** Other functions: ***

function inputValidation(first, second, third) {
  if (
    isNaN(first) ||
    userInp1.value === "" ||
    first < 0 ||
    first > 255 ||
    isNaN(second) ||
    userInp2.value === "" ||
    second < 0 ||
    second > 255 ||
    isNaN(third) ||
    userInp3.value === "" ||
    third < 0 ||
    third > 255
  ) {
    alert("Choose valid numbers, between 0 and 255");
    return false;
  }
  return true;
}

function numToRgb(num1, num2, num3) {
  return `rgb(${num1}, ${num2}, ${num3})`;
}

function componentToHex(num) {
  let hex = num.toString(16); //Converts the given number to a hexadecimal form
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    componentToHex(r) +
    componentToHex(g) +
    componentToHex(b)
  ).toUpperCase();
}

function displayColorNames(htmlDiv) {
  for (let i = 0; i < hexCode.length; i++) {
    const hex = hexCode[i].code.hex;
    const color = hexCode[i].color;
    if (htmlDiv.innerHTML === hex) {
      htmlDiv.innerHTML += `<br><br> ${color}`;
      return color;
    }
  }
}

function displaySliderColorName(elem) {
  for (let i = 0; i < hexCode.length; i++) {
    const hex = hexCode[i].code.hex;
    const color = hexCode[i].color;
    for (let j = 0; j < elem.length; j++) {
      if (elem[j].innerHTML === hex) {
        elem[j].innerHTML += `<br><br>${color}`;
      }
    }
  }
}

function renderSSindicators() {
  return `<button
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide-to="${startingId++}"
    aria-current="true"
    aria-label="Slide ${slideId++}}"
  ></button>`;
}

function renderSScontent(color) {
  return `<div class="carousel-item">
    <div
      style="background-color: ${color}" class="box1">
    </div>
  </div>`;
}
