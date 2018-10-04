$(document).ready(function() {
  let thermostat = new Thermostat();

  let decreaseTemperature = function() {
    thermostat.down(1);
    updateDisplay();
  };

  let displayEnergyUsage = function() {
    $('#energy-usage').text(thermostat.energyUsage.apply(thermostat));
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

  $('#decrease-temperature').click(decreaseTemperature);
  $('#increase-temperature').click(increaseTemperature);
  $('input[name=power-save]:radio').change(function() {
    setPowerSave($("input:radio[name='power-save']:checked").val());
  });
  $('#reset').click(reset);

  updateDisplay();
});
