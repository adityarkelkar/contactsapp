const http = require('http'); // Require the http interface
const app = require('./app'); // Require a js module defined in the file called app.js
const port = process.env.PORT || 3000; // Pass env variable for port no. If not passed, use default as 3000

const server = http.createServer(app); // Create a server using the app module required above
server.listen(port); // Port number listener