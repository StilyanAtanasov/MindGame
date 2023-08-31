let nextFact;
let fact;
const maxFacts = 20;
const speech = new SpeechSynthesisUtterance();
const voices = window.speechSynthesis.getVoices();
speechVoiceBG = voices.filter(checkBGVoice)[0];
speechVoiceEN = voices.filter(checkENVoice)[0];

let factList = {
  [GameModes.Animal]: {
    bg: [
      "Прибиращите се нокти са физически феномен, който отличава котките от останалото животинско царство. В семейството на котките само гепардите не могат да прибират ноктите си.",
      "Днес има около 100 различни породи домашни котка.",
      "Котките не мислят, че са малки хора. Те смятат, че ние сме големи котки. Това влияе на поведението им по много начини.",
      "Щастливата котка държи опашката си високо и стабилно.",
      "Доказателствата предполагат опитомени котките съществуват от 3600 г. пр.н.е., 2000 години преди египетските фараони.",
      " Котките не разпознават сладкия вкус.",
      "Някои често срещани стайни растения, отровни за котките, включват: английски бръшлян, ирис, имел, филодендрон и тис .",
      "По подобен начин честотата на мъркане на домашна котка е същата, при която мускулите и костите се възстановяват.",
      "И тиленолът, и шоколадът са отровни за котките.",
      "Ягуарите са единствените големи котки, които не реват .",
      "Проверявайте пулса на котките си от вътрешната страна на задното бедро, където кракът се свързва с тялото. Нормално за котки: 110-170 удара в минута.",
      "Котка е кмет на Талкитна, Аляска, от 15 години. Името му е Стъбс.",
      "В древен Египет убийството на котка е било престъпление, наказуемо със смърт.",
      "Сега проучванията показват, че алергенът при котките е свързан с техните ароматични жлези. Котките имат ароматни жлези по лицето и в основата на опашката си.",
      "Хлорът в прясната чешмяна вода дразни чувствителните части на носа на котката. Оставете чешмяната вода да престои 24 часа, преди да я дадете на котка.",
      "Мъркането не винаги означава щастие. Мъркането може да означава, че котката изпитва болка.",
      "Ейбрахам Линкълн обичаше котки. Той имаше четири от тях, докато живееше в Белия дом.",
      "Прародителят на всички домашни котки е африканската дива котка, която съществува и днес.",
      "От всички видове котки домашната котка е единственият вид, който може да държи опашката си вертикално по време на ходене.",
      "Котките могат да получат тения, като ядат бълхи. Тези червеи живеят вътре в котката завинаги или докато не бъдат отстранени с лекарства.",
    ],
  },
  [GameModes.Mountain]: {
    bg: [
      "В световен мащаб планините заемат около една пета от повърхността на Земята и осигуряват дом на поне една десета от населението на света.",
      "Най-високата изследвана планина в Слънчевата система е Олимп Монс, разположена на Марс.",
      "Около шест човека умират годишно в опит да изкачат връх Еверест.",
      "Около 80 процента от източните на чиста питейна вода произхождат от планините. ",
      "Четиринадесетте най-високи планини в света се намират в Хималаите.",
      "Много митове, включително гръцките, скандинавските и масайските разказват, че боговете живеят на планинските върхове.",
      "Най-високо състоялият се бой е бил на 7470 м надморска височина, по пътя за Еверест, защото не са спазили указанията за безопасност.",
      "Изследовател през 19. век свиделства за близо 17,500 лавини, регистрирани за една година само в Швейцарските Алпи.",
      "Гангкар Пуенсум е най-високата непокорена планина в света, с височина 7570 м. Намира се на границата между Бутан и Китай.",
      "Почти 7000 са успешните изкачвания на връх Еверест, направени от над 4000 души. Най-младият от тях е 13-годишният американец Джордан Ромеро, а най-възрастния е японецът Ючиро Миура на 80 години.",
      "Беларус е най-голямата държава в света, в която няма планина. Най-високата точка там е хълмът Дзяржинская хара (346 м), а средната надморска височина в държавата е 160 м.",
      "Мауна Кеа в Хаваи е най-високата планина в света. Официално нейната височина е „само“ 4205 м, но те са над морското равнище. Основата й се намира дълбоко в Тихия океан, което допринася общата й височина да надминава 10 000 м, което я прави най-високата планина на Земята.",
      "Бутан е държавата с най-голяма средна надморска височина – приблизително 3280 м. ",
      "Най-ниската планина в света наричат планината Уайчепрууф в Австралия. Тя се издига едва на 43 м. спрямо обграждащия я терен, а височината спрямо морското равнище е „цели“ 148 м.",
      "МФуджи е най-изкачваната планина в света. През 2009 г. над 300 000 души са изкачили снежния японски връх, въпреки че официалният активен сезон за изкачване е само два месеца – Юли и Август.",
      "На Антарктида също има планини и то високи. Ако мислите, че всичко там е едно голямо равно кубче лед, грешите. Връх Винсън се намира в едноименния планински масив и е висок 4892 м.",
      "Съществуват и подводни планини. Всъщност, планините в океаните са повече от тези на земната повърхност.",
      "В дървена кутия на връх Ухуру, най-високият връх на Килиманджаро, се съхраняват посланията на изкачилите върха.",
      "Ла Пас, столицата на Боливия, е най-високо разположената столица в света. Намира се в Андите и е със средна надморска височина от 3650 м.",
      "“Осемхилядниците” са 14 на брой. Всички те се намират на територията на Азия. 10 от тях са в Хималаите, а останалите 4 – в Каракорум.",
    ],
    en: [
      "Mountains make up about one–fifth of the world′s landscape, and provide homes to at least one–tenth of the world′s people.",
      "The tallest known mountain in the solar system is Olimpus Mons, located on Mars.",
      "On average, six people die every year climbing Mt. Everest.",
      "About 80 per cent of our planet′s fresh water originates in the mountains.",
      "The highest 14 mountains in the world are all found in the Himalayas.",
      "Many world mythologies, including Greek, Scandinavian, Hopi, Navajo, Masai, and Canaanite, held that gods lived on mountaintops.",
      "The highest placed battle was at 7470 m above sea level, on the way to Everest, because that people did not keep the safety instructions.",
      "A researcher in the 19th century recorded witnessing nearly 17,500 avalanches over the course of just one year in the Swiss Alps.",
      "Gangkhar Puensum is the highest unconquered mountain in the world, with its height of 7570 m. It is located on the border between Bhutan and China.",
      "Almost 7,000 are the successful ascents of Mount Everest made by over 4,000 people. The youngest of them is the 13-year-old American Jordan Romero, and the oldest is the Japanese Yuchiro Miura, 80 years old.  ",
      "Belarus is the largest country in the world without a mountain. The highest point there is Dzyarzhynskaya hara hill (346 m), and the average altitude in the state is 160 m.",
      "Mauna Kea in Hawaii is the tallest mountain in the world. Officially, its height is 'only' 4205 m, but they are above sea level. Its base lies deep in the Pacific Ocean, which contributes to its total height exceeding 10,000 m, making it the highest mountain on Earth.",
      "Bhutan is the country with the highest average altitude - approximately 3280 m.",
      "The lowest mountain in the world is called Mount Wycheproof in Australia. It rises only 43 m above the surrounding terrain, and its height above sea level is 148 m.",
      "Fuji is the most climbed mountain in the world. In 2009, more than 300,000 people climbed the snowy Japanese peak, although the official active climbing season is only two months - July and August.",
      "Antarctica also has mountains, and high ones at that. If you think everything out there is one big flat ice cube, you're wrong. Mount Vinson is located in the mountain massif with the same name and is 4892 m high.",
      "There are also underwater mountains. In fact, there are more mountains in the oceans than on Earth's surface.",
      "A wooden box on Mount Uhuru, Kilimanjaro's highest peak, holds the messages of those who have climbed the summit.",
      "La Paz, the capital of Bolivia, is the highest capital in the world. It is located in the Andes and has an average altitude of 3650 m.",
      "The  eight-thousanders  are 14 in number. All of them are located on the territory of Asia. 10 of them are in the Himalayas, and the remaining 4 are in the Karakorum.",
    ],
  },
  [GameModes.River]: {
    bg: [
      "В световен мащаб планините заемат около една пета от повърхността на Земята и осигуряват дом на поне една десета от населението на света.",
      "Най-високата изследвана планина в Слънчевата система е Олимп Монс, разположена на Марс.",
      "Най-късата река в света е река Рое. На дължина достига едва 61 метра.",
      "Има 117 милиона езера на Земята, покриващи 3.7 процента от повърхността на планетата. ",
      "Около 90 милиона от всички езера на Земята са по-малки от две футболни игрища всяко.",
      "Повечето от езерата в света се намират в Канада, Русия, Аляска, Швеция и Финландия.",
      "Взети заедно, бреговете на всички езера на Земята са грубо 250 пъти дължината на Екватора. Той е дълъг 12,756 километра.",
      "Реките могат да бъдат различни цветове – не само сини, чисто или мътно кафяво както може би предполагате! Някои реки по света „са оцветени“ с ярко синьо, червено, черно, жълто и зелено.",
      "Повечето езера се разполагат в ниските части на релефа – 85 процента са на надморска височина по-ниска от 500 метра.",
      "Езерата се появяват и изчезват. Ново езеро се появило изневиделица близо до Гафса, Тунис, през август 2014. Вероятните причини са внезапно издигане на подпочвени води или от насъбрала се дъждовна вода.",
      "В Монголия, повече от 100 езера „изчезват“ през годините в началото на 21. век заради пресушаване на района и голяма криза поради липса на питейна вода.",
      "Един айсберг може да осигури питейна вода на един милион човека за пет години.",
      "Изследовател през 19. век свиделства за близо 17,500 лавини, регистрирани за една година само в Швейцарските Алпи.",
      "Има повече исторически артефакти под повърхността на моретата отколкото във всички музеи по света взети заедно.",
      "Много митове, включително гръцките, скандинавските и масайските разказват, че боговете живеят на планинските върхове.",
      "Около шест човека умират годишно в опит да изкачат връх Еверест.",
      "Тихият океан е най-големият сред океаните в света и на неговата територия се разполагат около 25,000 острова.",
      "Могат да се намерят реки и езера под водите на океаните.",
      "Над 70 процента от кислорода в света се произвежда от световния океан.",
      "Четиринадесетте най-високи планини в света се намират в Хималаите.",
    ],
    en: [
      "Rivers can be all kinds of colours – not just blue, clear or muddy brown as you might expect! Some rivers make the waters flow with bright blue, red, black, yellow and green.",
      "The shortest river in the world is the Roe River. It is only 61 metres.",
      "One iceberg could supply a million people with drinking water for five years.",
      "Many world mythologies, including Greek, Scandinavian, Hopi, Navajo, Masai, and Canaanite, held that gods lived on mountaintops.",
      "There are more historic artefacts under the sea than in all of the world’s museums.",
      "There are 117 million lakes on Earth, covering 3.7 percent of the continental land surface. ",
      "About 90 million of all lakes in the world are less bigger than two football fields in size.",
      "Most of the world's lakes are in Canada, Russia, Alaska, Sweden and Finland.",
      "Added altogether, the shorelines of all the world's lakes roughly measure 250 times the length of the equator. The equator is 12,756 kilometers long.",
      "Most lakes lie low — 85 percent are at elevations less than 500 meters above sea level. ",
      "Lakes come and go. A new lake suddenly appeared near Gafsa, Tunisia, in August 2014, either from a sudden groundwater release or pooling rainwater.",
      "On average, six people die every year climbing Mt. Everest.",
      "About 80 per cent of our planet′s fresh water originates in the mountains.",
      "The tallest known mountain in the solar system is Olimpus Mons, located on Mars.",
      "The highest 14 mountains in the world are all found in the Himalayas.",
      "Over 70 per cent of our planet’s oxygen is produced by the plants in the ocean.",
      "A researcher in the 19th century recorded witnessing nearly 17,500 avalanches over the course of just one year in the Swiss Alps.",
      "It’s possible to find rivers and lakes beneath the ocean.",
      "The Pacific Ocean is the world’s largest ocean and contains around 25,000 islands.",
      "On average, six people die every year climbing Mt. Everest.",
      "In Mongolia, more than 100 lakes disappeared during the 2000s from drought and heavy demand for irrigation.",
    ],
  },
};

function getLocalFact() {
  fact = factList[theme][locale][nextFact];
  nextFact++;
  nextFact %= maxFacts;
}
/**
 * @description Speaks fact according to language.
 * @author Teodor Todorov
 */
function doFact() {
  bPaused = mySound.paused;
  mySound.pause();
  agent.speak(fact);
  speech.lang = formatSpeechLang(locale);
  speech.voice = locale == "en" ? speechVoiceEN : speechVoiceBG;
  speech.text = fact;
  speech.addEventListener("end", (event) => {
    if (!bPaused) {
      mySound.play();
    }
  });
  window.speechSynthesis.speak(speech);
}
/**
 * @description Converts theme name from internal enum for API
 * @author Teodor Todorov
 * @returns {*} theme name for API
 */
function themeNameToAPI() {
  switch (theme) {
    case GameModes.Animal:
      return "Animal";
    case GameModes.Mountain:
      return "Mountain";
    case GameModes.River:
      return "River";
    default:
      console.log(error);
  }
}

/**
 * @description Get fact according to language and theme.
 * @author Teodor Todorov
 */
function getFact() {
  if (locale == "en") {
    if (theme == GameModes.Animal) {
      axios
        .get("https://meowfacts.herokuapp.com/")
        .then((response) => {
          fact = response.data.data[0];
          doFact();
        })
        .catch((error) => {
          console.log(error);
          getLocalFact();
          doFact();
        });
    } else {
      getLocalFact();
      doFact();
    }
  } else {
    axios
      .get("https://facts.vtbg.eu/api/fact/" + themeNameToAPI())
      .then((response) => {
        fact = response.data.text;
        doFact();
      })
      .catch((error) => {
        console.log(error);
        getLocalFact();
        doFact();
      });
  }
}
/**
 * @description Formats language string for speech API
 * @author Teodor Todorov
 * @param {*} lang
 * @returns {*} Language string formatted for speech API
 */
function formatSpeechLang(lang) {
  return lang == "en" ? "en-US" : "bg-BG";
}

function checkBGVoice(voice) {
  return voice.lang == formatSpeechLang("bg");
}
function checkENVoice(voice) {
  return voice.lang == formatSpeechLang("en");
}
