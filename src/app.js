const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import routes
const { Route } = require('./routes');
const { HtmlRoute } = require('./html-routes');
const { MLService } = require('./ml-service');

// Import services
const { DatabaseService } = require('./services');

class ExpressServer {
    constructor() {
        this.config = {}; // Define the config variable
        this.app = express();

        // Use middleware
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use('/js', express.static(path.join(__dirname, 'public/js')));

        // Database service instance
        this.database = new DatabaseService(); // Moved inside the class for better scoping

        // Serve static files
        // this.app.use(express.static('../public'));
    }

    async setup() {
        try {
 
            // Initialize database connection
            await this.database.init();
            console.log('Database connected successfully');

            // Set up routes
            new Route(this.app,this.database);
            new HtmlRoute(this.app);

            // Start the server
            this.app.listen(8000, () => {
                console.log('Server is up and running at Port: 8000');
            });

        } catch (error) {
            console.error('Error during server setup:', error);
        }
    }

    getApp() {
        return this.app;
    }
}

module.exports = { ExpressServer };
