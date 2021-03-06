


var cityNameInputEl = document.querySelector("#cityname");
var cityFormEl = document.querySelector("#city-form");
var dailyCondition = document.getElementById('daily-condition');
var dailyTemperature = document.getElementById('daily-temp');
var dailyWind = document.getElementById('daily-wind');
var dailyHumidity = document.getElementById('daily-humidity');
var dailyUv = document.getElementById('daily-uv');
var dailyCityName = document.getElementById('daily-city-name');

var localStorageArry = [];
var i =0;




var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityName = cityNameInputEl.value.trim();

  if (cityName) {
    //if city name is recognized, display weather forecast and save to local storage
    getCityWeather(cityName);
    cityLocalStorage(cityName);
    getDailyWeather(cityName);
    i++;
    

    // clear old content

    cityNameInputEl.value = "";
  } else {
    alert("Please enter a city");
  }


};
// create buttons for recent history



var getDailyWeather = function (city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=5c1245afaa2ae565ff674d8efe1c3183";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {

        response.json().then(function (data) {
          cityLat = data.coord.lat;
          cityLon = data.coord.lon;
          console.log(cityLat, cityLon);
          displayUVIndex(cityLat, cityLon);
        })
      }
    })
}


// get weather API from open weather and run daily and forecast weather displays
var getCityWeather = function (city) {
  console.log("string");
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=5c1245afaa2ae565ff674d8efe1c3183";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {

        response.json().then(function (data) {

          displayDailyWeather(data);
          displayForecast(data)
        })
      }
    })
}

// Displays todays weather
var displayDailyWeather = function (selectedCity) {
  var today = moment().format('MM/DD/YYYY');

  dailyCityName.textContent = selectedCity.city.name + " (" + today + ")";

  dailyCondition.textContent = "";
  var conditionImg = document.createElement('img');
  conditionImg.src = "http://openweathermap.org/img/wn/" + selectedCity.list[0].weather[0].icon + "@2x.png";
  dailyCondition.appendChild(conditionImg);
  dailyCondition.classList = "imgSize";
  dailyTemperature.textContent = selectedCity.list[0].main.temp;
  dailyWind.textContent = selectedCity.list[0].wind.speed;
  dailyHumidity.textContent = selectedCity.list[0].main.humidity;
}


  var displayUVIndex = function (cityLat, cityLon) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=5c1245afaa2ae565ff674d8efe1c3183";

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {

          response.json().then(function (data) {
            console.log(data);
            dailyUv.textContent = data.current.uvi;
            if (data.current.uvi < 2) {
              dailyUv.style.color = "green";
            } if (data.current.uvi>2 && data.current.uvi < 5) {
              dailyUv.style.color = "yellow";
            } if(data.current.uvi > 5){
              dailyUv.style.color = "red";
            }


          })
        }
      })
  }

var displayForecast = function (selectedCity) {
  var today1 = moment().add(1, 'days').format('MM/DD/YYYY');
  var today2 = moment().add(2, 'days').format('MM/DD/YYYY');
  var today3 = moment().add(3, 'days').format('MM/DD/YYYY');
  var today4 = moment().add(4, 'days').format('MM/DD/YYYY');
  var today5 = moment().add(5, 'days').format('MM/DD/YYYY');



  // First day in forecast

  var forecastCondOne = document.getElementById('forecast-condition-1');
  forecastCondOne.textContent = "";
  var forecastConditionImgOne = document.createElement('img');
  forecastConditionImgOne.classList = "imgSize";
  forecastConditionImgOne.src = "http://openweathermap.org/img/wn/" + selectedCity.list[1].weather[0].icon + "@2x.png";
  forecastCondOne.appendChild(forecastConditionImgOne);

  document.getElementById('forecast-date-1').textContent = today1;
  document.getElementById('forecast-temp-1').textContent = selectedCity.list[1].main.temp;
  document.getElementById('forecast-wind-1').textContent = selectedCity.list[1].wind.speed;
  document.getElementById('forecast-humidity-1').textContent = selectedCity.list[1].main.humidity;

  // 2nd day in forecast

  var forecastCondTwo = document.getElementById('forecast-condition-2');
  forecastCondTwo.textContent = "";
  var forecastConditionImgTwo = document.createElement('img');
  forecastConditionImgTwo.classList = "imgSize";
  forecastConditionImgTwo.src = "http://openweathermap.org/img/wn/" + selectedCity.list[2].weather[0].icon + "@2x.png";
  forecastCondTwo.appendChild(forecastConditionImgTwo);

  document.getElementById('forecast-date-2').textContent = today2;
  document.getElementById('forecast-temp-2').textContent = selectedCity.list[2].main.temp;
  document.getElementById('forecast-wind-2').textContent = selectedCity.list[2].wind.speed;
  document.getElementById('forecast-humidity-2').textContent = selectedCity.list[2].main.humidity;

  // 3rd day in forecast

  var forecastCondThree = document.getElementById('forecast-condition-3');
  forecastCondThree.textContent = "";
  var forecastConditionImgThree = document.createElement('img');
  forecastConditionImgThree.classList = "imgSize";
  forecastConditionImgThree.src = "http://openweathermap.org/img/wn/" + selectedCity.list[3].weather[0].icon + "@2x.png";
  forecastCondThree.appendChild(forecastConditionImgThree);

  document.getElementById('forecast-date-3').textContent = today3;
  document.getElementById('forecast-temp-3').textContent = selectedCity.list[3].main.temp;
  document.getElementById('forecast-wind-3').textContent = selectedCity.list[3].wind.speed;
  document.getElementById('forecast-humidity-3').textContent = selectedCity.list[3].main.humidity;

  // 4th day in forecast

  var forecastCondFour = document.getElementById('forecast-condition-4');
  forecastCondFour.textContent = "";
  var forecastConditionImgFour = document.createElement('img');
  forecastConditionImgFour.classList = "imgSize";
  forecastConditionImgFour.src = "http://openweathermap.org/img/wn/" + selectedCity.list[4].weather[0].icon + "@2x.png";
  forecastCondFour.appendChild(forecastConditionImgFour);

  document.getElementById('forecast-date-4').textContent = today4;
  document.getElementById('forecast-temp-4').textContent = selectedCity.list[4].main.temp;
  document.getElementById('forecast-wind-4').textContent = selectedCity.list[4].wind.speed;
  document.getElementById('forecast-humidity-4').textContent = selectedCity.list[4].main.humidity;

  // 5th day in forecast

  var forecastCondFive = document.getElementById('forecast-condition-5');
  forecastCondFive.textContent = "";
  var forecastConditionImgFive = document.createElement('img');
  forecastConditionImgFive.classList = "imgSize";
  forecastConditionImgFive.src = "http://openweathermap.org/img/wn/" + selectedCity.list[5].weather[0].icon + "@2x.png";
  forecastCondFive.appendChild(forecastConditionImgFive);

  document.getElementById('forecast-date-5').textContent = today5;
  document.getElementById('forecast-temp-5').textContent = selectedCity.list[5].main.temp;
  document.getElementById('forecast-wind-5').textContent = selectedCity.list[5].wind.speed;
  document.getElementById('forecast-humidity-5').textContent = selectedCity.list[5].main.humidity;



}

var cityLocalStorage = function (cityname) {
  searchHistory = document.getElementById("search-history");
  var localCityName =dailyCityName.textContent ;

  var buttonCreate = document.createElement('button');
  buttonCreate.type = "submit";
  buttonCreate.innerHTML = cityname;
  buttonCreate.className = "btn city-btn";
  buttonCreate.id = "button" + cityname;

var localSearchHistory = {
  savedCityName: cityname,
  savedButtonId: i+"button"+cityname
}

localStorageArry.push(localSearchHistory);
//setLocalStorage(localStorageArry);

  searchHistory.appendChild(buttonCreate);



  searchHistory.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'button' + cityname) {
      getCityWeather(cityname)
    }
  });

}

//var setLocalStorage = function(data) {
  //localStorage.setItem("searchHistorySaved", JSON.stringify(data));
  //console.log(data);

  
//}

/*
var loadLocalStorage = function(data) {
  var savedSearchHistory = localStorage.getItem("searchHistorySaved");
  console.log(savedSearchHistory);
  if(!savedSearchHistory) {
    return false;
  }
  savedSearchHistory = JSON.parse(savedSearchHistory);
  
  searchHistory = document.getElementById("search-history");
  console.log(savedSearchHistory);

  for(i=0; i<savedSearchHistory.length; i++){

  var localButtonCreate = document.createElement('button');
  localButtonCreate.type = "submit";
  localButtonCreate.innerHTML = savedSearchHistory[i].savedCityName;
  localButtonCreate.className = "btn city-btn";
  localButtonCreate.id = savedSearchHistory[i].savedButtonId;

  searchHistory.appendChild(localButtonCreate);
  
  };
  

  searchHistory.addEventListener('click', function (event) {
    if (event.target && event.target.id === savedSearchHistory[i].savedButtonId) {
      getCityWeather(savedSearchHistory[i].savedCityName)
  }});
}
*/

// add event listeners to forms
cityFormEl.addEventListener("submit", formSubmitHandler);

//loadLocalStorage();
