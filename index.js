const express = require('express');
const bodyParser = require('body-parser');
const User = require('./routes/user')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api/user', User)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

