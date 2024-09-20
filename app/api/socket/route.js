import { Server } from 'socket.io';

export async function GET(req, { res }) {
  if (!res.socket.server.io) {
    console.log('Starting Socket.io server...');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected', socket.id);

      socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });
    });
  } else {
    console.log('Socket.io server already running');
  }

  res.end();
  return new Response('Socket.io server setup');
}
