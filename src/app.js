const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const { Route } = require('./routes');
const { HtmlRoute } = require('./html-routes')

// // Import services
// const { DbService } = require('./services');

class ExpressServer {
    constructor() {
        this.config = {};
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // Serve static files like HTML, CSS, and JS from 'public' folder

        this.app.use(express.static('../public'));
    }



    async setup() {

        // Use the HTML route to serve static pages
        new HtmlRoute(this.app);

        new Route(this.app);

        // await DbService.init(
        //     this.config.DB,
        //     this.config.SUBSCRIPTION_SERVICE_URL,
        //     this.config.EMAIL_USER,
        //     this.config.EMAIL_PASS,
        //     this.config.EMAIL_HOST,
        //     this.config.ENV
        // );

        // Start the server
        this.app.listen(8000, () => {
            console.log('Server is up and running at Port: 8000');
        });

    }
    getApp() {
        return this.app;
    }

}


module.exports = { ExpressServer };