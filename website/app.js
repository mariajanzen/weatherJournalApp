/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=*********af3042632d6f772387fa23&units=metric';
const newCityZip = document.getElementById("zip").value;

/* Function to GET Web API Data*/
const getWeatherDemo = async (baseURL, cityZip, apiKey)=>{
    //cityZip = document.getElementById("zip").value;
    const res = await fetch(baseURL+cityZip+",de"+apiKey);

    try {

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);


/* Function called by event listener */
function performAction(e){
    const newCityZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherDemo(baseURL, newCityZip, apiKey)
        .then(function(userData) {
            postData('/add', {temp:userData['temp'], date: newDate, userText: feelings})
        })

    //updating the UI to contain the date, the temperature of the city with the API, the user response
    updateUI();
};

/* Function to POST data */
const postData = async (url = "", data = {}) =>{
    console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
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


/* Function to GET Project Data */
const updateUI = async () =>{
    const request = await fetch('/');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userText;
        document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
        console.log('error', error);
    }
}