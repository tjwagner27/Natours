require('dotenv').config();

console.log(process.env);
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UHANDLED EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
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
