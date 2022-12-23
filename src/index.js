import { fetchDataByLocation, getWindSpeed, getHumidity, getCurrentWeather, getTime } from './API';

// document.addEventListener('DOMContentLoaded', fetchDataByLocation);

fetchDataByLocation('London, UK');
getWindSpeed('London, UK');
getHumidity('London, UK');
getTime('London, UK');


