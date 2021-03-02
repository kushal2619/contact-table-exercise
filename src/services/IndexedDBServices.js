import Dexie from 'dexie'
 
const DATABASE_NAME = "CONTACT_INFO"
const DATABASE_VERSION = 1;
const OBJECT_STORE = 'contacts';

const db = new Dexie(DATABASE_NAME);
db.version(DATABASE_VERSION).stores({ [OBJECT_STORE]: 'uid,value' })

export const initIDB = () => {
    return db.open();
}

export const fetchFromIDB = () => {
    //console.log(db[OBJECT_STORE])
    return db[OBJECT_STORE].toArray()
}

export const updateIDB = (draft) => {
    const uid = draft.uid;
    return db[OBJECT_STORE].put({uid, draft})
}

export const deleteInIDB = (id) => {
    return db[OBJECT_STORE].delete(id)
}

export const closeIDB = () => {
    return db.close();
}