const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

let connect = () => {
  if (process.env.Node_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose
    const mockgoose = new Mockgoose(mongoose)
    mockgoose.prepareStorage().then(() => {
      mongoose
        .connect(DB, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        })
        .then(() => console.log('Mock DB connection successful!'));
    })
  } else {
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => console.log('DB connection successful!'));
  }

}

let closeConn = () => {
  mongoose.connection.close()
}
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
connect()

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});


module.exports = { connect, closeConn }
