
// takes in state an action 
const itemsReducer = (state = [], action) => {

    switch (action.type) {
        case "addItem":
            // checking if value that we clicked matches with value in array
            return [...state.filter(anime => anime.id !== action.payload.id), action.payload];

        case "removeItem":
            console.log(action.payload)
            return [...state.filter(anime => anime.id !== action.payload.id)]
        default:
            return state
    }



}



export default itemsReducer