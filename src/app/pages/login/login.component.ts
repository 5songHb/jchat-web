import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginAction } from './actions';
import { AppStore } from '../../app.store';
import { global, authPayload, StorageService } from '../../services/common';
import { md5 } from '../../services/tools';
import { Util } from '../../services/util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    private username = '';
    private password = '';
    private rememberPassword = ''; // 获取cookie中记住的密码
    private loginRemember = false; // 是否记住密码
    private loginTip = '';
    private loginStream$;
    private isButtonAvailable = false;
    private util: Util = new Util();
    private emptyPassword = false;
    private loginLoading = false;
    // 为了解决safari下记住密码时placeholder依然存在的bug
    private usernamePlaceholderText = '请输入用户名';
    private passwordPlaceholderText = '请输入密码';
    constructor(
        private store$: Store<AppStore>,
        private storageService: StorageService,
        private router: Router,
        private elementRef: ElementRef
    ) {}
    public ngOnInit() {
        if (this.username !== '' && this.password !== '') {
            this.isButtonAvailableAction();
        }
        // JIM 初始化
        this.JIMInit();
        // 订阅state状态 方法1
        this.loginStream$ = this.store$.select((state) => {
            let loginState = state['loginReducer'];
            switch (loginState.actionType) {
                case loginAction.loginSuccess:
                    // 是否记住密码
                    if (loginState.loginRemember) {
                        let md5Username = md5('jchat-remember-username');
                        let md5Password = md5('jchat-remember-password');
                        this.storageService.set(md5Username, loginState.userInfo.username, true);
                        this.storageService.set(md5Password, loginState.userInfo.password, true);
                    }
                    // 不记住密码移除cookie
                    let rememberUsername =
                        this.storageService.get(md5('jchat-remember-username'), true);
                    if (!this.loginRemember && this.username === rememberUsername) {
                        this.storageService.remove(md5('jchat-remember-username'));
                        this.storageService.remove(md5('jchat-remember-password'));
                    }
                    global.password = loginState.userInfo.password;
                    this.router.navigate(['main']);
                    setTimeout(() => {
                        this.loginLoading = false;
                    }, 2000);
                    break;
                case loginAction.isButtonAvailableAction:
                    this.isButtonAvailable = loginState.isButtonAvailable;
                    break;
                case loginAction.loginFailed:

                case loginAction.emptyTip:
                    if (!loginState.isLoginSuccess) {
                        this.loginTip = loginState.loginTip;
                        this.loginLoading = false;
                    }
                    break;
                default:
            }
            return state;
        }).subscribe((state) => {
            // pass
        });
        // 订阅state状态 方法2
        // this.loginStream$ = this.store$.select('loginReducer');
        // this.loginStream$.subscribe((data) => {
        //         console.log(data);
        //         if(!data.isLoginSuccess){
        //         this.loginTip = data.loginTip;
        //     }
        // })
    }
    public ngAfterViewInit() {
        if (this.username !== '' && this.password === '') {
            this.elementRef.nativeElement.querySelector('#loginPassword').focus();
        } else {
            this.elementRef.nativeElement.querySelector('#loginUsername').focus();
        }
    }
    public ngOnDestroy () {
        this.loginStream$.unsubscribe();
    }
    private JIMInit() {
        const that = this;
        const timestamp = new Date().getTime();
        const signature = this.util.createSignature(timestamp);
        global.JIM.init({
            appkey: authPayload.appKey,
            random_str: authPayload.randomStr,
            signature,
            timestamp,
            flag: authPayload.flag
        }).onSuccess((data) => {
            let username = that.storageService.get(md5('jchat-remember-username'), true);
            let password = that.storageService.get(md5('jchat-remember-password'), true);
            if (username && password) {
                that.username = username;
                that.rememberPassword = password;
                that.password = password.substring(0, 6);
                that.loginRemember = true;
                that.emptyPassword = true;
                that.usernamePlaceholderText = '';
                that.passwordPlaceholderText = '';
            }
            if (that.storageService.get('register-username')) {
                that.username = that.storageService.get('register-username');
                that.usernamePlaceholderText = '';
                that.storageService.remove('register-username');
                that.password = '';
                that.passwordPlaceholderText = '请输入密码';
            }
            console.log('success:' + JSON.stringify(data));
        }).onFail((data) => {
            console.log('error:' + JSON.stringify(data));
        }).onTimeout((data) => {
            console.log(data);
        });
    }
    // 点击登陆、keyup.enter登陆、keyup判断button是否可用
    private login(event) {
        let password;
        if (this.rememberPassword) {
            password = this.rememberPassword;
            this.isButtonAvailable = true;
        } else {
            password = md5(this.password);
        }
        if (!this.isButtonAvailable) {
            return;
        }
        this.loginLoading = true;
        this.store$.dispatch({
            type: loginAction.login,
            payload: {
                username: this.username,
                password,
                md5: true,
                isButtonAvailable: this.isButtonAvailable,
                event,
                loginRemember: this.loginRemember
            }
        });
    }
    private isButtonAvailableAction(type ?: string) {
        this.rememberPassword = '';
        this.store$.dispatch({
            type: loginAction.isButtonAvailableAction,
            payload: {
                password: this.password,
                username: this.username
            }
        });
        // 当input keyup进行修改时清空提示语
        if (type === 'usernameKeyup' || type === 'passwordKeyup') {
            this.store$.dispatch({
                type: loginAction.emptyTip,
                payload: type
            });
        }
        if (type === 'usernameKeyup' && this.emptyPassword) {
            this.password = '';
            this.emptyPassword = false;
            this.passwordPlaceholderText = '请输入密码';
        }
        // 解决safari placeholder问题
        if ((type === 'usernameKeyup' || type === 'usernameChange') && this.username === '') {
            this.usernamePlaceholderText = '请输入用户名';
        }
        if ((type === 'passwordKeyup' || type === 'passwordChange') && this.password === '') {
            this.passwordPlaceholderText = '请输入密码';
        }
    }
    private inputFocus(id) {
        this.elementRef.nativeElement.querySelector('#' + id).focus();
    }
}
