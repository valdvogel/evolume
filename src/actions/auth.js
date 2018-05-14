import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const login = (user) =>(
    {
    type: 'LOGIN',
    user
});


export const logout = () =>({
    type: 'LOGOUT'

});

export const startLogin = (provider) => {
    return () => {
            if(provider === 'Facebook')
                return firebase.auth().signInWithPopup(facebookAuthProvider);
            else
                return firebase.auth().signInWithPopup(googleAuthProvider);
    };
}

export const startLoginGoogle = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
}

export const startLogout = () => {
    return (dispatch) => {
        dispatch(logout());
        return firebase.auth().signOut();
    };
}