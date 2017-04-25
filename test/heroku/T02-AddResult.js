describe('Add result', function () {
	it('should add a new result', function (){
		browser.get('https://sos1617-03.herokuapp.com/res/index.html#!/');

		element.all(by.repeater('dataUnit in data')).then(function (initialResults){
				browser.driver.sleep(2000);
	
				element(by.model('newData.country')).sendKeys('Andorra');
				element(by.model('newData.year')).sendKeys('2014');
				element(by.model('newData.science')).sendKeys('300');
				element(by.model('newData.reading')).sendKeys('400');
				element(by.model('newData.math')).sendKeys('500');
				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (results){
						expect(results.length).toEqual(initialResults.length+1);
					});
				
				});
			
		});
	});
	
});