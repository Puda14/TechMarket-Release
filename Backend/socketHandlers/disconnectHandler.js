const serverStore = require("../utils/serverStore");

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
