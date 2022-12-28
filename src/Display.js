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
	const dailyData = await getDailyInfo(inputString);

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

	for (let data of hourlyData) {
		let wrapper = document.createElement('div');
		wrapper.classList.add('hour-wrapper');

		let hour = document.createElement('p');
		hour.innerText = data.time;
		hour.classList.add('hourly-time');

		let temp = document.createElement('p');
		temp.innerText = `${data.temp}\u00B0C`;
		temp.classList.add('hourly-temp');

		let icon = document.createElement('img');
        icon.classList.add('hourly-icon');
        icon.src = await getWeatherIcon(data.icon);

		wrapper.appendChild(hour);
		wrapper.appendChild(temp);
		wrapper.appendChild(icon);

        document.getElementById('daily-hourly-wrapper').appendChild(wrapper);
	}

	console.log(hourlyData);
};
