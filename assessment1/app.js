const express = require('express');
require('./connection/connection');
const bodyParser = require('body-parser');
const router = require('./router/userRouter');
const app = express();
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(9000);
