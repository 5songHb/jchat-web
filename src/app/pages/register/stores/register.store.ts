export interface RegisterStore {
    isRegisterSuccess: boolean; //是否注册成功
    usernameTip: string; //用户名提示文本
    passwordTip: string; //密码提示文本
    repeatPasswordTip: string; //重复密码提示文本
    isButtonAvailable: boolean;//button是否可点击
}