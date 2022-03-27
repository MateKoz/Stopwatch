//POBIERAMY POTRZEBNE ZMIENNE
const startBtn = document.querySelector(`.start`)
const pauseBtn = document.querySelector(`.pause`)
const stopBtn = document.querySelector(`.stop`)
const resetBtn = document.querySelector(`.reset`)
const historyBtn = document.querySelector(`.history`)
const stopwatch = document.querySelector(`.stopwatch`)
const time = document.querySelector(`.time`)
const timeList = document.querySelector(`.time-list`)
const infoBtn = document.querySelector(`.fa-question `)
const showInfo = document.querySelector(`.modal-shadow`);
const closeInfo = document.querySelector(`.close`);
const changeColor = document.querySelector(`.fa-palette`)

//FUNKCJA, KTORA WLACZA  I WYŁACZA MODAL Z INFORMACJAMI
const showModal = () => {
    if (!(showInfo.style.display === 'block')) {
        showInfo.style.display = 'block'
    } else {
        showInfo.style.display = 'none'
    }
    showInfo.classList.toggle('modal-animation')
}

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];

//FUNKCJA URUCHAMIA SETINTERVAL, KTORY ZMIENIA NASZE MINUTES I SECONDS O JEDEN
// CO JEDNA SEKUNDE

const handleStart = () => {
    clearInterval(countTime)
    countTime = setInterval(() => {

        if (seconds < 9) {
            seconds++
            time.textContent = `${minutes}:0${seconds}`
        } else if (seconds >= 9 && seconds < 59) {
            seconds++
            time.textContent = `${minutes}:${seconds}`
        } else {
            minutes++
            seconds = 0
            time.textContent = `${minutes}:00`
        }
    }, 1000)
}

//FUNKCJA PAUZUJACA ODLICZANIE, POPRZEZ ZATRZYMANIE SETINTERVAL
const handlePause = () => {
    clearInterval(countTime)
}

//FUNKCJA ZATRZYMUJACA DZIALANIE HANDLESTART, PRZYWRACAJACA WARTOSCI DOMYSLNE NA 0:00
const handleStop = () => {

    stopwatch.textContent = `Ostatni czas: ${time.textContent}`;

    if (time.textContent !== `0:00`) {
        stopwatch.style.visibility = 'visible';
        pushArr();
    }

    clearAll()
}

//FUNKCJA ZAPICUJACA W TABLICY ZATRZYMANE WYNIKI.
const pushArr = () => {
    timesArr.push(time.textContent)
}

//FUNKCJA RESETUJACA WSZYSTKIE WARTOSCI DO STANU POCZATKOWEGO
const handleReset = () => {
    stopwatch.style.visibility = 'hidden';
    timesArr = [];
    clearAll()

}
//FUNKCJA TWORZACA WSPOLNE WLASCIWOSCI, BY NIE POWTARZAC KODU
const clearAll = () => {
    clearInterval(countTime)
    seconds = 0;
    minutes = 0
    time.textContent = `0:00`
    timeList.textContent = '';
}


//FUNKCJA POKAZUJE HISTORIE WSZYSTKICH ZASTOPOWANYCH POMIAROW.
const showHistory = () => {
    timeList.textContent = '';
    let num = 1

    timesArr.forEach(time => {
        const newTime = document.createElement('li');
        newTime.innerHTML = `Pomiar nr ${num} wynosił: <span>${time}</span>`
        timeList.appendChild(newTime)
        num++
    })
}

let root = document.documentElement

//FUNKCJA ZMIENIAJACA KOLOR APLIKACJI NA LOSOWY PO KLIKNIECIU IKONY PALETTE
const changeColors = () => {
    let a = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    let c = Math.floor(Math.random()*255)
    root.style.setProperty('--first-color', `rgb(${a}, ${b}, ${c})`)
}


//NASLUCHIWANIA

changeColor.addEventListener('click', changeColors)
historyBtn.addEventListener('click', showHistory)
closeInfo.addEventListener('click', showModal)
resetBtn.addEventListener('click', handleReset)
infoBtn.addEventListener('click', showModal)
startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
window.addEventListener('click',
    e => e.target === showInfo ? showModal() : false)
