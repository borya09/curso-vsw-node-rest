/** * Module dependencies. */var express = require('express');var gastos = require('./routes/gastos');var http = require('http');var path = require('path');var mongo = require('mongodb');var monk = require('monk');var db = monk('localhost:27017/gastos');var httpHeaders = {    "Access-Control-Allow-Origin":"*",    "Access-Control-Allow-Methods":"POST, GET, PUT, DELETE, OPTIONS",    "Access-Control-Allow-Headers":"Content-Type",    "Content-Type":"application/json"};var app = express();// all environmentsapp.set('port', process.env.PORT || 3000);app.use(express.logger('dev'));app.use(express.urlencoded());app.use(express.json());app.use(express.methodOverride());app.use(app.router);// development onlyif ('development' == app.get('env')) {    app.use(express.errorHandler());}app.all('/*',function(req, res, next) {    for (var header in httpHeaders){        if (httpHeaders.hasOwnProperty(header)){            res.setHeader(header, httpHeaders[header]);        }    }    next();});gastos.setDatabase(db);app.get('/gastos', gastos.list);app.post('/gastos', gastos.add);app.put('/gastos/:id', gastos.update);app.delete('/gastos/:id', gastos.remove);http.createServer(app).listen(app.get('port'), function(){    console.log('Express server listening on port ' + app.get('port'));});