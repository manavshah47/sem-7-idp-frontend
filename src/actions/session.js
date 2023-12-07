import { toast } from "react-toastify";
import { login, logout } from "../util/session"

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const logInUser = user => async dispatch => {
    const response = await login(user);
    if(response.data.success){
        return dispatch(receiveCurrentUser(response.data.data));
    } else {
        toast(response.data.message)
    }
};

export const logOutUser = () => async dispatch => {
    const response = await logout();
    if (response.data.success) {
        return dispatch(logoutCurrentUser());
    } else {
        toast("Logout Error")
    }
};