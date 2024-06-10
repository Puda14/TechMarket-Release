export const productsActionType = {
    FETCH_DATA:'FETCH_DATA',
    UPDATE_DATA:'UPDATE_DATA'
}
export const fetchData=(data)=>{
    return {
        type: productsActionType.FETCH_DATA,
        data
    }
}
export  function update(){
    return {
        type: productsActionType.UPDATE_DATA,
    }
}