//Server side no ES2015 models e.g. require (node.js does not support)
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT);
