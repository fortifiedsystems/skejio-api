const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/companies', routes.companies);
app.use('/api/v1/user', routes.user);

// connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})