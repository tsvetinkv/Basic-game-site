//const
const lettersButtons = document.getElementById("alphabetButtons");
let answerDisplay = document.getElementById("hold");
let answer = "";
let hint = "";
let life = 10;
let wordDisplay = [];
let winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
let myStickman = document.getElementById("stickman");
let context = myStickman.getContext("2d");
const changeLanguage = document.getElementById("bg");
const BG_LETTERS = "абвгдежзийклмнопрстуфхчцшщъьюя";
const EN_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const titleElement = document.getElementById("title");
const goToGames = document.getElementById("goToGames");
const goToGamesText = document.getElementById("goToGamesText");
const description = document.getElementById("description");
let lang = "en";
let isGameOver = false;

const translations = {
  en: {
    title: "Hangman",
    description:
      "Use the alphabet below to guess the word, or click hint to get a clue.",
    hint: "Hint",
    letters: "abcdefghijklmnopqrstuvwxyz",
    goToGamesText: "Go to games",
    newGame: "Play again",
    clue: "clue",
    gameOver: "GAME OVER!",
    win: "YOU WIN!",
    changelang: "Change language",
  },
  bg: {
    title: "Бесеница",
    description:
      "Използвайте азбуката по-долу, за да отгатнете думата, или щракнете бутона за подсказка",
    hint: "Подсказка",
    letters: "абвгдежзийклмнопрстуфхчцшщъьюя",
    goToGamesText: "Към игрите",
    newGame: "Нова игра",
    clue: "Подсказка",
    gameOver: "ЗАГУБИ!",
    win: "ПЕЧЕЛИШ!",
    changelang: "Смени езика",
  },
};

function generateButton(letters) {
  let buttons = letters
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  lettersButtons.innerHTML = buttons;
}
changeLanguage.addEventListener("click", switchLanguage);

function switchLanguage() {
  lang = lang === "en" ? "bg" : "en";
  init();
}


function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    const buttonId = document.getElementById(event.target.id);
  }
  return;
}

function keyboardInput(letter) {
  if (!translations[lang].letters.includes(letter)) {
    return;
  }
  const letterButton = document.getElementById(letter);
  letterButton.click();
}

//word array
const enQuestion = [
  "The Chosen Category Is Astrology",
  "The Chosen Category Is Animals",
  "The Chosen Category Is Capitals",
  "The Chosen Category Is Fruits",
];

const enCategories = [
  [
    "eclipse",
    "supermoon",
    "air-signs",
    "earth-signs",
    "elements",
    "fire-signs",
    "water-signs",
    "zodiac",
  ],
  ["horse", "giraffe", "bear", "zebra", "sloth", "elephant"],
  [
    "madrid",
    "amsterdam",
    "prague",
    "havana",
    "tallinn",
    "paris",
    "berlin",
    "athens",
    "budapest",
    "dublin",
  ],
  ["apple", "watermelon", "banana", "strawberry", "blueberry"],
];

const enHints = [
  [
    "when the earth, moon and the sun line up in the sky. ",
    "when the moon is as close to the earth as it can possibly get, making it look larger than normal.",
    "these are the signs of Gemini, Libra, and Aquarius.",
    "these are the signs of Taurus, Virgo, and Capricorn.",
    "the signs are divided into 4 elements: Fire, Earth, Air, and Water.",
    "these are the signs of Aries, Leo, and Sagittarius.",
    "these are the signs of Cancer, Scorpio, and Pisces.",
    "is a circle of 360 degrees, divided into 12 equal sectors of 30 degrees each that are the astrology signs.",
  ],
  [
    "It is able to travel long distances and has a long mane and tail.",
    "The tallest animal in the world with a very long neck.",
    "It has fur and loves salmon fishing.",
    "It is black with white stripes and lives in open grassy plains.",
    "It can be the laziest and most stubborn creature in the world.",
    "Big animal that has a mouth but doesn't eat with it.",
  ],
  [
    "Spanish capital",
    "Netherlands capital",
    "Czech Republic capital",
    "Cuba capital",
    "Estonia capital",
    "France capital",
    "Germany capital",
    "Greece capital",
    "Hungary capital",
    "Ireland capital",
  ],
  [
    "It is red on the outside and white on the inside",
    "It is red on the iside and has a lot of seeds",
    "curved and yellow fruit",
    "soft, sweet, bright red berrie",
    "small round berrie",
  ],
];

const bgQuestion = [
  "Избраната категория е Астрология",
  "Избраната категория е Животни",
  "Избраната категория е Столици",
  "Избраната категория е Плодове",
];

const bgCategories = [
  [
    "слънчево-затъмнение",
    "супер-луна",
    "въздушни-знаци",
    "земни-знаци",
    "елементи",
    "огнени-знаци",
    "водни-знаци",
    "зодиак",
  ],
  ["кон", "жираф", "мечка", "зебра", "ленивец", "слон"],
  [
    "мадрид",
    "амстердам",
    "прага",
    "хавана",
    "талин",
    "париж",
    "берлин",
    "атина",
    "будапеща",
    "дъблин",
  ],
  ["ябълка", "диня", "банан", "ягода", "боровинка"],
];

const bgHints = [
  [
    "Когато Земята, Луната и Слънцето се изравнят в небето.",
    "Когато Луната е най-близо до Земята, което я прави по-голяма от обикновено.",
    "Това са знаците Близнаци, Везни и Водолей.",
    "Това са знаците Телец, Дева и Козирог",
    "Знаците са разделени на 4 елемента: огън, земя, въздух и вода.",
    "Това са знаците Овен, Лъв и Стрелец.",
    "Това са знаците Рак, Скорпион и Риби.",
    "Кръг от 360 градуса, разделен на 12 равни сектора от по 30 градуса, които са астрологичните знаци.",
  ],
  [
    "Може да изминава дълги разстояния и има дълга грива и опашка.",
    "Най-високото животно в света с много дълга шия.",
    "Има козина и обича да лови сьомга.",
    "Черно с бели ивици и живее в открити тревисти равнини.",
    "Най-мързеливото и най-упоритото същество на света.",
    "Голямо животно което има уста но не яде с нея.",
  ],
  [
    "Столицата на Испания",
    "Столицата на Нидерландия",
    "Столицата на Чешка република",
    "Столицата на Куба",
    "Столицата на Естония",
    "Столицата на Франция",
    "Столицата на Германия",
    "Столицата на Гърция",
    "Столицата на Унгария",
    "Столицата на Ирландия",
  ],
  [
    "Отвън е червена, а отвътре - бяла",
    "Червена е отвътре и има много семена",
    "Извит и жълт плод",
    "Меко, сладко и червено",
    "Плод който има способността да запазва зрението и да го лекува",
  ],
];

function setAnswer() {
  const categories = lang === "en" ? enCategories : bgCategories;
  const categoryOrder = Math.floor(Math.random() * enCategories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  const langQuestions = lang === "en" ? enQuestion : bgQuestion;
  categoryNameJS.innerHTML = langQuestions[categoryOrder];

  const langHints = lang === "en" ? enHints : bgHints;
  answer = chosenWord;
  hint = langHints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  let wordArray = word.split("");
  for (let i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `${translations[lang].clue} - ${hint}`;
}

buttonHint.addEventListener("click", showHint);

function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";

  context.clearRect(0, 0, 400, 400);
  isGameOver = false;
  titleElement.innerHTML = translations[lang].title;
  description.innerHTML = translations[lang].description;
  buttonHint.innerHTML = translations[lang].hint;
  buttonReset.innerHTML = translations[lang].newGame;
  goToGamesText.innerHTML = translations[lang].goToGamesText;
  changeLanguage.innerHTML = translations[lang].changelang;
  canvas();
  containerHint.innerHTML = `${translations[lang].clue} -`;
  livesDisplay.innerHTML = getLivesText(life);
  generateButton(translations[lang].letters);
  setAnswer();
  lettersButtons.addEventListener("click", handleClick);
  document.addEventListener("keydown", (el) => keyboardInput(el.key));
}

window.onload = init();

buttonReset.addEventListener("click", init);

function getLivesText(lives) {
  if (lang === "en") {
    console.log("jldsakfjaljf");
    return `You have ${lives} live${lives === 1 ? "" : "s"}`;
  }

  return `Ти имаш ${lives} живот${lives === 1 ? "" : "а"}`;
}

function guess(event) {
  const isSelected = event.target.classList.contains("selected");

  if (isSelected || isGameOver) {
    return;
  }
  event.target.classList.add("selected");
  const guessLetter = event.target.id;

  console.log(answer);
  const answerArray = answer.split("");
  let counter = 0;

  if (life > 0) {
    for (let j = 0; j < answer.length; j++) {
      if (guessLetter === answerArray[j]) {
        wordDisplay[j] = guessLetter;
        answerDisplay.innerHTML = wordDisplay.join(" ");
        winningCheck = wordDisplay.join("");
        counter += 1;
      }
    }
    if (counter === 0) {
      life -= 1;
      counter = 0;
      animate();
    } else {
      counter = 0;
    }
    if (life > 1) {
      livesDisplay.innerHTML = getLivesText(life);
    } else if (life === 1) {
      livesDisplay.innerHTML = getLivesText(life);
    } else {
      answerDisplay.innerHTML = answer;
      livesDisplay.innerHTML = translations[lang].gameOver;
      isGameOver = true;
    }
  } else {
    return;
  }
  if (answer === winningCheck) {
    livesDisplay.innerHTML = translations[lang].win;
    isGameOver = true;
  }
}

lettersButtons.addEventListener("click", guess);

function animate() {
  drawArray[life]();
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

let drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1,
];
