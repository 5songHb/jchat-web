import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { global, authPayload, StorageService } from '../../services/common';
import { AppStore } from '../../app.store';
import { chatAction } from './actions';
import { mainAction } from '../main/actions';
import { Util } from '../../services/util';
import { contactAction } from '../contact/actions';

@Component({
    selector: 'chat-component',
    styleUrls: ['./chat.component.scss'],
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    private isLoadedSubject = new Subject();
    private isLoaded$ = this.isLoadedSubject.asObservable();
    private isLoaded = false;
    private util: Util = new Util();
    private chatStream$;
    private conversationList;
    private messageList = [
        {
            key: 0,
            msgs: [],
            groupSetting: {}
        }
    ];
    private global = global;
    private active = {
        // 当前active的用户
        name: '',
        nickName: '',
        key: '',
        activeIndex: 0,
        type: 0,
        change: false,
        shield: false
    }
    private defaultPanelIsShow = true;
    private otherInfo = {
        show: false,
        info: {},
        black: []
    };
    private blackMenu = {
        show: false,
        menu: []
    }
    private groupSetting = {
        groupInfo: {
            name: '',
            desc: ''
        },
        memberList: [],
        active: {},
        show: false
    }
    private msgKey = 1;
    private groupDescription = {
        show: false,
        description: {}
    }
    private selfInfo = {
        avatar: ''
    };
    private isCacheArr = [];
    private storageKey;
    private playVideoShow = {
        show: false,
        url: ''
    };
    private eventArr = [];
    private hasOffline = false;
    constructor(
        private store$: Store<AppStore>,
        private storageService: StorageService,
        private elementRef: ElementRef
    ){}
    public ngOnInit() {
        this.storageKey = 'msgId' + global.user;
        this.subscribeStore();
        // this.store$.dispatch({
        //     type: chatAction.getConversation, 
        //     payload: null
        // });
        
        this.store$.dispatch({
            type: chatAction.getVoiceState, 
            payload: 'voiceState' + global.user
        });
        let that = this;
        global.JIM.onMsgReceive(function(data) {
            console.log('收到的消息', data);
            that.store$.dispatch({
                type: chatAction.receiveMessage,
                payload: {
                    data,
                    conversation: that.conversationList
                }
            });
        });
        //异常断线监听
        global.JIM.onDisconnect(function(){
            // 定时器是为了解决火狐下刷新时弹出断线提示
            setTimeout(function(){
                that.store$.dispatch({
                    type: mainAction.logoutKickShow,
                    payload: {
                        show: true,
                        info: {
                            title: '提示',
                            tip: '网络断线，请检查网络或重新登陆'
                        }
                    }
                });
            }, 2000);
            console.log("【disconnect】");
        });
        global.JIM.onEventNotification(function(data) {
            console.log('event', data);
            // 如果是离线业务消息则存在数组里
            if(data.ctime * 1000 < (new Date).getTime() + 10000){
                that.eventArr.push(data);
                console.log(4444, that.eventArr);
            }
            if(that.eventArr.length === 0){
                switch(data.event_type){
                    case 1:
                        that.store$.dispatch({
                            type: mainAction.logoutKickShow,
                            payload: {
                                show: true,
                                info: {
                                    title: '提示',
                                    tip: '您的账号在其他设备登录'
                                }
                            }
                        });
                        break;
                    case 10:
                        that.store$.dispatch({
                            type: chatAction.addGroupMembersEvent,
                            payload: data
                        });
                        break;
                    case 11:
                        that.store$.dispatch({
                            type: chatAction.deleteGroupMembersEvent,
                            payload: data
                        });
                        break;
                }
            }
        });
        // 离线业务消息监听，加载完数据之后才执行
        this.isLoaded$.subscribe((isLoaded) => {
            if(isLoaded){
                console.log(8888, this.eventArr)
                for(let i=0;i<this.eventArr.length;i++){
                    switch(this.eventArr[i].event_type){
                        case 10:
                            that.store$.dispatch({
                                type: chatAction.addGroupMembersEvent,
                                payload: this.eventArr[i]
                            });
                            break;
                        case 11:
                            that.store$.dispatch({
                                type: chatAction.deleteGroupMembersEvent,
                                payload: this.eventArr[i]
                            });
                            break;
                    }
                }
                this.eventArr = [];
            }
        })
        //离线消息同步监听
        global.JIM.onSyncConversation(function(data) {
            console.log('离线消息列表',data);
            that.hasOffline = true;
            that.store$.dispatch({
                type: chatAction.getAllMessage, 
                payload: data
            });
        });
        setTimeout(function(){
            if(!that.hasOffline){
                that.store$.dispatch({
                    type: chatAction.getAllMessage, 
                    payload: []
                });
            }
        }, 3000);    
    }
    private subscribeStore(){
        this.chatStream$ = this.store$.select((state) => {
            let chatState = state['chatReducer'];
            let mainState = state['mainReducer'];
            console.log('chat', chatState);
            this.stateChanged(chatState, mainState);
            return state;
        }).subscribe((state) => {
            
        });
    }
    private stateChanged(chatState, mainState){
        console.log('chat', chatState);
        switch(chatState.actionType){
            case chatAction.getConversationSuccess:
                this.conversationList = chatState.conversation;
                this.messageList = chatState.messageList;
                if(chatState.msgId.length > 0 && !this.storageService.get(this.storageKey)){                
                    this.storageMsgId(chatState.msgId);
                }
                this.store$.dispatch({
                    type: chatAction.dispatchConversationList,
                    payload: chatState.conversation
                });
                if(chatState.isLoaded){
                    this.isLoaded = chatState.isLoaded;
                    this.isLoadedSubject.next(this.isLoaded);
                }
                break;
            // case chatAction.getAllMessageSuccess:
            //     this.messageList = chatState.messageList;
            //     if(chatState.msgId.length > 0 && !this.storageService.get(this.storageKey)){
            //         this.storageMsgId(chatState.msgId);
            //     }
            //     break;
            case chatAction.receiveMessageSuccess:
                let isActive = Number(this.active.key === chatState.newMessage.from_uid) || Number(this.active.key) === Number(chatState.newMessage.from_gid);
                if(chatState.msgId.length > 0 && isActive){
                    this.storageMsgId(chatState.msgId);
                    this.active.change = !this.active.change;
                }
                this.messageList = chatState.messageList;
                // this.storageMsgId(chatState.msgId);
                break;
            case chatAction.sendSingleMessage:

            case chatAction.sendGroupMessage:
                
            case chatAction.sendSinglePic:
                
            case chatAction.sendGroupPic:
                
            case chatAction.sendSingleFile:
                
            case chatAction.sendGroupFile:

            case chatAction.updateGroupMembersEvent:

                // 触发滚动条向下滚动            
                this.active.change = !this.active.change;
                break;
            case chatAction.sendMsgComplete:
                if(chatState.msgId.length > 0){
                    this.storageMsgId(chatState.msgId);
                }
                break;
            case chatAction.changeActivePerson:
                this.changeActivePerson(chatState);
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                this.storageMsgId(chatState.msgId);
                break;
            case contactAction.selectContactItem:
            
            case mainAction.selectSearchUser:
                this.changeActivePerson(chatState);
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                this.storageMsgId(chatState.msgId);
                break;
            case chatAction.getResourceUrl:
                this.messageList = chatState.messageList;
                break;
            case chatAction.saveDraft:
                this.messageList = chatState.messageList;
                this.conversationList = chatState.conversation;
                break;
            case mainAction.searchUser:
                this.store$.dispatch({
                    type: chatAction.searchUserSuccess,
                    payload: chatState.searchUserResult
                });
                break;
            case chatAction.deleteConversationItem:
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                this.groupSetting.show = false;
                break;
            case chatAction.watchOtherInfoSuccess:
                this.otherInfo = chatState.otherInfo;
                break;
            case chatAction.hideOtherInfo:
                this.otherInfo = chatState.otherInfo;
                break;
            case  mainAction.createSingleChatSuccess:
                this.otherInfo = chatState.otherInfo;
                break;
            case chatAction.groupSetting:
                this.groupSetting = Object.assign({}, this.groupSetting, chatState.messageList[chatState.activePerson.activeIndex].groupSetting);
                this.groupSetting.active = this.active;
                break;
            case chatAction.groupInfo:
                this.groupSetting = Object.assign({}, this.groupSetting, chatState.messageList[chatState.activePerson.activeIndex].groupSetting);
                this.groupSetting.active = this.active;
                break;
            case mainAction.createGroupSuccess:
                this.changeActivePerson(chatState);
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                break;
            case chatAction.createOtherChat:
                this.changeActivePerson(chatState);
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                this.store$.dispatch({
                    type: chatAction.groupSetting,
                    payload: {
                        show: false
                    }
                });
                break;
            case mainAction.exitGroupSuccess:
                this.conversationList = chatState.conversation;
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                this.groupSetting = {
                    groupInfo: {
                        name: '',
                        desc: ''
                    },
                    memberList: [],
                    active: {},
                    show: false
                }
                break;
            case mainAction.addBlackListSuccess:
                this.conversationList = chatState.conversation;
                this.defaultPanelIsShow = chatState.defaultPanelIsShow;
                if(chatState.messageList[chatState.activePerson.activeIndex].groupSetting){
                    this.store$.dispatch({
                        type: chatAction.groupSetting,
                        payload: {
                            show: false
                        }
                    })
                }
                break;
            case chatAction.groupDescription:
                this.groupDescription.show = chatState.groupDeacriptionShow;
                this.groupDescription.description = Object.assign({}, chatState.messageList[chatState.activePerson.activeIndex].groupSetting.groupInfo, {});
                break;
            case chatAction.groupName:
                this.groupSetting.groupInfo.name = chatState.messageList[chatState.activePerson.activeIndex].groupSetting.groupInfo.name;
                this.store$.dispatch({
                    type: chatAction.updateContactInfo,
                    payload: {
                        groupList: chatState.groupList,
                        conversation: chatState.conversation
                    }
                })
                break;
            case mainAction.showSelfInfo:
                if(mainState.selfInfo.info){
                    this.selfInfo = mainState.selfInfo.info;
                }
                break;
            case mainAction.addGroupMemberSuccess:
                this.groupSetting.memberList = chatState.messageList[chatState.activePerson.activeIndex].groupSetting.memberList;
                // 为了解决添加新成员后IE假死的现象
                this.elementRef.nativeElement.querySelector('#searchGroupMember').focus();
                this.elementRef.nativeElement.querySelector('#searchGroupMember').blur();
                break;
            case chatAction.changeGroupShieldSuccess:
                this.conversationList = chatState.conversation;
                this.active.shield = chatState.activePerson.shield;
                break;
            case chatAction.playVideoShow:
                this.playVideoShow = chatState.playVideoShow;
                break;
            case chatAction.addGroupMembersEventSuccess:
                if(chatState.activePerson.activeIndex > 0 && chatState.messageList[chatState.activePerson.activeIndex].groupSetting){
                    this.groupSetting = Object.assign({}, this.groupSetting, chatState.messageList[chatState.activePerson.activeIndex].groupSetting);
                }
                break;
            default:

        }
    }
    ngOnDestory(){
        this.chatStream$.unsubscribe();
    }
    private storageMsgId(msgId){
        this.storageService.set(this.storageKey, JSON.stringify(msgId));
    }
    // 更新当前对话用户信息
    private changeActivePerson(chatState){
        let change = this.active.change;
        this.active = chatState.activePerson;
        this.active.change = !change;
        this.groupSetting.show = false;
        // 判断是否已经缓存
        if(this.isCacheArr.indexOf(this.active.key) === -1){
            this.isCacheArr.push(this.active.key);
            console.log(55555555555555,this.messageList,this.active);
            this.store$.dispatch({
                type: chatAction.getSourceUrl,
                payload: {
                    active: this.active,
                    messageList: this.messageList
                }
            })
            // 获取messageList avatar url
            if(this.active.type === 4){
                this.store$.dispatch({
                    type: chatAction.getMemberAvatarUrl,
                    payload: {
                        active: this.active,
                        messageList: this.messageList
                    }
                })
            }else{
                this.store$.dispatch({
                    type: chatAction.getSingleAvatarUrl,
                    payload: null
                })
            }
        }
    }
    // 切换当前对话用户
    private selectTargetEmit(item){
        if(this.active.key == item.key){
            return ;
        }
        this.store$.dispatch({
            type: chatAction.changeActivePerson, 
            payload: {
                item,
                defaultPanelIsShow: false
            }
        });
    }
    private deleteConversationItemEmit(item){
        this.store$.dispatch({
            type: chatAction.deleteConversationItem,
            payload: {
                item
            }
        })
    }
    private sendMsgEmit(data) {
        // 发送单聊消息
        /**
         * success
         * 取值 状态
         * 1  正在发送
         * 2  发送成功
         * 3  发送失败
         */
        let msgs:any = {
            content: {
                create_time: (new Date()).getTime(),
                msg_type: 'text',
                from_id: global.user,
                msg_body: {
                    text: data.content
                }
            },
            ctime_ms: (new Date()).getTime(),
            success: 1,
            msgKey: this.msgKey ++
        }
        if(this.active.type === 3 && !data.repeatSend){
            let singleMsg = {
                target_username: this.active.name,
                target_nickname: this.active.nickName,
                content: data.content,
                extras: {
                    media_id: this.selfInfo.avatar
                }
            }
            msgs.singleMsg = singleMsg;
            msgs.msg_type = 3;
            this.store$.dispatch({
                type: chatAction.sendSingleMessage, 
                payload: {
                    singleMsg,
                    key: this.active.key,
                    msgs
                }
            });
            // 发送群组消息
        }else if(this.active.type === 4 && !data.repeatSend){
            let groupMsg = {
                target_gid: this.active.key,
                target_gname: this.active.name,
                content: data.content,
                extras: {
                    media_id: this.selfInfo.avatar
                }
            }
            msgs.groupMsg = groupMsg;
            msgs.msg_type = 4;
            this.store$.dispatch({
                type: chatAction.sendGroupMessage,
                payload: {
                    groupMsg,
                    key: this.active.key,
                    msgs
                }
            })
        }else if(this.active.type === 3 && data.repeatSend){
            this.store$.dispatch({
                type: chatAction.sendSingleMessage, 
                payload: {
                    singleMsg: data.singleMsg,
                    key: this.active.key,
                    msgs: data
                }
            });
        }else if(this.active.type === 4 && data.repeatSend){
            this.store$.dispatch({
                type: chatAction.sendGroupMessage,
                payload: {
                    groupMsg: data.groupMsg,
                    key: this.active.key,
                    msgs: data
                }
            })
        }
    }
    private sendPicEmit(data){
        let msgs,
            that = this,
            file = this.elementRef.nativeElement.querySelector('#sendPic');
        // 重发消息
        if(data.repeatSend && this.active.type === 3){
            that.store$.dispatch({
                type: chatAction.sendSinglePic, 
                payload: {
                    singlePicFormData: data.singlePicFormData, 
                    key: that.active.key,
                    msgs: data
                }
            });
            return ;
        }else if(data.repeatSend && this.active.type === 4){
            that.store$.dispatch({
                type: chatAction.sendGroupPic,
                payload: {
                    groupPicFormData: data.groupPicFormData,
                    key: that.active.key,
                    msgs: data
                }
            });
            return ;
        }
        // 发送消息
        this.util.imgReader(file, function(value){
            msgs = {
                content: {
                    from_id: global.user,
                    create_time: (new Date()).getTime(),
                    msg_type: 'image',
                    msg_body: {
                        media_url: value.src,
                        width: value.width,
                        height: value.height
                    }
                },
                ctime_ms: (new Date()).getTime(),
                success: 1,
                msgKey: that.msgKey ++
            }
            // 发送单聊图片
            if(that.active.type === 3){
                let singlePicFormData = {
                    target_username: that.active.name,
                    target_nickname: that.active.nickName,
                    appkey: authPayload.appKey,
                    image: data,
                    extras: {
                        media_id: that.selfInfo.avatar
                    }
                }
                msgs.singlePicFormData = singlePicFormData;
                msgs.msg_type = 3;
                that.store$.dispatch({
                    type: chatAction.sendSinglePic, 
                    payload: {
                        singlePicFormData, 
                        key: that.active.key,
                        msgs
                    }
                })
            // 发送群聊图片
            }else if(that.active.type === 4){
                let groupPicFormData = {
                    target_gid: that.active.key,
                    target_gname: that.active.name,
                    image: data,
                    extras: {
                        media_id: that.selfInfo.avatar
                    }
                }
                msgs.groupPicFormData = groupPicFormData;
                msgs.msg_type = 4;
                that.store$.dispatch({
                    type: chatAction.sendGroupPic,
                    payload: {
                        groupPicFormData,
                        key: that.active.key,
                        msgs
                    }
                })
            }
        })
        
    }
    private sendFileEmit(data){
        // 发送单聊文件
        let msgs;        
        if(!data.repeatSend){
            let ext = this.util.getExt(data.fileData.name);
            msgs  = {
                content: {
                    create_time: (new Date()).getTime(),
                    msg_type: 'file',
                    from_id: global.user,
                    msg_body: {
                        fname: data.fileData.name,
                        fsize: data.fileData.size
                    },
                    extras:{
                        fileSize: data.fileData.size,
                        fileType: ext
                    }
                },
                ctime_ms: (new Date()).getTime(),
                success: 1,
                msgKey: this.msgKey ++
            }
        }
        if(this.active.type == 3 && !data.repeatSend){
            let ext = this.util.getExt(data.fileData.name);
            let singleFile = {
                file: data.file,
                target_username: this.active.name,
                target_nickname: this.active.nickName,
                appkey: authPayload.appKey,
                extras: {
                    media_id: this.selfInfo.avatar,
                    fileSize: data.fileData.size,
                    fileType: ext
                }
            }
            msgs.singleFile = singleFile;
            msgs.msg_type = 3;
            this.store$.dispatch({
                type: chatAction.sendSingleFile,
                payload: {
                    key: this.active.key,
                    msgs,
                    singleFile
               }
            })
        // 发送群组文件
        }else if(this.active.type == 4 && !data.repeatSend){
            let ext = this.util.getExt(data.fileData.name);
            let groupFile = {
                file : data.file,
                target_gid: this.active.key,
			    target_gname: this.active.name,
                extras: {
                    media_id: this.selfInfo.avatar,
                    fileSize: data.fileData.size,
                    fileType: ext
                }
            }
            msgs.groupFile = groupFile;
            msgs.msg_type = 4;
            this.store$.dispatch({
                type: chatAction.sendGroupFile,
                payload: {
                    key: this.active.key,
                    msgs,
                    groupFile
                }
            })
        }else if(this.active.type == 3 && data.repeatSend){
            this.store$.dispatch({
                type: chatAction.sendSingleFile,
                payload: {
                    key: this.active.key,
                    msgs: data,
                    singleFile: data.singleFile
               }
            })
        }else if(this.active.type == 4 && data.repeatSend){
            this.store$.dispatch({
                type: chatAction.sendGroupFile,
                payload: {
                    key: this.active.key,
                    msgs: data,
                    groupFile: data.groupFile
                }
            })
        }
    }
    private saveDraftEmit(tempArr){
        this.store$.dispatch({
            type: chatAction.saveDraft,
            payload: tempArr
        })
    }
    private watchOtherInfoEmit(info){
        this.store$.dispatch({
            type: chatAction.watchOtherInfo,
            payload: {
                username: info.username,
                active: this.active
            }
        })
    }
    private watchSelfInfoEmit(){
        this.store$.dispatch({
            type: mainAction.showSelfInfo, 
            payload: {
                show: true
            }
        });
    }
    private OtherInfoEmit(item){
        if(item && Number(item.key) !== Number(this.active.key)){
            this.store$.dispatch({
                type: chatAction.createOtherChat, 
                payload: item
            })
        }
        this.store$.dispatch({
            type: chatAction.hideOtherInfo,
            payload: {
                show: false,
                info: {}
            }
        })
    }
    private groupSettingEmit(){
        this.store$.dispatch({
            type: chatAction.groupSetting,
            payload: {
                active: this.active,
                show: true,
                isCache: this.messageList[this.active.activeIndex].groupSetting
            }
        })
    }
    private closeGroupSettingEmit(){
        this.store$.dispatch({
            type: chatAction.groupSetting,
            payload: {
                show: false
            }
        })
    }

    private exitGroupEmit(groupInfo){
        this.store$.dispatch({
            type: mainAction.showModalTip,
            payload: {
                show: true,
                info: {
                    groupInfo: groupInfo,
                    title: '退群',
                    tip: `确定要退出 ${groupInfo.name} 吗？`,
                    actionType: '[chat] exit group'
                }
            }
        })
    }
    private addBlackListEmit(otherInfo){
        this.store$.dispatch({
            type: mainAction.showModalTip,
            payload: {
                show: true,
                info: {
                    active: otherInfo,
                    title: '加入黑名单',
                    tip: `确定将 ${otherInfo.nickname || otherInfo.username} 加入黑名单吗？`,
                    actionType: '[chat] add black list'
                }
            }
        })
    }
    private deleteMemberEmit(item){
        this.store$.dispatch({
            type: mainAction.showModalTip,
            payload: {
                show: true,
                info: {
                    group: this.active,
                    deleteItem: item,
                    title: '删除群成员',
                    tip: `确定删除群成员 ${item.nickName || item.username} 吗？`,
                    actionType: '[chat] delete member'
                }
            }
        })
    }
    private modifyGroupDescriptionEmit(){
        this.store$.dispatch({
            type: chatAction.groupDescription,
            payload: {
                show: true
            }
        })
    }
    private updateGroupInfoEmit(newGroupInfo){
        if(newGroupInfo){
            this.store$.dispatch({
                type: chatAction.updateGroupInfo,
                payload: newGroupInfo
            })
        }else{
            this.store$.dispatch({
                type: chatAction.groupDescription,
                payload: {
                    show: false
                }
            })
        }
    }
    private addGroupEmit(){
        this.store$.dispatch({
            type: mainAction.createGroupShow,
            payload: {
                show: true,
                info: {
                    activeSingle: this.active,
                    action: 'many',
                    selfInfo: this.selfInfo
                }
            }
        })
    }
    private addMemberEmit(){
        this.store$.dispatch({
            type: mainAction.createGroupShow,
            payload: {
                show: true,
                info: {
                    filter: this.groupSetting.memberList,
                    action: 'add',
                    activeGroup: this.active
                }
            }
        })
    }
    private modifyGroupNameEmit(newGroupName){
        let groupSetting = Object.assign({}, this.groupSetting.groupInfo, {name: newGroupName, actionType: 'modifyName'});
        this.store$.dispatch({
            type: chatAction.updateGroupInfo,
            payload: groupSetting
        })
    }
    private playVideoEmit(url){
        this.store$.dispatch({
            type: chatAction.playVideoShow,
            payload: {
                url: url,
                show: true
            }
        })
    }
    private colseVideoEmit(){
        this.store$.dispatch({
            type: chatAction.playVideoShow,
            payload: {
                url: '',
                show: false
            }
        })
    }
    private alreadyBlackEmit(){
        this.store$.dispatch({
            type: mainAction.showModalTip,
            payload: {
                show: true,
                info: {
                    title: '加入黑名单',
                    tip: '此用户已在黑名单列表，不可重复添加',
                    actionType: '[chat] already black',
                    cancel: true
                }
            }
        })
    }
}