import {cartActionTypes} from "../actions/cartAction.js";

const initState = {
    data: [],
}
const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case cartActionTypes.ADD:
            const existingProductIndex = state.data.findIndex(item => item._id === action.payload._id);
            if (existingProductIndex !== -1) {
                const newData = [...state.data];
                newData[existingProductIndex].quantity += action.payload.quantity;
                return {
                    ...state,
                    data: newData
                };
            }
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case cartActionTypes.DELETE:
            const filteredData = state.data.filter(item => item._id !== action.id);
            return {
                ...state,
                data: filteredData
            };
        case cartActionTypes.INCREASE_QUANTITY:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                })
            };
        case cartActionTypes.DECREASE_QUANTITY:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item._id === action.id && item.quantity > 0) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                    return item;
                })
            };
        case cartActionTypes.CHECK_ITEM:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            ...item,
                            checked: action.checked
                        };
                    }
                    return item;
                })
            };
        case cartActionTypes.CHECKED_ALL:
            return {
                ...state,
                data: state.data.map(item => ({
                    ...item,
                    checked: true
                }))
            };
        case cartActionTypes.UNCHECK_ALL:
            return {
                ...state,
                data: state.data.map(item => ({
                    ...item,
                    checked: false
                }))
            };
        case cartActionTypes.DELETEALL:
            return {
                ...state,
                data: state.data = []
            };
            case cartActionTypes.GET_CART:
            return {
                ...state,
                data: state.data = action.e
            };
        default:
            return state;
    }
};
export default cartReducer