const globalSetup = require("../global-setup");
const serverBasicAuth  = require("../../servers/basic-auth.js");
const app = globalSetup.app;
const chai = require("chai");
const expect = chai.expect;

describe("Calendar module", function () {

	this.timeout(20000);

	beforeEach(function (done) {
		app.start().then(function() { done(); } );
	});

	afterEach(function (done) {
		app.stop().then(function() { done(); });
	});

	describe("Default configuration", function() {
		before(function() {
			// Set config sample for use in test
			process.env.MM_CONFIG_FILE = "tests/configs/modules/calendar/default.js";
		});

		it("Should return TestEvents", function () {
			return app.client.waitUntilTextExists(".calendar", "TestEvent", 10000);
		});
	});


	describe("Basic auth", function() {
		before(function() {
			serverBasicAuth.listen(8010);
			// Set config sample for use in test
			process.env.MM_CONFIG_FILE = "tests/configs/modules/calendar/basic-auth.js";
		});

		it("Should return TestEvents", function () {
			return app.client.waitUntilTextExists(".calendar", "TestEvent", 10000);
		});
	});



});
