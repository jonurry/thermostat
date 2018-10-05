function WeatherAPI() {}

WeatherAPI.prototype.getCurrentTemperature = function(city, country, callback) {
	let apiKey = thermostatConfig['openWeatherMapAppID'];
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
	$.get(url, function(data) {
		callback(city, data.main.temp);
	});
};
