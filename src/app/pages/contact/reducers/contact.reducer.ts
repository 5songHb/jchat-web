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
            state.groupList = flagGroup(util.insertSortByLetter(state.groupList, payload));
            state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload));            
            break;
        case chatAction.dispatchConversationList:
            state.conversation = flagGroup(util.sortByLetter(payload));
            break;
        case mainAction.createSingleChatSuccess:
            if(!isSingleExist(state, payload)){
                state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload));                
            }
            break;
    }
    return state;
};
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
            if(flag === true){
                payload[i].allGroup = true;
            }else{
                payload[i].allGroup = false;
            }
        }
    }
    return payload;
}
