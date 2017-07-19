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
        case contactAction.getGroupListSuccess:
            state.groupList = util.sortByLetter(payload);
            break;
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
            if(!isSingleExist(state, payload)){
                state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload));                
            }
            break;
        case mainAction.exitGroupSuccess:
        
        case chatAction.deleteConversationItem:
            addInfoToGroup(state, payload);
            break;
        // 修改群名称后重新排序
        case chatAction.updateContactInfo:
            state.groupList = util.sortByLetter(payload.groupList);
            state.conversation = flagGroup(util.sortByLetter(payload.conversation));
            break;
    }
    return state;
};
// 陌生人发消息给自己将其添加到联系人中
function addStranger(state, payload){
    for(let a=0;a<payload.messages.length;a++){
        let flag1 = 0,
            flag2 = 0;       
        for(let i=0;i<state.conversation.length;i++){
            for(let j=0;j<state.conversation[i].data.length;j++){
                let groupFlag = (payload.messages[a].msg_type === 4 && Number(state.conversation[i].data[j].key) === Number(payload.messages[a].from_gid)),
                    singleFlag = (payload.messages[a].msg_type === 3 && Number(state.conversation[i].data[j].key) === Number(payload.messages[a].from_uid));
                if(groupFlag){
                    flag1 = 1;
                    break;
                }
                if(singleFlag){
                    flag2 = 2;
                    break;
                }
            }
        }
        // 群聊
        if(flag1 === 0){
            for(let b=0;b<state.groupList.length;b++){
                for(let c=0;c<state.groupList[b].data.length;c++){
                    if(Number(payload.messages[a].from_gid) === Number(state.groupList[b].data[c].gid)){
                        state.groupList[b].data[c].type = 4;
                        state.conversation = flagGroup(util.insertSortByLetter(state.conversation, state.groupList[b].data[c]));
                        break;
                    }
                }
            }
        }
        // 单聊
        if(flag2 === 0){
            payload.messages[a].name = payload.messages[a].content.from_id;
            payload.messages[a].type = 3;
            payload.messages[a].avatarUrl = payload.messages[a].content.avatarUrl;
            state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload.messages[a]));
        }
    }
        
}
// 删除会话时将会话的信息转移到群
function addInfoToGroup(state, payload){
    console.log(7777, payload.item);
    for(let i=0;i<state.groupList.length;i++){
        for(let j=0;j<state.groupList[i].data.length;j++){
            let flag = Number(state.groupList[i].data[j].gid) === Number(payload.item.key) || Number(state.groupList[i].data[j].gid) === Number(payload.item.gid);
            if(flag){
                state.groupList[i].data[j] = Object.assign({}, state.groupList[i].data[j], payload.item);
                break;
            }
        }
    }
}
// 判断是否已经存在这个单聊
function isSingleExist(state, payload){
    for(let i=0;i<state.conversation.length;i++){
        for(let j=0;j<state.conversation[i].data.length;j++){
            if(Number(state.conversation[i].data[j].key) === Number(payload.key)){
                return true;
            }
        }
    }
    return false;
}
// 判断某字母是否全是群组的数据
function flagGroup(payload){
    for(let i=0;i<payload.length;i++){
        if(payload[i].data.length > 0){
            let flag = true;
            for(let j=0;j<payload[i].data.length;j++){
                if(payload[i].data[j].type == 3){
                    flag = false;
                    break;
                }
            }
            if(flag){
                payload[i].allGroup = true;
            }else{
                payload[i].allGroup = false;
            }
        }
    }
    return payload;
}
