const http = require("http");

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  // Handle incoming requests
  console.log("requested in", new Date().toLocaleString());
  res.end("I'm alive");
});

// Set the server to listen on a specific port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
