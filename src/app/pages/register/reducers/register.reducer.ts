import { registerAction } from '../actions';
import { RegisterStore } from '../stores';
const registerInit = {
    isRegisterSuccess: false,
    usernameTip: '',
    passwordTip: '',
    repeatPasswordTip: '',
    isButtonAvailable: false
}
export const registerReducer = (state: RegisterStore = registerInit, {type, payload}) => {
    switch (type) {
        case registerAction.register:
            break;
        case registerAction.registerSuccess:
            state.isRegisterSuccess = true;
            state.usernameTip = '';
            break;
        case registerAction.registerFailed:
            state.isRegisterSuccess = false;
            state.usernameTip = payload;
            break;
        case registerAction.usernameTip:
            state.usernameTip = payload;
            break;
        case registerAction.passwordTip:
            state.passwordTip = payload;
            break;
        case registerAction.isButtonAvailableAction:
            isButtonAvailable(state,payload);
            break;
        case registerAction.repeatPasswordTip:
            state.repeatPasswordTip = payload;
            break;
        default:
    }
    return state;
};
function isButtonAvailable(state, payload){
    if(payload.username.length > 0 && payload.password.length > 0 && payload.repeatPassword.length > 0){
        state.isButtonAvailable = true;
    }else{
        state.isButtonAvailable = false;
    }
}