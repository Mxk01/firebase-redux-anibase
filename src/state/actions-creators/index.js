export const addItem = (anime) => {
    return (dispatch) => {
        dispatch({

            type: "addItem",
            payload: anime
        })
    }
}


export const removeItem = (anime) => {
    return (dispatch) => {
        dispatch({
            type: "removeItem",
            payload: anime
        })
    }
}