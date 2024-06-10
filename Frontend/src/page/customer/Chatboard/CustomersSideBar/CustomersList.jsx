import React from "react";
import { styled } from "@mui/system";
import CustomersListItem from "./CustomersListItem";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkOnlineUsers = (customers = [], onlineCustomers = []) => {
  customers.forEach((f) => {
    const isCustomerOnline = onlineCustomers.find(
      (user) => user.userId === f.id
    );
    f.isOnline = isCustomerOnline ? true : false;
  });

  return customers;
};

const CustomersList = ({ customers, onlineCustomers }) => {
  return (
    <MainContainer>
      {checkOnlineUsers(customers, onlineCustomers).map((f) => (
        <CustomersListItem
          name={f.name}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ customers }) => {
  return {
    ...customers,
  };
};

export default connect(mapStoreStateToProps)(CustomersList);
