const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const axios = require("axios");

const app = express();

const server = http.createServer(app);

const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

const cachedGifs = {};

const gifHost = "https://api.giphy.com/v1/gifs";
const gifAPIKey = "biYm2PH6hsZ3FfM30QL9gGRInTxht4nv";
var gifLimit = 50;
var gifOffset = 0;
var gifRating = "PG-13";
var gifLang = "en";

//Run when client connects
io.on("connection", socket => {
  socket.on("letter", letter => {
    io.emit("leaf", letter);
  });
  //https://api.giphy.com/v1/gifs/search?api_key=biYm2PH6hsZ3FfM30QL9gGRInTxht4nv&q=child&limit=1&offset=0&rating=R&lang=en
  socket.on("words", words => {
    const startTime = Number(new Date().getTime());
    for (word of words) {
      if (cachedGifs[word] === undefined) {
        axios
          .get(
            `${gifHost}/search?api_key=${gifAPIKey}&q=${encodeURI(
              word
            )}&limit=${gifLimit}&offset=${gifOffset}&rating=${gifRating}&lang=${gifLang}`
          )
          .then(({ data }) => {
            if (data.data.length > 0) {
              cachedGifs[word] = data.data.map(
                item => item.images.preview_gif.url
              );
              const randomIndex = Math.floor(
                Math.random() * cachedGifs[word].length
              );
              io.emit("gif", cachedGifs[word][randomIndex]);
              socket.emit("time", Number(new Date().getTime()) - startTime);
              console.log("Gif emitted: ", cachedGifs[word]);
            }
          });
      } else {
        const randomIndex = Math.floor(Math.random() * cachedGifs[word].length);
        io.emit("gif", cachedGifs[word][randomIndex]);
        socket.emit("time", Number(new Date().getTime()) - startTime);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
