var DEFAULT_TEMP = 20;
var MAX_TEMP_POWER_SAVE = 25;
var MAX_TEMP = 32;
var LOW_ENERGY = 18;
var HIGH_ENERGY = 25;

var Thermostat = function() {

  this.temperature = DEFAULT_TEMP;
  this.powerSave = true;

};

Thermostat.prototype.up = function(number) {
  var maxTemp = this._getMaxTemp()
  this.temperature += this._getIncrement(number, maxTemp)
};

Thermostat.prototype.down = function(number) {
  if (this.temperature - number < 10 ) {
    this.temperature = 10;
  } else {
    this.temperature -= number;
  }
};

Thermostat.prototype.reset = function() {
  this.temperature = DEFAULT_TEMP;
};


Thermostat.prototype._getMaxTemp = function() {
  return this.powerSave ? MAX_TEMP_POWER_SAVE : MAX_TEMP;
};

Thermostat.prototype._getIncrement = function(number, maxTemp) {
  if (this.temperature + number > maxTemp) {
    return maxTemp - this.temperature;
  } else {
    return number;
  }
};

Thermostat.prototype.energyUsage = function() {
  if (this.temperature < LOW_ENERGY) {
    return 'low-usage';
  } else if (this.temperature < HIGH_ENERGY) {
    return 'medium-usage';
  } else {
    return 'high-usage';
  };
};
