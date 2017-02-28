var Arrow = require('arrow');

var connectorModel = Arrow.createModel('connectorModel', {
    fields: {
        average_temp: { type: Number, required: true },
        max_temp: { type: Number, required: true },
        min_temp: { type: Number, required: true }
    },
    connector: 'com.connector.owa'
});

module.exports = connectorModel;