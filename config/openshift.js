#!/bin/env node
var express = require('express');
var fs      = require('fs');

 module.exports = function(app) {

    app.setupVariables = function() {
        //  Set the environment variables we need.
        app.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        app.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof app.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            app.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    /*app.populateCache = function() {
        if (typeof app.zcache === "undefined") {
            app.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        app.zcache['index.html'] = fs.readFileSync('./index.html');
    };*/


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    //app.cache_get = function(key) { return app.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    app.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    app.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { app.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { app.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    /*app.createRoutes = function() {
        app.routes = { };

        app.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        app.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(app.cache_get('index.html') );
        };
    };*/


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    /*app.initializeServer = function() {
        app.createRoutes();
        app.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in app.routes) {
            app.app.get(r, app.routes[r]);
        }
    };*/


    /**
     *  Initializes the sample application.
     */
    app.initialize = function() {
        app.setupVariables();
        app.populateCache();
        app.setupTerminationHandlers();

        // Create the express server and routes.
        app.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    app.start = function() {
        //  Start the app on the specific interface (and port).
        app.app.listen(app.port, app.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), app.ipaddress, app.port);
        });
    };

};   /*  Sample Application.  */
