const API_QUOTE = 'https://api.quotable.io/random';
const API_TIME = 'https://worldtimeapi.org/api/ip';
const quote = document.querySelector('.quote');
const quoteContainer = document.querySelector('.quote-container');
const quoteBtn = document.querySelector('.quote-btn');
const background = document.querySelector(".background-img");
const greetings = document.querySelector(".greetings");
const section = document.querySelector("article");
const timeContainer = document.querySelector(".time-container");
const scrollBtn = document.querySelector(".scroll-btn");

async function generateQuote() {
    try {
        const response = await fetch(API_QUOTE);
        const data = await response.json();
        quote.innerHTML = `<p>${data.content}</p>
        <cite>${data.author}</cite>`;
    } catch (error) {
        console.error("err");
    }
}

document.addEventListener('DOMContentLoaded', generateQuote);
quoteBtn.addEventListener('click', generateQuote);

async function currentTime() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();


    if (minute < 10) {
        minute = "0" + minute;
    }
    if (hour === 0) {
        hour = "0" + hour;
    }


    if (hour >= 5 && hour <= 17) {
      background.className += ' day';
      section.className += ' day-article';
      document.querySelector(".moon").style.display = "none";
    } else {
      background.className += ' night';
      section.className += ' night-article';
      document.querySelector(".sun").style.display = "none";
    }

    if(hour >= 5 && hour < 12){
        greetings.textContent = "Good morning";
    } else if(hour >= 12 && hour < 18){
        greetings.textContent = "Good afternoon";
    } else if(hour >= 18 && hour < 21){
        greetings.textContent = "Good evening";
    }else{
        greetings.textContent = "Good night";
    }

    document.querySelector(".current-time").textContent = `${hour}:${minute}`;
}

let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
setTimeout(currentTime, interval);

async function generateTimeZone(){
    try{
    const response = await fetch(API_TIME);
    const data = await response.json();
 
    document.querySelector(".abbreviation").innerHTML = `${data.abbreviation}`;
    document.querySelector(".timezone").innerHTML = `${data.timezone}`;
    document.querySelector(".year").innerHTML = `${data.day_of_year}`;
    document.querySelector(".week").innerHTML = `${data.day_of_week}`;
    document.querySelector(".number").innerHTML = `${data.week_number}`;
    } catch(error){
        console.error("err");
    }
}


function scroll(){

const arrow = document.querySelector(".arrow");
const main = document.querySelector("main");
const sectionBg = document.querySelector(".section-bg");
const btnText = document.querySelector(".btn-text");

    if ((!(main.classList.contains("transform")))) {
        btnText.textContent = "LESS";
        main.classList.add("transform");
        sectionBg.classList.add("transform");
        arrow.classList.add("arr-transform");
      if(main.classList.contains("untransform")){
        document.querySelector("main").classList.replace("untransform", "transform");
        sectionBg.classList.replace("untransform", "transform");
        arrow.classList.replace("arr-untransform", "arr-transform");
      }
    } else if (main.classList.contains("transform")) {
      btnText.textContent = "MORE";
      document.querySelector("main").classList.replace("transform", "untransform");
      sectionBg.classList.replace("transform", "untransform");
      arrow.classList.replace("arr-transform", "arr-untransform");
    }else{
        console.error("err");
    }
}

document.addEventListener("DOMContentLoaded", generateQuote);
quoteBtn.addEventListener("click", generateQuote);
document.addEventListener("DOMContentLoaded", generateTimeZone);
document.addEventListener("DOMContentLoaded", currentTime);
scrollBtn.addEventListener('click', scroll);

