import React, { useEffect } from "react";
import { styled } from "@mui/system";
import CustomersSideBar from "./CustomersSideBar/CustomersSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { connectWithSocketServer } from "../../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Chatboard = () => {
  useEffect(() => {
    const userDetails = localStorage.getItem("token");
    connectWithSocketServer(userDetails);
  }, []);

  return (
    <Wrapper>
      <CustomersSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Chatboard;
