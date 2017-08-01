import { contactAction } from '../actions';
import { ContactStore } from '../stores/contact.store';
import { contactInit } from '../model';
import { mainAction } from '../../main/actions';
import { chatAction } from '../../chat/actions';
import { Util } from '../../../services/util';
let util = new Util();

export const contactReducer = (state: ContactStore = contactInit, {type, payload}) => {
    state.actionType = type;
    switch (type) {
        case contactAction.init:
            state = Object.assign({}, contactInit, {});
            break;
        case contactAction.getGroupListSuccess:
            state.groupList = util.sortByLetter(payload);
            break;
        case chatAction.createGroupSuccessEvent:

        case mainAction.createGroupSuccess:
            state.groupList = util.insertSortByLetter(state.groupList, payload);
            state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload));
            break;
        case chatAction.dispatchConversationList:
            state.conversation = flagGroup(util.sortByLetter(payload));
            break;
        case chatAction.receiveMessageSuccess:
            addStranger(state, payload);
            break;
        case mainAction.createSingleChatSuccess:
            if (!isSingleExist(state, payload)) {
                state.conversation =
                    flagGroup(util.insertSortByLetter(state.conversation, payload));
            }
            break;
        case mainAction.exitGroupSuccess:
            exitGroup(state, payload);
            break;
        case chatAction.deleteConversationItem:
            addInfoToGroup(state, payload);
            break;
        // 修改群名称后重新排序
        case chatAction.updateContactInfo:
            state.groupList = util.sortByLetter(payload.groupList);
            state.conversation = flagGroup(util.sortByLetter(payload.conversation));
            break;
        default:
    }
    return state;
};
// 退出群聊时删除群组列表
function exitGroup(state, payload) {
    for (let group of state.groupList) {
        for (let j = 0; j < group.data.length; j++) {
            if (Number(payload.item.key) === Number(group.data[j].gid)) {
                group.data.splice(j, 1);
                break;
            }
        }
    }
}
// 陌生人发消息给自己将其添加到联系人中
function addStranger(state, payload) {
    for (let a=0;a<payload.messages.length;a++) {
        let flag = false;
        for (let i=0;i<state.conversation.length;i++) {
            for(let j=0;j<state.conversation[i].data.length;j++){
                let singleFlag = (payload.messages[a].msg_type === 3 &&
                    (Number(state.conversation[i].data[j].key) === Number(payload.messages[a].from_uid)));
                if (singleFlag) {
                    flag = true;
                    break;
                }
            }
        }
        // 单聊
        if (!flag && payload.messages[a].msg_type === 3) {
            payload.messages[a].name = payload.messages[a].content.from_id;
            payload.messages[a].type = 3;
            payload.messages[a].avatarUrl = payload.messages[a].content.avatarUrl;
            payload.messages[a].key = payload.messages[a].from_uid;
            state.conversation =
                flagGroup(util.insertSortByLetter(state.conversation, payload.messages[a]));
        }
    }
}
// 删除会话时将会话的信息转移到群
function addInfoToGroup(state, payload) {
    for (let group of state.groupList){
        for (let j = 0; j < group.data.length; j++) {
            let flag = Number(group.data[j].gid) === Number(payload.item.key) ||
                        Number(group.data[j].gid) === Number(payload.item.gid);
            if (flag) {
                group.data[j] = Object.assign({}, group.data[j], payload.item);
                break;
            }
        }
    }
}
// 判断是否已经存在这个单聊
function isSingleExist(state, payload) {
    for (let i=0;i<state.conversation.length;i++) {
        for (let j=0;j<state.conversation[i].data.length;j++) {
            if (Number(state.conversation[i].data[j].key) === Number(payload.key)) {
                return true;
            }
        }
    }
    return false;
}
// 判断某字母是否全是群组的数据
function flagGroup(payload) {
    for (let payItem of payload) {
        if (payItem.data.length > 0) {
            let flag = true;
            for (let dataItem of payItem.data) {
                if (dataItem.type === 3) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                payItem.allGroup = true;
            }else {
                payItem.allGroup = false;
            }
        }
    }
    return payload;
}
