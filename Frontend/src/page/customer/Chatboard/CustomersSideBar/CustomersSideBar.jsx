import React from "react";
import { styled } from "@mui/system";
import CustomersTitle from "./CustomersTitle";
import CustomersList from "./CustomersList";

const MainContainer = styled("div")({
  width: "224px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2F3136",
});

const CustomersSideBar = () => {
  return (
    <MainContainer>
      <CustomersTitle title="Private Messages" />
      <CustomersList />
    </MainContainer>
  );
};

export default CustomersSideBar;
