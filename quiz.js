const $cardFirst = document.getElementById("card-first"); // карта слева
const $cardSecond = document.getElementById("card-second"); // карта справа
const $showResult = document.getElementById("showResult");
//const $cardFirstImg = document.getElementById("card-first-img"); // 

let cards = [{
        id: 1,
        name: "chrome",
        src: "img/chrome.png"
    },
    {
        id: 2,
        name: "firefox",
        src: "img/firefox.png"
    },
    {
        id: 3,
        name: "skull",
        src: "img/skull.jpg"
    },
    {
        id: 4,
        name: "android",
        src: "img/android.jpg"
    },
    {
        id: 5,
        name: "cooler",
        src: "img/cooler.jpg"
    },
    {
        id: 6,
        name: "cosmos",
        src: "img/cosmos.jpg"
    },
    {
        id: 7,
        name: "gomer",
        src: "img/gomer.jpg"
    },
    {
        id: 8,
        name: "anime",
        src: "img/anime.jpg"
    }
];

let cardsFirst = [];
let cardsSecond = [];
let winnerName = "";

let nextCards = []; // Массив для карт, которые прошли дальше

function randomCardFirst() {
    return Math.floor(Math.random() * cardsFirst.length);
}

function randomCardSecond() {
    return Math.floor(Math.random() * cardsSecond.length);
}


let numberFirst = randomCardFirst();
let numberSecond = randomCardSecond();

function splitArrays(cards) {
    for (let i = 0; i < cards.length / 2; i++) {
        cardsFirst[i] = cards[i];
    }
    for (let i = 0; i < cards.length / 2; i++) {
        cardsSecond[i] = cards[i + cards.length / 2];
    }
}

function init() {
    showResult();
    splitArrays(cards)
    numberFirst = randomCardFirst();
    numberSecond = randomCardSecond();
    $cardFirst.children[1].children[0].innerHTML = cardsFirst[numberFirst].name;
    $cardFirst.children[0].src = cardsFirst[numberFirst].src;
    $cardSecond.children[1].children[0].innerHTML = cardsSecond[numberSecond].name;
    $cardSecond.children[0].src = cardsSecond[numberSecond].src;
}

init(); // Старт программы (инициализация)
let $cardFirstName = $cardFirst.children[1].children[0]; // Имя первой карточки
let $cardFirstImg = $cardFirst.children[0]; // Картинка первой карточки

let $cardSecondName = $cardSecond.children[1].children[0]; // Имя второй карточки
let $cardSecondImg = $cardSecond.children[0]; // Картинка второй карточки

$cardFirst.addEventListener("click", function () {
    console.log("Click card-first");
    //changeCards(cardsFirst, numberFirst, cardsSecond, numberSecond, randomCardFirst, randomCardSecond);
    // Обновляем визуальную часть карточки на новую карту
    nextCards.push(cardsFirst.splice(numberFirst, 1)[0]);
    winnerName = nextCards[0].name;
    if (cardsFirst.length > 0) {
        numberFirst = randomCardFirst();
        $cardFirstImg.src = cardsFirst[numberFirst].src;
        $cardFirstName.innerHTML = cardsFirst[numberFirst].name;
    }
    cardsSecond.splice(numberSecond, 1)[0];
    if (cardsSecond.length > 0) {
        numberSecond = randomCardSecond();
        $cardSecondName.innerHTML = cardsSecond[numberSecond].name;
        $cardSecondImg.src = cardsSecond[numberSecond].src;
    } else {
        cardsSecond = []; // сброс второго массива 
        cardsFirst = []; // сброс первого массива
        cards = nextCards;
        showResult(winnerName, $cardSecond);
        splitArrays(cards); // Деление нового массива на первый и второй массив
        nextCards = [];
        // Просто визуальное обновление на те которые остались
        numberFirst = randomCardFirst();
        $cardFirstImg.src = cardsFirst[numberFirst].src;
        $cardFirstName.innerHTML = cardsFirst[numberFirst].name;
        if (cards.length > 1) {          
            numberSecond = randomCardSecond();
            $cardSecondName.innerHTML = cardsSecond[numberSecond].name;
            $cardSecondImg.src = cardsSecond[numberSecond].src;
        }
    }
    // 0 индекс нужен так как splice возвращает массив, 
    // а так как мы возвращаем массив из одного элемента
    // мы берем нулевой индекс и получаем нужный объект
});

$cardSecond.addEventListener("click", function () {
    console.log("Click card-second");
    // Обновляем визуальную часть карточки на новую карту
    nextCards.push(cardsSecond.splice(numberSecond, 1)[0]);
    winnerName = nextCards[0].name;
    if (cardsSecond.length > 0) {
        numberSecond = randomCardSecond();
        $cardSecondImg.src = cardsSecond[numberSecond].src;
        $cardSecondName.innerHTML = cardsSecond[numberSecond].name;
    }
    cardsFirst.splice(numberFirst, 1)[0];
    if (cardsFirst.length > 0) {
        numberFirst = randomCardFirst();
        $cardFirstName.innerHTML = cardsFirst[numberFirst].name;
        $cardFirstImg.src = cardsFirst[numberFirst].src;
    } else {
        cardsSecond = []; // сброс второго массива
        cardsFirst = []; // сброс первого массива
        cards = nextCards;
        showResult(winnerName, $cardFirst);
        splitArrays(cards); // Деление нового массива на первый и второй массив
        nextCards = [];
        // Просто визуальное обновление на те которые остались
        numberFirst = randomCardFirst();
        $cardFirstImg.src = cardsFirst[numberFirst].src;
        $cardFirstName.innerHTML = cardsFirst[numberFirst].name;
        if (cards.length > 1) {
            numberSecond = randomCardSecond();
            $cardSecondName.innerHTML = cardsSecond[numberSecond].name;
            $cardSecondImg.src = cardsSecond[numberSecond].src;
        }
    }
});

function showResult(name, $card) {
    if (cards.length === 32) {
        $showResult.innerHTML = "32";
    } else if (cards.length === 16) {
        $showResult.innerHTML = "16";
    } else if (cards.length === 8) {
        $showResult.innerHTML = "8";
    } else if (cards.length === 4) {
        $showResult.innerHTML = "4";
    } else if (cards.length === 2) {
        $showResult.innerHTML = "2";
    } else if (cards.length === 1) {
        $showResult.innerHTML = "Победил " + name;
        $card.hidden = true;
    }
}
// при нажатии на одну карту меняются обе карты реализовать
// метод includes у массивов
// первая половина всего массива для первой карты
// вторая половина всего массива для второй карты
// метод splice для удаления элемента массива по индексу
// delete array[i] удаляет элемент не менея индексацию
// при нажатии на одну картику она добавляется в массив следующих и удаляется,
// а вторая картинка извлекается и просто удаляется.
// вынести готовый кусок кода в отдельную функцию и вызывать ее при соответственном клике -
// сделать финальный раунд и выводить 1/2 1/4 1/8 1/16 и тд