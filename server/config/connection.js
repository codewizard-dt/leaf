const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://root:buttstuff69@localhost:27017/?authMechanism=DEFAULT',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: 'googlebooks'
  }
);

module.exports = mongoose.connection;
