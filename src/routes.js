// routes.js

const { Controller } = require('./controller');

class Route {
    constructor(app, database) {
        // Initialize the controller and pass in the already initialized database instance
        this.controller = new Controller(database);

        // Set up the routes
        this.setupRoutes(app);
    }

    setupRoutes(app) {
        // Define routes for login
        app.route('/login')
            .post((req, res) => this.controller.login(req, res));

        // Define route for user details
        app.route('/users/:userId')
            .get((req, res) => this.controller.getUserDetails(req, res));

        // Define route for getting notifications list
        app.route('/notifications')
            .get((req, res) => this.controller.getNotificationList(req, res))
            .post((req, res) => this.controller.createNotification(req, res));

        // Define route for getting prediction reports
        app.route('/reports')
            .get((req, res) => this.controller.getReportsList(req, res));

        // Define route for getting a single report by ID
        app.route('/reports/:reportId')
            .get((req, res) => this.controller.getSingleReport(req, res));

        // Define route for creating a new prediction report
        app.route('/prediction-reports')
            .post((req, res) => this.controller.createPredictionReport(req, res));
    }
}

module.exports = { Route };
