const initState = {
    user: []
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case "GETUSER":
            return {
                ...state,
                user: action?.content,
            }
        case "ADDUSER":
            return {
                ...state,
                user: state.user.concat(action.content)
            }
        case "DELETEUSER":
            return {
                ...state,
                user: state.user.filter(user => user.id !== action.content.id)
            }
        case "SAVEUSER":
            console.log("action", action.content)
            return {
                ...state,
                user: state.user.map((user) => {
                    if (user.id == action.content.id) {
                        user = action.content
                    }
                    return user
                })
            }
        default: return state
    }
}
export default reducers