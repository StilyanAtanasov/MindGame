const GameModes = {
  Animal: "animal",
  Mountain: "mount",
  River: "river",
};

const backsArr = [
  { src: "images/back.png", price: 0 },
  { src: "images/card_backs/card1.png", price: 1 },
  { src: "images/card_backs/card2.png", price: 2 },
  { src: "images/card_backs/card3.png", price: 3 },
  { src: "images/card_backs/card4.png", price: 4 },
];

const bgsArr = [
  {
    srcClass: "body",
    dropbtn: "dropbtn",
    modeText: "dropbtn",
    price: 0,
    cardPositionFix: "row justify-content-md-center",
    bgsarea: "area closed",
    bgsbgs1: "bg closed",
    bgsbgs2: "bg bg2 closed",
    bgsbgs3: "bg bg3 closed",
  },
  {
    srcClass: "body1",
    dropbtn: "dropbtn dropbtn4",
    modeText: "dropbtn dropbtn4",
    price: 1,
    scores: "results4",
    cardPositionFix: "row justify-content-md-center",
    bgsarea: "area closed",
    bgsbgs1: "bg",
    bgsbgs2: "bg bg2",
    bgsbgs3: "bg bg3",
  },
  {
    srcClass: "body2",
    dropbtn: "dropbtn dropbtn4",
    modeText: "dropbtn dropbtn4",
    price: 2,
    scores: "results4",
    cardPositionFix: "row justify-content-md-center",
    bgsareaContent: "circles",
    bgsarea: "area",
    bgsbgs1: "bg closed",
    bgsbgs2: "bg bg2 closed",
    bgsbgs3: "bg bg3 closed",
  },
  {
    srcClass: "body3",
    dropbtn: "dropbtn dropbtn3",
    modeText: "dropbtn dropbtn3",
    price: 3,
    scores: "results3",
    cardPositionFix: "row1 justify-content-md-center",
    bgsarea: "area closed",
    bgsbgs1: "bg closed",
    bgsbgs2: "bg bg2 closed",
    bgsbgs3: "bg bg3 closed",
  },
  {
    srcClass: "body4",
    dropbtn: "dropbtn4 dropbtn",
    modeText: "dropbtn4 dropbtn",
    price: 4,
    scores: "results4",
    cardPositionFix: "row justify-content-md-center",
    bgsarea: "area closed",
    bgsbgs1: "bg closed",
    bgsbgs2: "bg bg2 closed",
    bgsbgs3: "bg bg3 closed",
  },
];

let locale = "en";
let theme = GameModes.Animal;
let cardsBackgroundsToChange = ["0"];
let selectedCardBack = document.getElementById("fader_0");
let bgsToChange = ["0"];
let selectedBgr = document.getElementById("bgsFader_0");

const translations = {
  en: {
    modebtn: function () {
      return "Mode:  " + translations[locale][theme + "_mode"] + "🔽";
    },
    CardDesignLabelOnHover: function (element) {
      let backNum = element.id.split("_")[1];
      if (backNum == selectedCardBack.id.split("_")[1]) {
        return "Selected";
      } else if (cardsBackgroundsToChange.includes(backNum)) {
        return "Select";
      } else {
        return backsArr[backNum].price == 1
          ? `Buy for ${backsArr[backNum].price} point`
          : `Buy for ${backsArr[backNum].price} points`;
      }
    },
    bgsDesignLabelOnHover: function (element) {
      let bgNum = element.id.split("_")[1];

      if (bgNum == selectedBgr.id.split("_")[1]) {
        return "Selected";
      } else if (bgsToChange.includes(bgNum)) {
        return "Select";
      } else {
        return bgsArr[bgNum].price == 1
          ? `Buy for ${bgsArr[bgNum].price} point`
          : `Buy for ${bgsArr[bgNum].price} points`;
      }
    },
    river_mode: "Rivers",
    mount_mode: "Mountains",
    start: "Start",
    shopButton: `Shop`,
    score: "Points",
    shopText: `SHOP`,
    shopCardsButton: `Cards`,
    shopBackgroundsButton: `Backgrounds`,
    shopDesignsButton: `Designs`,
    shopLevelsButton: `Levels`,
    shopImagesButton: `Images`,
    shopFactsButton: `Facts`,
    stop: "Stop",
    settings: "Settings",
    mode: "Switch Mode",
    musicStop: "Stop Music",
    musicStart: "Play Music",
    factsAdmin: "Facts",
    lang: "Switch Language",
    howTo: "How To Play",
    contact: "About Us",
    animal_mode: "Animals",
    not_enough: "You don't have enough points!",
    about_title: "About Us",
    about_close: "Close",
    game_over: "GAME OVER",
    about:
      "Teodor Todorov Todrov \n PMG Vasil Drumev, Veliko Tarnovo \n teo.vt.bg@gmail.com \n Stilyan Veselinov Atanasov \n PMG Vasil Drumev, Veliko Tarnovo \n stilyan2008@gmail.com",
    howTo_close: "Close",
    howToPlay:
      "Mind Game is a game that will test your memory and card memorization skills. When you start playing, you will see 12 cards face down,  which consist of 6 pairs of identical cards. Your goal is to manage to flip them at the same time. After each correct move - the magician will tell you a fact (time will stop, so you can read the fact).Revealing all the cards will give you 1 point. In case you want to stop - press the Stop button. If you want to change the mode, pause/play the audio, change the language or contact us - you should go to the settings menu.",
    highscore: "RECORDS:",
    modalTitle: "How To Play",
    about_continue: "Continue",
    player_name: "Player",
    highscore_title: "You got a highscore! Enter your name:",
  },
  bg: {
    modebtn: function () {
      return "Тема:  " + translations[locale][theme + "_mode"] + "🔽";
    },
    CardDesignLabelOnHover: function (element) {
      let backNum = element.id.split("_")[1];

      if (backNum == selectedCardBack.id.split("_")[1]) {
        return "избрано";
      } else if (cardsBackgroundsToChange.includes(backNum)) {
        return "Избери";
      } else {
        return backsArr[backNum].price == 1
          ? `Купи за ${backsArr[backNum].price} точкa`
          : `Купи за ${backsArr[backNum].price} точки`;
      }
    },

    bgsDesignLabelOnHover: function (element) {
      let bgNum = element.id.split("_")[1];

      if (bgNum == selectedBgr.id.split("_")[1]) {
        return "избрано";
      } else if (bgsToChange.includes(bgNum)) {
        return "Избери";
      } else {
        return bgsArr[bgNum].price == 1
          ? `Купи за ${bgsArr[bgNum].price} точка`
          : `Купи за ${bgsArr[bgNum].price} точки`;
      }
    },
    river_mode: "Реки",
    mount_mode: "Планини",
    start: "Старт",
    stop: "Стоп",
    shopButton: `Магазин`,
    score: "Точки",
    shopText: `МАГАЗИН`,
    shopCardsButton: `Карти`,
    shopBackgroundsButton: `Фонове`,
    shopDesignsButton: `Дизайни`,
    shopLevelsButton: `Нива`,
    shopImagesButton: `Картини`,
    shopFactsButton: `Факти`,
    settings: "Настройки",
    mode: "Теми",
    musicStop: "Спри звука",
    musicStart: "Пусни звука",
    factsAdmin: "Факти",
    lang: "Смени езика",
    howTo: "Правила",
    contact: "Контакти",
    animal_mode: "Животни",
    not_enough: "Нямате достатъчно точки!",
    about_title: "За нас",
    about_close: "Затвори",
    game_over: "КРАЙ НА ИГРАТА",
    about:
      'Теодор Тодоров Тодоров \n ПМГ "Васил Друмев", Велико Търново \n teo.vt.bg@gmail.com \n Стилян Веселинов Атанасов \n ПМГ "Васил Друмев",Велико Търново \n stilyan2008@gmail.com',
    howTo_close: "Затвори",
    highscore: "РЕКОРДИ:",
    about_continue: "Продължи",
    modalTitle: "Как се играе",
    howToPlay:
      "Mind Game е игра, която ще тества паметта и уменията Ви за запаметяване на карти. Когато започнете да играете, ще видите 12 карти с лице надолу, които се състоят от 6 чифта еднакви карти. Вашата цел е да успеете да ги обърнете едновременно. След всеки правилен ход - магьосникът ще Ви казва факт( времето ще спре, за да може да прочете факта). При разкриване на всички карти ще получите 1 точка. В случай, че искате да спрете - натиснете бутона Стоп. Ако искате да смените режима, да спрете/пуснете звука, да промените езика или да се свържете с нас - трябва да отидете в настройките.",
    player_name: "Играч",
    highscore_title: "Постигнахте висок резултат! Въведете Вашето име:",
  },
};
/**
 * @description Sets locale according to current language and translates the menus and the images.
 * @author Teodor Todorov
 * @param {*} lang
 */
function setLocale(lang) {
  if (lang == undefined) {
    locale == "en" ? (locale = "bg") : (locale = "en");
  }
  document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
  document.querySelectorAll("[data-src-key]").forEach(loadImgSrc);
}
/**
 * @description Translates current element according to the value of data-i18n-key attribute.
 * @author Teodor Todorov
 * @param {*} element
 */
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translate(key, element);
  element.innerText = translation;
}
/**
 * @description Translates string according to current language.
 * @author Teodor Todorov
 * @param {*} key
 * @returns {*}  Translated string
 */
function translate(key, element) {
  if (typeof translations[locale][key] == "function") {
    //console.log(translations[locale][key]());
    return translations[locale][key](element);
  } else {
    return translations[locale][key];
  }
}
