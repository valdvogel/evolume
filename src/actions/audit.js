import uuid from 'uuid';
import moment from 'moment';
import database from '../firebase/firebase';


export const LogInfo = (uid, origin) => {
    const audit = {
        origin: origin,
        lastAccess: moment().format('YYYY/MM/DD HH:mm:ss.ms')
    };

    database.ref(`users/${uid}/auditory`)
        .push(audit);

};
