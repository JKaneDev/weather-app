import styles from '../styles/styles.scss'
import searchIcon from '../assets/search.svg';
import { addListeners } from './Display.js'
import {
	fetchDataByLocation,
	getWindSpeed,
	getHumidity,
	getCurrentWeather,
	getTime,
	getRealFeel,
    getHourlyInfo,
    getDailyInfo
} from './API';

document.addEventListener('DOMContentLoaded', addListeners);

