"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = 3001;
server_1.default.listen(PORT, () => {
    console.log(`GO HighLevel Backend Server listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map