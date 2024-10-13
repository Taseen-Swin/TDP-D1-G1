// routes/html.route.js

const path = require('path');
const express = require('express');

class HtmlRoute {
    constructor(app) {
        // Set up routes for HTML pages
        this.setupRoutes(app);
    }

    setupRoutes(app) {
        // Serve the home page
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        });

        app.get('/dashboard', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/dashboard.html'));
        });
        app.get('/analytics', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/analytics.html'));
        });
        app.get('/reports', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/reports.html'));
        });




        // Catch-all route for undefined HTML pages
        app.get('*', (req, res) => {
            res.status(404).send('Page Not Found');
        });
    }
}

module.exports = { HtmlRoute };
