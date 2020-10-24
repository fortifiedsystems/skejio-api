const mongoose = require('mongoose');

const connectionString =
    process.env.MONGODB_URI || "mongodb://localhost:27017/skejio";
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose
    .connect(connectionString, configOptions)
    .then(() => console.log("MongoDB successfully connected..."))
    .catch((err) => console.log((`MongoDB connection error: ${err}`)));


module.exports = {
    Artist: require('./users/Artist'),
    Manager: require('./users/Manager'),
    Teammate: require('./users/Teammate'),
    Tour: require('./Tour'),
    TourDate: require('./TourDate'),
    Thread: require('./Thread'),
    Comment: require('./Comment'),
}