const initialState = {
    data: [{ city: 'Seoul', temp: 15 }] //sample data
}

export const favouriteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_FAVOURITE':
            let checkCity = state.data.find(item => item.city.toLowerCase() === action.payload.city.toLowerCase())
            if (!checkCity) {
                return {
                    ...state,
                    data: [...state.data, action.payload]
                }
            }
            return state
        case 'REMOVE_FAVOURITE':
            let newArr = state.data.filter(item => item.city !== action.payload)
            return {
                ...state,
                data: newArr
            }
        default:
            return state
    }
}