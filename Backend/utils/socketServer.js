const authSocket = require("../middleware/authSocket");
const newConnectionHandler = require("../socketHandlers/newConnectionHandler");
const disconnectHandler = require("../socketHandlers/disconnectHandler");
const directChatHistoryHandler = require("../socketHandlers/directChatHistoryHandler");
const directMessageHandler = require("../socketHandlers/directMessageHandler");

const serverStore = require("../utils/serverStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineCustomers = () => {
    const onlineCustomers = serverStore.getOnlineUsers();
    io.emit("online-customers", { onlineCustomers });
  };

  io.on("connection", (socket) => {
    console.log("User connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);
    emitOnlineCustomers;

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineCustomers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
