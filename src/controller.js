// controller.js


class Controller {
    constructor(database) {
        this.database = database// Create an instance of Database
    }

    // // Method to initialize the database connection
    // async init(configVars) {
    //     await this.database.init(configVars);
    // }

    // Method to insert a notification
    async createNotification(req, res) {
        const { malwareType, malwareName, timestamp } = req.body; // Extract data from request body

        // Validate input
        if (!malwareType || !malwareName || !timestamp) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        try {
            await this.database.insertNotification(malwareType, malwareName, new Date(timestamp));
            res.status(201).json({ message: 'Notification inserted successfully' });
        } catch (error) {
            console.error('Error inserting notification:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to insert a prediction report
    async createPredictionReport(req, res) {
        
      //  const { malwareType, malwareName, timestamp, description, flowId } = req.body; // Extract data from request body

        // Validate input
        if (!malwareType || !malwareName || !timestamp || !description || !flowId) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        try {
            await this.database.insertPredictionReport(malwareType, malwareName, new Date(timestamp), description, flowId);
            res.status(201).json({ message: 'Prediction report inserted successfully' });
        } catch (error) {
            console.error('Error inserting prediction report:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method for user login
    async login(req, res) {
        const { username, password } = req.body; // Extract data from request body

        console.log(username,password)
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        try {
            const userData = await this.database.login(username, password);
            if (userData.length > 0) {
                res.status(200).json({ message: 'Login successful', user: userData[0] });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to get user details
    async getUserDetails(req, res) {
        const userId = parseInt(req.params.userId); // Extract user ID from request parameters

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        try {
            const userDetails = await this.database.getUserDetails(userId);
            if (userDetails) {
                res.status(200).json(userDetails);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Get user details error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to get notifications list
    async getNotificationList(req, res) {
        try {
            const notifications = await this.database.getNotificationList();
            res.status(200).json(notifications); // Return notifications list
        } catch (error) {
            console.error('Get notifications list error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to get reports list
    async getReportsList(req, res) {
        try {
            const reports = await this.database.getReportsList();
            res.status(200).json(reports); // Return reports list
        } catch (error) {
            console.error('Get reports list error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to get single report by reportId
    async getSingleReport(req, res) {
        const reportId = parseInt(req.params.reportId); // Extract report ID from request parameters

        if (isNaN(reportId)) {
            return res.status(400).json({ error: 'Invalid report ID' });
        }

        try {
            const reportDetails = await this.database.getSingleReport(reportId);
            if (reportDetails) {
                res.status(200).json(reportDetails);
            } else {
                res.status(404).json({ error: 'Report not found' });
            }
        } catch (error) {
            console.error('Get single report error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { Controller };
