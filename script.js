document.addEventListener("DOMContentLoaded", getCity);

//Get city by IP
const apiCity = {
   //endpoint: "http://ip-api.com/json/",
   endpoint: "https://ipinfo.io?token=2548ca79301616",
   /*key: "2548ca79301616",
   key0: "02f2a14e8faf7935512bca8cdb73c11f98285f4c9570e6fe308411b8"*/
}

async function getCity(cityLocation){
   const resul = await fetch(`${apiCity.endpoint}`);
   const resultCity = await resul.json();
   document.querySelector('#cityAndCountry').textContent = `${resultCity.city}, ${resultCity.country}`;
   getInfo(resultCity.city);
}

const api = {
   endpoint: "https://api.weatherapi.com/v1",
   key: "a5c6505e5c8b435993e192725210809"
}

const image = document.querySelector('#image');
const input = document.querySelector('#searchInput');
input.addEventListener('keypress', enter);
//input.addEventListener('click', getInfo);

function enter(e){
   if(e.keyCode === 13){
   getInfo(input.value);
   }
}

async function getInfo (data){
const res = await fetch (`${api.endpoint}/forecast.json?key=${api.key}&q=${data}&days=${3}&aqi=no&alerts=no`);
const result = await res.json();
displayResult(result);
displayForecast(result);
getTimeAndDate(result);
}  

function displayResult(result){
document.querySelector('#forecast').style.display = "none";

   let cityAndCountry = document.querySelector('#cityAndCountry');
   cityAndCountry.textContent = `${result.location.name}, ${result.location.country}`;
   
   let temperature = document.querySelector('#currentTemp');
   temperature.innerHTML = `${result.current.temp_c} <span>°</span>`;

   let feelsLike = document.querySelector('#feelsTemp'); 
   feelsLike.innerHTML = `${Math.round(result.current.feelslike_c)} <span>°</span>`;

   let condition = document.querySelector('#condition'); 
   condition.textContent = `${result.current.condition.text}`;

   let cloudsPercent = document.querySelector('#cloudsPercent');
    cloudsPercent.innerHTML = `${result.current.cloud}<span>%</span>`;

    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = `${result.current.humidity}<span>%</span>`;

    let uvIndex = document.querySelector('#uvIndex');
    uvIndex.innerHTML = `${Math.round(result.current.uv)}`;

  /* if (result.current.is_day > 0){
      
      document.querySelector(".infoContainer").style.backgroundImage = "linear-gradient(90deg, #225fc2 0%, #000851 80%)";
      document.body.style.backgroundColor = "linear-gradient(90deg, #225fc2 0%, #000851 80%)";

   }
   else if (result.current.cloud > 60 && result.current.humidity > 65){
      document.querySelector(".photoContainer").style.backgroundImage = "url(image3.jpg)";
   }
   else {
      document.querySelector(".photoContainer").style.backgroundImage = "url(image6.jpg)";
      document.querySelector(".infoContainer").style.backgroundImage = "url(image10.png)";
      document.body.style.backgroundColor = "black";
   }*/
   
}

const forecastButton = document.querySelector('#forecastButton');

forecastButton.addEventListener('click', displayForecastBlock);

function displayForecastBlock(){
   document.querySelector('#forecast').style.display = "block";
}

function displayForecast(result){

    let dateOne = document.querySelector('#dateOne');
    dateOne.textContent = `${result.forecast.forecastday[0].date}`;

    let dateTwo = document.querySelector('#dateTwo');
    dateTwo.textContent = `${result.forecast.forecastday[1].date}`;

    let dateThree = document.querySelector('#dateThree');
    dateThree.textContent = `${result.forecast.forecastday[2].date}`;

    let minTempOne = document.querySelector('#minTempOne');
    minTempOne.innerHTML = `${result.forecast.forecastday[0].day.mintemp_c}<span>°</span>`;
    let maxTempOne = document.querySelector('#maxTempOne');
    maxTempOne.innerHTML = `${Math.round(result.forecast.forecastday[0].day.maxtemp_c)}<span>°</span>`;

    let minTempTwo = document.querySelector('#minTempTwo');
    minTempTwo.innerHTML = `${result.forecast.forecastday[1].day.mintemp_c}<span>°</span>`;
    let maxTempTwo = document.querySelector('#maxTempTwo');
    maxTempTwo.innerHTML = `${Math.round(result.forecast.forecastday[1].day.maxtemp_c)}<span>°</span>`;

    let minTempThree = document.querySelector('#minTempThree');
    minTempThree.innerHTML = `${result.forecast.forecastday[2].day.mintemp_c}<span>°</span>`;
    let maxTempThree = document.querySelector('#maxTempThree');
    maxTempThree.innerHTML = `${Math.round(result.forecast.forecastday[2].day.maxtemp_c)}<span>°</span>`;
    
    let conditionOne = document.querySelector('#conditionOne');
    conditionOne.innerHTML = `${result.forecast.forecastday[0].day.condition.text}`;

    let conditionTwo = document.querySelector('#conditionTwo');
    conditionTwo.innerHTML = `${result.forecast.forecastday[1].day.condition.text}`;

    let conditionThree = document.querySelector('#conditionThree');
    conditionThree.innerHTML = `${result.forecast.forecastday[2].day.condition.text}`;

    let rainOne = document.querySelector('#rainOne');
    rainOne.innerHTML = `<span>Rain: </span>${result.forecast.forecastday[0].day.daily_chance_of_rain}<span>%</span>`;

    let rainTwo = document.querySelector('#rainTwo');
    rainTwo.innerHTML = `<span>Rain: </span>${result.forecast.forecastday[1].day.daily_chance_of_rain}<span>%</span>`;

    let rainThree = document.querySelector('#rainThree');
    rainThree.innerHTML = `<span>Rain: </span>${result.forecast.forecastday[2].day.daily_chance_of_rain}<span>%</span>`;
}

function getTimeAndDate(result){
let d = new Date(result.location.localtime);
 
const todayDay =new Date();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let day = days[d.getUTCDay()];
let todayDate = d.getUTCDate();
let month = months[d.getUTCMonth()];
let year = d.getUTCFullYear();
let hourNow = d.getHours();
let minuteNow = d.getUTCMinutes();
if (minuteNow < 10){
   minuteNow = '0' + minuteNow;
}
if (hourNow < 10){
   hourNow = '0' + hourNow;
}

let showDate = document.querySelector('#date');
showDate.textContent = `${day}` + ", " + `${todayDate}` + " " +`${month}` + ", " + `${year}`;

let showTime = document.querySelector('#time');
showTime.textContent = `${hourNow}` + ":" + `${minuteNow}`;
}

