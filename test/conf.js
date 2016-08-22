exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: { 'browserName': 'chrome' },
    baseUrl : 'http://localhost:3000/',
    specs: ['*.spec.js'],
    allScriptsTimeout: 120000,
    getPageTimeout: 120000,
    jasmineNodeOpts: { showColors: true }
};