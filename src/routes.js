// Import dependencies
const { Controller } = require('./controller');

class Route {

    constructor(app) {
        // Initialize the notification controller with configuration parameters
        this.controller = new Controller();

        // Set up routes
        this.setupRoutes(app);
    }

    setupRoutes(app) {
        app.route('/login')
            .post(this.controller.login);

    }
}

module.exports = { Route };
