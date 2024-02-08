let moves = document.getElementById("moves-count");
let time = document.getElementById("time");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let result = document.getElementById("result");
let gameContainer = document.querySelector(".game-container");
const controls = document.querySelector(".controls-container");
let internal;
let cards;
let firstCard = false;
let secondCard = false;
let currenttime = 0;
const frontUrl = "/assets/main.png";
const items = [
  { image: "./assets/card1.png", name: "card1" },
  { image: "./assets/card2.png", name: "card2" },
  { image: "./assets/card3.png", name: "card3" },
  { image: "./assets/card4.png", name: "card4" },
  { image: "./assets/card5.png", name: "card5" },
  { image: "./assets/card6.png", name: "card6" },
  { image: "./assets/card7.png", name: "card7" },
  { image: "./assets/card8.png", name: "card8" },
  { image: "./assets/card9.png", name: "card9" },
  { image: "./assets/K3.png", name: "K3" },
  { image: "./assets/K4.png", name: "K4" },
];

let seconds = 0,
  minutes = 0;
let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  return (time.innerHTML = `<span>Time:</span>${minutes}min : ${seconds}sec`);
  //  return time.innerHTML = `salam`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }

  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
<div class=" card-container " data="${cardValues[i].name}">
<div class="card-before"><img src="${frontUrl}" class="image"></div>
<div class="card-after">
<img src="${cardValues[i].image}" class="image">
</div>
</div>
`;
  }
  cards = document.querySelectorAll(".card-container");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log("salam");

      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");

        if (!firstCard) {
          firstCard = card;

          firstCardValue = card.getAttribute("data");
        } else {
          movesCounter();

          secondCard = card;
          let secondCardValue = card.getAttribute("data");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            firstCard = false;

            winCount += 1;

            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
          <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

// const initalizer = () => {
//   result.innerText = "";
//   winCount = 0;
//   let cardValues = generateRandom();
//   // console.log(cardValues);
//   matrixGenerator(cardValues);
// };
// initalizer()

start.addEventListener("click", () => {
  movesCount = 0;

  controls.classList.add("hide");
  stop.classList.remove("hide");
  start.classList.add("hide");
  console.log(internal);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  let timeer = setInterval(timeGenerator, 1000);
  time.innerHTML = timeer;
  initalizer();
  // console.log(cards);
});

stop.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stop.classList.add("hide");
    start.classList.remove("hide");
    clearInterval(internal);
  })
);

const initalizer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};
