const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const canvas = document.getElementById("canvas");

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];

  const saveData = JSON.parse(localStorage.getItem("scores"));

  if (saveData) {
    scores = saveData;

    if (scores[0] >= 10 || scores[1] >= 10) {
      localStorage.removeItem("scores");
      scores = [0, 0];
    }
  } else if ((scores = [0, 0])) console.log(scores);

  playing = true;

  currentScore = 0;

  activePlayer = Math.round(Math.random() * 1);

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  if (activePlayer === 0) {
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
  } else {
    player0El.classList.remove("player--active");
    player1El.classList.add("player--active");
  }
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");

    diceEl.src = `./images/dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    localStorage.setItem("scores", JSON.stringify(scores));

    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");

      // console.log(localStorage.getItem("scores"));

      // const jsConfetti = new JSConfetti({});

      // jsConfetti
      //   .addConfetti({
      //     emojis: ["🌈", "⚡", "💥", "✨", "💫", "🌸"],
      //   })
      //   .then(() => jsConfetti.addConfetti());
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
