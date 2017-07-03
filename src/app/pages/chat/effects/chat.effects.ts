import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';

import { global, authPayload, StorageService } from '../../../services/common';
import { AppStore } from '../../../app.store';
import { chatAction } from '../actions';
import { Util } from '../../../services/util';

// const storageKey = 'msgId' + global.user;

@Injectable()

export class ChatEffect {
    private util: Util = new Util();
    constructor(
        private actions$: Actions,
        private store$: Store<AppStore>,
        private router: Router,
        private storageService: StorageService
    ){}
    // 获取会话列表
    @Effect()
    private getConversation$: Observable<Action> = this.actions$
        .ofType(chatAction.getConversation)
        .map(toPayload)
        .switchMap(() => {
            let that = this,
            conversationObj = global.JIM.getConversation()
            .onSuccess(function(info) {
                console.log('会话列表',info.conversations)
                info.conversations = info.conversations.reverse();
                that.store$.dispatch({
                    type: chatAction.getConversationSuccess, 
                    payload: {
                        conversation: info.conversations
                    }
                });
                let msgId = JSON.parse(that.storageService.get('msgId' + global.user));
                that.store$.dispatch({
                    type: chatAction.getAllMessageSuccess,
                    payload: {
                        storage: true,
                        msgId
                    }
                });
                // 获取头像url
                for(let i=0;i<info.conversations.length;i++){
                    if(info.conversations[i].avatar && info.conversations[i].avatar !== '' && info.conversations[i].type === 3){
                        global.JIM.getResource({'media_id': info.conversations[i].avatar})
                        .onSuccess(function(urlInfo){
                            info.conversations[i].avatarUrl = urlInfo.url;
                            that.store$.dispatch({
                                type: chatAction.getConversationSuccess, 
                                payload: {
                                    conversation: info.conversations
                                }
                            });
                        }).onFail(function(error){

                        });
                    }
                }
                // 获取免打扰列表
                global.JIM.getNoDisturb()
                .onSuccess(function(data) {
                    console.log('noDisturbObj:',data);
                    that.store$.dispatch({
                        type: chatAction.getConversationSuccess, 
                        payload: {
                            noDisturb: data.no_disturb
                        }
                    });
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data));
                });
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(conversationObj)
                    .map(() => {
                        return {type: '[chat] get conversation useless'};
                    })
    })
    // 获取messageList 图片消息url
    @Effect()
    private getSourceUrl$: Observable<Action> = this.actions$
        .ofType(chatAction.getSourceUrl)
        .map(toPayload)
        .switchMap((info) => {
            let that = this,
                resourceArray = [],
                msg = info.messageList[info.active.activeIndex].msgs;
            for(let i=0;i<msg.length;i++){
                let msgBody = msg[i].content.msg_body;
                if(msgBody.media_id && !msgBody.media_url){
                    global.JIM.getResource({'media_id' : msgBody.media_id})
                        .onSuccess(function(urlInfo){
                            msg[i].content.msg_body.media_url = urlInfo.url;
                            that.store$.dispatch({
                                type: chatAction.getAllMessageSuccess,
                                payload: info.messageList
                            });
                        }).onFail(function(error){
                            msg[i].content.msg_body.media_url = '';
                            that.store$.dispatch({
                                type: chatAction.getAllMessageSuccess,
                                payload: info.messageList
                            });
                        });
                }
            }
            return Observable.of('getSourceUrl')
                    .map(() => {
                        return {type: '[chat] get source url useless'};
                    })
        })
    // 获取messageList avatar url
    @Effect()
    private getMemberAvatarUrl$: Observable<Action> = this.actions$
        .ofType(chatAction.getMemberAvatarUrl)
        .map(toPayload)
        .switchMap((info) => {
            let that = this,
                msg = info.messageList[info.active.activeIndex].msgs;
            for(let i=0;i<msg.length;i++){
                if(msg[i].content.msg_body.extras){
                    global.JIM.getResource({'media_id': msg[i].content.msg_body.extras.media_id})
                    .onSuccess(function(urlInfo){
                        msg[i].content.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: chatAction.getAllMessageSuccess,
                            payload: info.messageList
                        })
                    }).onFail(function(error){

                    });
                }
            }
            return Observable.of('getMemberAvatarUrl')
                    .map(() => {
                        return {type: '[chat] get member avatar url useless'};
                    })
        })
    // 获取所有漫游同步消息及资源路径
    @Effect()
    private getAllMessage$: Observable<Action> = this.actions$
        .ofType(chatAction.getAllMessage)
        .map(toPayload)
        .map((data) => {
            let that = this;
            // let count = 0,
            //     resourceArray = [];
            for(let i=0;i<data.length;i++){
                for(let j=0;j<data[i].msgs.length;j++){
                    if(j+1 < data[i].msgs.length || data[i].msgs.length === 1){
                        if(j === 0)
                            data[i].msgs[j].time_show = this.util.reducerDate(data[i].msgs[j].ctime_ms);
                        let timeGap = (data[i].msgs[j + 1].ctime_ms - data[i].msgs[j].ctime_ms) / 1000 / 60;
                        if(timeGap > 5)
                            data[i].msgs[j + 1].time_show = this.util.reducerDate(data[i].msgs[j + 1].ctime_ms);
                    }
                    // if(data[i].msgs[j].content.msg_body.media_id){
                    //     count ++;
                    //     global.JIM.getResource({'media_id' : data[i].msgs[j].content.msg_body.media_id})
                    //         .onSuccess(function(urlInfo){
                    //             // data[i].msgs[j].content.msg_body.media_url = urlInfo.url;
                    //             // that.store$.dispatch({type: chatAction.getAllMessageSuccess, payload: data});
                    //             resourceArray.push({
                    //                 key: data[i].key,
                    //                 media_id: data[i].msgs[j].content.msg_body.media_id,
                    //                 url: urlInfo.url
                    //             });
                    //             if(resourceArray.length === count){
                    //                 that.store$.dispatch({
                    //                     type: chatAction.getResourceUrl, 
                    //                     payload: resourceArray
                    //                 });
                    //             }
                    //         }).onFail(function(error){
                    //             // data[i].msgs[j].content.msg_body.media_url = '';
                    //             // that.store$.dispatch({type: chatAction.getAllMessageSuccess, payload: data});
                    //             resourceArray.push({
                    //                 key: data[i].msgs[j].key,
                    //                 media_id: data[i].msgs[j].content.msg_body.media_id,
                    //                 url: ''
                    //             });
                    //             if(resourceArray.length === count){
                    //                 that.store$.dispatch({
                    //                     type: chatAction.getResourceUrl, 
                    //                     payload: resourceArray
                    //                 });
                    //             }

                    //         });
                    // }
                }
            }
            let msgId = JSON.parse(this.storageService.get('msgId' + global.user));
            this.store$.dispatch({
                type: chatAction.getConversationSuccess,
                payload: {
                    storage: true,
                    msgId
                }
            })
            return {type: chatAction.getAllMessageSuccess, payload: data};
    })
    
    // 发送单人消息
    @Effect()
    private sendMessage$: Observable<Action> = this.actions$
        .ofType(chatAction.sendSingleMessage)
        .map(toPayload)
        .filter((data) => {
            if(!data.singleMsg.content){
                return false;
            }
            return data;
        })
        .switchMap((text) => {
            let that = this,
            msgObj = global.JIM.sendSingleMsg(text.singleMsg)
            .onSuccess(function(data, msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                })
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 3
                    }
                })
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(msgObj)
                    .map(() => {
                        return {type: '[chat] send single message useless'};
                    })
        });
    // 发送群组消息
    @Effect()
    private sendGroupMessage$: Observable<Action> = this.actions$
        .ofType(chatAction.sendGroupMessage)
        .map(toPayload)
        .filter((data) => {
            if(!data.groupMsg.content){
                return false;
            }
            return data;
        })
        .switchMap((text) => {
            let that = this,
            groupMessageObj = global.JIM.sendGroupMsg(text.groupMsg)
            .onSuccess(function(data,msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                })
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 3
                    }
                })
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(groupMessageObj)
                    .map(() => {
                        return {type: '[chat] send group message useless'};
                    })
        })
    // 发送单个图片
    @Effect()
    private sendSinglePic$: Observable<Action> = this.actions$
        .ofType(chatAction.sendSinglePic)
        .map(toPayload)
        .switchMap((img) => {
            let that = this,
            singlePicObj = global.JIM.sendSinglePic(img.singlePicFormData)
            .onSuccess(function(info, msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                })
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 3
                    }
                })
            });
            return Observable.of(singlePicObj)
                    .map(() => {
                        return {type: '[chat] send single picture useless'};
                    })
        });
    // 发送群组图片
    @Effect()
    private sendGroupPic$: Observable<Action> = this.actions$
        .ofType(chatAction.sendGroupPic)
        .map(toPayload)
        .switchMap((img) => {
            let that = this,
            sendGroupPicObj = global.JIM.sendGroupPic(img.groupPicFormData)
            .onSuccess(function(info,msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                })
            }).onFail(function(data, msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 3
                    }
                })
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(sendGroupPicObj)
                    .map(() => {
                        return {type: '[chat] send group pic useless'};
                    })
        })
    // 发送单个文件
    @Effect()
    private sendSingleFile$: Observable<Action> = this.actions$
        .ofType(chatAction.sendSingleFile)
        .map(toPayload)
        .switchMap((file) => {
            let that = this,
            sendSingleFileObj = global.JIM.sendSingleFile(file.singleFile)
            .onSuccess(function(data, msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                })
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 3
                    }
                })
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(sendSingleFileObj)
                    .map(() => {
                        return {type: '[chat] send single file useless'};
                    })
        })
    // 发送群组文件
    @Effect()
    private sendGroupFile$: Observable<Action> = this.actions$
        .ofType(chatAction.sendGroupFile)
        .map(toPayload)
        .switchMap((file) => {
            let that = this,
            sendgroupFileObj = global.JIM.sendGroupFile(file.groupFile)
            .onSuccess(function(data, msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                })
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(data) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 3
                    }
                })
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(sendgroupFileObj)
                    .map(() => {
                        return {type: '[chat] send group file useless'};
                    })
        })
    // 查看别人的资料
    @Effect()
    private watchOtherInfo$: Observable<Action> = this.actions$
        .ofType(chatAction.watchOtherInfo)
        .map(toPayload)
        .switchMap((other) => {
            let that = this,
            OtherInfoObj = global.JIM.getUserInfo({
                'username' : other.username
            }).onSuccess(function(data) {
                // 如多当前会话是要查看资料的人的话，不用请求avatarUrl, 直接使用单钱会话的avatarUrl
                if(other.active.type === 3){
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    })
                    return ;
                }
                global.JIM.getResource({'media_id': data.user_info.avatar})
                .onSuccess(function(urlInfo){
                    data.user_info = Object.assign({}, data.user_info, {'avatarUrl': urlInfo.url});
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    })
                }).onFail(function(error){
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    })
                });
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(OtherInfoObj)
                    .map(() => {
                        return {type: '[chat] watch other info useless'};
                    })
    });
    // 获取群组信息和群成员信息
    @Effect()
    private groupInfo$: Observable<Action> = this.actions$
        .ofType(chatAction.groupSetting)
        .map(toPayload)
        .filter((data) => {
            if(data.show === false || data.active.type === 3 || data.isCache){
                return false;
            }
            return data;        
        })
        .switchMap((info) => {
            let that = this,
            groupInfoObj = global.JIM.getGroupInfo({'gid': info.active.key})
            .onSuccess(function(data) {
                that.store$.dispatch({
                    type: chatAction.groupInfo,
                    payload: {
                        groupInfo: data.group_info
                    }
                })
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            let groupMemberObj = global.JIM.getGroupMembers({'gid': info.active.key})
            .onSuccess(function(data) {
                that.store$.dispatch({
                    type: chatAction.groupInfo,
                    payload: {
                        memberList: data.member_list
                    }
                })
                for(let i=0;i<data.member_list.length;i++){
                    if(data.member_list[i].avatar){
                        global.JIM.getResource({'media_id' : data.member_list[i].avatar})
                        .onSuccess(function(urlInfo){
                            data.member_list[i].avatarUrl = urlInfo.url;
                            that.store$.dispatch({
                                type: chatAction.groupInfo,
                                payload: {
                                    memberList: data.member_list
                                }
                            })
                        }).onFail(function(error){

                        });
                    }
                }
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(groupInfoObj)
                    .map(() => {
                        return {type: '[chat] group info useless'};
                    })
    })
    // 更新群组资料
    @Effect()
    private updateGroupInfo$: Observable<Action> = this.actions$
        .ofType(chatAction.updateGroupInfo)
        .map(toPayload)
        .switchMap((info) => {
            let that = this,
            groupInfoObj = global.JIM.updateGroupInfo( {
                'group_name' : info.name,
                'group_description' : info.desc,
                'gid': info.gid
            }).onSuccess(function(data) {
                if(info.actionType && info.actionType === 'modifyName'){
                    that.store$.dispatch({
                        type: chatAction.groupName,
                        payload: info
                    })
                }else{
                    that.store$.dispatch({
                        type: chatAction.groupDescription,
                        payload: {
                            data,
                            show: false
                        }
                    })
                }
            }).onFail(function(data) {
                console.log('error:' + JSON.stringify(data));
            });
            return Observable.of(groupInfoObj)
                    .map(() => {
                        return {type: '[chat] update group info useless'};
                    })
    });
    // 切换群组免打扰
    @Effect()
    private changeNoDisturb$: Observable<Action> = this.actions$
        .ofType(chatAction.changeNoDisturb)
        .map(toPayload)
        .switchMap((active) => {
            let that = this;
            if(active.noDisturb){
                global.JIM.delGroupNoDisturb({'gid': active.key})
                .onSuccess(function(data) {
                    console.log('delete:',data);
                    that.store$.dispatch({
                        type: chatAction.changeNoDisturbSuccess,
                        payload: active
                    })
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data));
                });
            }else{
                let changeNoDisturbObj = global.JIM.addGroupNoDisturb({'gid': active.key})
                .onSuccess(function(data) {
                    console.log('add:', data);
                    that.store$.dispatch({
                        type: chatAction.changeNoDisturbSuccess,
                        payload: active
                    })
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data));
                });
            }
            return Observable.of('changeNoDisturbObj')
                    .map(() => {
                        return {type: '[chat] change no disturb useless'};
                    })
    });
}