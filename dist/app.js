"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const socketServer = require('http').createServer(server_1.default);
const io = require('socket.io')(socketServer);
const PORT = process.env.PORT || 5000;
socketServer.listen(PORT, () => {
    console.log(`GO HighLevel Backend Server listening on port ${PORT}`);
});
exports.socket = io;
//# sourceMappingURL=app.js.map