import uuid from 'uuid';
import moment from 'moment';
import database from '../firebase/firebase';

export const startAddOrder = (user, order) => {
    var id = -1;
    
    id = database.ref(`users/${user.uid}/order`).push().getKey();
    database.ref(`users/${user.uid  }/order/${id}`).update(order);
            
    return id;
};

export const startEditOrder = (uid,order) => {
    
     database.ref(`users/${uid}/order/${order.id}`).update(order)
        .then(() => {
            //editUser(id, updates);
        });
};