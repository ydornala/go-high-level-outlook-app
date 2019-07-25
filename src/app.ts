import server from './server';
const socketServer = require('http').createServer(server);
const io = require('socket.io')(socketServer);

const PORT = process.env.PORT || 5000;

socketServer.listen(PORT, () => {
    console.log(`GO HighLevel Backend Server listening on port ${PORT}`);
});


export const socket = io;