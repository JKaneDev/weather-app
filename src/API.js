const moment = require('moment');

// fetch weather data from api by location, return weather data for location in an object
const API_KEY = '2b7df015d5d73cef01a306c61a9eb986';

async function fetchDataByLocation(loc) {
	const units = 'metric';
	const location = loc;

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${API_KEY}`
	);
	const data = await response.json();

	return data;
}

async function getHourlyInfo(location, units) {
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&cnt=24&appid=${API_KEY}`;

	const response = await fetch(forecastUrl);
	const data = await response.json();

	// Calculate the current unix timestamp in seconds for the current item
	const currentTimestamp = Math.floor(Date.now() / 1000);

	const hourlyData = [];

	for (let hour of data.list) {
		if (hour.dt >= currentTimestamp && hour.dt < currentTimestamp + 86400) {
			const threeHour = {
				temp: hour['main'].temp.toFixed(0),
				time: moment.unix(hour.dt).format('ha'),
				forecast: hour['weather'][0].main,
				tempMin: hour['main'].temp_min.toFixed(0),
				icon: hour['weather'][0].icon
			};
			hourlyData.push(threeHour);
		}
	}
	return hourlyData;
}

async function getLocation(location) {
	const data = await fetchDataByLocation(location);
	const locationName = data.name;

	return locationName;
}

async function getDateAndTime(location) {
	const data = await fetchDataByLocation(location);
	const dateAndTime = moment.unix(data.dt).format('ddd MMMM DD, YYYY, h:mma');

	return dateAndTime;
}

async function getCurrentTemp(location, units) {
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&cnt=24&appid=${API_KEY}`;

	const response = await fetch(forecastUrl);
	const data = await response.json();

	// Calculate the current unix timestamp in seconds for the current item
	const currentTimestamp = Math.floor(Date.now() / 1000);

	const temp = data.list[0].main.temp.toFixed(0);

	return temp;
}

async function getDailyInfo(location, units) {
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&cnt=48&appid=${API_KEY}`;

	const response = await fetch(forecastUrl);
	const data = await response.json();

	const weeklyData = [];

	for (let i = 0; i < data.list.length; i++) {
		if (i % 8 === 0) {
			const dailyData = {
				day: moment.unix(data.list[i].dt).format('ddd'),
				temp: data.list[i]['main'].temp,
				weather: data.list[i]['weather'][0].main,
				icon: data.list[i]['weather'][0].icon,
			};
			weeklyData.push(dailyData);
		}
	}
	return weeklyData;
}

async function getTempMin(location) {
	const data = await fetchDataByLocation(location);
	const tempMin = data['main'].temp_min.toFixed(0);

	return tempMin;
}

async function getTempMax(location) {
	const data = await fetchDataByLocation(location);
	const tempMax = data['main'].temp_max.toFixed(0);

	return tempMax;
}

async function getCurrentWeather(location) {
	const data = await fetchDataByLocation(location);
	const currentWeather = data['weather'][0].main;

	return currentWeather;
}

async function getWindSpeed(location) {
	const data = await fetchDataByLocation(location);
	const windSpeed = data['wind'].speed.toFixed(1);

	return windSpeed;
}

async function getRealFeel(location) {
	const data = await fetchDataByLocation(location);
	const realFeel = data['main'].feels_like.toFixed(0);

	return realFeel;
}

async function getHumidity(location) {
	const data = await fetchDataByLocation(location);
	const humidity = data['main'].humidity;

	return humidity;
}

async function getIconCode(location) {
	const data = await fetchDataByLocation(location);
	const icon = data.weather[0].icon;

	return icon;
}

async function getWeatherIcon(iconCode) {
	const icon = iconCode;
	let iconObject;

	switch (icon) {
		case '01d':
			iconObject = await fetch('https://openweathermap.org/img/wn/01d@2x.png');
			break;
		case '01n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/01n@2x.png'
			);
			break;
		case '02d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/02d@2x.png'
			);
			break;
		case '02n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/02n@2x.png'
			);
			break;
		case '03d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/03d@2x.png'
			);
			break;
		case '03n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/03n@2x.png'
			);
			break;
		case '04d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/04d@2x.png'
			);
			break;
		case '04n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/04n@2x.png'
			);
			break;
		case '09d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/09d@2x.png'
			);
			break;
		case '09n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/09n@2x.png'
			);
			break;
		case '10d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/10d@2x.png'
			);
			break;
		case '10n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/10n@2x.png'
			);
			break;
		case '11d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/11d@2x.png'
			);
			break;
		case '11n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/11n@2x.png'
			);
			break;
		case '13d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/13d@2x.png'
			);
			break;
		case '13n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/13n@2x.png'
			);
			break;
		case '50d':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/50d@2x.png'
			);
			break;
		case '50n':
			iconObject = await fetch(
				'https://openweathermap.org/img/wn/50n@2x.png'
			);
			break;
	}


	return iconObject.url
}

export {
	getHourlyInfo,
	getDailyInfo,
	getCurrentWeather,
	fetchDataByLocation,
	getWindSpeed,
	getHumidity,
	getRealFeel,
	getCurrentTemp,
	getDateAndTime,
	getTempMin,
	getTempMax,
	getLocation,
	getWeatherIcon,
	getIconCode
};
