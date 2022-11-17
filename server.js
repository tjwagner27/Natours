const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log('UHANDLED EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
