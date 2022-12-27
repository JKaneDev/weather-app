import { logPlugin } from '@babel/preset-env/lib/debug.js';
import {
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
} from './API.js';

export const addListeners = () => {
    document.getElementById('search-button').addEventListener('click', getForecastFromInput);
    document.getElementById('search-box').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') getForecastFromInput();
    });
}

const getForecastFromInput = async () => {
    const inputString = document.getElementById('search-box').value;
    const location = await fetchDataByLocation(inputString);
    const currentWeather = await getCurrentWeather(inputString);
    const description = getCurrentWeather(inputString);
    const currentTemp = await getCurrentTemp(inputString, 'metric');
    const dateAndTime = await getDateAndTime(inputString);
    const feelsLike = await getRealFeel(inputString);
    const humidity = await getHumidity(inputString);
    const tempMin = await getTempMin(inputString);
    const tempMax = await getTempMax(inputString);
    const windSpeed = await getWindSpeed(inputString);
    const hourlyData = await getHourlyInfo(inputString, 'metric');
    const dailyData = await getDailyInfo(inputString);

    console.log(currentTemp);
    console.log(location);
    console.log(hourlyData);
}