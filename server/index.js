const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const testsRouter = require('./routes/tests.routes');
const configsRouter = require('./routes/configs.routes');
const historyRouter = require('./routes/history.routes');

app.use('/tests', testsRouter);
app.use('/configs', configsRouter);
app.use('/history', historyRouter);

app.get("/healthcheck", (req, res) => {
    res.send("Health is good");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});