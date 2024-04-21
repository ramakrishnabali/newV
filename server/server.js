// const express = require("express")
// const http = require("http")
// const app = express()
// const server = http.createServer(app)

// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "http://localhost:3001",
// 		methods: [ "GET", "POST" ]
// 	}
// })

// io.on('connection', socket => {
//   console.log('New client connected');

//   socket.on('offer', offer => {
//     socket.broadcast.emit('offer', offer);
//   });

//   socket.on('answer', answer => {
//     socket.broadcast.emit('answer', answer);
//   });

//   socket.on('ice-candidate', candidate => {
//     console.log(candidate)
//     socket.broadcast.emit('ice-candidate', candidate);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
    console.log("user connected")
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
        console.log("user disconnected")
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))

