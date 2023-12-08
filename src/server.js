import express, { response } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(cors);

const server = http.createServer(app);

const io = new Server(server);

io.on('connect', (client) => {
  console.log('client connected');

  client.on('disconnect', () => {
    console.log('client has disconnected');
  });

  client.on('message', (message) => {
    console.log(message);
  });
});

app.get('/', (req, response, next) => {
  return response.send('home');
});

server.listen(3002, () => {
  console.log('server is listening on http://localhost:3002');
});
