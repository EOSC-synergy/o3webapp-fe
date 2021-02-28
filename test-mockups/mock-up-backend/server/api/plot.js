'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'plot',
    urls: [
        {
            requests: [{
                method: 'POST',
                response: '/response-files/plot_mockup.json'
            }]
        }
    ]
});
