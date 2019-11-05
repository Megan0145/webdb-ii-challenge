const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.json("Welcome!")
})

module.exports = server;