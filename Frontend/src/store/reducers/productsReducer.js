import {productsActionType} from "../actions/productsAction.js";

const initialState = {
   data: [],
};

 const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case productsActionType.FETCH_DATA:
           return {
               ...state,
               data: state.data = action.data
           }
        case productsActionType.UPDATE_DATA:
            return {
                ...state
            }
        default:
            return (state)
    }
}
export default productsReducer