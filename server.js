const express = require('express');
const cors = require('cors');
const { cloudinary } = require('./utils/cloudinary');

require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/mgmt', routes.mgmt);
app.use('/api/v1/agencies', routes.agencies);
app.use('/api/v1/tours', routes.tours);
app.use('/api/v1/images', routes.images);
app.use('/api/v1/threads', routes.threads);
app.use('/api/v1/tourdates', routes.tourdates);
app.use('/api/v1/todos', routes.todos);
app.use('/api/v1/user', routes.user);

// connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})