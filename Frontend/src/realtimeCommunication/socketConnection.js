import io from "socket.io-client";
import { url } from "../../api/api";
import {
  setCustomers,
  setOnlineCustomers,
} from "../store/actions/customersAction";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../utils/chat";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails;

  socket = io("http://localhost:5000", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("customers-list", (data) => {
    const { customers } = data;
    console.log(customers);
    store.dispatch(setCustomers(customers));
  });

  socket.on("online-customers", (data) => {
    const { onlineCustomers } = data;
    store.dispatch(setOnlineCustomers(onlineCustomers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data);
    updateDirectChatHistoryIfActive(data);
  });
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};
