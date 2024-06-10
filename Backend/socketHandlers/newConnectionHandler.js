const serverStore = require("../utils/serverStore");
const { updateCustomers } = require("./updates/customers");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails._id,
  });

  // update friends list
  updateCustomers(userDetails._id.toString());
};

module.exports = newConnectionHandler;
