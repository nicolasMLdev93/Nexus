"use strict";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const route = require('./routes/routes');
const port = 3000;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use('/', route);
app.listen(port, () => {
    try {
        console.log(`App listening on port ${port}`);
    }
    catch (error) {
        console.log(`Error running server ${error}`);
    }
});
