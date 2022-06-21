import axios from "axios"
const dispatch = (state = {}, action) => {
    switch (action.type) {
        case "ADDUSER":
            return axios({
                method: 'post',
                url: 'https://62b0f5d1196a9e98702d90ca.mockapi.io/users',
                data: action.content
            });
        case "DELETEUSER":
            console.log(action)
            return axios.delete(`https://62b0f5d1196a9e98702d90ca.mockapi.io/users/${action.content}`)
        default: return state
    }
}
export default dispatch