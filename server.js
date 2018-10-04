const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.Port || 3000;


require('./db/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: false,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const scoreController = require('./controllers/score');

app.use("/", scoreController);




app.listen(port, () => {
    console.log('i am watching.... on' + port)
});
