const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getJEOPARDY: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                if (result.length > 0) {
                    this.sendSocketNotification('JEOPARDY_RESULT', result);
                }
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_JEOPARDY') {
            this.getJEOPARDY(payload);
        }
    }
});