import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store,Action } from '@ngrx/store';
import { AppStore } from '../../../app.store';
import { registerAction } from '../actions';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../../services/common/global';
import { md5 } from '../../../services/tools';

@Injectable()

export class RegisterEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<AppStore>,
        private router: Router
    ){}
    // 注册
    @Effect()
    private register$: Observable<Action> = this.actions$
        .ofType(registerAction.register)
        .map(toPayload)
        .filter((val) => {
            if(!val.isButtonAvailable){
                return false;
            }
            if(val.password !== val.repeatPassword){
                this.store$.dispatch({
                    type: registerAction.repeatPasswordTip,
                    payload: '您两次输入的密码不一致'
                });
                return false;
            }
            if(
                val.username.length > 128 
                || val.username.length < 4 
                || /[\u4e00-\u9fa5]/ig.test(val.username) 
                || !/^[0-9a-zA-Z]/ig.test(val.username)
                || val.password.length > 128 
                || val.password.length < 4
                || !/^([a-zA-Z]|[0-9]|_|\.|-|@]){4,}$/ig.test(val.username)
            ){
                return false;
            }
            return val;
        })
        .switchMap((val) => {
            let that = this;
            let registerObj = global.JIM.register({
                'username' : val.username,
                'password': md5(val.password),
                'is_md5' : true
            }).onSuccess(function(data) {
                that.store$.dispatch({
                    type: registerAction.registerSuccess, 
                    payload: data
                });
            }).onFail(function(data) {
                let usernameTip = '';
                if(data.code === 882002){
                    usernameTip = '用户名已存在';                
                }else {
                    usernameTip = '注册失败'
                }
                that.store$.dispatch({
                    type: registerAction.registerFailed, 
                    payload: usernameTip
                });
            });
            return Observable.of(registerObj)
                    .map(() => {
                        return {type: '[register] register useless'};
                    })
        })
    // 注册成功
    @Effect()
    private registerSuccess: Observable<Action> = this.actions$
        .ofType(registerAction.registerSuccess)
        .map(toPayload)
        .map(() =>{
            this.router.navigate(['/login']);
            return {type: '[register] to login page', payload: null};
        })
    // 用户名是否被注册
    @Effect()
    private isUsernameAvailable$: Observable<Action> = this.actions$
        .ofType(registerAction.isUsernameAvailableAction)
        .map(toPayload)
        .filter((val) => {
            if(val.username.length === 0){
                val.usernameTip = '';
                return val;
            }
            let usernameTip;
            if(val.username.length > 128 || val.username.length < 4){
                usernameTip = '用户名为4-128位字符';
            }else if(/[\u4e00-\u9fa5]/ig.test(val.username)){
                usernameTip = '用户名不支持中文';
            }else if(!/^[0-9a-zA-Z]/ig.test(val.username)){
                usernameTip = '用户名以字母或数字开头';
            }else if(!/^([a-zA-Z]|[0-9]|_|\.|-|@]){4,}$/ig.test(val.username)){
                usernameTip = '支持字母、数字、下划线、英文点、减号、@'
            }else{
                usernameTip = '';
            }
            val.usernameTip = usernameTip;
            return val;
        })
        .switchMap((val) => {
            let usernameObj = {};            
            if(val.usernameTip !== ''){
                this.store$.dispatch({
                    type: registerAction.usernameTip, 
                    payload: val.usernameTip
                });
            }else{
                // 发送请求验证用户名是否被使用
                // 验证成功
                this.store$.dispatch({
                    type: registerAction.usernameTip,
                     payload: ''
                });
                // 验证失败
                // this.store$.dispatch({
                //     type: registerAction.usernameTip, 
                //     payload: '用户名已存在'
                // });
            }
            return Observable.of(usernameObj)
                    .map(() => {
                        return {type: '[register] is username available useless'};
                    })
        })
    // 正则验证密码
    @Effect()
    private password: Observable<Action> = this.actions$
        .ofType(registerAction.password)
        .map(toPayload)
        .filter((val) => {
            let passwordTip;
            if(val.password.length > 128 || val.password.length < 4 && val.password != ''){
                passwordTip = '密码长度为4-128字节';
            }else{
                passwordTip = '';
            }
            this.store$.dispatch({
                type: registerAction.passwordTip, 
                payload: passwordTip
            })
            return val;
        })
        .map((val) =>{
            return {type: '[register] password useless'};
        })
}