import { store } from '../../index';

//file that allows things outside of react components to access the store and the "current" users information
const connect = {
    id: function getStore(){
        return parseInt(store.getState().adminToUserReducer.adminToUserReducer)
    },
    admin: function getAdmin(){
        return store.getState().user.admin
    }
}

export default connect;