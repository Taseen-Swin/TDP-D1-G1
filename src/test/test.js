// __tests__/route.test.js

const request = require('supertest');
const { ExpressServer } = require('../app');
const { Database } = require('../database');

describe('Route Tests with Real Database', () => {
    let app;
    let db;

    beforeAll(async () => {
        // Initialize the real database connection
        db = new Database();
        await db.init({
            USER: process.env.DB_USER,
            PASS: process.env.DB_PASS,
            NAME: process.env.DB_NAME,
            HOST: process.env.DB_HOST
        });

        // Set up the Express server
        const server = new ExpressServer();
        await server.setup(); // Initialize the server with real database
        app = server.getApp();
    });

    afterAll(async () => {
        // Close database connection after tests
        await db.close();
    });

    it('POST /login should login user with valid credentials', async () => {
        const username = 'admin_user'; // Ensure this user exists in your DB
        const password = 'admin_pass'; // Ensure this is the correct password

        const response = await request(app)
            .post('/login')
            .send({ username, password });

        expect(response.status).toBe(200);
        expect(response.body.username).toBe(username);
        expect(response.body.user_type).toBe('Admin'); // Adjust based on your DB data
    });

    it('POST /login should return 401 for invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'wrong_user', password: 'wrong_pass' });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid credentials');
    });

    it('GET /notifications should return notifications list', async () => {
        const response = await request(app).get('/notifications');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        // Optionally, you can check for specific properties in the notifications
    });

    it('GET /reports should return reports list', async () => {
        const response = await request(app).get('/reports');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        // Optionally, you can check for specific properties in the reports
    });

    it('POST /notifications should insert a new notification', async () => {
        const notificationData = {
            malwareType: 'Virus',
            malwareName: 'ExampleMalware',
            timestamp: new Date().toISOString()
        };

        const response = await request(app)
            .post('/notifications')
            .send(notificationData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Notification inserted successfully');
    });

    it('POST /reports should insert a new prediction report', async () => {
        const reportData = {
            malwareType: 'Trojan',
            malwareName: 'ExampleTrojan',
            timestamp: new Date().toISOString(),
            description: 'This is a test description.',
            flowId: 1 // Adjust this according to your test data
        };

        const response = await request(app)
            .post('/reports')
            .send(reportData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Prediction report inserted successfully');
    });

    // Add more tests as needed...
});
