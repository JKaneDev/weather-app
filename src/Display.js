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
} from './API.js';

export const addListeners = () => {
    document.getElementById('search-button').addEventListener('click', getForecastFromInput);
    document.getElementById('search-box').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') getForecastFromInput();
    });
}

const getForecastFromInput = () => {
    const _location = document.getElementById('search-box').value;
    console.log(_location);
}