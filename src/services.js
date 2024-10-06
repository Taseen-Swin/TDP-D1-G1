// database.js

const sql = require('mssql'); // Import the mssql package

class Database {
    constructor() {
        this.databasePool = null;
        this.subscriptionService = null;
        this.sqlConfig = {};
    }

    async init(configVars) {

        // Configure SQL connection
        this.sqlConfig = {
            user: configVars.USER,
            password: configVars.PASS,
            database: configVars.NAME,
            server: configVars.HOST,
            pool: {
                max: 50,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                // encrypt: true, // for Azure, uncomment this line if using Azure
                trustServerCertificate: true // Change to true for local development or self-signed certificates
            }
        };

        try {
            // Connect to the database
            this.databasePool = await sql.connect(this.sqlConfig);
            console.log('Database connected');
        } catch (error) {
            console.error('Database connection failed:', error);
            throw new Error('Database connection failed');
        }

    }
        // Method for admin/user login
        async login(username, password) {
            try {
                const request = this.databasePool.request();
                const result = await request
                    .input('username', sql.VarChar, username)
                    .input('password', sql.VarChar, password)
                    .query('SELECT * FROM Users WHERE username = @username AND password = @password');
    
                return result.recordset; // Return user data
            } catch (error) {
                console.error('Login error:', error);
                throw new Error('Login failed');
            }
        }
    
        // Get user details
        async getUserDetails(userId) {
            try {
                const request = this.databasePool.request();
                const result = await request
                    .input('userId', sql.Int, userId)
                    .query('SELECT * FROM Users WHERE id = @userId');
    
                return result.recordset[0]; // Return single user data
            } catch (error) {
                console.error('Get user details error:', error);
                throw new Error('Failed to get user details');
            }
        }
    
        // Get reports list
        async getReportsList() {
            try {
                const request = this.databasePool.request();
                const result = await request.query('SELECT * FROM Reports');
    
                return result.recordset; // Return reports list
            } catch (error) {
                console.error('Get reports list error:', error);
                throw new Error('Failed to get reports list');
            }
        }
    
        // Get single report by reportId
        async getSingleReport(reportId) {
            try {
                const request = this.databasePool.request();
                const result = await request
                    .input('reportId', sql.Int, reportId)
                    .query('SELECT * FROM Reports WHERE id = @reportId');
    
                return result.recordset[0]; // Return single report data
            } catch (error) {
                console.error('Get single report error:', error);
                throw new Error('Failed to get single report');
            }
        }
    
        // Get notifications list
        async getNotificationList() {
            try {
                const request = this.databasePool.request();
                const result = await request.query('SELECT * FROM Notifications');
    
                return result.recordset; // Return notifications list
            } catch (error) {
                console.error('Get notifications list error:', error);
                throw new Error('Failed to get notifications list');
            }
        }
    
    


}

module.exports = { Database };
