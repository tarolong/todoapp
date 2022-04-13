import {ref, onUnmounted} from 'vue'

export const useToast = () => {
    // toastBox 관련
    const showToast = ref(false); // 보이고 안보이고
    const toastMessage = ref(''); // 메시지
    const toastAlertType = ref(''); // Alert 타입 종류
    // 메시지가 전달되면 toastBox 보여주기
    const triggerToast = (message = '', type = 'success') => {
        toastMessage.value = message;
        showToast.value = true;
        toastAlertType.value = type;

        toastTimeout.value = setTimeout(() => {
            toastMessage.value='';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000)
    }
     // 컴포넌트 해제
     const toastTimeout = ref(null);
     onUnmounted( () => { 
         // 타이머 실행을 막아준다. 메모리 절약  
         clearTimeout(toastTimeout);
     });

     return  {
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType
     }
}