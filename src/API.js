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
				forecast: hour['weather'][0].main
			}
			hourlyData.push(threeHour);
		}
	}
	return hourlyData;
}

async function getWeatherIcon(location, units) {
	const forecast = await fetchDataByLocation(location);
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
            }
            weeklyData.push(dailyData);
        }

    }
    return weeklyData;
}

async function getTempMin(location) {
	const data = await fetchDataByLocation(location);
	const tempMin = data['main'].temp_min.toFixed(1);

	return tempMin;
}

async function getTempMax(location) {
	const data = await fetchDataByLocation(location);
	const tempMax = data['main'].temp_max.toFixed(1);

	return tempMax;
}

async function getCurrentWeather(location) {
	const data = await fetchDataByLocation(location);
	const currentWeather = data['weather'][0].main;

	return currentWeather;
}

async function getWindSpeed(location) {
	const data = await fetchDataByLocation(location);
	const windSpeed = data['wind'].speed;
	
	
	return windSpeed;
}

async function getRealFeel(location) {
	const data = await fetchDataByLocation(location);
	const realFeel = data['main'].feels_like;
	
	return realFeel;
}

async function getHumidity(location) {
	const data = await fetchDataByLocation(location);
	const humidity = data['main'].humidity;
	
	return humidity;
}

async function getTempMinAndMax(location) {
	const data = await fetchDataByLocation(location);
	const tempMin = data['main'].temp_min;
	const tempMax = data['main'].temp_max;
}

async function getTime(location) {
	const data = await fetchDataByLocation(location);
	const timestamp = data['dt'];
	const time = moment.unix(_timestamp).format('MMMM D, YYYY h:mma');
	

	return time;
}

export {
	getHourlyInfo,
	getDailyInfo,
	getCurrentWeather,
	fetchDataByLocation,
	getWindSpeed,
	getHumidity,
	getTempMinAndMax,
	getTime,
	getRealFeel,
	getCurrentTemp,
	getDateAndTime,
	getTempMin,
	getTempMax
};
