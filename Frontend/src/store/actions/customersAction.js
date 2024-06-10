export const customersActions = {
  SET_CUSTOMERS: "CUSTOMERS.SET_CUSTOMERS",
  SET_ONLINE_CUSTOMERS: "CUSTOMERS.SET_ONLINE_CUSTOMERS",
};

export const setCustomers = (customers) => {
  return {
    type: customersActions.SET_CUSTOMERS,
    customers,
  };
};

export const setOnlineCustomers = (onlineCustomers) => {
  return {
    type: customersActions.SET_ONLINE_CUSTOMERS,
    onlineCustomers,
  };
};
