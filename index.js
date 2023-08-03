const apikey="93f572623949fa2737005815515e7fd7";
const weatherDataD1 =document.getElementById("weather-data");
const cityInputC1 =document.getElementById("city-input");
const formE1=document.querySelector("form");
formE1.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue=cityInputC1.value;
    getWeatherData(cityValue)

}
);
async function getWeatherData(cityValue){
    try {
        const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error ("Network respose was not ok")
        }
         const data=await response.json();
         const temperature=Math.round(data.main.temp);
         const description =data.weather[0].description;
         const icon =data.weather[0].icon;
         const details=[
            `Feels like:${Math.round(data.main.feels_like)}°C`,
            `Humidity:${data.main.humidity}%`,
            `Wind Speed:${data.wind.speed} m/s`,
         ]
         weatherDataD1.querySelector(".icon").innerHTML=` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon"> `;
         weatherDataD1.querySelector(
            ".temperature").textContent=`${temperature}°C`;
         weatherDataD1.querySelector(".description").textContent=description;
         weatherDataD1.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataD1.querySelector(".icon").innerHTML="";
         weatherDataD1.querySelector(
            ".temperature").textContent="";
         weatherDataD1.querySelector(".description").textContent="An error happend, please try again later";
         weatherDataD1.querySelector(".details").innerHTML="";  
    }
}