// database.js

const sql = require('mssql'); // Import the mssql package

class DatabaseService {
    constructor() {
        this.databasePool = null;
        this.subscriptionService = null;
        this.sqlConfig = {};
    }

    async init() {

        // Configure SQL connection
        this.sqlConfig = {
            user: 'sa',
            password: 'Password123',
            database: 'MalwareAnalysis',
            server: 'localhost',
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
                    .query('SELECT id,username,user_type FROM users WHERE username = @username AND password = @password');
    
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
                    .query('SELECT * FROM users WHERE id = @userId');
    
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
                const result = await request.query('SELECT id,malware_type,malware_name,datetime FROM prediction_report ORDER BY id DESC;');
    
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
                    .query('SELECT * FROM prediction_report WHERE id = @reportId');
    
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
                const result = await request.query('SELECT * FROM notifications');
    
                return result.recordset; // Return notifications list
            } catch (error) {
                console.error('Get notifications list error:', error);
                throw new Error('Failed to get notifications list');
            }
        }
        async insertNotification(malwareType, malwareName, timestamp) {
            try {
                const request = this.databasePool.request();
                
                // Prepare the insert query
                const query = `
                    INSERT INTO notification (malware_type, malware_name, datetime)
                    VALUES (@malwareType, @malwareName, @timestamp);
                `;
                
                // Add parameters to the request
                request.input('malwareType', sql.VarChar, malwareType);
                request.input('malwareName', sql.VarChar, malwareName);
                request.input('timestamp', sql.DateTime, timestamp);
                
                // Execute the query
                await request.query(query);
                
                console.log('Notification inserted successfully');
            } catch (error) {
                console.error('Insert notification error:', error);
                throw new Error('Failed to insert notification');
            }
        }
        
        async insertPredictionReport(malwareType, malwareName, timestamp, description, flowId) {
            try {
                const request = this.databasePool.request();
                
                // Prepare the insert query
                const query = `
                    INSERT INTO prediction_report (malware_type, malware_name, datetime, description, flow_id)
                    VALUES (@malwareType, @malwareName, @timestamp, @description, @flowId);
                `;
                
                // Add parameters to the request
                request.input('malwareType', sql.VarChar, malwareType);
                request.input('malwareName', sql.VarChar, malwareName);
                request.input('timestamp', sql.DateTime, timestamp);
                request.input('description', sql.VarChar, description);
                request.input('flowId', sql.Int, flowId);
                
                // Execute the query
                await request.query(query);
                
                console.log('Prediction report inserted successfully');
            } catch (error) {
                console.error('Insert prediction report error:', error);
                throw new Error('Failed to insert prediction report');
            }
        }
        
    
    


}

module.exports = { DatabaseService };
