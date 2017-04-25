describe('Add data', function () {
	it('should add a new data', function (){
		browser.get('https://sos1617-03-irg-sanbox-sos161703irg.c9users.io/inve/index.html');

		element.all(by.repeater('dataUnit in data')).then(function (initialResults){
				browser.driver.sleep(2000);
	
				element(by.model('newData.country')).sendKeys('Letonia');
				element(by.model('newData.year')).sendKeys('2014');
				element(by.model('newData.population')).sendKeys('50');
				element(by.model('newData.riskpoverty')).sendKeys('20');
				element(by.model('newData.inveducation')).sendKeys('50000');
				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (results){
						expect(results.length).toEqual(initialResults.length+1);
					});
				
				});
			
		});
	});
	
});