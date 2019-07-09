const express = require('express');
const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    
});

server.listen(4000, () => {
    console.log('/n** Server listening on port 4K **/n');
});