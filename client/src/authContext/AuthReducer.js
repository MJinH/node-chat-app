const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                user:action.userInfo,
                error:false
            }
        case "ERROR":
            return {
                user:null,
                error:action.error
            }
        default:
            return state;
    }
}

export default AuthReducer