'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'list-models',
    urls: [
        {
            requests: [{
                method: 'POST',
                response: '/response-files/models-list.json'
            }]
        }
    ]
});
