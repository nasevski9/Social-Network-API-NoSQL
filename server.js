const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('once', () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    });
});