// mockDatabase.js

class MockDatabase {
    constructor() {
        this.users = [
            { id: 1, username: 'admin_user', password: 'admin_pass', user_type: 'Admin' },
            { id: 2, username: 'regular_user', password: 'user_pass', user_type: 'User' }
        ];

        this.notifications = [
            { id: 1, malware_type: 'Ransomware', malware_name: 'WannaCry', datetime: new Date() },
            { id: 2, malware_type: 'Spyware', malware_name: 'Adwind', datetime: new Date() }
        ];

        this.predictionReports = [
            { id: 1, malware_type: 'Virus', malware_name: 'ILOVEYOU', datetime: new Date(), description: 'Infected system', flow_id: 1001 },
            { id: 2, malware_type: 'Worm', malware_name: 'MyDoom', datetime: new Date(), description: 'Email attachment', flow_id: 1002 }
        ];
    }

    // Simulate login
    async login(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        return user ? [user] : [];
    }

    // Simulate getting notifications
    async getNotificationList() {
        return this.notifications;
    }

    // Simulate inserting a notification
    async insertNotification(notification) {
        this.notifications.push({ id: this.notifications.length + 1, ...notification });
        return true; // Simulate successful insertion
    }

    // Simulate getting reports
    async getReportsList() {
        return this.predictionReports;
    }

    // Simulate inserting a prediction report
    async insertPredictionReport(report) {
        this.predictionReports.push({ id: this.predictionReports.length + 1, ...report });
        return true; // Simulate successful insertion
    }
}

module.exports = { MockDatabase };
