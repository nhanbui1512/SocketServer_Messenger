import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { userJoin, getCurrentUser } from './Storage/index.js';

const app = express();
app.use(cors);

const server = http.createServer(app);

const io = new Server(server);

io.on('connect', (client) => {
  client.on('joinRoom', ({ roomid }) => {
    const user = userJoin(client.id, roomid);
    client.join(user.room);

    client.on('message', (msg) => {
      client.broadcast.to(user.room).emit('message', msg);
    });
  });

  client.on('disconnect', () => {
    console.log('client has disconnected');
  });
});

app.get('/', (req, response, next) => {
  return response.send('home');
});

server.listen(3002, () => {
  console.log('server is listening on http://localhost:3002');
});
