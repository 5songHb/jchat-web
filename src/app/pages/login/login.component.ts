import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginAction } from './actions';
import { AppStore } from '../../app.store';
import { global, authPayload, StorageService } from '../../services/common';
import { md5 } from '../../services/tools';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    styleUrls:['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
    private username = '';
    private password = '';
    private rememberPassword = '';//获取cookie中记住的密码
    private loginRemember = false;//是否记住密码
    private loginTip = '';
    private loginStream;
    private isButtonAvailable = false;
    constructor(
        private store$: Store<AppStore>,
        private storageService: StorageService,
        private router: Router
    ) {}
    public ngOnInit() {
        if(this.storageService.get('register-username')){
            this.username = this.storageService.get('register-username');
            this.storageService.remove('register-username');
        }
        if(this.username !== '' && this.password !== ''){
            this.isButtonAvailableAction();
        }
        // JIM 初始化
        this.JIMInit();
        // 订阅state状态 方法1
        this.loginStream = this.store$.select((state) => {
            let loginState = state['loginReducer'];
            switch(loginState.actionType){
                case loginAction.loginSuccess:
                    // 是否记住密码
                    if(loginState.loginRemember){
                        this.storageService.set(md5('jchat-remember-username'), loginState.userInfo.username, true);
                        this.storageService.set(md5('jchat-remember-password'), loginState.userInfo.password, true);
                    }
                    // 不记住密码移除cookie
                    if(!this.loginRemember && this.username === this.storageService.get(md5('jchat-remember-username'), true)) {
                        this.storageService.remove(md5('jchat-remember-username'));
                        this.storageService.remove(md5('jchat-remember-password'));
                    }
                    // window.sessionStorage.setItem(md5('login-persistence-username'), loginState.userInfo.username);
                    // window.sessionStorage.setItem(md5('login-persistence-password'), loginState.userInfo.password);
                    global.password = loginState.userInfo.password;
                    this.router.navigate(['main']);
                    break;
                case loginAction.isButtonAvailableAction:
                    this.isButtonAvailable = loginState.isButtonAvailable;
                    break;
                case loginAction.loginFailed:
                    if(!loginState.isLoginSuccess){
                        this.loginTip = loginState.loginTip;
                    }
                    break;
            }
            return state;
        }).subscribe((state) => {
            
        });
        // 订阅state状态 方法2
        // this.loginStream = this.store$.select('loginReducer');
        // this.loginStream.subscribe((data) => {
        //         console.log(data);
        //         if(!data.isLoginSuccess){
        //         this.loginTip = data.loginTip;
        //     }
        // })
    }
    private JIMInit(){
        let that = this;
        global.JIM.init({
            "appkey": authPayload.appKey,
            "random_str": authPayload.randomStr,
            "signature": authPayload.signature,
            "timestamp": authPayload.timestamp,
            "flag": authPayload.flag
        }).onSuccess(function(data) {
            let username = that.storageService.get(md5('jchat-remember-username'), true),
                password = that.storageService.get(md5('jchat-remember-password'), true);
            if(username && password && this.username !== ''){
                that.username = username;
                that.rememberPassword = password;
                that.password = password.substring(0, 6);
                that.loginRemember = true;                
            }
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data))
        }).onTimeout(function(data) {
            console.log(data)
        })
    }
    // 点击登陆、keyup.enter登陆、keyup判断button是否可用
    private login(event){
        let password;
        if(this.rememberPassword){
            password = this.rememberPassword;
            this.isButtonAvailable = true;
        }else{
            password = md5(this.password);
        }
        this.store$.dispatch({
            type: loginAction.login, 
            payload: {
                username: this.username, 
                password: password, 
                md5: true, 
                isButtonAvailable: this.isButtonAvailable,
                event: event,
                loginRemember: this.loginRemember
            }
        });
    }
    private isButtonAvailableAction(){
        this.rememberPassword = '';
        this.store$.dispatch({
            type: loginAction.isButtonAvailableAction,
            payload: {
                password: this.password, 
                username: this.username
            }
        });
    }
    public ngOnDestroy (){
        this.loginStream.unsubscribe();
    }
    ngAfterViewInit(){
        if(this.username !== '' && this.password === ''){
            document.getElementById('loginPassword').focus();
        }else{
            document.getElementById('loginUsername').focus();
        }
    }
}