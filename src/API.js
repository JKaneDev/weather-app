// fetch weather data from api by location, return weather data for location in an object
const API_KEY = '2b7df015d5d73cef01a306c61a9eb986';

async function fetchDataByLocation(location) {
	const _units = 'metric';
	const _location = location;

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${_location}&units=${_units}&appid=${API_KEY}`
	);
	const data = await response.json();
	const atmos = data['main'];
	const wind = data['wind'].speed;
	const temp = atmos['temp'];
	const humidity = atmos['humidity'];
	const feel = atmos['feels_like'];

	// console.log(data);
	// console.log(atmos);
	// console.log('temp', temp);
	// console.log('humidity', humidity);
	// console.log('feel', feel);
	// console.log('wind', wind);

	return data;
}

async function getWindSpeed(location) {
	const _data = await fetchDataByLocation(location);
	const windSpeed = _data['wind'].speed;
	console.log('wind', windSpeed);
}

async function getHumidity(location) {
    const _data = await fetchDataByLocation(location);
    const humidity = _data['main'].humidity;
    console.log('humidity', humidity);
}


export { fetchDataByLocation, getWindSpeed, getHumidity };
