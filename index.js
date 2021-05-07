const dotenv = require("dotenv");


require("colors");

const server = require('./server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`\n** Server is listening on port ${PORT}`.blue);
});