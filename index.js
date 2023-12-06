const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { connection } = require("./src/database/db.js")


// Connect to database
connection();

// Create express app
const app = express();
const port = 4000;

// Middlewares
app.use(cors());
app.use(express.json()); // use body as js object
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
    res.status(200).send(
        "<h1>Nodejs React Blog App</h1>"
    );
});

app.get("/test", (req, res) => {
    console.log("test route");

    res.status(200).json({
        msg: "hello!"
    });
});

// Create server and listen 
app.listen(port, () => {
    console.log("Server running on port " + port);
});