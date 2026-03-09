const express = require("express");
const os = require("os");

const app = express();
const port = 80;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});

// Home
app.get("/", (req, res) => {
    res.send("Welcome to Wonders Beauty Node.js Application running inside Docker!");
});

// Health
app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Application is running successfully",
        timestamp: new Date()
    });
});

// System
app.get("/system", (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpus: os.cpus().length,
        uptime: os.uptime(),
        memory: os.totalmem()
    });
});

let users = [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" }
];

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

app.post("/api/users", (req, res) => {
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

app.put("/api/users/:id", (req, res) => {
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

app.delete("/api/users/:id", (req, res) => {
    users = users.filter(u => u.id != req.params.id);

    res.json({
        message: "User deleted successfully"
    });
});

app.get("/about", (req, res) => {
    res.json({
        application: "Wonders Beauty App",
        version: "1.0.0",
        developer: "DevOps Pipeline",
        description: "Sample Node.js application deployed using Jenkins and Docker"
    });
});

app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(port, () => {
    console.log("====================================");
    console.log(" Wonders Beauty Application Started ");
    console.log(" Server running on port:", port);
    console.log(" Access: http://localhost:" + port);
    console.log("====================================");
});
'''
