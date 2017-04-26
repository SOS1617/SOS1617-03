describe('Add data', function () {
	it('should add a new data', function (){
		browser.get('https://sos1617-03.herokuapp.com/#!/inve/');

		element.all(by.repeater('dataUnit in data')).then(function (initialInvestmentsEducation){
				browser.driver.sleep(2000);
	
				element(by.model('newData.country')).sendKeys('Letonia');
				element(by.model('newData.year')).sendKeys('2014');
				element(by.model('newData.population')).sendKeys('50');
				element(by.model('newData.riskpoverty')).sendKeys('20');
				element(by.model('newData.inveducation')).sendKeys('50000');
				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (investmentsEducation){
						expect(investmentsEducation.length).toEqual(initialInvestmentsEducation.length+1);
					});
				
				});
			
		});
	});
	
});