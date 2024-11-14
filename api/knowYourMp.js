// api/yourmp.js
const app = require('../index'); // Import the main Express app

module.exports = (req, res) => {
  req.url = `/yourmp${req.url}`;  // Adjust the URL to match your route in Express
  app(req, res);                   // Forward request to the main app
};
