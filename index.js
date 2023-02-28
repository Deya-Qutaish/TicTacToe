"use strict";

const squares = document.querySelectorAll(".square");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");

let gameWon = false;
let nextTurn = "";

const reset = document.querySelector("button");

const winningCombos = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const turns = () => {
  if (nextTurn === "X") {
    nextTurn = "O";
  } else {
    nextTurn = "X";
  }
  return nextTurn;
};
const boxNumX = [];
const boxNumO = [];

function Compare(input, box) {
  let winCombo = [];

  winningCombos.forEach((i) => {
    winCombo = input.filter((value) => i.includes(value));
    if (winCombo.length === 3) {
      winCombo.forEach((e) => {
        const winBox = document.getElementsByClassName(`${e}`)[0];
        winBox.style.color = "red";
      });
      gameWon = true;

      if (box.textContent === "X") {
        player1Score.textContent = Number(player1Score.textContent) + 1;
      } else if (box.textContent === "O") {
        player2Score.textContent = Number(player2Score.textContent) + 1;
      }
    }
  });
}

for (let i = 0; i < squares.length; i++) {
  const box = document.getElementById(`sq#${i}`);

  box.addEventListener("click", () => {
    if (!gameWon) {
      if (box.textContent === "") {
        box.textContent = turns();
        box.value = true;
        const boxClass = Number(box.classList[1]);
        if (nextTurn === "X") {
          boxNumX.push(boxClass);
          Compare(boxNumX, box);
        } else if (nextTurn === "O") {
          boxNumO.push(boxClass);
          Compare(boxNumO, box);
        }
      }
    }
  });

  function init() {
    nextTurn = "";
    box.value = false;
    box.textContent = "";
    gameWon = false;
    boxNumX.length = 0;
    boxNumO.length = 0;

    box.style.color = "#24272c";
  }
  reset.addEventListener("click", () => {
    init();
  });
}
