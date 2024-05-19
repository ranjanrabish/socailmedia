const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/posts', require('./routes/post'));
app.use('/comments', require('./routes/comment'));
app.use('/likes', require('./routes/like'));

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
