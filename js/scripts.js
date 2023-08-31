"use strict";

const cards = document.querySelectorAll(".cat-card");
const HIGH_SCORES_MODE = "highScores";
const NO_OF_HIGH_SCORES = 5;
const maxTime = 2 * 60;
const musicThemes = [
  "gametheme",
  "gametheme2",
  "gametheme3",
  "gametheme4",
  "gametheme5",
  "gametheme6",
  "gametheme7",
  "gametheme8",
  "gametheme9",
];
let numCardsSelected = 0;
let lockBoard = false;
let selectedCards = [];
let cardsLeft = 0;
let score = 0;
let agent;
let gameOn = false;
let timerID;
let timer = maxTime;
let mySound = new Audio(randomMusic());

setLocale();
mySound.addEventListener("ended", (e) => {
  mySound.src = randomMusic();
  mySound.play();
});

function getHighScoreKey() {
  return HIGH_SCORES_MODE + "_" + theme;
}
/**
 * @description Compares current score to others.
 * @author Teodor Todorov
 * @param {*} score
 */
function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem(getHighScoreKey())) ?? [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

  if (score > lowestScore) {
    setTimeout(() => {
      saveHighScore(score, highScores);
      showHighScores();
    }, 200);
  }
}
/**
 * @description Rearanges local storage according to scores and saves it.
 * @author Teodor Todorov
 * @param {*} score
 * @param {*} highScores
 */
function saveHighScore(score, highScores) {
  let name = prompt(translate("highscore_title"));
  name = name ?? translate("player_name");
  name = name.trim().length === 0 ? translate("player_name") : name;

  const newScore = { score, name };

  // 1. Add to list
  highScores.push(newScore);

  // 2. Sort the list
  highScores.sort((a, b) => b.score - a.score);

  // 3. Select new list
  highScores.splice(NO_OF_HIGH_SCORES);

  // 4. Save to local storage
  localStorage.setItem(getHighScoreKey(), JSON.stringify(highScores));
}
/**
 * @description Displays scores leaderboard.
 * @author Teodor Todorov
 */
function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem(getHighScoreKey())) ?? [];
  const highScoreList = document.getElementById("highScores");

  highScoreList.innerHTML = highScores
    .map((score) => `<li>${formatScore(score.score)} - ${score.name}`)
    .join("");
}
/**
 * @description Changes score visually
 * @author Teodor Todorov
 * @param {*} score
 * @returns {*} formatted score string
 */
function formatScore(score) {
  score = maxTime - score;
  let mrec = Math.floor(score / 60);
  let srec = score % 60;
  mrec = mrec < 10 ? "0" + mrec : mrec;
  srec = srec < 10 ? "0" + srec : srec;
  score = mrec + ":" + srec;
  return score;
}

function randomMusic() {
  let musicNum = Math.floor(Math.random() * 9);
  return `${musicThemes[musicNum]}.mp3`;
}
/**
 * @description Performs actions on switch mode.
 * @author Teodor Todorov
 * @param {*} mode
 */
function setMode(mode) {
  theme = mode;
  showHighScores();

  document.getElementById("modeText").innerText = translate("modebtn");
  document.querySelectorAll("[data-src-key]").forEach(loadImgSrc);
  document.getElementById("game_logo").src = "images/" + theme + "/logo.png";
  if (gameOn) {
    clearTimeout(timerID);
  }
  document.getElementById("clock").innerText = "";
  document.getElementById("clock").textContent = "";
  gameOn = false;
  document.getElementById("startButton").disabled = false;
  document.getElementById("stopButton").disabled = true;
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.removeEventListener("click", flipCard);
  });
}
/**
 * @description Loads images according to theme and language.
 * @author Teodor Todorov
 * @param {*} element
 */
function loadImgSrc(element) {
  const src = element.getAttribute("data-src-key");
  element.src = "images/" + theme + "/" + locale + "/" + src;
}

clippy.load("Merlin", function (a) {
  agent = a;
});
/**
 * @description Performs actions on game start.
 * @author Teodor Todorov
 */
function startGame() {
  if (gameOn) return;
  numCardsSelected = 0;
  lockBoard = false;
  cardsLeft = 0;
  timer = 2 * 60;
  nextFact = Math.floor(Math.random() * maxFacts);
  let nums = [];
  document.getElementById("startButton").disabled = true;
  document.getElementById("stopButton").disabled = false;

  // axios
  //   .get(
  //     "https://www.randomnumberapi.com/api/v1.0/random?min=0&max=11&count=12"
  //   )
  //   .then((response) => {
  //     nums = response.data;
  //     for (let i = 0; i < nums.length; i++) cards[i].style.order = nums[i];
  //   })
  // .catch((error) => {
  cards.forEach((c) => (c.style.order = Math.floor(Math.random() * 12)));
  // });
  document.getElementById("score").innerText = score;
  document.getElementById("gameover").style.display = "none";
  cardsLeft = 12;
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  gameOn = true;
  showTime();
  agent.show();
  agent.animate();
}

/**
 * @description Starts/Stops music background.
 * @author Teodor Todorov
 * @param {*} bForce if applied overrides current state.
 */

function startStopMusic(bForce) {
  let e = document.getElementById("musicStart");

  if (bForce === undefined) {
    if (mySound.paused) {
      mySound.play();
      e.setAttribute("data-i18n-key", "musicStop");
    } else {
      mySound.pause();
      e.setAttribute("data-i18n-key", "musicStart");
    }
  } else {
    if (bForce) {
      mySound.play();
      e.setAttribute("data-i18n-key", "musicStop");
    } else {
      mySound.pause();
      e.setAttribute("data-i18n-key", "musicStart");
    }
  }
  translateElement(e);
}

/**
 * @description Shows game over modal.
 * @author Teodor Todorov
 */
function showGameOver() {
  let goModal = new bootstrap.Modal(document.getElementById("gameover"), {});
  goModal.show();
}

/**
 * @description Performs actions on game over.
 * @author Teodor Todorov
 * @param {*} checkScore
 */
function stopGame(checkScore) {
  if (!gameOn) return;
  document.getElementById("startButton").disabled = false;
  document.getElementById("stopButton").disabled = true;
  clearTimeout(timerID);
  gameOn = false;
  showGameOver();
  getFact();
  if (checkScore) {
    checkCards;
    checkHighScore(timer + 1);
  }
}

/**
 * @description Appplies CSS class for displaying card front side.
 * @author Teodor Todorov
 * @returns {*}
 */
function flipCard() {
  if (lockBoard || !gameOn) return;
  if (numCardsSelected && this === selectedCards[numCardsSelected - 1]) return;
  this.classList.add("flip");
  selectedCards[numCardsSelected++] = this;
  if (numCardsSelected >= 2) {
    numCardsSelected = 0;
    checkCards();
  }
}

/**
 * @description Checks for correctly paired cards and shows fact.
 * @author Teodor Todorov
 */
function checkCards() {
  if (selectedCards[0].dataset.catName === selectedCards[1].dataset.catName) {
    disableCards();
    cardsLeft -= 2;
    checkGameOver();
    if (gameOn) {
      gameOn = false;
      getFact();
      setTimeout(() => {
        gameOn = true;
        showTime();
      }, 4000);
    }
  } else {
    unflipCards();
  }
}

/**
 * @description Checks if all cards are paired.
 * @author Teodor Todorov
 */
function checkGameOver() {
  if (!cardsLeft) {
    score++;
    document.getElementById("score").innerText = score;
    stopGame(true);
  }
}

/**
 * @description Disables paired cards by removing the click event handler.
 * @author Teodor Todorov
 */
function disableCards() {
  selectedCards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
}
/**
 * @description Flips back cards by removing the css class.
 * @author Teodor Todorov
 */
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    selectedCards.forEach((card) => {
      card.classList.remove("flip");
    });
    selectedCards = [];
    numCardsSelected = 0;
    lockBoard = false;
  }, 1500);
}
/**
 * @description Display formatted current time
 * @author Teodor Todorov
 */
function showTime() {
  if (!gameOn) return;
  if (!timer) stopGame(false);

  let m = Math.floor(timer / 60);
  let s = timer % 60;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  let time = m + ":" + s;
  document.getElementById("clock").innerText = time;
  document.getElementById("clock").textContent = time;
  timer--;
  if (timerID != undefined) {
    clearTimeout(timerID);
  }
  timerID = setTimeout(showTime, 1000);
}

/**
 * @description Shop section
 * @author  Teodor Todorov , Stilyan Atanasov
 */

const shopButton = document.getElementById(`shopBTN`);
const shopSection = document.getElementById(`shopSection`);

/**
 * @description Opening/Closing the shop
 * @author Teodor Todorov , Stilyan Atanasov
 */

shopButton.onclick = function () {
  if (shopSection.className == `closed`) {
    shopSection.className = ``;
  } else {
    shopSection.className = `closed`;
  }
};

const allBacks = document.querySelectorAll(".back");

/**
 * @description Replacing the backs and the avalability description of the cards.
 * @author Teodor Todorov , Stilyan Atanasov
 * @param {*} backCard
 */

let replaceCards = function (backCard) {
  let backNum = backCard.id.split("_")[1];
  allBacks.forEach((card) => {
    card.src = backsArr[backNum].src;
  });
  let oldSelectedCardBack = selectedCardBack;

  selectedCardBack = backCard;

  oldSelectedCardBack.firstElementChild.innerHTML = translate(
    "CardDesignLabelOnHover",
    oldSelectedCardBack
  );

  oldSelectedCardBack.className =
    "shopSection_body_items_itemContent_fader_notSelected";

  selectedCardBack.firstElementChild.innerHTML = translate(
    "CardDesignLabelOnHover",
    selectedCardBack
  );

  selectedCardBack.className =
    "shopSection_body_items_itemContent_fader_Selected";
};

/**
 * @description Performs actions when selecting designs of cards.
 * @author Teodor Todorov, Stilyan Atanasov
 * @param {*} backCard
 */

let selectBack = function (backCard) {
  let backNum = backCard.id.split("_")[1];
  if (cardsBackgroundsToChange.includes(backNum)) {
    replaceCards(backCard);
  } else if (score >= backsArr[backNum].price) {
    cardsBackgroundsToChange.push(backNum);
    replaceCards(backCard);
    score -= backsArr[backNum].price;
    document.getElementById("score").innerText = score;
  } else {
    alert(translate("not_enough"));
  }
};

/**
 * @description Switching between sections of the shop.
 * @author Teodor Todorov, Stilyan Atanasov
 */

function chngBGS() {
  document.getElementById(`section2MAG`).className = `shopSection_body2`;
  document.getElementById(`section1MAG`).className = `shopSection_body closed`;
}

function chngCrds() {
  document.getElementById(`section2MAG`).className = `shopSection_body2 closed`;
  document.getElementById(`section1MAG`).className = `shopSection_body`;
}
/**
 * @description Replacing the background of the game and the avalability description of the cards.
 * @author Teodor Todorov, Stilyan Atanasov
 * @param {*} bgr
 */
function replaceBgs(bgr) {
  let bgNum = bgr.id.split("_")[1];

  document.getElementById(`body`).className = bgsArr[bgNum].srcClass;
  document.getElementById(`dropbtn1`).className = bgsArr[bgNum].dropbtn;
  document.getElementById(`modeText`).className = bgsArr[bgNum].modeText;
  document.getElementById(`scores`).className = bgsArr[bgNum].scores ?? "";
  document.getElementById(`cardPositionFix`).className =
    bgsArr[bgNum].cardPositionFix;
  document.getElementById(`bgsareaContent`).className =
    bgsArr[bgNum].bgsareaContent ?? "";
  document.getElementById(`bgsarea`).className = bgsArr[bgNum].bgsarea;
  document.getElementById(`bgsbgs1`).className = bgsArr[bgNum].bgsbgs1;
  document.getElementById(`bgsbgs2`).className = bgsArr[bgNum].bgsbgs2;
  document.getElementById(`bgsbgs3`).className = bgsArr[bgNum].bgsbgs3;
  let oldSelectedbg = selectedBgr;
  selectedBgr = bgr;
  oldSelectedbg.firstElementChild.innerHTML = translate(
    "bgsDesignLabelOnHover",
    oldSelectedbg
  );
  oldSelectedbg.className =
    "shopSection_body_items_itemContent_fader_notSelected";

  selectedBgr.firstElementChild.innerHTML = translate(
    "bgsDesignLabelOnHover",
    selectedBgr
  );
  selectedBgr.className = "shopSection_body_items_itemContent_fader_Selected";
}
/**
 * @description Performs actions when selecting different backgrounds.
 * @author Teodor Todorov
 * @param {*} bgr
 */
function selectBgr(bgr) {
  let bgNum = bgr.id.split("_")[1];
  if (bgsToChange.includes(bgNum)) {
    replaceBgs(bgr);
  } else if (score >= bgsArr[bgNum].price) {
    bgsToChange.push(bgNum);
    score -= bgsArr[bgNum].price;
    document.getElementById("score").innerText = score;
    replaceBgs(bgr);
  } else {
    alert(translate("not_enough"));
  }
}
