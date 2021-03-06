$(document).ready(function() {
	let thermostat = new Thermostat();

	let decreaseTemperature = function() {
		thermostat.down(1);
		updateDisplay();
	};

	let displayEnergyUsage = function() {
		let energyUsage = thermostat.energyUsage.apply(thermostat);
		$('#energy-usage').text(energyUsage);
		$('#energy-usage').attr('class', energyUsage);
	};

	let displayTemperature = function() {
		$('#current-temperature').text(thermostat.temperature + '°C');
	};

	let increaseTemperature = function() {
		thermostat.up(1);
		updateDisplay();
	};

	let reset = function() {
		thermostat.reset();
		updateDisplay();
	};

	let setPowerSave = function(value) {
		if (value === 'on') {
			thermostat.powerSaveOn();
		} else {
			thermostat.powerSaveOff();
		}
		updateDisplay();
	};

	let updateDisplay = function() {
		displayTemperature();
		displayEnergyUsage();
	};

	let updateCityTemperature = function(city, temperature) {
		$('#city-temperature').text(temperature + '°C');
	};

	let getCityTemperature = function(city, country) {
		new WeatherAPI().getCurrentTemperature(
			city,
			country,
			updateCityTemperature
		);
	};

	$('#decrease-temperature').click(decreaseTemperature);
	$('#increase-temperature').click(increaseTemperature);
	$('input[name=power-save]:radio').change(function() {
		setPowerSave($('input:radio[name=\'power-save\']:checked').val());
	});
	$('#reset').click(reset);

	$('#city').change(function(event) {
		event.preventDefault();
		var city = $('#city option:selected').text();
		var country = $('#city  option:selected').val();
		getCityTemperature(city, country);
	});

	getCityTemperature('London', 'uk');
	updateDisplay();
});
