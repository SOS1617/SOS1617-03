exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['T01-LoadResults.js','T02-AddResult.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};