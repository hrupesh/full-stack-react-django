import axios from 'axios';

import { createMessage, returnErrors } from './messages';

import { GET_LEADS , DELETE_LEAD , ADD_LEAD  } from './types';

import {tokenConfig} from './auth'

export const getLeads = () => (dispatch,getState) => {
    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }
    

    axios.get("/api/leads/",config)
    .then(res => {
        dispatch({
            type: GET_LEADS,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data ,
        err.response.status)
    ));
}



export const deleteLead = (id) => (dispatch,getState) => {
    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios.delete(`/api/leads/${id}`,config)
    .then(res => {
        dispatch(createMessage({deleteLead : "Lead Deleted!"}));
        dispatch({
            type: DELETE_LEAD,
            payload: id
        });
    }).catch(err => console.log(err));
}

export const AddLead = (lead) => (dispatch,getState) => {
    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios.post("/api/leads/",lead ,config)
    .then(res => {
        dispatch(createMessage({addLead : "Lead Added!"}));
        dispatch({
            type: ADD_LEAD,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data ,
        err.response.status)
    ));
}

