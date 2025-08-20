let currentDeck = [];
let currentIndex = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const progressEl = document.getElementById("progressText");
const deckSelector = document.getElementById("deckSelector");

deckSelector.addEventListener("change", () => {
  loadDeck(deckSelector.value);
});

function loadDeck(deck) {
  if (deck === "superdeck") {
    currentDeck = superdeck;
  } else if (deck === "day1") {
    currentDeck = day1;
  } else if (deck === "day2") {
    currentDeck = day2;
  } else if (deck === "day3") {
    currentDeck = day3;
  } else if (deck === "day4") {
    currentDeck = day4;
  } else if (deck === "day5") {
    currentDeck = day5;
  } else if (deck === "day6") {
    currentDeck = day6;
  } else if (deck === "day7") {
    currentDeck = day7;
  } else if (deck === "day8") {
    currentDeck = day8;
  }
  currentIndex = 0;
  showCard();
}

function showCard() {
  if (currentDeck.length === 0) {
    questionEl.textContent = "No cards in this deck!";
    answerEl.textContent = "";
    progressEl.textContent = "0 / 0";
    return;
  }
  let card = currentDeck[currentIndex];
  questionEl.textContent = card.q;
  answerEl.textContent = card.a;
  answerEl.classList.add("hidden");
  progressEl.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
}

function flipCard() {
  answerEl.classList.toggle("hidden");
}

function nextCard() {
  if (currentIndex < currentDeck.length - 1) {
    currentIndex++;
    showCard();
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    showCard();
  }
}

// Load superdeck by default
loadDeck("superdeck");
