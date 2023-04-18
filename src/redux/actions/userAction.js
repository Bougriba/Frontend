import axios from "axios";
import {toast} from 'react-toastify'
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, USER_DELETED_FAIL, USER_DELETED_REQUEST, USER_DELETED_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstant";
export const userSignInAction = (user) => async (dispatch) => {
    
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/auth/login", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("/api/auth/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const allUserAction = (pageNumber , pageSize) => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get( `/api/users/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.message
        });
    }
}

export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/auth/register", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const userDeleteAction = (id) => async (dispatch) => {
    dispatch({ type: USER_DELETED_REQUEST });
    try {
        const { data } = await axios.delete(`/api/admin/${id}`);
        dispatch({
            type: USER_DELETED_SUCCESS,
            payload: data
        });
        toast.success("User Deleted Successfully")
    } catch (error) {
        dispatch({
            type: USER_DELETED_FAIL,
            payload: error.response.data.errorMessage
        });
        toast.error(error.response.data.errorMessage)
    }
}

