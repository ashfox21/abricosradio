const player = document.querySelector(".header__player")
const nextBtn = document.querySelector(".header__player-next")
const audio = document.querySelector(".header__player-audio")

const bar = document.querySelector(".header__player-bar")
const progressBar = document.querySelector(".header__player-bar-line")
const cyrcle = document.querySelector(".header__player-bar-cyrcle")

const nowTime = document.querySelector(".header__player-time-now")
const allTime = document.querySelector(".header__player-time")

const songName = document.querySelector(".header__player-song-name")

let playList = [
"Hit The Road Jack.mp3",
"Where Is My Mind.mp3",
"Вже Не Сам.mp3",
"Обійми.mp3",
"Океан Ельзи.mp3",
"Я Так Хочу.mp3"
]

playList = playList.sort(() => Math.random() - 0.5);
let selectedMusicNumb = -1;

let nextSong = () => {
    if (selectedMusicNumb == playList.length-1) {
            playList = playList.sort(() => Math.random() - 0.5);
            selectedMusicNumb = 0
        }

    else {
            selectedMusicNumb++
        }

    audio.src = `/audio/${playList[selectedMusicNumb]}`;
    songName.textContent = playList[selectedMusicNumb].slice(0, playList[selectedMusicNumb].length-4);
    audio.onloadeddata = () => { allTime.textContent = Math.floor(audio.duration) };
}

nextBtn.addEventListener("click", nextSong)
audio.addEventListener("ended", nextSong)


// Снизу обетают таймеры
// let date = new Date();
// const nowHours = date.getHours();
// const nowMinutes = date.getMinutes();

// let firstArr = [
//     [20, 59],
//     [21, 00],
//     [21, 01],
//     [21, 58]
// ];

// let secondArr = [];

// let thirdArr = [];

let timeConverter = ([hour, minutes]) => {
    // Рахує від початку доби до поточного часу. Результат повертає у мілісекундах
    let seconds = 0;

    seconds += hour*3600;
    seconds += minutes*60;

    return seconds*1000;
}

// let nowDate = timeConverter([nowHours, nowMinutes]);

// firstArr.forEach(element => secondArr.push(timeConverter(element)));

// secondArr.forEach(element => thirdArr.push(element - nowDate));

// console.log(thirdArr);

// console.log(thirdArr[0]);

// let test = () => { alert("Ви молодці!"); }

// setTimeout(test, thirdArr[0]);
// setTimeout(test, thirdArr[1]);
// setTimeout(test, thirdArr[2]);
// setTimeout(test, thirdArr[3]);

let schoolBells = () => {

    let date = new Date();

    const nowHours = date.getHours();
    const nowMinutes = date.getMinutes();

    let countdown = timeConverter([nowHours, nowMinutes]);

    let bellsPlay = {
        // morning: timeConverter([8, 45]),
        // bells1: timeConverter([9, 45]),
        // bells2: timeConverter([10, 40]),
        // bells3: timeConverter([11, 40]),
        // bells4: timeConverter([12, 35]),
        // bells5: timeConverter([13, 45]),
        // bells6: timeConverter([14, 50]),
        // bells7: timeConverter([15, 40]),
        // bells8: timeConverter([16, 35]),
        // bells9: timeConverter([17, 30])
        qwerty: timeConverter([20, 59])
    }

    let bellsStop = {
        // morning: timeConverter([8, 57]),
        // bells1: timeConverter([9, 52]),
        // bells2: timeConverter([10, 52]),
        // bells3: timeConverter([11, 47]),
        // bells4: timeConverter([12, 57]),
        // bells5: timeConverter([14, 2]),
        // bells6: timeConverter([14, 52]),
        // bells7: timeConverter([15, 47]),
        // bells8: timeConverter([16, 43]),
        // bells9: timeConverter([18, 30])
        qwerty: timeConverter([20, 58])
    }

    // "for in" рахує відлік часу до дзвінка
    let day = 86400000;

    for (let key in bellsPlay) {
        if (bellsPlay[key] - countdown > 0) {
            bellsPlay[key] -= countdown;
        }
        else {
            bellsPlay[key] = day - countdown + bellsPlay[key];
        }
    }

    for (let key in bellsStop) {
        if (bellsStop[key] - countdown > 0) {
            bellsStop[key] -= countdown;
        }
        else {
            bellsStop[key] = day - countdown + bellsStop[key];
        }
    }

    let play = () => audio.play();
    let pause = () => audio.pause();

    // "for in" вмикає музику по дзвінкам
    for (let key in bellsPlay) {
        setTimeout(play, key);
    }

    // "for in" вимикає музику по дзвінкам
    for (let key in bellsStop) {
        setTimeout(pause, key);
    }

}

schoolBells();