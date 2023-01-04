import styles from '../styles/styles.scss';
import {
	addListeners,
	loadImages,
	clearDisplay,
	renderHourlyData,
} from './Display.js';
import {
	getLocation,
	getCurrentWeather,
	getCurrentTemp,
	getIconCode,
	getWeatherIcon,
	getDateAndTime,
	getRealFeel,
	getHumidity,
	getTempMin,
	getTempMax,
	getWindSpeed,
	getHourlyInfo,
} from './API';

document.addEventListener('DOMContentLoaded', addListeners);
document.addEventListener('DOMContentLoaded', loadImages);
document.addEventListener('DOMContentLoaded', loadForecast);

async function loadForecast() {
	//fetch all forecast info
	const location = await getLocation('Belfast, UK');
	const description = await getCurrentWeather(location);
	const currentTemp = await getCurrentTemp(location, 'metric');
	const iconCode = await getIconCode(location);
	const weatherIcon = await getWeatherIcon(iconCode);
	const dateAndTime = await getDateAndTime(location);
	const feelsLike = await getRealFeel(location);
	const humidity = await getHumidity(location);
	const tempMin = await getTempMin(location);
	const tempMax = await getTempMax(location);
	const windSpeed = await getWindSpeed(location);
	const hourlyData = await getHourlyInfo(location, 'metric');

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
}
