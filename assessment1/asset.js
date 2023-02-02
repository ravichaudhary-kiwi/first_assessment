const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
require('./connection/connection');
const bodyParser = require('body-parser');
const router = require('./router/userRouter');
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(9000);


 