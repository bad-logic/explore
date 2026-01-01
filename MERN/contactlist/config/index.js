// importing modules
const express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var port = 8080;
var route = require('./../controllers/route');
module.exports = {
    express,
    app,
    mongoose,
    path,
    port,
    route
}