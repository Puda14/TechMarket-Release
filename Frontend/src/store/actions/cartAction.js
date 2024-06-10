export const cartActionTypes = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    CHECKED_ALL: 'CHECKED_ALL',
    SUMCOST: 'SUMCOST',
    DELETEALL: 'DELETEALL',
    INCREASE_QUANTITY:'INCREASE_QUANTITY',
    DECREASE_QUANTITY:'DECREASE_QUANTITY',
    UNCHECK_ALL:'UNCHECK_ALL',
    CHECK_ITEM:'CHECK_ITEM',
    GET_CART:'GET_CART'
}

export const addCart = (product) => {
    return {
        type: cartActionTypes.ADD,
        payload: product
    };
}
export const deleteCart= (id) => {
    return {
        type: cartActionTypes.DELETE,
        id
    };
};
export const increaseCartItemQuantity = (id) => {
    return {
        type: cartActionTypes.INCREASE_QUANTITY,
        id
    };
};

export const decreaseCartItemQuantity = (id) => {
    return {
        type: cartActionTypes.DECREASE_QUANTITY,
        id
    };
};
export const deleteAll = () => {
    return {
        type: cartActionTypes.DELETEALL,
    };
};
export const checkItem = (id, checked) => {
    return {
        type: cartActionTypes.CHECK_ITEM,
        id,
        checked
    };
};
export const checkAllItems = () => {
    return {
        type: cartActionTypes.CHECKED_ALL
    };
};
export const uncheckAllItems = () => {
    return {
        type: cartActionTypes.UNCHECK_ALL
    };
};
export const getCart = (e)=>{
    return {
        type: cartActionTypes.GET_CART,
        e
    }
}

