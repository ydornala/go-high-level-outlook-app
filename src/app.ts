import server from './server';
const socketServer = require('http').createServer(server);
const io = require('socket.io')(socketServer);

const PORT = 3001;

socketServer.listen(PORT, () => {
    console.log(`GO HighLevel Backend Server listening on port ${PORT}`);
});


export const socket = io;