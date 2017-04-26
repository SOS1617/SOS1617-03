describe('Data is loaded', function () {
	it('should show a bunch of data', function (){

		browser.get('https://sos1617-03.herokuapp.com//#!/inve/');


		var results = element.all(by.repeater('dataUnit in data'));

		expect(results.count()).toBeGreaterThan(3);
	});
});