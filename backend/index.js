require('dotenv').config();
const express = require('express');
const connectToDB = require('./configs/DB.config');
const routes = require('./routes/index.routes')
const cors = require('cors')
const app = express();

connectToDB();

app.use(cors());
app.options('*', cors())

app.use(express.json())
app.use('/api', routes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is listening on port ${port}...`);
})