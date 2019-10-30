const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const port = 8080;
const host = 'localhost';

module.exports = {
    cors,
    port,
    host,
    express,
    morgan
}