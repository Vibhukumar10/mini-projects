
const secondHand=document.querySelector('.second');
const minuteHand=document.querySelector('.minute');
const hourHand=document.querySelector('.hour');

function setTime(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondDegrees = 6 * seconds + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes + (seconds/60)) * 6 + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = (hour + (minutes/60)) * 30 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setTime, 1000);


