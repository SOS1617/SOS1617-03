exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['T01-LoadEarlyleavers.js','T02-AddEarlyleaver.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};