writeFile file: 'index.js', text: '''
const express = require('express');
const os = require('os');
const app = express();
const port = 80;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});

// Home Route
app.get('/', (req, res) => {
    res.send("Welcome to Wonders Beauty Node.js Application running inside Docker!");
});

// Health Check Route
app.get('/health', (req, res) => {
    res.json({
        status: "UP",
        message: "Application is running successfully",
        timestamp: new Date()
    });
});

// System Information Route
app.get('/system', (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpus: os.cpus().length,
        uptime: os.uptime(),
        memory: os.totalmem()
    });
});

// Users API (Example)
let users = [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" }
];

// Get All Users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get Single User
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

// Add New User
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// Update User
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json({
        message: "User updated",
        user
    });
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);

    res.json({
        message: "User deleted successfully"
    });
});

// Application Info Route
app.get('/about', (req, res) => {
    res.send({
        application: "Wonders Beauty App",
        version: "1.0.0",
        developer: "DevOps Pipeline",
        description: "Sample Node.js application deployed using Jenkins and Docker"
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message
    });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start Server
app.listen(port, () => {
    console.log("====================================");
    console.log(" Wonders Beauty Application Started ");
    console.log(" Server running on port:", port);
    console.log(" Access: http://localhost:" + port);
    console.log("====================================");
});
'''
