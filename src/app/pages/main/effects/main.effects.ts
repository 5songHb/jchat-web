import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';

import { AppStore } from '../../../app.store';
import { mainAction } from '../actions';
import { global, authPayload } from '../../../services/common';
import { md5 } from '../../../services/tools';
import { Util } from '../../../services/util';
import { appAction } from '../../../actions';
let util = new Util();

@Injectable()

export class MainEffect {
    // 获取个人信息
    @Effect ()
    private getSelfInfo$: Observable<Action> = this.actions$
        .ofType(mainAction.getSelfInfo)
        .map(toPayload)
        .switchMap((info) => {
            const that = this;
            let usrInfoObj = global.JIM.getUserInfo({
                username: global.user
            }).onSuccess((data) => {
                if (!data.user_info.avatar || data.user_info.avatar === '') {
                    data.user_info.avatarUrl = '';
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                    return;
                }
                global.JIM.getResource({media_id: data.user_info.avatar})
                .onSuccess((urlInfo) => {
                    data.user_info.avatarUrl = urlInfo.url;
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                }).onFail((error) => {
                    data.user_info.avatarUrl = '';
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(usrInfoObj)
                    .map(() => {
                        return {type: '[main] get selfInfo useless'};
                    });
    });
    // 退出登录
    @Effect()
    private logoutAction$: Observable<Action> = this.actions$
        .ofType(mainAction.logoutAction)
        .map(toPayload)
        .switchMap(() => {
            let loginOutObj = global.JIM.loginOut();
            return Observable.of(loginOutObj)
                    .map(() => {
                        this.router.navigate(['/login']);
                        return {type: '[main] login out useless'};
                    });
        });
    // 更新个人信息
    @Effect()
    private updateSelfInfo$: Observable<Action> = this.actions$
        .ofType(mainAction.updateSelfInfo)
        .map(toPayload)
        .switchMap((info) => {
            const that = this;
            let updateSelfInfo = global.JIM.updateSelfInfo(info)
                .onSuccess((data) => {
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            info,
                            show: true
                        }
                    });
                }).onFail((error) => {
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                }).onTimeout((data) => {
                    const error = {code: 910000};
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                });
            return Observable.of(updateSelfInfo)
                    .map(() => {
                        return {type: '[main] update self info useless'};
                    });
        });
    // 更新个人头像信息
    @Effect()
    private updateSelfAvatar$: Observable<Action> = this.actions$
        .ofType(mainAction.updateSelfAvatar)
        .map(toPayload)
        .switchMap((avatar) => {
            const that = this;
            let updateSelfAvatar = global.JIM.updateSelfAvatar({avatar: avatar.formData})
                .onSuccess((data) => {
                    that.store$.dispatch({
                        type: mainAction.showSelfInfo,
                        payload: {
                            avatar,
                            show: true
                        }
                    });
                }).onFail((error) => {
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                }).onTimeout((data) => {
                    const error = {code: 910000};
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                });
            return Observable.of(updateSelfAvatar)
                    .map(() => {
                        return {type: '[main] update self info useless'};
                    });
        });
    // 创建群聊
    @Effect()
    private createGroup$: Observable<Action> = this.actions$
        .ofType(mainAction.createGroup)
        .map(toPayload)
        .switchMap((groupInfo) => {
            const that = this;
            let createGroupObj = global.JIM.createGroup({
                group_name:  groupInfo.groupName,
                group_description: groupInfo.groupDescription
            }).onSuccess((data) => {
                let groupObj = {
                    appkey: authPayload.appKey,
                    desc: data.group_description,
                    gid: data.gid,
                    mtime: data.ctime,
                    name: data.group_name,
                    type: 4
                };
                // 如果有其他成员
                if (groupInfo.memberUsernames.length > 0) {
                    global.JIM.addGroupMembers({
                        gid: data.gid,
                        member_usernames: groupInfo.memberUsernames
                    }).onSuccess((members) => {
                        that.store$.dispatch({
                            type: mainAction.createGroupSuccess,
                            payload: groupObj
                        });
                    }).onFail((error) => {
                        that.store$.dispatch({
                            type: appAction.errorApiTip,
                            payload: error
                        });
                    });
                } else {
                    that.store$.dispatch({
                        type: mainAction.createGroupSuccess,
                        payload: groupObj
                    });
                }
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(createGroupObj)
                    .map(() => {
                        return {type: '[main] create group useless'};
                    });
    });
    // 添加群聊成员
    @Effect()
    private addGroupMember$: Observable<Action> = this.actions$
        .ofType(mainAction.addGroupMember)
        .map(toPayload)
        .switchMap((info) => {
            const that = this;
            let addGroupMemberObj = global.JIM.addGroupMembers({
                gid: info.activeGroup.key,
                member_usernames: info.memberUsernames
            }).onSuccess((data) => {
                that.store$.dispatch({
                    type: mainAction.addGroupMemberSuccess,
                    payload: info.detailMember
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(addGroupMemberObj)
                    .map(() => {
                        return {type: '[main] add group members useless'};
                    });
    });
    // 修改密码
    @Effect()
    private modifyPassword$: Observable<Action> = this.actions$
        .ofType(mainAction.modifyPassword)
        .map(toPayload)
        .switchMap((passwordInfo) => {
            const that = this;
            let passwordInfoObj = global.JIM.updateSelfPwd({
                old_pwd: md5(passwordInfo.old_pwd),
                new_pwd: md5(passwordInfo.new_pwd),
                is_md5: true
            })
            .onSuccess((data) => {
                global.JIM.loginOut();
                that.store$.dispatch({
                    type: mainAction.modifyPasswordShow,
                    payload: {
                        repeatLogin: md5(passwordInfo.new_pwd),
                        show: false
                    }
                });
                that.store$.dispatch({
                    type: mainAction.showModalTip,
                    payload: {
                        show: true,
                        info: {
                            title: '提示',
                            tip: '密码修改成功',
                            actionType: '[main] modify password alert',
                            success: 1// 1 代表成功 2代表失败
                        }
                    }
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(passwordInfoObj)
                    .map(() => {
                        return {type: '[main] modify password useless'};
                    });
    });
    // 创建单聊
    @Effect()
    private createSingleChatAction$: Observable<Action> = this.actions$
        .ofType(mainAction.createSingleChatAction)
        .map(toPayload)
        .switchMap((singleName) => {
            const that = this;
            let createSingleChatObj = global.JIM.getUserInfo({username: singleName})
            .onSuccess((data) => {
                let user = data.user_info;
                let item = {
                    avatar: user.avatar,
                    key: user.key || user.uid,
                    mtime: user.mtime,
                    name: user.username,
                    nickName: user.nickname,
                    username: user.username,
                    nickname: user.nickname,
                    type: 3,
                    signature: user.signature,
                    gender: user.gender,
                    region: user.region,
                    avatarUrl: ''
                };
                if (item.avatar) {
                    global.JIM.getResource({media_id: data.user_info.avatar})
                    .onSuccess((urlInfo) => {
                        item.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: mainAction.createSingleChatSuccess,
                            payload: item
                        });
                    }).onFail((error) => {
                        // pass
                    });
                }
                that.store$.dispatch({
                    type: mainAction.createSingleChatSuccess,
                    payload: item
                });
            }).onFail((error) => {
                if (error.code === 882002) {
                    that.store$.dispatch({
                        type: mainAction.createSingleChatShow,
                        payload: {
                            show: true,
                            info: '用户不存在'
                        }
                    });
                } else {
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                }
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(createSingleChatObj)
                    .map(() => {
                        return {type: '[main] create single chat action useless'};
                    });
    });
    // 创建群聊搜索联系人
    @Effect()
    private createGroupSearchAction$: Observable<Action> = this.actions$
        .ofType(mainAction.createGroupSearchAction)
        .map(toPayload)
        .switchMap((keywords) => {
            const that = this;
            let createGroupSearchObj = global.JIM.getUserInfo({
                username: keywords
            }).onSuccess((data) => {
                let user = data.user_info;
                let item = {
                    avatar: '',
                    avatarUrl: '',
                    key: user.key || user.uid,
                    mtime: user.mtime,
                    name: user.username,
                    nickName: user.nickname,
                    type: 3
                };
                if (user.avatar !== '') {
                    global.JIM.getResource({media_id: user.avatar})
                    .onSuccess((urlInfo) => {
                        item.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: mainAction.createGroupSearchComplete,
                            payload: item
                        });
                    }).onFail((error) => {
                        that.store$.dispatch({
                            type: mainAction.createGroupSearchComplete,
                            payload: item
                        });
                    });
                } else {
                    that.store$.dispatch({
                        type: mainAction.createGroupSearchComplete,
                        payload: item
                    });
                }
            }).onFail((error) => {
                if (error.code === 882002) {
                    that.store$.dispatch({
                        type: mainAction.createGroupSearchComplete,
                        payload: null
                    });
                } else {
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                }
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(createGroupSearchObj)
                    .map(() => {
                        return {type: '[main] create group search action useless'};
                    });
    });
    // 获取黑名单列表
    @Effect()
    private blackMenuShow$: Observable<Action> = this.actions$
        .ofType(mainAction.blackMenu)
        .map(toPayload)
        .switchMap(() => {
            const that = this;
            let blackMenuObj = global.JIM.getBlacks()
            .onSuccess((data) => {
                if (data.black_list.length === 0) {
                    that.store$.dispatch({
                        type: mainAction.blackMenuSuccess,
                        payload: {
                            show: true,
                            menu: data.black_list
                        }
                    });
                    return ;
                }
                for (let black of data.black_list) {
                    global.JIM.getResource({media_id: black.avatar})
                    .onSuccess((urlInfo) => {
                        black.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: mainAction.blackMenuSuccess,
                            payload: {
                                show: true,
                                menu: data.black_list
                            }
                        });
                    }).onFail((error) => {
                        that.store$.dispatch({
                            type: mainAction.blackMenuSuccess,
                            payload: {
                                show: true,
                                menu: data.black_list
                            }
                        });
                    });
                }
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(blackMenuObj)
                    .map(() => {
                        return {type: '[main] black menu show useless'};
                    });
    });
    // 移出黑名单列表
    @Effect()
    private delSingleBlack$: Observable<Action> = this.actions$
        .ofType(mainAction.delSingleBlack)
        .map(toPayload)
        .switchMap((user) => {
            const that = this;
            let delSingleBlackObj = global.JIM.delSingleBlacks({
                member_usernames: [{
                    username: user.username,
                    appkey: authPayload.appKey
                }]
            }).onSuccess((data) => {
                that.store$.dispatch({
                    type: mainAction.delSingleBlackSuccess,
                    payload: user
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(delSingleBlackObj)
                    .map(() => {
                        return {type: '[main] delete single black useless'};
                    });
    });
    // 加入黑名单
    @Effect()
    private addBlackListAction$: Observable<Action> = this.actions$
        .ofType(mainAction.addBlackListAction)
        .map(toPayload)
        .switchMap((active) => {
            const that = this;
            let addBlackListObj = global.JIM.addSingleBlacks({
                member_usernames: [{
                    username: active.name || active.username,
                    appkey: authPayload.appKey
                }]
            }).onSuccess((data) => {
                that.store$.dispatch({
                    type: mainAction.addBlackListSuccess,
                    payload: {
                        show: false,
                        info: {
                            title: '',
                            tip: ''
                        },
                        deleteItem: {
                            item: active
                        }
                    }
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(addBlackListObj)
                    .map(() => {
                        return {type: '[main] add black list useless'};
                    });
    });
    // 退出群聊
    @Effect()
    private exitGroupAction$: Observable<Action> = this.actions$
        .ofType(mainAction.exitGroupAction)
        .map(toPayload)
        .filter((data) => {
            if (!data) {
                return false;
            }else {
                return data;
            }
        })
        .switchMap((gid) => {
            const that = this;
            let exitGroupObj = global.JIM.exitGroup({gid})
            .onSuccess((data) => {
                that.store$.dispatch({
                    type: mainAction.exitGroupSuccess,
                    payload: {
                        tipModal: {
                            show: false,
                            info: {
                                title: '',
                                tip: ''
                            }
                        },
                        item: {
                            key: gid
                        }
                    }
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(exitGroupObj)
                    .map(() => {
                        return {type: '[main] exit group useless'};
                    });
    });
    // 删除群聊成员
    @Effect()
    private deleteMemberAction$: Observable<Action> = this.actions$
        .ofType(mainAction.deleteMemberAction)
        .map(toPayload)
        .switchMap((info) => {
            const that = this;
            let deleteMember = global.JIM.delGroupMembers({
                gid: info.group.key,
                member_usernames: [
                    {username: info.deleteItem.username}
                ]
            }).onSuccess((data) => {
                that.store$.dispatch({
                    type: mainAction.deleteMemberSuccess,
                    payload: {
                        tipModal: {
                            show: false,
                            info: {
                                title: '',
                                tip: ''
                            }
                        },
                        deleteItem: info.deleteItem,
                        group: info.group
                    }
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(deleteMember)
                    .map(() => {
                        return {type: '[main] delete group member useless'};
                    });
    });
    // 被踢后重新登录
    @Effect()
    private login$: Observable<Action> = this.actions$
        .ofType(mainAction.login)
        .map(toPayload)
        .switchMap((val) => {
            const that = this;
            const timestamp = new Date().getTime();
            const signature = util.createSignature(timestamp);
            let loginObj = global.JIM.init({
                appkey: authPayload.appKey,
                random_str: authPayload.randomStr,
                signature,
                timestamp,
                flag: authPayload.flag
            }).onSuccess((data) => {
                global.JIM.login({
                    username: val.username,
                    password: val.password,
                    is_md5: val.md5
                })
                .onSuccess((login) => {
                    if (val.reload) {
                        window.location.reload();
                    }
                }).onFail((error) => {
                    that.store$.dispatch({
                        type: appAction.errorApiTip,
                        payload: error
                    });
                });
            }).onFail((error) => {
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            }).onTimeout((data) => {
                const error = {code: 910000};
                that.store$.dispatch({
                    type: appAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(loginObj)
                    .map(() => {
                        return {type: '[main] login useless'};
                    });
    });
    constructor(
        private actions$: Actions,
        private store$: Store<AppStore>,
        private router: Router
    ) {}
}
