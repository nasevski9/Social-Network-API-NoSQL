const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetworkDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection
