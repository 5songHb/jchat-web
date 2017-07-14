import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';
import { indexAction } from '../../index/actions';

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
                let groupList = data.group_list,
                    flag = false;
                // 解决移动端有些群聊没有用户名的问题
                for(let i=0;i<groupList.length;i++){
                    if(!groupList[i].name || groupList[i].name === ''){
                        flag = true;
                        global.JIM.getGroupMembers({'gid': groupList[i].gid})
                        .onSuccess(function(member) {
                            let memberList = member.member_list,
                                name = '';
                            for(let j=0;j<memberList.length && j < 5;j++){
                                name = name + memberList[j].username;
                                let length = memberList.length < 5 ? memberList.length : 5;
                                if(j < length - 1){
                                    name += '、';
                                }
                            }
                            groupList[i].name = name.substr(0, 20);
                            that.store$.dispatch({
                                type: contactAction.getGroupListSuccess, 
                                payload: groupList
                            });
                        }).onFail(function(error) {
                            that.store$.dispatch({
                                type: indexAction.errorApiTip,
                                payload: error
                            });
                            groupList[i].name = '#群名获取失败';
                            that.store$.dispatch({
                                type: contactAction.getGroupListSuccess, 
                                payload: groupList
                            });
                        });
                    }
                }
                if(!flag){
                    that.store$.dispatch({
                        type: contactAction.getGroupListSuccess, 
                        payload: groupList
                    });
                }
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(groupListObj)
                    .map(() => {
                        return {type: '[main] get group list useless'};
                    })
        })
}