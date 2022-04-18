import { computed } from 'vue'
import {  useStore } from 'vuex'

export const useToast = () => {
    const store = useStore();

    // toastBox 관련
    // vuex 의 state 접근시 ref 로 설정시 즉시 반영 안됨
    // computed 로 접근해서 변경된 값을 참조합니다.
    const showToast = computed(() => store.state.showToast);
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    // 메시지가 전달되면 toastBox 보여주기
    const triggerToast = (message = '', type = 'success') => {        
        store.dispatch('triggerToast', { message, type} );
    }

    return {
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType
    }
}