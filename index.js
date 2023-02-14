"use strict";
const express = require("express");
const bodyParser = require("body-parser");
// const config = require("./config");
const blogRoutes = require("./routes/blog-routes");
const userRoutes = require("./routes/user-routes");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", blogRoutes.routes);
app.use("/api", userRoutes.routes);

app.listen(8080, () =>
  console.log("App is listening on url http://localhost:" + 8080)
);
