describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://sos1617-03-rrm-sandbox-sos161703rrm.c9users.io/res/index.html');
		var results = element.all(by.repeater('dataUnit in data'));

		expect(results.count()).toBeGreaterThan(3);
	});
});