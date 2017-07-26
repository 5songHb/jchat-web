import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store,Action } from '@ngrx/store';
import { AppStore } from '../../../app.store';
import { loginAction } from '../actions';
import { global } from '../../../services/common/global';

@Injectable()

export class LoginEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<AppStore>
    ){}
    // 登录
    @Effect()
    private login$: Observable<Action> = this.actions$
        .ofType(loginAction.login)
        .map(toPayload)
        .switchMap((val) => {
            let that = this;
            let loginObj = global.JIM.login({
                'username': val.username,
                'password': val.password,
                'is_md5': val.md5
            })
            .onSuccess(function(data) {
                global.user = data.username;    
                that.store$.dispatch({
                    type: loginAction.loginSuccess,
                    payload: val
                });
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: loginAction.loginFailed,
                    payload: data
                });
            }).onTimeout(function(data) {
                console.log('timeout:' + JSON.stringify(data));
            });
            return Observable.of(loginObj)
                    .map((data) => {
                        return {type: '[login] login useless', payload: null};
                    });
        })
}