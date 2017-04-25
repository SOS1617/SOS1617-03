describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://sos1617-03.herokuapp.com/#!/esl');
		var eslDataList = element.all(by.repeater('dataUnit in data'));
		expect(eslDataList.count()).toBeGreaterThan(1);
	});
});