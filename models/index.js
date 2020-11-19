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
    .connect(process.env.MONGODB_URI || connectionString, configOptions)
    .then(() => console.log("MongoDB successfully connected..."))
    .catch((err) => console.log((`MongoDB connection error: ${err}`)));


module.exports = {
    User: require('./User'),
    Artist: require('./Artist'),
    Manager: require('./Manager'),
    Teammate: require('./Teammate'),
    Agent: require('./Agent'),
    Company: require('./Company'),
    Agency: require('./Agency'),
    Tour: require('./Tour'),
    TourDate: require('./TourDate'),
    Thread: require('./Thread'),
    Comment: require('./Comment'),
    Todo: require('./Todo'),
}