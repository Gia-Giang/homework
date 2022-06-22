import axios from "axios";
// import dispatch from "../reducers/reducer";
export const GETUSER = (value) => {
    return {
        type: "GETUSER",
        // content: axios.get("https://62b0f5d1196a9e98702d90ca.mockapi.io/users")
        content: value
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
            (res => dispatch(GETUSER(res?.data)))
        )
    }
}