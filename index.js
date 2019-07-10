const express = require('express');
const dataRoute = require('./data/data-route');
const server = express();

server.use(express.json());

server.use(dataRoute);

server.listen(4000, () => {
    console.log('** Server listening on port 4K **');
});