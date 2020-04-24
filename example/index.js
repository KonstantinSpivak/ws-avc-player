/* eslint-disable no-console */
const AvcServer = require('../lib/server');
const path = require('path');
const http = require('http');
const { WebSocketServer } = require('@clusterws/cws');

const net = require('net');

const width = 640;
const height = 480;

const express = require('express');
const app = express();
// serve the html/index.html
app.use(express.static(path.resolve(__dirname, 'html')));
// serve the player
app.use(express.static(path.resolve(__dirname, '../lib')));

const server = http.createServer(app);

// init web socket
const wss = new WebSocketServer({ /* port: 3333 */ server });
// init the avc server.
const avcServer = new AvcServer(wss, width, height);

// OPTIONAL: start on connect
avcServer.on('client_connected', (client) => {
  console.log('client_connected, size: ' + avcServer.clients.size);
});

// OPTIONAL: stop on disconnect
avcServer.on('client_disconnected', (client) => {
  console.log('client_disconnected, size: ' + avcServer.clients.size);
});

// create the tcp sever that accepts a h264 stream and broadcasts it back to the clients
this.tcpServer = net.createServer((socket) => {
  // set video stream
  socket.on('error', (e) => {
    console.log('video downstream error:', e);
  });
  avcServer.setVideoStream(socket);
});
this.tcpServer.listen(5000, '0.0.0.0');

server.listen(8081);
