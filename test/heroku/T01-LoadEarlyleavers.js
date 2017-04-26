describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://sos1617-03.herokuapp.com/#!/esl/');
		var earlyleavers = element.all(by.repeater('dataUnit in data'));

		expect(earlyleavers.count()).toBeGreaterThan(2);
	});
});