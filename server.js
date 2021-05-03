const express = require('express');
const cors = require('cors');

require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

const authRequired = require('./middleware/authRequired');

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/mgmt', authRequired, routes.mgmt);
app.use('/api/v1/agencies', authRequired, routes.agencies);
app.use('/api/v1/comments', authRequired, routes.comments);
app.use('/api/v1/tours', authRequired, routes.tours);
app.use('/api/v1/images', authRequired, routes.images);
app.use('/api/v1/notifications', authRequired, routes.notifications);
app.use('/api/v1/threads', authRequired, routes.threads);
app.use('/api/v1/tourdates', authRequired, routes.tourdates);
app.use('/api/v1/todos', authRequired, routes.todos);
app.use('/api/v1/user', authRequired, routes.user);
app.use('/api/v1/venues', authRequired, routes.venues);
app.use('/api/v1/merch', authRequired, routes.merch);

// connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})