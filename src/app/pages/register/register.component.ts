import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { global, authPayload, StorageService } from '../../services/common';
import { AppStore } from '../../app.store';
import { registerAction } from './actions';
import { Util } from '../../services/util';

@Component({
    selector: 'app-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
    private util: Util = new Util();
    private info = {
        username: '',
        password: '',
        repeatPassword: ''
    };
    private tip = {
        usernameTip: '',
        passwordTip: '',
        repeatPasswordTip: ''
    };
    private registerStream;
    private isButtonAvailable = false;
    private tipModal = {
        show: false,
        info: {}
    };
    constructor(
        private store$: Store<AppStore>,
        private router: Router,
        private storageService: StorageService,
        private elementRef: ElementRef
    ) {}
    public ngOnInit() {
        this.JIMInit();
        this.registerStream = this.store$.select((state) => {
            const registerState = state['registerReducer'];
            switch (registerState.actionType) {
                case registerAction.registerSuccess:
                    this.tipModal = registerState.tipModal;
                    break;
                default:
                    this.tip.usernameTip = registerState.usernameTip;
                    this.tip.passwordTip = registerState.passwordTip;
                    this.isButtonAvailable = registerState.isButtonAvailable;
                    this.tip.repeatPasswordTip = registerState.repeatPasswordTip;
            }
            return state;
        }).subscribe((state) => {
            // pass
        });
    }
    public ngAfterViewInit() {
        this.elementRef.nativeElement.querySelector('#registerUsername').focus();
    }
    public ngOnDestroy() {
        this.store$.dispatch({
            type: registerAction.initState,
            payload: null
        });
        this.registerStream.unsubscribe();
    }
    private JIMInit() {
        let timestamp = new Date().getTime();
        let signature = this.util.createSignature(timestamp);
        global.JIM.init({
            appkey: authPayload.appKey,
            random_str: authPayload.randomStr,
            signature,
            timestamp,
            flag: authPayload.flag
        }).onSuccess((data) => {
            console.log('success:' + JSON.stringify(data));
        }).onFail((data) => {
            console.log('error:' + JSON.stringify(data));
        }).onTimeout((data) => {
            console.log(data);
        });
    }
    private register() {
        this.store$.dispatch({
            type: registerAction.register,
            payload: {
                username: this.info.username,
                password: this.info.password,
                repeatPassword: this.info.repeatPassword,
                isButtonAvailable: this.isButtonAvailable
            }
        });
    }
    private isButtonAvailableAction(type) {
        this.store$.dispatch({
            type: registerAction.isButtonAvailableAction,
            payload: {
                username: this.info.username,
                password: this.info.password,
                repeatPassword: this.info.repeatPassword
            }
        });
        // 当input keyup进行修改时清空提示语
        this.store$.dispatch({
            type: registerAction.emptyTip,
            payload: type
        });
    }
    private usernameBlur() {
        this.store$.dispatch({
            type: registerAction.isUsernameAvailableAction,
            payload: {
                username: this.info.username
            }
        });
    }
    private passwordBlur() {
        this.store$.dispatch({
            type: registerAction.password,
            payload: {
                password: this.info.password
            }
        });
    }
    private modalTipEmit() {
        this.tipModal.show = false;
        this.storageService.set('register-username', this.info.username);
        this.router.navigate(['/login']);
    }
}
