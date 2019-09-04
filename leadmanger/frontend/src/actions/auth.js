import axios from 'axios';
import { returnErrors } from './messages';

import { USER_LOADING , USER_LOADED ,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types'; 

export const loadUser = () => (dispatch,getState) =>{

    dispatch({type: USER_LOADING});

    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios.get("/api/auth/user",config)
    .then(res => {
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data,err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}


export const login = (username,password) => (dispatch) =>{

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({username,password});

    axios.post("/api/auth/login",body,config)
    .then(res => {
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(returnErrors({"logout":"Logged In Successfully"},
        "200"))
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status))
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const logout = () => (dispatch,getState) =>{

    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios.post("/api/auth/logout/", null, config)
    .then(res => {
        dispatch({
            type:LOGOUT_SUCCESS
        })
        dispatch(returnErrors({"logout":"Logged Out"},
            '200'))
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status))
    })
}

export const register = ({ username , email , password }) => (dispatch) =>{

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({username,email,password});

    axios.post("/api/auth/register",body,config)
    .then(res => {
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(returnErrors({"logout":"Registration Successfull!"},
        "200"))
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status))
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
}