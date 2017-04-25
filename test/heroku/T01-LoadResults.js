describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080/#!/results');
		var results = element.all(by.repeater('dataUnit in data'));

		expect(results.count()).toBeGreaterThan(3);
	});
});