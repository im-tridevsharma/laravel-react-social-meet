import { SET_LOGGED_IN, SET_TOKEN } from "../actions/authAction";

const authReducer = (state, action) => {
    switch (action.type) {
        case SET_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
