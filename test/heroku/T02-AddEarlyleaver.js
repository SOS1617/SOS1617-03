describe('Add result', function () {
	it('should add a new result', function (){
		browser.get('https://sos1617-03.herokuapp.com/esl/index.html#!/');

		element.all(by.repeater('dataUnit in data')).then(function (initialEarlyleavers){
				browser.driver.sleep(2000);
	
				element(by.model('newData.country')).sendKeys('Andorra');
				element(by.model('newData.year')).sendKeys('2014');
				element(by.model('newData.eslmale')).sendKeys('20');
				element(by.model('newData.eslfemale')).sendKeys('30');
				element(by.model('newData.esltotal')).sendKeys('25');
				element(by.model('newData.eslobjective')).sendKeys('20');
				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (earlyleavers){
						expect(earlyleavers.length).toEqual(initialEarlyleavers.length+1);
					});
				
				});
			
		});
	});
	
});