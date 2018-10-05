describe('Thermostat', function() {
	var thermostat;

	beforeEach(function() {
		thermostat = new Thermostat();
	});

	describe('constructor', function() {
		it('thermostat starts at 20 degrees celsius', function() {
			expect(thermostat.temperature).toEqual(DEFAULT_TEMP);
		});
	});

	describe('up', function() {
		it('can increase temperature', function() {
			thermostat.up(4);
			expect(thermostat.temperature).toEqual(24);
		});

		describe('power save on', function() {
			it('prevents temperatures above 25 when power save is on', function() {
				thermostat.powerSaveOn();
				thermostat.up(60);
				expect(thermostat.temperature).toEqual(MAX_TEMP_POWER_SAVE);
			});
		});

		describe('power save off', function() {
			it('prevents temperatures above 32 when power save is off', function() {
				thermostat.powerSaveOff();
				thermostat.up(60);
				expect(thermostat.temperature).toEqual(MAX_TEMP);
			});
		});
	});

	describe('down', function() {
		it('can decrease temperature', function() {
			thermostat.down(8);
			expect(thermostat.temperature).toEqual(12);
		});

		it('cannot go below 10', function() {
			thermostat.down(17);
			expect(thermostat.temperature).toEqual(10);
		});
	});

	describe('reset', function() {
		it('reverts to 20 when reset button is pressed', function() {
			thermostat.up(4);
			thermostat.reset();
			expect(thermostat.temperature).toEqual(DEFAULT_TEMP);
		});
	});

	describe('energy usage', function() {
		it('identifies when temperature is low energy usage', function() {
			thermostat.temperature = LOW_ENERGY - 1;
			expect(thermostat.energyUsage()).toEqual('low-usage');
		});

		it('identifies when temperature is medium energy usage', function() {
			expect(thermostat.energyUsage()).toEqual('medium-usage');
		});

		it('identifies when temperature is high energy usage', function() {
			thermostat.temperature = HIGH_ENERGY;
			expect(thermostat.energyUsage()).toEqual('high-usage');
		});
	});

	describe('powerSaveOn', function() {
		it('switches power save on', function() {
			thermostat.powerSave = false;
			thermostat.powerSaveOn();
			expect(thermostat.powerSave).toEqual(true);
		});
		it('enforces upper limit for temperature', function() {
			thermostat.temperature = 30;
			thermostat.powerSaveOn();
			expect(thermostat.temperature).toEqual(MAX_TEMP_POWER_SAVE);
		});
	});

	describe('powerSaveOff', function() {
		it('switches power save off', function() {
			thermostat.powerSave = true;
			thermostat.powerSaveOff();
			expect(thermostat.powerSave).toEqual(false);
		});
	});
});
