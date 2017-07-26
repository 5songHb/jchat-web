import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Http } from '@angular/Http';
import { ActivatedRoute, Router } from '@angular/router';
import { indexAction } from '../../index/actions';
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
    // 接收到新消息
    @Effect()
    private receiveMessage$: Observable<Action> = this.actions$
        .ofType(chatAction.receiveMessage)
        .map(toPayload)
        .switchMap((obj) => {
            let that = this,
                count = 0,
                increase = 0,
                messages = obj.data.messages;
            for(let i=0;i<messages.length;i++){
                global.JIM.getUserInfo({
                    'username' : messages[i].content.from_id
                }).onSuccess(function(user) {
                    if(!user.user_info.avatar || user.user_info.avatar === ''){
                        count ++;
                        if(count === messages.length + increase){
                            that.store$.dispatch({
                                type: chatAction.receiveMessageSuccess,
                                payload: obj.data
                            });
                            return;
                        }
                    }
                    global.JIM.getResource({'media_id' : user.user_info.avatar})
                    .onSuccess(function(urlInfo){
                        obj.data.messages[i].content.avatarUrl = urlInfo.url;
                        count ++;
                        if(count === messages.length + increase){
                            that.store$.dispatch({
                                type: chatAction.receiveMessageSuccess,
                                payload: obj.data
                            });
                        }
                    }).onFail(function(error){
                        count ++;
                        if(count === messages.length + increase){
                            that.store$.dispatch({
                                type: chatAction.receiveMessageSuccess,
                                payload: obj.data
                            });
                        }
                    });
                }).onFail(function(error) {
                    count ++;
                    if(count === messages.length + increase){
                        that.store$.dispatch({
                            type: chatAction.receiveMessageSuccess,
                            payload: obj.data
                        });
                    }
                    console.log('error:' + JSON.stringify(error));
                });
                // 如果消息所在的群聊不在消息列表中，且群名为空，需要获取群的成员，将群成员的昵称或用户名拼接             
                let result = obj.conversation.filter((item) => {
                    return obj.data.messages[i].msg_type === 4 && Number(obj.data.messages[i].from_gid) === Number(item.key);
                });
                if(result.length === 0 && !obj.data.messages[i].content.target_name){
                    increase ++;
                    global.JIM.getGroupMembers({'gid': obj.data.messages[i].content.target_id})
                    .onSuccess(function(data) {
                        count ++;
                        let name = '';
                        for(let i=0;i<data.member_list.length;i++){
                            name += (data.member_list[i].nickName !== '' ? data.member_list[i].nickName : data.member_list[i].usernmae) + '、';
                        }
                        if(name.length > 20){
                            obj.data.messages[i].content.target_name = name.slice(0, 20);
                        }else{
                            obj.data.messages[i].content.target_name = name.slice(0, name.length - 1);
                        }
                        if(count === messages.length + increase){
                            that.store$.dispatch({
                                type: chatAction.receiveMessageSuccess,
                                payload: obj.data
                            });
                        }
                    }).onFail(function(error) {
                        count ++;
                        if(count === messages.length + increase){
                            that.store$.dispatch({
                                type: chatAction.receiveMessageSuccess,
                                payload: obj.data
                            });
                        }
                        that.store$.dispatch({
                            type: indexAction.errorApiTip,
                            payload: error
                        });
                    });
                }
            }
            return Observable.of('receiveMessage')
                    .map(() => {
                        return {type: '[chat] receive message useless'};
                    });
        })
    // 获取storage里的voice状态
    @Effect()
    private getVoiceState$: Observable<Action> = this.actions$
        .ofType(chatAction.getVoiceState)
        .map(toPayload)
        .switchMap((key) => {
            let voiceState = this.storageService.get(key);
            if(voiceState){
                this.store$.dispatch({
                    type: chatAction.getVoiceStateSuccess,
                    payload: eval(voiceState)
                });
            }
            return Observable.of('getVoiceState')
                    .map(() => {
                        return {type: '[chat] get voice state useless'};
                    });
        })
    // 获取会话列表
    // @Effect()
    // private getConversation$: Observable<Action> = this.actions$
    //     .ofType(chatAction.getConversation)
    //     .map(toPayload)
    //     .switchMap(() => {
    //         let that = this,
    //         conversationObj = global.JIM.getConversation()
    //         .onSuccess(function(info) {
    //             console.log('会话列表', info.conversations.length, info.conversations)
    //             info.conversations = info.conversations.reverse();
    //             that.store$.dispatch({
    //                 type: chatAction.getConversationSuccess, 
    //                 payload: {
    //                     conversation: info.conversations
    //                 }
    //             });
    //             let msgId = JSON.parse(that.storageService.get('msgId' + global.user));
    //             that.store$.dispatch({
    //                 type: chatAction.getAllMessageSuccess,
    //                 payload: {
    //                     storage: true,
    //                     msgId
    //                 }
    //             });
    //             // 获取头像url
    //             for(let i=0;i<info.conversations.length;i++){
    //                 if(info.conversations[i].avatar && info.conversations[i].avatar !== '' && info.conversations[i].type === 3){
    //                     global.JIM.getResource({'media_id': info.conversations[i].avatar})
    //                     .onSuccess(function(urlInfo){
    //                         info.conversations[i].avatarUrl = urlInfo.url;
    //                         that.store$.dispatch({
    //                             type: chatAction.getConversationSuccess, 
    //                             payload: {
    //                                 conversation: info.conversations
    //                             }
    //                         });
    //                     }).onFail(function(error){
                            
    //                     });
    //                 }
    //             }
    //             // 获取屏蔽列表
    //             global.JIM.groupShieldList().onSuccess(function(data) {
    //                 that.store$.dispatch({
    //                     type: chatAction.getConversationSuccess, 
    //                     payload: {
    //                         shield: data.groups
    //                     }
    //                 });
    //             }).onFail(function(error) {
    //                 that.store$.dispatch({
    //                     type: indexAction.errorApiTip,
    //                     payload: error
    //                 });
    //                 console.log('error:' + JSON.stringify(error));
    //             });
    //         }).onFail(function(error) {
    //             that.store$.dispatch({
    //                 type: indexAction.errorApiTip,
    //                 payload: error
    //             });
    //             console.log('error:' + JSON.stringify(error));
    //         });
    //         return Observable.of(conversationObj)
    //                 .map(() => {
    //                     return {type: '[chat] get conversation useless'};
    //                 })
    // })
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
                    global.JIM.getResource({'media_id': msgBody.media_id})
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
                    });
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
                global.JIM.getUserInfo({
                    'username' : msg[i].content.from_id
                }).onSuccess(function(data) {
                    global.JIM.getResource({'media_id': data.user_info.avatar})
                    .onSuccess(function(urlInfo){
                        msg[i].content.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: chatAction.getAllMessageSuccess,
                            payload: info.messageList
                        });
                    }).onFail(function(error){
                        that.store$.dispatch({
                            type: chatAction.getAllMessageSuccess,
                            payload: info.messageList
                        });
                    });
                }).onFail(function(error) {
                    that.store$.dispatch({
                        type: chatAction.getAllMessageSuccess,
                        payload: info.messageList
                    });
                });
            }
            return Observable.of('getMemberAvatarUrl')
                    .map(() => {
                        return {type: '[chat] get member avatar url useless'};
                    });
        })
    // 获取所有漫游同步消息及资源路径
    @Effect()
    private getAllMessage$: Observable<Action> = this.actions$
        .ofType(chatAction.getAllMessage)
        .map(toPayload)
        .switchMap((data) => {
            let that = this;
            // let count = 0,
            //     resourceArray = [];groupInfo.groupName
            for(let i=0;i<data.length;i++){
                for(let j=0;j<data[i].msgs.length;j++){
                    if(j+1 < data[i].msgs.length || data[i].msgs.length === 1){
                        if(j === 0)
                            data[i].msgs[j].time_show = this.util.reducerDate(data[i].msgs[j].ctime_ms);
                        if(j + 1 !== data[i].msgs.length){
                            let timeGap = (data[i].msgs[j + 1].ctime_ms - data[i].msgs[j].ctime_ms) / 1000 / 60;
                            if(timeGap > 5)
                                data[i].msgs[j + 1].time_show = this.util.reducerDate(data[i].msgs[j + 1].ctime_ms);
                        }
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
            let conversationObj = global.JIM.getConversation()
            .onSuccess(function(info) {
                console.log('会话列表', info.conversations.length, info.conversations);
                // 退出群聊的会话，如果退出群聊后还有其他人在聊天，顺序与实际不符
                for(let i=0;i<info.conversations.length;i++){
                    let flag = false;
                    for(let j=0;j<data.length;j++){
                        if(Number(info.conversations[i].key) === Number(data[j].key)){
                            info.conversations[i].lastMsgTime = data[j].msgs[data[j].msgs.length - 1].ctime_ms;
                            flag = true;
                            break;
                        }
                    }
                    if(!flag){
                        info.conversations[i].lastMsgTime = 0;
                    }
                }
                let len = info.conversations.length;
                let minIndex, temp;
                for (let i = 0; i < len - 1; i++) {
                    minIndex = i;
                    for (let j = i + 1; j < len; j++) {
                        if (info.conversations[j].lastMsgTime > info.conversations[minIndex].lastMsgTime) {
                            minIndex = j;
                        }
                    }
                    temp = info.conversations[i];
                    info.conversations[i] = info.conversations[minIndex];
                    info.conversations[minIndex] = temp;
                }
                // 获取头像url
                let count = 0;
                for(let i=0;i<info.conversations.length;i++){
                    if(info.conversations[i].avatar && info.conversations[i].avatar !== '' && info.conversations[i].type === 3){
                        count ++;
                        global.JIM.getResource({'media_id': info.conversations[i].avatar})
                        .onSuccess(function(urlInfo){
                            info.conversations[i].avatarUrl = urlInfo.url;
                            count --;
                            if(count <= 0){
                                that.store$.dispatch({
                                    type: chatAction.getConversationSuccess, 
                                    payload: {
                                        conversation: info.conversations,
                                        msgId: JSON.parse(that.storageService.get('msgId' + global.user)),
                                        storage: true,
                                        messageList: data
                                    }
                                });
                            }
                        }).onFail(function(error){
                            count --;
                            if(count <= 0){
                                that.store$.dispatch({
                                    type: chatAction.getConversationSuccess, 
                                    payload: {
                                        conversation: info.conversations,
                                        msgId: JSON.parse(that.storageService.get('msgId' + global.user)),
                                        storage: true,
                                        messageList: data
                                    }
                                });
                            }
                        });
                    }
                }
                if(count === 0){
                    that.store$.dispatch({
                        type: chatAction.getConversationSuccess, 
                        payload: {
                            conversation: info.conversations,
                            msgId: JSON.parse(that.storageService.get('msgId' + global.user)),
                            storage: true,
                            messageList: data
                        }
                    });
                }
                // 获取屏蔽列表
                global.JIM.groupShieldList().onSuccess(function(data) {
                    that.store$.dispatch({
                        type: chatAction.getConversationSuccess, 
                        payload: {
                            shield: data.groups
                        }
                    });
                }).onFail(function(error) {
                    that.store$.dispatch({
                        type: indexAction.errorApiTip,
                        payload: error
                    });
                    console.log('error:' + JSON.stringify(error));
                });
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(conversationObj)
                    .map(() => {
                        return {type: '[chat] get all messageList useless'};
                    });
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
                });
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 3
                    }
                });
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(msgObj)
                    .map(() => {
                        return {type: '[chat] send single message useless'};
                    });
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
                });
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 3
                    }
                });
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(groupMessageObj)
                    .map(() => {
                        return {type: '[chat] send group message useless'};
                    });
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
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 3
                    }
                });
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of(singlePicObj)
                    .map(() => {
                        return {type: '[chat] send single picture useless'};
                    });
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
                });
            }).onFail(function(error, msgs) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 3
                    }
                });
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(sendGroupPicObj)
                    .map(() => {
                        return {type: '[chat] send group pic useless'};
                    });
        })
    // 发送单聊文件
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
                });
                console.log('发送成功:' + JSON.stringify(data));
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 3
                    }
                });
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('发送错误:' + JSON.stringify(error));
            }).onTimeout(function(data){
                if (data.response_timeout) {
                    console.log(55555, '响应超时');
                    // do something when response timeout
                } else {
                    console.log(55555, '请求超时');
                    // do something when request timeout
                }
            });
            return Observable.of(sendSingleFileObj)
                    .map(() => {
                        return {type: '[chat] send single file useless'};
                    });
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
                });
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 3
                    }
                });
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(sendgroupFileObj)
                    .map(() => {
                        return {type: '[chat] send group file useless'};
                    });
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
                global.JIM.getBlacks()
                .onSuccess(function(black) {
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true,
                            black: black.black_list
                        }
                    });
                }).onFail(function(error) {
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true,
                            black: []
                        }
                    });
                    that.store$.dispatch({
                        type: '[index] error api tip',
                        payload: error
                    });
                });
                // 如多当前会话是要查看资料的人的话，不用请求avatarUrl, 直接使用单聊会话的avatarUrl
                if(other.active.type === 3){
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    });
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
                    });
                }).onFail(function(error){
                    that.store$.dispatch({
                        type: chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    });
                });
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(OtherInfoObj)
                    .map(() => {
                        return {type: '[chat] watch other info useless'};
                    });
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
                });
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            let groupMemberObj = global.JIM.getGroupMembers({'gid': info.active.key})
            .onSuccess(function(data) {
                that.store$.dispatch({
                    type: chatAction.groupInfo,
                    payload: {
                        memberList: data.member_list
                    }
                });
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
                            });
                        }).onFail(function(error){

                        });
                    }
                }
                console.log('success:' + JSON.stringify(data));
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(groupInfoObj)
                    .map(() => {
                        return {type: '[chat] group info useless'};
                    });
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
                    });
                }else{
                    that.store$.dispatch({
                        type: chatAction.groupDescription,
                        payload: {
                            data,
                            show: false
                        }
                    });
                }
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
                console.log('error:' + JSON.stringify(error));
            });
            return Observable.of(groupInfoObj)
                    .map(() => {
                        return {type: '[chat] update group info useless'};
                    });
    });
    // 切换群屏蔽
    @Effect()
    private changeGroupShield$: Observable<Action> = this.actions$
        .ofType(chatAction.changeGroupShield)
        .map(toPayload)
        .switchMap((active) => {
            let that = this;
            if(active.shield === 'switchRight'){
                global.JIM.delGroupShield({'gid': active.key}).onSuccess(function(data) {
                    console.log('success:' + JSON.stringify(data));
                    active.shield = 'switchLeft';
                    that.store$.dispatch({
                        type: chatAction.changeGroupShieldSuccess,
                        payload: active
                    });
                }).onFail(function(error) {
                    that.store$.dispatch({
                        type: indexAction.errorApiTip,
                        payload: error
                    });
                    console.log('error:' + JSON.stringify(error));
                });
            }else{
                global.JIM.addGroupShield({'gid': active.key}).onSuccess(function(data) {
                    console.log('success:' + JSON.stringify(data));
                    active.shield = 'switchRight';
                    that.store$.dispatch({
                        type: chatAction.changeGroupShieldSuccess,
                        payload: active
                    });
                }).onFail(function(error) {
                    that.store$.dispatch({
                        type: indexAction.errorApiTip,
                        payload: error
                    });
                    console.log('error:' + JSON.stringify(error));
                });
            }
            return Observable.of('changeNoDisturbObj')
                    .map(() => {
                        return {type: '[chat] change no disturb useless'};
                    });
    });
    // 被添加进群时获取群信息
    @Effect()
    private addGroupMembersEvent$: Observable<Action> = this.actions$
        .ofType(chatAction.addGroupMembersEvent)
        .map(toPayload)
        .switchMap((eventData) => {
            if(global.user === eventData.from_username){
                this.store$.dispatch({
                    type: chatAction.addGroupMembersEventSuccess,
                    payload: eventData
                });
                return Observable.of('addGroupMembersEventObj')
                    .map(() => {
                        return {type: '[chat] add group members event useless'};
                    });
            }
            let that = this,
            groupInfoObj = global.JIM.getGroupInfo({'gid': eventData.gid})
            .onSuccess(function(obj) {
                if(obj.group_info.name && obj.group_info.name !== ''){
                    eventData.name = obj.group_info.name;
                    that.store$.dispatch({
                        type: chatAction.addGroupMembersEventSuccess,
                        payload: eventData
                    });
                    let count = 0;
                    for(let i=0;i<eventData.to_usernames.length;i++){
                        global.JIM.getUserInfo({
                            'username' : eventData.to_usernames[i].username
                        }).onSuccess(function(user) {
                            eventData.to_usernames.key = user.uid;
                                if(count === eventData.to_usernames.length){
                                    that.store$.dispatch({
                                        type: chatAction.updateGroupMembersEvent,
                                        payload: {
                                            eventData
                                        }
                                    });
                                }
                            global.JIM.getResource({'media_id' : user.user_info.avatar})
                            .onSuccess(function(urlInfo){
                                eventData.to_usernames.avatarUrl = urlInfo.url;
                                count ++;
                                if(count === eventData.to_usernames.length){
                                    that.store$.dispatch({
                                        type: chatAction.updateGroupMembersEvent,
                                        payload: {
                                            eventData
                                        }
                                    });
                                }
                            }).onFail(function(error){
                                count ++;
                                if(count === eventData.to_usernames.length){
                                    that.store$.dispatch({
                                        type: chatAction.updateGroupMembersEvent,
                                        payload: {
                                            eventData
                                        }
                                    });
                                }
                            });
                        }).onFail(function(error) {
                            
                        });
                    }
                }else{
                    global.JIM.getGroupMembers({'gid': eventData.gid})
                    .onSuccess(function(data) {
                        let name = '',
                            count = 0;
                        for(let i=0;i<data.member_list.length;i++){
                            name += (data.member_list[i].nickName !== '' ? data.member_list[i].nickName : data.member_list[i].username) + '、';
                            for(let j=0;j<eventData.to_usernames.length;j++){
                                if(eventData.to_usernames[j].username === data.member_list[i].username){
                                    global.JIM.getResource({'media_id' : data.member_list[i].avatar})
                                    .onSuccess(function(urlInfo){
                                        eventData.to_usernames[j].avatarUrl = urlInfo.url;                                        
                                        count ++;
                                        if(count === eventData.to_usernames.length){
                                            that.store$.dispatch({
                                                type: chatAction.updateGroupMembersEvent,
                                                payload: {
                                                    eventData
                                                }
                                            });
                                        }
                                    }).onFail(function(error){
                                        count ++;
                                        if(count === eventData.to_usernames.length){
                                            that.store$.dispatch({
                                                type: chatAction.updateGroupMembersEvent,
                                                payload: {
                                                    eventData
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }
                        if(name.length > 20){
                            eventData.name = name.slice(0, 20);
                        }else{
                            eventData.name = name.slice(0, name.length - 1);
                        }
                        that.store$.dispatch({
                            type: chatAction.addGroupMembersEventSuccess,
                            payload: eventData
                        });
                    }).onFail(function(error) {
                        that.store$.dispatch({
                            type: indexAction.errorApiTip,
                            payload: error
                        });
                        that.store$.dispatch({
                            type: chatAction.addGroupMembersEventSuccess,
                            payload: eventData
                        });
                    });
                }
            }).onFail(function(error) {
                that.store$.dispatch({
                    type: indexAction.errorApiTip,
                    payload: error
                });
            });
            return Observable.of('addGroupMembersEventObj')
                    .map(() => {
                        return {type: '[chat] add group members event useless'};
                    });
    });
}