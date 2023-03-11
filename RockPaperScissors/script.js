const images = [
  "./images/paper.png",
  "./images/Rock.png",
  "./images/Scissors.png",
];
const h1 = document.querySelector("h1");
const player = document.querySelector(".player");
const cmptPlayer = document.querySelector(".cmpt_player");
let prompt = document.querySelector(".prompt");
let playerImg = new Image();
let cmptPlayerImg = new Image();
let i = 0;
playerImg.src = images[0];
player.appendChild(playerImg);
cmptPlayerImg.src = "./images/Rock.png";
cmptPlayer.appendChild(cmptPlayerImg);
cmptPlayer.style.transform = "rotate(-90deg)";
function Paper(){
    playerImg.src = images[0];
    let random1 = Math.floor(Math.random() * 3);
    cmptPlayerImg.src = images[random1];
    if (random1 === 1) {
        prompt.innerHTML = "WIN!";
      } else if (random1 === 2) {
        prompt.innerHTML = "LOSE!";
        i++;
      } else if (random1 === 0) {
        prompt.innerHTML = "TIE!";
      }
      h1.innerHTML = `出拳吧，骚年（你已经赢了${i}次）`
}
function Rock(){
    playerImg.src = images[1];
    let random1 = Math.floor(Math.random() * 3);
    cmptPlayerImg.src = images[random1];
    if (random1 === 0) {
        prompt.innerHTML = "LOSE!";
      } else if (random1 === 2) {
        prompt.innerHTML = "WIN!";
        i++;
      } else if (random1 === 1) {
        prompt.innerHTML = "TIE!";
      }
      h1.innerHTML = `出拳吧，骚年（你已经赢了${i}次）`
}
function Scissors(){
    playerImg.src = images[2];
    let random1 = Math.floor(Math.random() * 3);
    cmptPlayerImg.src = images[random1];
    if (random1 === 1) {
        prompt.innerHTML = "LOSE!";
      } else if (random1 === 0) {
        prompt.innerHTML = "WIN!";
        i++;
      } else if (random1 === 2) {
        prompt.innerHTML = "TIE!";
      }
      h1.innerHTML = `出拳吧，骚年（你已经赢了${i}次）`
}