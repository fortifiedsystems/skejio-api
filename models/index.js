const mongoose = require('mongoose');
require('dotenv').config()

const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose
    .connect(process.env.MONGODB_URI, configOptions)
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
    Invite: require('./Invite'),
    Mgmt: require('./Mgmt'),
    Notification: require('./Notification'),
    Notifs: require('./notifications'),
    Image: require('./Image'),
    Tour: require('./Tour'),
    Tourdate: require('./TourDate'),
    Thread: require('./Thread'),
    Comment: require('./Comment'),
    Todo: require('./Todo'),
    Report: require('./Report'),
    Venue: require('./Venue'),
    MerchItem: require('./MerchItem'),
}