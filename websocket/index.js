const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const data = [
  {
    waypoints: [
      {
        coordinates: [-1.8607955793858177, 52.454110192240336],
        timestamp: 0,
      },
      {
        coordinates: [-1.8603557455112378, 52.45342367784741],
        timestamp: 5000,
      },

      {
        coordinates: [-1.8583221573540762, 52.45408335622949],
        timestamp: 10000,
      },
      {
        coordinates: [-1.8583493975153431, 52.454070881118795],
        timestamp: 15000,
      },
      {
        coordinates: [-1.858059608878418, 52.45492736419688],
        timestamp: 20000,
      },
      {
        coordinates: [-1.8559676234813156, 52.4537634592201],
        timestamp: 25000,
      },
      {
        coordinates: [-1.85399349817692, 52.45292020290499],
        timestamp: 30000,
      },
      {
        coordinates: [-1.8532103781055966, 52.45210288590763],
        timestamp: 35000,
      },
      {
        coordinates: [-1.8471385374123424, 52.44926481870231],
        timestamp: 40000,
      },
    ],
  },
];

io.on("connection", (socket) => {
  console.log("a user connected");

  // socket.on("send-pos", (message) => {
  //   console.log(message);
  //   socket.broadcast.emit("recieved-pos", message);
  // });
  const array = data[0].waypoints;

  var index = 0;
  var interval = setInterval(function () {
    const element = array[index++];
    socket.broadcast.emit("recieved-pos", element);
    if (index == array.length) {
      clearInterval(interval);
    }
  }, 10000);
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  //   if (index < array.length) {
  //     setTimeout(() => {
  //       socket.broadcast.emit("recieved-pos", element);
  //       console.log(element, index);
  //       index++;
  //     }, 10000);
  //   }
  // }
});

http.listen(8080, () => console.log("listening on http://localhost:8080"));

// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });
