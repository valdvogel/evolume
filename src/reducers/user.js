//USER REDUCER

const userReducerDefaultState = [];

const userReducer = (state = userReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_USER':
            return action.user;
        case 'ADD_USER':
            return state.concat(action.user);
        case 'DEL_USER':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_USER':
            return state.map((user) => {
                if(user.id === action.id){
                    return {
                        ...user,
                        ...action.updates
                    }
                }
                else{
                    return user;
                }

            });
        default: 
            return state;
    }
};

export default userReducer;