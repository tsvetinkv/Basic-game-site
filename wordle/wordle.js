let height = 6; //брой опити
let width = 5; //дължина на думата

let row = 0; //текущ опит (номер на ред)
let col = 0; //текуща буква за този опит

let gameOver = false;
let wordList = ["авеню", "айрян", "айтос", "афера", "арест", "астма", "буква", "банан", "бидон", "бивол", "бобър", "врана", "врата", "волан", "време", "везир", "гланц", "геран", "глина", "грозд", "глоба", "гърло", "двоен", "данък", "дарба", "довод", "ебола", "епоха", "диван", "езеро", "жажда", "жътва", "жалба", "живак", "жлеза", "житие", "завет", "завод", "завой", "закон", "залез", "залив", "залък", "замък", "запад", "запас", "запек", "запис", "запор", "заряд", "захар", "звено", "здрач", "зебра", "зелка", "земен", "зидар", "злато", "злоба", "знаме", "зомби", "зубър", "зърно", "идиот", "извод", "извор", "изпит", "израз", "кабел", "кавал", "кавга", "кадет", "кадър", "казан", "казус", "кайма", "какао", "калъф", "камък", "канал", "канап", "канче", "капак", "карта", "касис", "капка", "катод", "карма", "клещи", "кожух", "козел", "коала", "кокос", "колие", "корал", "коран", "котка", "кръст", "кутия", "кърпа", "кюфте", "кухня", "лавра", "лекар", "лебед", "лимон", "лотус", "люлка", "люляк", "магия", "магма", "майка", "марка", "масаж", "мелба", "мерло", "чанта", "чалга", "чувал", "човка", "човек", "мебел", "метро", "метър", "мигла", "морал", "мухъл", "място", "навес", "негър", "нахут", "нокия", "образ", "омлет", "оскар", "охлюв", "панда", "памук", "паста", "париж", "перла", "петел", "печат", "песен", "писмо", "полет", "поток", "пудел", "пудра", "пчела", "пясък", "пъпеш", "ракия", "резба", "ръкав", "русия", "рубин", "сажда", "сауна", "север", "своге", "селфи", "скала", "стока", "сусам", "сянка", "табло", "табла", "тапет", "тонер", "точка", "тулуп", "турне", "тютюн", "тухла", "уиски", "улица", "фокус", "форма", "фрапе", "ферма", "хавай", "хакер", "хъски", "химия", "цвете", "цитат", "шайба", "школо", "щампа", "щурец", "щтраус", "юнрук", "ютия", "ягода", "ястие", "яхния"];
let guessList = ["абака", "абзац", "авари", "азмак", "акита", "аксон", "акура", "амрок", "амеба", "автор", "бурна", "янтра", "ядене", "яблан", "юрист", "юряяя", "юзина", "ъглен", "ървин", "щерка", "чадър", "чакра", "чекия", "чехли", "човка", "чесън", "чехли", "четка", "чувал", "чучур", "цезар", "цифра", "цикъл", "хазна", "хаити", "хинди", "хинин", "хонда", "хорда", "хлапе", "хегел", "хидра", "хиена", "хинин", "фазан", "факир", "фенер", "фикус", "флора", "филия", "фураж", "убиец", "угода", "умора", "успех", "устав", "устна", "упрек", "уплах", "табак", "талия", "танго", "тения", "телец", "тиган", "товар", "топче", "трупа", "тюлен", "тълпа", "саган", "салют", "сачма", "свила", "седеф", "селен", "сигма", "скрап", "скреч", "скрин", "сколн", "слава", "следва", "слана", "снаха", "смърч", "сряда", "спрей", "спорт", "стадо", "стена", "стрес", "страх", "сцена", "съсел", "сърма", "релса", "ресто", "рубик", "рокля", "парфе", "певец", "пелин", "патур", "позор", "полен", "порок", "пожар", "помощ", "полюс", "пране", "проза", "пъзел", "оазис", "обеца", "овчар", "опиум", "опера", "очила", "набор", "немец", "начин", "недъг", "никой", "нимфа", "нитро", "нюанс", "мамут", "масло", "матка", "метла", "момче", "минус", "мъфин", "молив", "мъгла", "мотел", "легло", "леген", "лихва", "лишей", "люспа", "любов", "линия", "липса", "лувър", "ликра", "лепка", "лиана", "бетон"];
guessList = guessList.concat(wordList);

let chosenWord  = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(chosenWord);

window.onload = function () {
    intialize();
    document.addEventListener("keydown", (e) => {
        if (e.code === "Backspace") {
            if (col > 0) {
                col -= 1;
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                currTile.innerText = "";
            }
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            update();
        }
    });

}

function intialize() {
    // Създаване на дъската за игра
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Създаване на клавиатурата
    let keyboard = [
        ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З"],
        ["Ф", "Х", "Ъ", "В", "А", "П", "Р", "О", "Л", "⌫"],
        ["Enter", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Ю"]
    ];

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key === "Enter") {
                keyTile.id = "Enter";
                keyTile.addEventListener("click", processEnterKey);
            } else if (key === "⌫") {
                keyTile.id = "Backspace";
                keyTile.addEventListener("click", processBackspaceKey);
            } else if ("А" <= key && key <= "Я") {
                keyTile.id = "Key" + key;
                keyTile.addEventListener("click", processLetterKey);
            }

            if (key === "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    // Слушане на натискане на клавиши
    document.addEventListener("keyup", (e) => {
        processInput(e);
    });

}


function processEnterKey() {
    update();
}

function processBackspaceKey() {
    if (col > 0) {
        col -= 1;
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }
}

function processLetterKey() {
    let key = this.innerText.toUpperCase();
  
    if (/^[А-Я]$/.test(key)) {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = key;
          col += 1;
        }
      }
    }
  }
  

// Replace the processKey function with an arrow function
function processKey(key) {
    e = { key: key };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return;
  
    if ("key" in e) {
      let key = e.key.toUpperCase();
  
      if (/^[А-Я]$/.test(key)) {
        if (col < width) {
          let currTile = document.getElementById(row.toString() + "-" + col.toString());
          if (currTile.innerText == "") {
            currTile.innerText = key;
            col += 1;
          }
        }
      } else if (key === "Backspace") {
        if (col > 0) {
          col -= 1;
          let currTile = document.getElementById(row.toString() + "-" + col.toString());
          currTile.innerText = "";
        }
      } else if (key === "Enter") {
        update();
      }
    }
  
    if (!gameOver && row === height) {
      gameOver = true;
      document.getElementById("answer").innerText = chosenWord;
    }
  }
  
  
function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";
  
    // Съставяне на думата от позициите
    for (let c = 0; c < width; c++) {
      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;
      guess += letter;
    }
  
    guess = guess.toLowerCase();
    console.log(guess);
  
    if (!guessList.includes(guess)) {
      document.getElementById("answer").innerText = "Не е в списъка с думи";
      return;
    }
  
    // Обработване на позициите
    let correct = 0;
  
    let letterCount = {};
    for (let i = 0; i < chosenWord.length; i++) {
      let letter = chosenWord[i];
  
      if (letterCount[letter]) {
        letterCount[letter] += 1;
      } else {
        letterCount[letter] = 1;
      }
    }
  
    console.log(letterCount);
  
    for (let c = 0; c < width; c++) {
      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;
  
      if (chosenWord[c] == letter) {
        currTile.classList.add("correct");
        currTile.classList.remove("present", "absent");
  
        let keyTile = document.getElementById("Key" + letter);
        if (keyTile) {
          keyTile.classList.remove("present", "absent");
          keyTile.classList.add("correct");
        }
  
        correct += 1;
        letterCount[letter] -= 1;
      } else if (chosenWord.includes(letter)) {
        currTile.classList.add("present");
        currTile.classList.remove("correct", "absent");
  
        let keyTile = document.getElementById("Key" + letter);
        if (keyTile) {
          keyTile.classList.remove("correct", "absent");
          keyTile.classList.add("present");
        }
      } else {
        currTile.classList.add("absent");
        currTile.classList.remove("correct", "present");
      }
  
      if (correct == width) {
        gameOver = true;
      }
    }
  
    console.log(letterCount);
  
    row += 1;
    col = 0;
  }
  