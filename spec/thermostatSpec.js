describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('Thermostat starts at 20', function() {
    expect(thermostat.temperature).toEqual(DEFAULT_TEMP);
  });

  it('can increase temperature', function() {
    thermostat.up(4)
    expect(thermostat.temperature).toEqual(24);
  });

  it('can decrease temperature', function() {
    thermostat.down(8)
    expect(thermostat.temperature).toEqual(12);
  });

  it('cannot go below 10', function() {
    thermostat.down(17)
    expect(thermostat.temperature).toEqual(10);
  });

  it('prevents temperatures above 25 when power save is on', function() {
    thermostat.powerSave = true
    thermostat.up(60)
    expect(thermostat.temperature).toEqual(MAX_TEMP_POWER_SAVE);
  });

  it('prevents temperatures above 32 when power save is off', function() {
    thermostat.powerSave = false
    thermostat.up(60)
    expect(thermostat.temperature).toEqual(MAX_TEMP);
  });

  it('reverts to 20 when reset button is pressed', function() {
    thermostat.up(4);
    thermostat.reset();
    expect(thermostat.temperature).toEqual(DEFAULT_TEMP);
  });

  describe('Energy Usage',function(){
    it('Identifies when temperature is low energy usage', function(){
      thermostat.temperature = LOW_ENERGY - 1;
      expect(thermostat.energyUsage()).toEqual('low-usage')
    });

    it('Identifies when temperature is medium energy usage', function(){
      expect(thermostat.energyUsage()).toEqual('medium-usage')
    });

    it('Identifies when temperature is high energy usage', function(){
      thermostat.temperature = HIGH_ENERGY;
      expect(thermostat.energyUsage()).toEqual('high-usage')
    });
  });

});
