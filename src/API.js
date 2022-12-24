const moment = require('moment');

// fetch weather data from api by location, return weather data for location in an object
const API_KEY = '2b7df015d5d73cef01a306c61a9eb986';

async function fetchDataByLocation(location) {
	const _units = 'metric';
	const _location = location;

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${_location}&units=${_units}&appid=${API_KEY}`
	);
	const data = await response.json();

	return data;
}

async function getHourlyInfo(location, units) {
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&cnt=24&appid=${API_KEY}`;

	const response = await fetch(forecastUrl);
	const data = await response.json();
	console.log(data.list);

	// Calculate the current unix timestamp in seconds for the current item
	const currentTimestamp = Math.floor(Date.now() / 1000);

	const hourlyData = {
		hourlyTemps: [],
		hourlyTimes: [],
        hourlySkies: '',
	};

	for (let hour of data.list) {
		if (hour.dt >= currentTimestamp && hour.dt < currentTimestamp + 86400) {
			hourlyData['hourlyTemps'].push(hour.main.temp);
			hourlyData['hourlyTimes'].push(moment.unix(hour.dt).format('ha'));
            hourlyData['hourlySkies'] = hour['weather'][0].main;
		}
	}

	console.log(hourlyData);

	return hourlyData;
}

async function getCurrentWeather(location) {
	const _data = await fetchDataByLocation(location);
	const _currentWeather = _data['weather'][0].main;
	const _skies = _data['weather'][0].description;

	console.log('Current Weather', _currentWeather);
	console.log('Skies', _skies);

	return [_currentWeather, _skies];
}

async function getWindSpeed(location) {
	const _data = await fetchDataByLocation(location);
	const windSpeed = _data['wind'].speed;
	console.log('wind', windSpeed);
	return windSpeed;
}

async function getRealFeel(location) {
	const _data = await fetchDataByLocation(location);
	const _realFeel = _data['main'].feels_like;
	console.log('Real Feel', _realFeel);
	return _realFeel;
}

async function getHumidity(location) {
	const _data = await fetchDataByLocation(location);
	const humidity = _data['main'].humidity;
	console.log('humidity', humidity);
	return humidity;
}

async function getTempMinAndMax(location) {
	const _data = await fetchDataByLocation(location);
	const _tempMin = _data['main'].temp_min;
	const _tempMax = _data['main'].temp_max;
}

async function getTime(location) {
	const _data = await fetchDataByLocation(location);
	const _timestamp = _data['dt'];
	const _time = moment.unix(_timestamp).format('MMMM D, YYYY h:mma');
	console.log(_time);

	return _time;
}

export {
	getHourlyInfo,
	getCurrentWeather,
	fetchDataByLocation,
	getWindSpeed,
	getHumidity,
	getTempMinAndMax,
	getTime,
	getRealFeel,
};
