import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { global, authPayload, StorageService } from '../../services/common';
import { AppStore } from '../../app.store';
import { registerAction } from './actions';

@Component({
    selector: 'app-register',
    styleUrls:['./register.component.scss'],
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
    private info = {
        username: '',
        password: '',
        repeatPassword: ''
    };
    private tip = {
        usernameTip: '',
        passwordTip: '',
        repeatPasswordTip: ''
    }
    private registerStream;
    private isButtonAvailable = false;
    private tipModal = {
        show: false,
        info: {}
    }
    constructor(
        private store$: Store<AppStore>,
        private router: Router,
        private storageService: StorageService
    ) {}
    public ngOnInit() {
        this.JIMInit();
        this.registerStream = this.store$.select((state) => {
            let registerState = state['registerReducer'];
            if(!registerState.isRegisterSuccess){
                this.tip.usernameTip = registerState.usernameTip;
                this.tip.passwordTip = registerState.passwordTip;
                this.isButtonAvailable = registerState.isButtonAvailable;
                this.tip.repeatPasswordTip = registerState.repeatPasswordTip;
            }else{
                this.tipModal = registerState.tipModal;
            }
            return state;
        }).subscribe((state) => {
            
        });
    }
    ngAfterViewInit(){
        document.getElementById('registerUsername').focus();
    }
    private JIMInit(){
        global.JIM.init({
            "appkey": authPayload.appKey,
            "random_str": authPayload.randomStr,
            "signature": authPayload.signature,
            "timestamp": authPayload.timestamp,
            "flag": authPayload.flag
        }).onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data))
        }).onTimeout(function(data) {
            console.log(data);
        });
    }
    private register(){
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
    private isButtonAvailableAction(){
        this.store$.dispatch({
            type: registerAction.isButtonAvailableAction,
            payload: {
                username: this.info.username,
                password: this.info.password,
                repeatPassword: this.info.repeatPassword
            }
        })
    }
    private usernameBlur(){
        this.store$.dispatch({
            type: registerAction.isUsernameAvailableAction, 
            payload: {
                username: this.info.username
            }
        });
    }
    private passwordBlur(){
        this.store$.dispatch({
            type: registerAction.password, 
            payload: {
                password: this.info.password
            }
        });
    }
    private modalTipEmit(){
        this.tipModal.show = false;
        this.storageService.set('register-username', this.info.username);
        this.router.navigate(['/login']);
    }
    public ngOnDestroy (){
        this.registerStream.unsubscribe();
    }
}