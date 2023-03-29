// Import library
const express = require("express");
const cors = require("cors");
const myParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Import component
const db = require("./config/db");
const route = require("./routes");

// Config server
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(myParser.json({ limit: "200mb" }));
app.use(myParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Connect to db
db.connect();

// Set up routes
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
