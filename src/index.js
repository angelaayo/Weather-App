/* eslint-disable no-undef */
import "./style.css";

//key: DT7QBEARA3MCHQDNWFQCPGWVJ
//temp feels like humidity and wind

async function getData(location) {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
      + location + "?key=DT7QBEARA3MCHQDNWFQCPGWVJ"
    );
    if(response.status == 400){
        throw new Error("Location not found");
    }
    const responseJSON = await response.json();
    console.log(responseJSON);
    return processData(responseJSON);
    
  } catch (error) {
    console.log(error);
  }

}

function processData(responseJSON){
    const condition = responseJSON.currentConditions.conditions;
    const temp = responseJSON.currentConditions.temp;
    const wind = responseJSON.currentConditions.windspeed;
    const humidity = responseJSON.currentConditions.humidity;
    const time = responseJSON.currentConditions.datetime;
    return {condition, temp, wind, humidity, time}
}

function displayData(processedData){
    const conditionDisplay = document.querySelector("#condition");
    conditionDisplay.textContent = processedData.condition;
    const tempDisplay = document.querySelector("#temp");
    tempDisplay.textContent = processedData.temp;
    const windDisplay = document.querySelector("#wind");
    windDisplay.textContent = processedData.wind;
    const humidityDisplay = document.querySelector("#humidity");
    humidityDisplay.textContent = processedData.humidity
    const timeDisplay = document.querySelector("#time");
    timeDisplay.textContent = processedData.time;
    //const locationDisplay = document.querySelector("#location");


}

function init(){
    let locationInput;
    document.querySelector("#searchBtn").addEventListener("click", async()=>{
        locationInput = document.querySelector("#searchBar").value;
        console.log(locationInput);
        const data = await getData(locationInput);
        //console.log(data);
        displayData(data);
    })
}

init();
