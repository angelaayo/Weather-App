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

function init(){
    let locationInput;
    document.querySelector("#searchBtn").addEventListener("click", async()=>{
        locationInput = document.querySelector("#searchBar").value;
        console.log(locationInput);
        const data = await getData(locationInput);
        console.log(data);
    })
}

init();
