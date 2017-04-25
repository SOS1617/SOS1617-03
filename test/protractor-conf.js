exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['T01-LoadResources.js','T02-AddResource.js','T01-LoadInvestments.js','T02-AddInvestment.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};