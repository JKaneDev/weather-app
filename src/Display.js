import {
	getHourlyInfo,
	getDailyInfo,
	fetchDataByLocation,
	getCurrentWeather,
	getWindSpeed,
	getHumidity,
	getRealFeel,
	getCurrentTemp,
	getDateAndTime,
	getTempMin,
	getTempMax,
	getLocation,
	getIconCode,
	getWeatherIcon,
} from './API.js';
import humidity from '../assets/humidity.png';
import tempMin from '../assets/temp-min.png';
import tempMax from '../assets/temp-max.png';
import realFeel from '../assets/outdoor-feel.png';
import windSpeed from '../assets/anemometer.png';
import defaultWeather from '../assets/overcast.png';

export const addListeners = () => {
	document
		.getElementById('search-button')
		.addEventListener('click', getForecastFromInput);
	document.getElementById('search-box').addEventListener('keydown', (e) => {
		if (e.key === 'Enter') getForecastFromInput();
	});
};

export const loadImages = () => {
	document.getElementById('current-weather').src = defaultWeather;
	document.getElementById('humidity-img').src = humidity;
	document.getElementById('temp-min-img').src = tempMin;
	document.getElementById('temp-max-img').src = tempMax;
	document.getElementById('real-feel-img').src = realFeel;
	document.getElementById('wind-speed-img').src = windSpeed;
};

const getForecastFromInput = async () => {
	//fetch all forecast info
	const inputString = document.getElementById('search-box').value;
	const location = await getLocation(inputString);
	const description = await getCurrentWeather(inputString);
	const currentTemp = await getCurrentTemp(inputString, 'metric');
	const iconCode = await getIconCode(inputString);
	const weatherIcon = await getWeatherIcon(iconCode);
	const dateAndTime = await getDateAndTime(inputString);
	const feelsLike = await getRealFeel(inputString);
	const humidity = await getHumidity(inputString);
	const tempMin = await getTempMin(inputString);
	const tempMax = await getTempMax(inputString);
	const windSpeed = await getWindSpeed(inputString);
	const hourlyData = await getHourlyInfo(inputString, 'metric');
	const dailyData = await getDailyInfo(inputString, 'metric');

	//clear display of previous data and clear search bar
	clearDisplay();
    
	//display info on screen
	document.getElementById('forecast').innerText = `${description}`;
	document.getElementById('location').innerText = `${location}`;
	document.getElementById('date').innerText = `${dateAndTime}`;
	document.getElementById('temp').innerText = `${currentTemp}\u00B0C`;
	document.getElementById('current-weather').src = `${weatherIcon}`;
	document.getElementById('feel').innerText = `${feelsLike}\u00B0C`;
	document.getElementById('humidity').innerText = `${humidity}%`;
	document.getElementById('temp-min').innerText = `${tempMin}\u00B0C`;
	document.getElementById('temp-max').innerText = `${tempMax}\u00B0C`;
	document.getElementById('wind-speed').innerText = `${windSpeed}km/h`;
    
    renderHourlyData(hourlyData);
};

async function clearDisplay() {

    const container = document.getElementById('daily-hourly-wrapper');  

    //iterate through all child nodes of the hourly/daily wrapper and remove all
	if (container.classList.contains('rendered')) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.className = '';
        document.getElementById('search-box').value = '';
	}
}

async function renderHourlyData(hourlyData) {
	for (let data of hourlyData) {
		let wrapper = document.createElement('div');
		wrapper.classList.add('hour-day-wrapper');

		let hour = document.createElement('p');
		hour.innerText = data.time;
		hour.classList.add('date-time');

		let temp = document.createElement('p');
		temp.innerText = `${data.temp}\u00B0C`;
		temp.classList.add('hour-day-temp');

		let icon = document.createElement('img');
		icon.classList.add('hour-day-icon');
		icon.src = await getWeatherIcon(data.icon);

		wrapper.appendChild(hour);
		wrapper.appendChild(temp);
		wrapper.appendChild(icon);

		const container = document.getElementById('daily-hourly-wrapper');
		container.classList.add('rendered', 'hourly');
		document.getElementById('daily-hourly-wrapper').appendChild(wrapper);
	}
}

async function renderDailyData(dailyData) {
	for (let data of dailyData) {
		let wrapper = document.createElement('div');
		wrapper.classList.add('hour-day-wrapper', 'day');

		let day = document.createElement('p');
		day.innerText = data.day;
		day.classList.add('date-time');

		let maxTemp = document.createElement('p');
		maxTemp.innerText = `${data.maxTemp}\u00B0C`;
		maxTemp.classList.add('hour-day-temp', 'max');

		let minTemp = document.createElement('p');
		minTemp.innerText = `${data.minTemp}\u00B0C`;
		minTemp.classList.add('hour-day-temp', 'min');

		let icon = document.createElement('img');
		icon.classList.add('hour-day-icon');
		icon.src = await getWeatherIcon(data.icon);

		wrapper.appendChild(day);
		wrapper.appendChild(maxTemp);
		wrapper.appendChild(minTemp);
		wrapper.appendChild(icon);

		const container = document.getElementById('daily-hourly-wrapper');
		container.classList.add('rendered', 'daily');
		container.appendChild(wrapper);
	}
}
