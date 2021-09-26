import { FETCH_MENUS_FAILURE, FETCH_MENUS_REQUEST, FETCH_MENUS_SUCCESS } from "./menuType"




const initialState = {
    menus: [],
    error: ''
}

const menuReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MENUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MENUS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_MENUS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state

    }
}

export default menuReducer;