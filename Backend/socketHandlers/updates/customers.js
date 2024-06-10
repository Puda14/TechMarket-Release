const User = require("../../models/user");
const serverStore = require("../../utils/serverStore");

exports.updateCustomers = async (userId) => {
  try {
    // find active connections of specific id (online users)
    const receiverList = serverStore.getActiveConnections(userId);
    if (receiverList.length > 0) {
      const user = await User.findById(userId, {
        _id: 1,
        customers: 1,
      }).populate("customers", "_id name email");

      if (user) {
        const customersList = user.customers.map((f) => {
          return {
            id: f._id,
            email: f.email,
            name: f.name,
          };
        });

        // get io server instance
        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("customers-list", {
            customers: customersList ? customersList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
