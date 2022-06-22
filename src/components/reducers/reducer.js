

const initState = {
    user: []
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case "GETUSER":
            console.log(action)
            return {
                ...state,
                user: action?.content,
            }
        case "ADDUSER":
            // return axios({
            //     method: 'post',
            //     url: 'https://62b0f5d1196a9e98702d90ca.mockapi.io/users',
            //     data: action.content
            // });
            return state
        case "DELETEUSER":
            // await axios.delete(`https://62b0f5d1196a9e98702d90ca.mockapi.io/users/${action.content}`)
            // return state = axios.get("https://62b0f5d1196a9e98702d90ca.mockapi.io/users")
            return state
        default: return state
    }
}
export default reducers