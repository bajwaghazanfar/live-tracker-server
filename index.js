require("dotenv").config();
const express = require("express");
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
var cookieParser = require("cookie-parser");

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});
//Routers
const auth = require("./routes/auth-routes");
const dashboard = require("./routes/dashboard-routes");
//Middleware
const { cookieJwtAuth } = require("./middleware/cookie-jwt-auth");
const { updateTripPath } = require("./db/operations/POST");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/auth", auth);
app.use("/dashboard", cookieJwtAuth, dashboard);

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_notification", (data) => {
    socket.to(data.room).emit("listen_notification", data);
  });
  socket.on("stream_position", async (data) => {
    const tripID = data.trip;
    const coordinates = data.coordinates;
    await updateTripPath(tripID, coordinates);
    console.log("stream_Data", data);
    socket.to(data.room).emit("listen_position", data);
  });
});

server.listen(8080, () => {
  console.log("now running");
});
