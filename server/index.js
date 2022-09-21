const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
var cors = require('cors')
const moment = require("moment");

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/articles.js")(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});