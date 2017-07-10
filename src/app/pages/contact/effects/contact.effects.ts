import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';

import { global, authPayload } from '../../../services/common';
import { AppStore } from '../../../app.store';
import { contactAction } from '../actions';

@Injectable()

export class ContactEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<AppStore>,
        private router: Router
    ){}
    // 获取群组列表
    @Effect()
    private getGroupList$: Observable<Action> = this.actions$
        .ofType(contactAction.getGroupList)
        .map(toPayload)
        .switchMap(() => {
            let that = this;
            let groupListObj = global.JIM.getGroups()
            .onSuccess(function(data) {
                console.log(66666,data)
                that.store$.dispatch({
                    type: contactAction.getGroupListSuccess, 
                    payload: data.group_list
                });
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: '[index] error api tip',
                    payload: data
                });
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(groupListObj)
                    .map(() => {
                        return {type: '[main] get group list useless'};
                    })
        })
}