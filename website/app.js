/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiKey = '50f69e6fe9af3042632d6f772387fa23';

//an API builder
function urlBuilder(baseURL, cityZip, apiKey){
    return `${baseURL}zip=${cityZip},de&appid=${apiKey}`;
}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);


/* Function called by event listener */
function performAction(e){
    const newCityZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    const openWeatherMapFullUrl = urlBuilder(baseURL, newCityZip, apiKey);

    getWeatherDemo(openWeatherMapFullUrl)
        .then(function(data) {
            postData('/add', {
                temp: getWeatherData(data),
                date: newDate,
                userText: feelings})

            //updating the UI to contain the date, the temperature of the city with the API, the user response
            updateUI();
        })
}

function getWeatherData(weatherData){
    return weatherData.main.temp;
}

/* Function to GET Web API Data*/
const getWeatherDemo = async (url = '')=>{
    const response = await fetch(url)
    try {

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url= '', data = {}) =>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            temp: data.temp,
            date: data.date,
            userText: data.userText
        }),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

/* Dynamically update the UI */
const updateUI = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].userText;
        document.getElementById("date").innerHTML =allData[0].date;
    }
    catch(error) {
        console.log('error', error);
    }
}