const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
const routes = require("./routes");
const app = express();

// * Database connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

// * Cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

// const server = createServer(app);
// const io = new Server(server, { cors: { origin: "*", methods: "*" } });

// * Api routes
app.use("/api", routes);

app.get("/", (req, res) => {
  console.log("hello");
  res.send("Hello, Welcome");
  // console.log(io);
  // io.emit("csv", {
  //   message: "100% Done",
  // });
});

app.use("*", (req, res) => {
  res.send("Route not found");
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on PORT http://localhost:${PORT}`)
);
// io.on("connection", (socket) => {
//   console.log("New client connected with id: ", socket.id);

//   // to emit data to a certain client
//   // socket.emit("topic 1", "some data");

//   // collecting connected users in a array
//   // connectedUsers.push(socket)

//   socket.on("disconnect", (message) => {
//     console.log("Client disconnected with id: ", message);
//   });
// });

// server.listen(PORT, function () {
//   console.log(`server is running on http://localhost:${PORT}`);
// });
