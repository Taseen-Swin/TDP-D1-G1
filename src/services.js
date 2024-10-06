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
}

module.exports = { Database };
