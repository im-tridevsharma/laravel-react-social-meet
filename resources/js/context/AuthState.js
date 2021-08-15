import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "../reducer/authReducer";
import { SET_LOGGED_IN, SET_TOKEN } from "../actions/authAction";

const AuthState = ({ children }) => {
    const initialState = {
        isLoggedIn: sessionStorage.getItem("__token") ? true : false,
        token: sessionStorage.getItem("__token") ?? "",
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //actions dispatch
    const setLoggedIn = (value) => {
        dispatch({
            type: SET_LOGGED_IN,
            payload: value,
        });
    };
    const setToken = (token) => {
        dispatch({
            type: SET_TOKEN,
            payload: token,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: state.isLoggedIn,
                setLoggedIn,
                setToken,
                token: state.token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
