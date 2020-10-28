const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/tours', routes.tours);
app.use('/api/v1/dates', routes.tourDate);
app.use('/api/v1/threads', routes.threads);
app.use('/api/v1/comments', routes.comments);
app.use('/api/v1/todos', routes.todos);
app.use('/api/v1/users', routes.users);

// connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})