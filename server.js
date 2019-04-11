var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors')
var port = process.env.port || 3000;
var app = express();

const DomainList = require("./routes");
const DomainProperies = require("./routes");
const Document = require("./routes");
const DocumentList = require("./routes");
const dotenv = require("dotenv");
require('dotenv').config();
var mongooseUrl = require("mongoose");

mongooseUrl
    .connect(
        "mongodb://localhost/domain", { useNewUrlParser: true }
    )
    .then(() => console.log("mongoose connected"))
    .catch(err => console.log("Error:" + err));

// middleware    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



// all routes
app.use("/api", DomainProperies);
app.use("/api", DomainList);
app.use("/api", DocumentList);
app.use("/api", Document);

app.listen(port, () => {
    console.log("server started");
});