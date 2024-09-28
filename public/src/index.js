// Global Variables
const apiKey = "64524c1bac65e0a78daab5753ee3e118";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let generate = document.getElementById("app");

// Create a new date instance dynamically
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener to add function to the button
generate.addEventListener("submit", generateWeatherData);

// Async function to GET weather data from the OpenWeatherMap API
const getWeather = async (zip) => {
  const url = `${baseUrl}${zip}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(feelings.value);
    document.getElementById("temp").textContent =
      "Temperature: City not found.";
    document.getElementById("date").textContent = `Date: ${newDate}`;
    document.getElementById(
      "content"
    ).textContent = `Feeling: ${feelings.value}`;
  }
  return await response.json();
};

// Async function to POST data to the server
const postData = async (url = "/addData", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// Function to update UI with received data
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").textContent = `Date: ${allData.date}`;
    document.getElementById(
      "temp"
    ).textContent = `Temperature: ${allData.temperature} degrees`;
    document.getElementById(
      "content"
    ).textContent = `Feeling: ${allData.userResponse}`;
  } catch (error) {
    console.log(error);
  }
};

// handle the button click
async function generateWeatherData(e) {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const generateBtn = document.getElementById("generate");
  generateBtn.disabled = true;
  generate.style.cursor = "default";
  generateBtn.style.background = "gray";

  try {
    const weatherData = await getWeather(zip);
    const temperature = Math.round(weatherData.main.temp);

    await postData("/addData", {
      temperature,
      date: newDate,
      userResponse: feelings,
    });
    await retrieveData();
  } catch (error) {
    document.getElementById("temp").textContent =
      "Temperature: City not found.";
  } finally {
    generateBtn.disabled = false;
    generateBtn.style.background = "#3b4a6b";
    generate.style.cursor = "pointer";
  }
}
