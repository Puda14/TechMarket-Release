import { customersActions } from "../actions/customersAction";

const initState = {
  customers: [],
  onlineCustomers: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case customersActions.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.customers,
      };
    case customersActions.SET_ONLINE_CUSTOMERS:
      return {
        ...state,
        onlineCustomers: action.onlineCustomers,
      };
    default:
      return state;
  }
};

export default reducer;
