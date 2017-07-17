import { mainAction } from '../actions';
import { MainStore } from '../stores/main.store';
import { mainInit, init } from '../model';
import { contactAction } from '../../contact/actions';
import { chatAction } from '../../chat/actions';

export const mainReducer = (state: MainStore = mainInit, {type, payload}) => {
    state.actionType = type;
    switch (type) {
        case mainAction.init:
            state = init;
            break;
        case chatAction.getConversationSuccess:
            if(payload.conversation){
                state.mainLoading = true;
            }
            break;
            // 成功获取个人信息
        case mainAction.showSelfInfo:
            if (payload.show !== 'undefined') {
                state.selfInfo.show = payload.show;
            }
            // 获取个人信息成功
            if (payload.info) {
                state.selfInfo.info = Object.assign({}, state.selfInfo.info , payload.info);
            }
            if (payload.avatar) {
                state.selfInfo.info.avatarUrl = payload.avatar.url;
            }
            break;
        case mainAction.changeListTab:
            // 切换好友或者最近列表
            state.listTab = payload;
            break;
        case contactAction.selectContactItem:
            state.listTab = 0;
            break;
        case mainAction.createGroupShow:
            // 是否显示创建群组模块
            state.createGroup = payload;
            break;
        case mainAction.createGroupSuccess:
            // 创建群组成功
            state.createGroup.show = false;
            state.listTab = 0;
            break;
        case mainAction.addGroupMemberSuccess:
            state.createGroup.show = false;
            state.listTab = 0;
            break;
            // 修改密码
        case mainAction.modifyPasswordShow:
            state.modifyPasswordShow = payload;
            break;
        case chatAction.searchUserSuccess:
            state.searchUserResult = payload;
            break;
        case mainAction.selectSearchUser:
            state.listTab = 0;
            state.searchUserResult = {
                result: {
                    groupArr: [],
                    singleArr: []
                },
                isSearch: false
            };
            break;
            // 提示框
        case mainAction.showModalTip:
            
        case mainAction.hideModalTip:

        case mainAction.addBlackListSuccess:
            
        case mainAction.exitGroupSuccess:
        
        case mainAction.deleteMemberSuccess:
            state.tipModal = payload;
            break;
            // 显示创建单聊模态框
        case mainAction.createSingleChatShow:
            state.createSingleChat = payload;
            break;
            // 创建单聊成功
        case mainAction.createSingleChatSuccess:
            state.createSingleChat = {
                show: false,
                info: ''
            };
            state.listTab = 0;
            break;
        case mainAction.emptySingleChatTip:
            state.createSingleChat.info = payload.info;
            break;
        // 创建单聊失败或关闭单聊
        // case mainAction.createSingleChatError:
        //     if(payload.show){
        //         state.createSingleChat.show = payload.show;
        //     }
        //     state.createSingleChat.info = payload.info;
        //     break;
            // 创建群聊搜索联系人
        case mainAction.createGroupSearchComplete:
            state.createGroupSearch.info = payload;
            break;
            // 成功获取黑名单列表
        case mainAction.blackMenuSuccess:
            state.blackMenu = payload;
            break;
            // 隐藏黑名单列表
        case mainAction.hideBlackMenu:
            state.blackMenu = payload;
            break;
        case mainAction.delSingleBlack:
            delSingleBlackLoading(state, payload, true);
            break;
        case mainAction.delSingleBlackSuccess:
            delSingleBlackLoading(state, payload, false);
            break;
        case mainAction.logoutKickShow:
            state.logoutKick = payload;
            break;
        default:
    }
    return state;
};
function delSingleBlackLoading(state, payload, loadingValue) {
    for(let i=0; i<state.blackMenu.menu.length;i++) {
        if (state.blackMenu.menu[i].username === payload.username) {
            state.blackMenu.menu[i].loading = loadingValue;
            break;
        }
    }
}