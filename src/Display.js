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
import { fahrenheitToCelsius, celsiusToFahrenheit } from './Utils.js';
import humidity from '../assets/humidity.png';
import tempMin from '../assets/temp-min.png';
import tempMax from '../assets/temp-max.png';
import realFeel from '../assets/outdoor-feel.png';
import windSpeed from '../assets/anemometer.png';
import defaultWeather from '../assets/overcast.png';
import searchIcon from '../assets/search.svg';

export const addListeners = () => {
	//when search button is clicked, forecast search is begun and rendered
	document
		.getElementById('search-button')
		.addEventListener('click', getForecastFromInput);

	//when enter is pressed and a valid location is present in the search box, forecast search is begun and rendered
	document.getElementById('search-box').addEventListener('keydown', (e) => {
		if (e.key === 'Enter') getForecastFromInput();
	});

	document.getElementById('daily').addEventListener('click', async (e) => {
		// console.log(e.target.parentNode.parentNode);
		const data = await getDailyInfo(
			e.target.parentNode.parentNode.dataset.location,
			'metric'
		);
		renderDailyData(data);
	});

	document.getElementById('hourly').addEventListener('click', async (e) => {
		// console.log(e.target.parentNode.parentNode);
		const data = await getHourlyInfo(
			e.target.parentNode.parentNode.dataset.location,
			'metric'
		);
		renderHourlyData(data);
	});

	//toggle whether temperatures are displayed in celsius or fahrenheit
	document
		.getElementById('temp-format')
		.addEventListener('click', toggleTempFormat);
};

export const loadImages = () => {
	document.getElementById('current-weather').src = defaultWeather;
	document.getElementById('humidity-img').src = humidity;
	document.getElementById('temp-min-img').src = tempMin;
	document.getElementById('temp-max-img').src = tempMax;
	document.getElementById('real-feel-img').src = realFeel;
	document.getElementById('wind-speed-img').src = windSpeed;
	document.getElementById('search-icon').src = searchIcon;
};

const getForecastFromInput = async () => {
	resetErrorMessage();

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
	document.getElementById('daily-hourly-wrapper').classList.add('rendered');
	document
		.getElementById('temp-track-wrapper')
		.setAttribute('data-location', `${location}`);

	renderHourlyData(hourlyData);
};

function resetErrorMessage() {
	document.getElementById('error-message').style.display = 'none';
}

function clearSearchBox() {
	const searchBox = document.getElementById('search-box');
	searchBox.value = '';
}

function clearDisplay() {
	const container = document.getElementById('daily-hourly-wrapper');

	//iterate through all child nodes of the hourly/daily wrapper and remove all
	if (container.classList.contains('rendered')) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		container.className = '';
		clearSearchBox();
	}
}

async function renderHourlyData(hourlyData) {
	const container = document.getElementById('daily-hourly-wrapper');

	if (container.classList.contains('rendered')) {
		clearDisplay();
		container.classList.add('rendered');
	}

	for (let data of hourlyData) {
		let wrapper = document.createElement('div');
		wrapper.classList.add('temp-wrapper', 'wrapper-hourly');

		let hour = document.createElement('p');
		hour.innerText = data.time;
		hour.classList.add('time-hourly');

		let temp = document.createElement('p');
		temp.innerText = `${data.temp}\u00B0C`;
		temp.classList.add('temp-hourly');
		temp.setAttribute('data-type', 'temp');

		let icon = document.createElement('img');
		icon.classList.add('icon-hourly');
		icon.src = await getWeatherIcon(data.icon);

		wrapper.appendChild(hour);
		wrapper.appendChild(temp);
		wrapper.appendChild(icon);

		container.classList.add('hourly');
		container.appendChild(wrapper);
	}
}

async function renderDailyData(dailyData) {
	const container = document.getElementById('daily-hourly-wrapper');

	if (container.classList.contains('rendered')) {
		clearDisplay();
		container.classList.add('rendered');
	}

	for (let data of dailyData) {
		let wrapper = document.createElement('div');
		wrapper.classList.add('temp-wrapper', 'wrapper-daily');

		let day = document.createElement('p');
		day.innerText = data.day;
		day.classList.add('day-daily');

		let maxTemp = document.createElement('p');
		maxTemp.innerText = `${data.maxTemp}\u00B0C`;
		maxTemp.classList.add('temp-daily', 'max');
		maxTemp.setAttribute('data-type', 'temp');

		let minTemp = document.createElement('p');
		minTemp.innerText = `${data.minTemp}\u00B0C`;
		minTemp.classList.add('temp-daily', 'min');
		minTemp.setAttribute('data-type', 'temp');

		let icon = document.createElement('img');
		icon.classList.add('icon-daily');
		icon.src = await getWeatherIcon(data.icon);

		wrapper.appendChild(day);
		wrapper.appendChild(maxTemp);
		wrapper.appendChild(minTemp);
		wrapper.appendChild(icon);

		container.classList.add('daily');
		container.appendChild(wrapper);
	}
}

function toggleTempFormat() {
	const temps = document.querySelectorAll(`[data-type="temp"]`);
	temps.forEach((temp) => {
		const text = temp.innerText;

		//if current format is celsius, swap celsius value for fahrenheit value
		if (text.includes('°C')) {
			const celsiusMatch = text.match(/-?\d+(\.\d+)?/);
			const celsius = celsiusMatch[0];
			const fahrenheit = celsiusToFahrenheit(celsius);
			temp.innerText = `${fahrenheit}°F`;

			//if current format is fahrenheit, swap celsius value for celsius value
		} else if (text.includes('°F')) {
			const fahrenheitMatch = text.match(/-?\d+(\.\d+)?/);
			const fahrenheit = fahrenheitMatch[0];
			const celsius = fahrenheitToCelsius(fahrenheit);
			temp.innerText = `${celsius}°C`;
		}
	});

	//handle toggle btn innerText upon click
	const toggleBtn = document.getElementById('temp-format');
	toggleBtn.innerText =
		toggleBtn.innerText === 'Toggle: °C' ? 'Toggle: °F' : 'Toggle: °C';
}
