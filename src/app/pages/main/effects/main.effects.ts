import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store,Action } from '@ngrx/store';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';

import { AppStore } from '../../../app.store';
import { mainAction } from '../actions';
import { global,authPayload } from '../../../services/common';
import * as moment from 'moment';
import { md5 } from '../../../services/tools';

@Injectable()

export class MainEffect {
    constructor(
        private actions$: Actions,
        private store$: Store<AppStore>,
        private router: Router
    ) {}
    // 获取个人信息
    @Effect ()
    private getSelfInfo$: Observable<Action> = this.actions$
        .ofType(mainAction.getSelfInfo)
        .map(toPayload)
        .switchMap((info) => {
            let that = this,usrInfoObj;
            usrInfoObj = global.JIM.getUserInfo({
                'username' : global.user
            }).onSuccess(function(data) {
                if(!data.user_info.avatar){
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo, 
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    }); 
                    return;
                }
                global.JIM.getResource({'media_id' : data.user_info.avatar})
                .onSuccess(function(urlInfo){
                    data.user_info.avatarUrl = urlInfo.url;
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo, 
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    }); 
                }).onFail(function(error){
                    data.user_info.avatarUrl = '';
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo, 
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                }); 
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(usrInfoObj)
                    .map(() => {
                        return {type: '[main] get selfInfo useless'};
                    })
    })
    // 退出登录
    @Effect()
    private logoutAction$: Observable<Action> = this.actions$
        .ofType(mainAction.logoutAction)
        .map(toPayload)
        .switchMap(() => {
            let loginOutObj = global.JIM.loginOut();
            return Observable.of(loginOutObj)
                    .map(() => {
                        this.router.navigate(['/login'])
                        return {type: '[main] login out useless'};
                    })
        })
    // 更新个人信息  
    @Effect()
    private updateSelfInfo$: Observable<Action> = this.actions$
        .ofType(mainAction.updateSelfInfo)
        .map(toPayload)
        .switchMap((info) => {
            let that = this;
            let updateSelfInfo = global.JIM.updateSelfInfo(info)
                .onSuccess(function(data) {
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            info
                        }
                    })
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data));
                });
            return Observable.of(updateSelfInfo)
                    .map(() => {
                        return {type: '[main] update self info useless'};
                    })
        })
    // 更新个人头像信息  
    @Effect()
    private updateSelfAvatar$: Observable<Action> = this.actions$
        .ofType(mainAction.updateSelfAvatar)
        .map(toPayload)
        .switchMap((avatar) => {
            let that = this;
            let updateSelfAvatar = global.JIM.updateSelfAvatar({'avatar': avatar.formData})
                .onSuccess(function(data) {
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            avatar
                        }
                    })
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data));
                });
            return Observable.of(updateSelfAvatar)
                    .map(() => {
                        return {type: '[main] update self info useless'};
                    })
        })
    // 创建群聊
    @Effect()
    private createGroup$: Observable<Action> = this.actions$
        .ofType(mainAction.createGroup)
        .map(toPayload)
        .filter((groupInfo) => {
            if(!groupInfo.groupName){
                alert('群名称不能为空');
                return false;
            }else{
                return groupInfo;
            }
        })
        .switchMap((groupInfo) => {
            let that = this;
            let createGroupObj = global.JIM.createGroup({
                'group_name' :  groupInfo.groupName,
                'group_description' : groupInfo.groupDescription
            }).onSuccess(function(data) {
                data.ctime = moment().format("YYYY-MM-DD HH:mm:ss");
                let groupObj = {
                    appkey: authPayload.appKey,
                    ctime: data.ctime,
                    desc: data.group_description,
                    gid: data.gid,
                    mtime: data.ctime,
                    name: data.group_name,
                    group: true,
                    type: 4
                }
                global.JIM.addGroupMembers({
                    'gid': data.gid,
                    'member_usernames': groupInfo.memberUsernames
                }).onSuccess(function(data) {
                    that.store$.dispatch({
                        type: mainAction.createGroupSuccess, 
                        payload: groupObj
                    });
                    console.log('success:' + JSON.stringify(data));
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data))
                });
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(createGroupObj)
                    .map(() => {
                        return {type: '[main] create group useless'};
                    });
    })
    // 添加群聊成员
    @Effect()
    private addGroupMember$: Observable<Action> = this.actions$
        .ofType(mainAction.addGroupMember)
        .map(toPayload)
        .switchMap((info) => {
            let that = this;
            let addGroupMemberObj = global.JIM.addGroupMembers({
                'gid': info.activeGroup.key,
                'member_usernames': info.memberUsernames
            }).onSuccess(function(data) {
                that.store$.dispatch({
                    type: mainAction.addGroupMemberSuccess, 
                    payload: info.detailMember
                });
                console.log(111111,data);
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data))
            });
            return Observable.of(addGroupMemberObj)
                    .map(() => {
                        return {type: '[main] create group useless'};
                    });
    })
    // 修改密码
    @Effect()
    private modifyPassword$: Observable<Action> = this.actions$
        .ofType(mainAction.modifyPassword)
        .map(toPayload)
        .filter((passwordInfo) => {
            if(!passwordInfo.old_pwd || !passwordInfo.new_pwd){
                alert('密码不能为空');
                return false;
            }else{
                return passwordInfo;
            }
        })
        .switchMap((passwordInfo) => {
            let that = this;
            let passwordInfoObj = global.JIM.updateSelfPwd({
                'old_pwd' : md5(passwordInfo.old_pwd),
                'new_pwd': md5(passwordInfo.new_pwd),
                'is_md5' : true
            })
            .onSuccess(function(data) {
                global.JIM.loginOut();
                that.store$.dispatch({
                    type: mainAction.modifyPasswordShow, 
                    payload: false
                });
                that.router.navigate(['/login']);
                console.log(data);
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(passwordInfoObj)
                    .map(() => {
                        return {type: '[main] modify password useless'};
                    })
    });
    
    
    // 创建单聊
    @Effect()
    private createSingleChatAction$: Observable<Action> = this.actions$
        .ofType(mainAction.createSingleChatAction)
        .map(toPayload)
        .switchMap((singleName) => {
            let that = this;
            let createSingleChatObj = global.JIM.getUserInfo({
                'username' : singleName
            }).onSuccess(function(data) {
                let user = data.user_info,
                    item = {
                        avatar: "",
                        key: user.key || user.uid,
                        mtime: user.mtime,
                        name: user.username,
                        nickName: user.nickname,
                        type: 3
                    }
                that.store$.dispatch({
                    type: mainAction.createSingleChatSuccess,
                    payload: item
                })
            }).onFail(function(data) {
                if(data.code == 882002){
                    that.store$.dispatch({
                        type: mainAction.createSingleChatError,
                        payload: {
                            show: true,
                            info: '查无此人'
                        }
                    })
                }
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(createSingleChatObj)
                    .map(() => {
                        return {type: '[main] create single chat action useless'};
                    })
    })
    // 创建群聊搜索联系人
    @Effect()
    private createGroupSearchAction$: Observable<Action> = this.actions$
        .ofType(mainAction.createGroupSearchAction)
        .map(toPayload)
        .switchMap((keywords) => {
            let that = this;
            let createGroupSearchObj = global.JIM.getUserInfo({
                'username' : keywords
            }).onSuccess(function(data) {
                let user = data.user_info,
                    item = {
                        avatar: "",
                        avatarUrl: "",
                        key: user.key || user.uid,
                        mtime: user.mtime,
                        name: user.username,
                        nickName: user.nickname,
                        type: 3
                    }
                if(user.avatar !== ""){
                    global.JIM.getResource({'media_id' : user.avatar})
                    .onSuccess(function(urlInfo){
                        item.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: mainAction.createGroupSearchComplete,
                            payload: item
                        })
                    }).onFail(function(error){
                        that.store$.dispatch({
                            type: mainAction.createGroupSearchComplete,
                            payload: item
                        })
                    });
                }else{
                    that.store$.dispatch({
                        type: mainAction.createGroupSearchComplete,
                        payload: item
                    })
                }
            }).onFail(function(data) {
                if(data.code == 882002){
                    that.store$.dispatch({
                        type: mainAction.createGroupSearchComplete,
                        payload: null
                    })
                }
            });
            return Observable.of(createGroupSearchObj)
                    .map(() => {
                        return {type: '[main] create group search action useless'};
                    })
    })
    // 获取黑名单列表
    @Effect()
    private blackMenuShow$: Observable<Action> = this.actions$
        .ofType(mainAction.blackMenu)
        .map(toPayload)
        .switchMap(() => {
            let that = this;
            let blackMenuObj = global.JIM.getBlacks()
            .onSuccess(function(data) {
                that.store$.dispatch({
                    type: mainAction.blackMenuSuccess,
                    payload: {
                        show: true,
                        menu: data.black_list
                    }
                });
                console.log('success:' + JSON.stringify(data.black_list));
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(blackMenuObj)
                    .map(() => {
                        return {type: '[main] black menu show useless'};
                    })
    })
    // 移出黑名单列表
    @Effect()
    private delSingleBlack$: Observable<Action> = this.actions$
        .ofType(mainAction.delSingleBlack)
        .map(toPayload)
        .switchMap((user) => {
            let that = this;
            let delSingleBlackObj = global.JIM.delSingleBlacks({
                'member_usernames':[{
                    'username': user.username,
                    'appkey': authPayload.appKey
                }]
            }).onSuccess(function(data) {
                that.store$.dispatch({
                    type: mainAction.delSingleBlackSuccess,
                    payload: user
                })
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(delSingleBlackObj)
                    .map(() => {
                        return {type: '[main] delete single black useless'};
                    })
    })
    // 加入黑名单
    @Effect()
    private addBlackListAction$: Observable<Action> = this.actions$
        .ofType(mainAction.addBlackListAction)
        .map(toPayload)
        .switchMap((active) => {
            let that = this;
            let addBlackListObj = global.JIM.addSingleBlacks({
                'member_usernames':[{
                    'username': active.name || active.username,
                    'appkey': authPayload.appKey
                }]
            }).onSuccess(function(data) {
                that.store$.dispatch({
                    type: mainAction.addBlackListSuccess,
                    payload: {
                        show: false,
                        info: {},
                        deleteItem: {
                            item: active
                        }
                    }
                })
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(addBlackListObj)
                    .map(() => {
                        return {type: '[main] add black list useless'};
                    })
    })
    // 退出群聊
    @Effect()
    private exitGroupAction$: Observable<Action> = this.actions$
        .ofType(mainAction.exitGroupAction)
        .map(toPayload)
        .filter((data) => {
            if(!data){
                return false;
            }else {
                return data;
            }
        })
        .switchMap((gid) => {
            let that = this,
                exitGroupObj = global.JIM.exitGroup({'gid': gid})
                .onSuccess(function(data) {
                    that.store$.dispatch({
                        type: mainAction.exitGroupSuccess,
                        payload: {
                            tipModal: {
                                show: false,
                                info: {}
                            },
                            item: {
                                key: gid
                            }
                        }
                    });
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data))
                });
            return Observable.of(exitGroupObj)
                    .map(() => {
                        return {type: '[main] exit group useless'};
                    })
    })
    // 退出群聊
    @Effect()
    private deleteMemberAction$: Observable<Action> = this.actions$
        .ofType(mainAction.deleteMemberAction)
        .map(toPayload)
        .switchMap((info) => {
            let that = this,
                deleteMember = global.JIM.delGroupMembers({
                    'gid': info.group.key,
                    'member_usernames': [
                        {'username': info.deleteItem.username}
                    ]
               }).onSuccess(function(data) {
                  that.store$.dispatch({
                      type: mainAction.deleteMemberSuccess,
                      payload: {
                            tipModal: {
                                show: false,
                                info: {}
                            },
                            deleteItem: info.deleteItem,
                            group: info.group
                        }
                  })
               }).onFail(function(data) {
                  // 同上
               });
            return Observable.of(deleteMember)
                    .map(() => {
                        return {type: '[main] delete group member useless'};
                    })
    })
}
