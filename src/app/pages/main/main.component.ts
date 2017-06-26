import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { global, authPayload, StorageService } from '../../services/common';
import { AppStore } from '../../app.store';
import { mainAction } from './actions';
import { contactAction } from '../contact/actions';
import { chatAction } from '../chat/actions';
import { md5 } from '../../services/tools';

import { Util } from '../../services/util';

const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'app-main',
    styleUrls: ['./main.component.scss'],
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {
    private util: Util = new Util();
    private mainStream$;
    private global = global;
    private listTab = 0;
    private self: any = {
        show: false,
        info: {
            avatarUrl: ''
        }
    };
    private createGroup = {
        show: false,
        list: []
    };
    private islogoutShow = false;
    private isModifyPasswordShow = false;
    private searchUserResult = {
        isSearch: false,
        result: {
            singleArr: [],
            groupArr: []
        }
    };
    private tipModal = {
        show: false,
        info: {}
    };
    private createSingleChat = {
        show: false,
        info: ''
    };
    private blackMenu = {
        show: false,
        menu: []
    };
    private chatMenu = {
        show: false,
        info: [
            {
                key: 0,
                name: '发起单聊'
            },
            {
                key: 1,
                name: '发起群聊'
            }
        ]
    };
    private settingMenu = {
        show: false,
        info: [
            {
                key: 0,
                name: '修改密码'
            },
            {
                key: 1,
                name: '黑名单列表'
            },
            {
                key: 2,
                name: '退出登录'
            }
        ]
    };
    private conversationHover = {
        tip: '会话',
        position: {
            left: 56,
            top: 4
        },
        show: false
    };
    private contactHover = {
        tip: '通讯录',
        position: {
            left: 56,
            top: 4
        },
        show: false
    };
    private createHover = {
        tip: '创建',
        position: {
            left: 56,
            top: 4
        },
        show: false
    };
    private moreHover = {
        tip: '更多',
        position: {
            left: 56,
            top: 4
        },
        show: false
    };
    constructor(
        private store$: Store<AppStore>,
        private storageService: StorageService
    ){}
    public ngOnInit() {
        let that = this;
        this.subscribeStore();
        this.store$.dispatch({
            type: mainAction.getSelfInfo,
            payload: null
        });
        // document.getElementsByTagName('html')[0].addEventListener('click',function(){
        //     this.settingMenu.show = false;
        //     this.chatMenu.show = false;
        // }.bind(this), false);
        // 关闭窗口时存cookie，五分钟之内进入页面还可以免登陆
        // window.addEventListener("beforeunload", function(event) {
        //     let now = 5 * 60 * 1000;
        //     that.storageService.set(md5('afterFiveMinutes-username'), global.user, true, now);
        //     that.storageService.set(md5('afterFiveMinutes-password'), global.password, true, now);
        // });
    }
    @HostListener('window:click') onClick(){
        this.settingMenu.show = false;
        this.chatMenu.show = false;
    }
    // 关闭窗口时存cookie，五分钟之内进入页面还可以免登陆
    @HostListener('window:beforeunload') onBeforeunload(){
        let now = 5 * 60 * 1000;
        this.storageService.set(md5('afterFiveMinutes-username'), global.user, true, now);
        this.storageService.set(md5('afterFiveMinutes-password'), global.password, true, now);
    }
    private avatarErrorIcon(event) {
        event.target.src = avatarErrorIcon;
    }
    private subscribeStore(){
        this.mainStream$ = this.store$.select((state) => {
            let mainState = state['mainReducer'],
                contactState = state['contactReducer'];
            console.log('main',mainState);
            this.stateChanged(mainState, contactState);
            return state;
        }).subscribe((state) => {});
    }
    private stateChanged(mainState, contactState){
        console.log('main',mainState.actionType);
        switch(mainState.actionType){
            case contactAction.selectContactItem:
                this.listTab = mainState.listTab;
                break;
            case mainAction.showSelfInfo:
                if(mainState.selfInfo.info){
                    this.self.info = mainState.selfInfo.info;
                }
                this.self.show = mainState.selfInfo.show;
                break;
            case mainAction.changeListTab:
                this.listTab = mainState.listTab;
                break;
            case mainAction.createGroupShow:
                this.createGroup = mainState.createGroup;
                this.createGroup.list = contactState.conversation;
                break;
            case mainAction.createGroupSuccess:
                this.listTab = mainState.listTab;
                this.createGroup = mainState.createGroup;
                break;
            case mainAction.modifyPasswordShow:
                this.isModifyPasswordShow = mainState.modifyPasswordShow;
                break;
            case chatAction.searchUserSuccess:
                this.searchUserResult =  mainState.searchUserResult;
                break;
            case mainAction.selectSearchUser:
                this.listTab = mainState.listTab;
                this.searchUserResult = mainState.searchUserResult;
                break;
            case mainAction.hideModalTip:

            case mainAction.showModalTip:
            
            case mainAction.addBlackListSuccess:

            case mainAction.deleteMemberSuccess:
            
            case mainAction.exitGroupSuccess:
                this.tipModal = mainState.tipModal;
                break;
            case mainAction.createSingleChatShow:
                this.createSingleChat = mainState.createSingleChat;
            case  mainAction.createSingleChatSuccess:
                this.createSingleChat = mainState.createSingleChat;
                this.listTab = mainState.listTab;
                break;
            case mainAction.createSingleChatError:
                this.createSingleChat = mainState.createSingleChat;
                break;
            case mainAction.blackMenuSuccess:
                this.blackMenu = mainState.blackMenu;
                break;
            case mainAction.hideBlackMenu:
                this.blackMenu = mainState.blackMenu;
                break;
            case mainAction.delSingleBlack:
                this.blackMenu = mainState.blackMenu;
                break;
            case mainAction.delSingleBlackSuccess:
                this.blackMenu = mainState.blackMenu;
                break;
            default:

        }
    }
    ngOnDestroy(){
        this.mainStream$.unsubscribe();
        this.store$.dispatch({
            type: mainAction.logoutAction, 
            payload: null
        });
    }
    private changeListTab(index){
        this.store$.dispatch({
            type: mainAction.changeListTab, 
            payload: index
        });
    }
    private getSelfInfo(event){
        this.store$.dispatch({
            type: mainAction.showSelfInfo, 
            payload: {
                show: true
            }
        });
    }
    private selfInfoEmit(newInfo){
        console.log(newInfo)
        this.store$.dispatch({
            type: mainAction.showSelfInfo, 
            payload: {
                show: false
            }
        });
        if(newInfo && newInfo.info){
            this.store$.dispatch({
                type: mainAction.updateSelfInfo, 
                payload: newInfo.info
            });
        }
        if(newInfo && newInfo.avatar.url){
            this.store$.dispatch({
                type: mainAction.updateSelfAvatar, 
                payload: newInfo.avatar
            });
        }
    }
    private createGroupEmit(info){
        if(info && info.add){
            this.store$.dispatch({
                type: mainAction.addGroupMember, 
                payload: info
            });
        }else if(info && !info.add){
            this.store$.dispatch({
                type: mainAction.createGroup, 
                payload: info
            });
        }else{
            this.store$.dispatch({
                type: mainAction.createGroupShow, 
                payload: {
                    show: false,
                    info: {}
                }
            });
        }
    }
    private modifyPasswordEmit(info){
        if(info){
            this.store$.dispatch({
                type: mainAction.modifyPassword, 
                payload: info
            });
        }else{
            this.store$.dispatch({
                type: mainAction.modifyPasswordShow, 
                payload: false
            });
        }
    }
    // 搜索keyup事件
    private searchUserEmit(searchInfo){
        this.store$.dispatch({
            type: mainAction.searchUser,
            payload: searchInfo
        })
    }
    // 点击搜索结果
    private selectUserResultEmit(item){
        if(item.gid){
            item.group = true;
            item.type = 4;
            item.key = item.gid;
        }
        this.store$.dispatch({
            type: mainAction.selectSearchUser,
            payload: item
        })
    }
    // 点击创建单聊模态框确定取消按钮
    private createSingleChatEmit(singleName){
        this.createSingleChat = {
            show: true,
            info: ''
        };
        if(singleName === ''){
            this.store$.dispatch({
                type: mainAction.createSingleChatError,
                payload: {
                    show: true,
                    info: '请输入要单聊的用户名'
                }
            })
            return ;
        }
        // 点击确定
        if(singleName){
            this.store$.dispatch({
                type: mainAction.createSingleChatAction,
                payload: singleName
            })
        // 点击取消
        }else{
            this.store$.dispatch({
                type: mainAction.createSingleChatError,
                payload: {
                    show: false,
                    info: ''
                }
            })
        }
    }
    // 点击黑名单模态框确定按钮
    private blackMenuConfirmEmit(){
        this.store$.dispatch({
            type: mainAction.hideBlackMenu,
            payload: {
                menu: [],
                show: false
            }
        })
    }
    private delSingleBlackEmit(user){
        this.store$.dispatch({
            type: mainAction.delSingleBlack,
            payload: user
        })
    }
    private modalTipEmit(info){
        // 模态框点击确定按钮
        if(info){
            switch(info.actionType){
                case '[main] logout show':
                    this.store$.dispatch({
                        type: mainAction.logoutAction, 
                        payload: null
                    });
                    break;
                case '[chat] add black list':
                    this.store$.dispatch({
                        type: mainAction.addBlackListAction,
                        payload: info.active
                    })
                    break;
                case '[chat] exit group':
                    this.store$.dispatch({
                        type: mainAction.exitGroupAction,
                        payload: info.groupInfo.gid
                    })
                    break;
                case '[chat] delete member':
                    this.store$.dispatch({
                        type: mainAction.deleteMemberAction,
                        payload: {
                            deleteItem: info.deleteItem,
                            group: info.group
                        }
                    })
                    break;
                default:
            }
        // 模态框点击取消按钮
        }else{
            this.store$.dispatch({
                type: mainAction.hideModalTip,
                payload: {
                    show: false,
                    info: {}
                }
            })
        }
    }
    private chatMenuShow(event){
        event.stopPropagation();
        this.settingMenu.show = false;
        if(this.chatMenu.show === true){
            this.chatMenu.show = false;
        }else{
            this.chatMenu.show = true;
        }
    }
    private selectChatMenuItemEmit(item){
        if(item.key === 0){
            this.store$.dispatch({
                type: mainAction.createSingleChatShow,
                payload: {
                    show: true,
                    info: ''
                }
            })
        }else if(item.key === 1){
            this.store$.dispatch({
                type: mainAction.createGroupShow, 
                payload: {
                    show: true,
                    info: {}
                }
            });
        }
        this.chatMenu.show = false;
    }
    private settingMenuShow(event){
        event.stopPropagation();
        this.chatMenu.show = false;
        if(this.settingMenu.show === true){
            this.settingMenu.show = false;
        }else{
            this.settingMenu.show = true;
        }
    }
    private selectSettingItemEmit(item){
        switch(item.key){
            case 0 :
                this.store$.dispatch({
                    type: mainAction.modifyPasswordShow, 
                    payload: true
                });
                break;
            case 1:
                this.store$.dispatch({
                    type: mainAction.blackMenu,
                    payload: null
                })
                break;
            case 2:
                this.store$.dispatch({
                    type: mainAction.showModalTip,
                    payload: {
                        show: true,
                        info: {
                            title: '退出jmessage',
                            tip: '是否确定退出jmessage？',
                            actionType: '[main] logout show'
                        }
                    }
                })
                break;
        }
        this.settingMenu.show = false;
    }
}