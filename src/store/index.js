import { createStore } from 'vuex'
export default createStore({
    // vux 에 데이터 변수 설정
    state: {    
       // toastBox 관련
       showToast : false,
       toastMessage : '',
       toastAlertType : '',
       toastTimeout : null
    },
    mutations: {
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        }, 
        UPDATE_TOAST_MESSAGE(state, payload) {
            state.toastMessage = payload
        }, 
        UPDATE_TOAST_ALERT_TYPE(state, payload) {
            state.toastAlertType= payload
        }, 
        UPDATE_TOAST_TIMEOUT(state, payload) {
            state.toastTimeout = payload
        }
    },
    actions: {
        triggerToast( { commit }, {message, type} ) {            
            commit('UPDATE_TOAST_STATUS', true);
            commit('UPDATE_TOAST_MESSAGE', message);
            commit('UPDATE_TOAST_ALERT_TYPE', type);

            const timeout = setTimeout( () => {
                commit('UPDATE_TOAST_STATUS', false);
                commit('UPDATE_TOAST_MESSAGE', '');
                commit('UPDATE_TOAST_ALERT_TYPE', '');
            }, 5000);

            commit('UPDATE_TOAST_TIMEOUT', timeout);
        }
    },
    getters :  {
      toastSmileMessage(state){
        return state.toastMessage + "^^~~";
      }  
    }
});