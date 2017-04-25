describe('Add a esl entity', function() {
	it('should add a new esl entity', function() {
		browser.get('https://sos1617-03.herokuapp.com/#!/gdp');

		element.all(by.repeater('dataUnit in data')).then(function(initialEslDataList) {
			browser.driver.sleep(2000);

			element(by.model('newData.country')).sendKeys('Germany');
			element(by.model('newData.year')).sendKeys('2012');
			element(by.model("newData['eslmale']")).sendKeys('20');
			element(by.model("newData['eslfemale']")).sendKeys('30');
			element(by.model("newData['esltotal']")).sendKeys('25');
			element(by.model("newData['eslobjective']")).sendKeys('23');
			
			// element(by.model('newData.country')).sendKeys('Poland');
			// element(by.model('newData.year')).sendKeys('2014');
			// element(by.model("newData['gdp']")).sendKeys('545158979236');
			// element(by.model("newData['gdp_growth']")).sendKeys('3.3');
			// element(by.model("newData['gdp_deflator']")).sendKeys('106.5');
			
			// element(by.model('newData.country')).sendKeys('Morocco');
			// element(by.model('newData.year')).sendKeys('2015');
			// element(by.model("newData['gdp']")).sendKeys('100593283696.7');
			// element(by.model("newData['gdp_growth']")).sendKeys('4.5');
			// element(by.model("newData['gdp_deflator']")).sendKeys('108.9');
			
			

			element(by.buttonText('add')).click().then(function() {

				element.all(by.repeater('dataUnit in data')).then(function(eslDataList) {
					expect(eslDataList.length).
					toEqual(initialEslDataList.length + 1);
				});

			});

		});
	});
});