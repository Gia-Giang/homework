import axios from "axios";
var qs = require('qs');
// import dispatch from "../reducers/reducer";
export const GETUSER = (users, job) => {
    return {
        type: "GETUSER",
        content: users
    }
}
export const ADDUSER = (value) => {
    return {
        type: "ADDUSER",
        content: value
    }
}
export const SAVEUSER = (value) => {
    return {
        type: "SAVEUSER",
        content: value
    }
}
export const DELETEUSER = (value) => {
    return {
        type: "DELETEUSER",
        content: value
    }
}

export const getUser = () => {
    return dispatch => {
        axios.get("https://62b0f5d1196a9e98702d90ca.mockapi.io/users").then(
            (res => {
                dispatch(GETUSER(res?.data))
            })
        )
    }
}
export const deleteUser = (id) => {
    return dispatch => {
        axios.delete(`https://62b0f5d1196a9e98702d90ca.mockapi.io/users/${id}`).then(
            (res => dispatch(DELETEUSER(res?.data)))
        )
    }
}
export const addUser = (value) => {
    return dispatch => {
        axios.post('https://62b0f5d1196a9e98702d90ca.mockapi.io/users/', { ...value }).then(
            (res => {
                dispatch(ADDUSER(res?.data))
            })
        )
    }
}
export const saveUser = (id, value) => {
    return dispatch => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(value);
        var config = {
            method: 'put',
            url: `https://62b0f5d1196a9e98702d90ca.mockapi.io/users/${id}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                dispatch(SAVEUSER(response?.data))
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}