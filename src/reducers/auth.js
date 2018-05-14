export default(state = {}, action )=>{
    switch(action.type){
        case 'LOGIN':
            return {
                uid: action.user.uid,
                name: action.user.displayName,
                email: action.user.email,
            };
        case 'LOGOUT':
            return {};
        default :
            return state;
    }

}