import { mainAction } from '../../main/actions';
import { chatAction } from '../actions';
import { ChatStore } from '../stores/chat.store';
import { chatInit } from '../model';
import { contactAction } from '../../contact/actions';
import { global } from '../../../services/common';
import { Util } from '../../../services/util';
let util = new Util();

export const chatReducer = (state: ChatStore = chatInit, {type, payload}) => {
    state.actionType = type;
    switch (type) {
        case chatAction.getConversationSuccess:
            // 初始化会话
            if(!payload.storage && payload.conversation){
                state.conversation = payload.conversation;
            }else if(!payload.storage && payload.noDisturb){
                addNoDisturb(state, payload.noDisturb);
            }else if(state.messageList.length > 0 && payload.storage){
                unreadNum(state, payload);
                console.log('00000000000', state.conversation, state.messageList);
                filterRecentMsg(state);
                state.msgId = filterMsgId(state, 'init');
            }
            if(state.messageList.length > 0 || payload.conversation){
                completionMessageList(state);
            }
            break;
        case chatAction.getAllMessageSuccess:
            // 登陆后，离线消息同步消息列表
            if(!payload.storage){
                state.messageList = payload;
            }else if(state.conversation.length > 0 && payload.storage){
                unreadNum(state, payload);
                console.log('00000000000');
                filterRecentMsg(state);
                state.msgId = filterMsgId(state, 'init');
            }
            if(state.conversation.length > 0){
                completionMessageList(state);
            }
            break;
            // 接收消息
        case chatAction.receiveMessage:
            addMessage(state, payload);
            let newMsgKey = [];
            for(let i=0;i<payload.messages.length;i++){
                newMsgKey.push({
                    key: payload.messages[i].from_uid || payload.messages[i].from_gid
                })
            }
            state.msgId = filterMsgId(state, 'update', newMsgKey);
            break;
            // 发送单聊文本消息
        case chatAction.sendSingleMessage:

            // 发送群组文本消息
        case chatAction.sendGroupMessage:

            // 发送单聊图片消息
        case chatAction.sendSinglePic:

            // 发送群组图片消息
        case chatAction.sendGroupPic:
            
            // 发送单聊文件消息
        case chatAction.sendSingleFile:
        
            // 发送群组文件消息
        case chatAction.sendGroupFile:
            // 判断是否是重发消息
            if(!payload.msgs.repeatSend){
                addMessage(state, payload);
            }
            break;
            // 发送消息成功（包括所有类型的消息）
        case chatAction.sendMsgComplete:
            sendMsgComplete(state, payload);        
            if(payload.success === 2){
                state.msgId = filterMsgId(state, 'update', [{key: payload.key}]);
            }
            break;
        case chatAction.changeActivePerson:
            // 更换当前会话用户
            state.activePerson = payload.item;
            state.defaultPanelIsShow = payload.defaultPanelIsShow;
            emptyUnreadNum(state, payload.item);
            state.msgId = filterMsgId(state, 'update', [{key: state.activePerson.key}]);
            changeActivePerson(state);
            break;
            // 删除本地会话列表
        case chatAction.deleteConversationItem:
            deleteConversationItem(state, payload);
            break;
        case contactAction.selectContactItem:
            state.defaultPanelIsShow = false;
            state.activePerson = payload;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
        case chatAction.getResourceUrl:
            // 获取静态资源路径
            messageListUrl(state, payload);
            break;
            // 保存草稿
        case chatAction.saveDraft:
            state.messageList[payload[1].activeIndex].draft = payload[0];
            for(let i=0;i<state.conversation.length;i++){
                if(payload[1].key == state.conversation[i].key){
                    state.conversation[i].draft = payload[0];
                }
            }
            break;
            // 搜索用户
        case mainAction.searchUser:
            state.searchUserResult = searchUser(state, payload);
            break;
        case mainAction.selectSearchUser:
            state.defaultPanelIsShow = false;
            state.activePerson = payload;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
            // 成功查看别人的信息
        case chatAction.watchOtherInfoSuccess:
            if(state.activePerson.type === 3 ){
                payload.info.avatarUrl = state.activePerson.avatarUrl;                
            }
            state.otherInfo = payload;
            break;
            // 隐藏别人的信息框
        case chatAction.hideOtherInfo:
            state.otherInfo = payload;
            break;
            // 获取群组信息
        case chatAction.groupInfo:
            if(payload.groupInfo){
                state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo = payload.groupInfo;
            }
            if(payload.memberList){
                sortGroupMember(payload.memberList);
                state.messageList[state.activePerson.activeIndex].groupSetting.memberList = payload.memberList;
            }
            break;
            // 显示隐藏群组设置
        case chatAction.groupSetting:
            let msg = state.messageList[state.activePerson.activeIndex];
            if(!msg.groupSetting){
                state.messageList[state.activePerson.activeIndex] = Object.assign({}, msg, {groupSetting: {}});
            }
            state.messageList[state.activePerson.activeIndex].groupSetting.show = payload.show;
            break;
        case mainAction.createSingleChatSuccess:
            state.activePerson = payload;             
            selectUserResult(state, payload);
            state.defaultPanelIsShow = false;
            changeActivePerson(state);
            break;
        case mainAction.createGroupSuccess:
            state.activePerson = payload;
            state.defaultPanelIsShow = false;
            selectUserResult(state, payload);
            changeActivePerson(state);
            state.groupList.push(payload);
            break;
        case chatAction.createOtherChat:
            if(payload.username){
                payload.name = payload.username;
            }
            if(payload.uid){
                payload.key = payload.uid;
            }
            if(payload.nickname){
                payload.nickName = payload.nickname;
            }
            state.activePerson = payload;
            state.defaultPanelIsShow = false;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
        case contactAction.getGroupListSuccess:
            state.groupList = payload;
            break;
        case mainAction.exitGroupSuccess:
            deleteConversationItem(state, payload);
            state.defaultPanelIsShow = true;
            state.messageList[state.activePerson.activeIndex].groupSetting.show = false;
            for(let i=0;i<state.groupList.length;i++){
                if(state.groupList[i].gid === payload.gid){
                    state.groupList.splice(i,1);
                    break;
                }
            }
            break;
        case mainAction.addBlackListSuccess:
            deleteConversationItem(state, payload.deleteItem);
            if(state.activePerson.type === 3){
                state.defaultPanelIsShow = true;
            }
            state.otherInfo.show = false;
            break;
        case mainAction.deleteMemberSuccess:
            deleteGroupItem(state, payload);
            break;
        case chatAction.groupDescription:
            state.groupDeacriptionShow = payload.show;
            if(payload.data){
                state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo.desc = payload.data.group_description;
            }
            break;
        case chatAction.groupName:
            state.activePerson.name = state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo.name = payload.name;
            
            break;
        // 成功获取个人信息
        case mainAction.showSelfInfo:
            // 获取个人信息成功
            if (payload.info) {
                state.selfInfo.info = Object.assign({}, state.selfInfo.info , payload.info);
            }
            if (payload.avatar) {
                state.selfInfo.info.avatarUrl = payload.avatar.url;
            }
            break;
        case chatAction.getSingleAvatarUrl:
            let msgs = state.messageList[state.activePerson.activeIndex].msgs;
            for(let i=0;i<msgs.length;i++){
            if(msgs[i].content.from_id !== global.user){
                    msgs[i].content.avatarUrl = state.activePerson.avatarUrl;
                }
            }
            break;
        case mainAction.addGroupMemberSuccess:
            state.messageList[state.activePerson.activeIndex].groupSetting.memberList = state.messageList[state.activePerson.activeIndex].groupSetting.memberList.concat(payload);
            break;
        case chatAction.changeNoDisturbSuccess:
            for(let i=0;i<state.conversation.length;i++){
                if(payload.key == state.conversation[i].key){
                    state.conversation[i].noDisturb = !state.conversation[i].noDisturb;                
                    break;
                }
            }
            break;
        default:
    }
    return state;
};
// 删除群成员
function deleteGroupItem(state: ChatStore, payload){
    for(let i=0;i<state.messageList[state.activePerson.activeIndex].groupSetting.memberList.length;i++){
        if(state.messageList[state.activePerson.activeIndex].groupSetting.memberList[i].uid === payload.deleteItem.uid){
            state.messageList[state.activePerson.activeIndex].groupSetting.memberList.splice(i, 1);
            break;
        }
    }
}
// 离线消息15天后消失，而会话列表依然存在，导致不一一对应，所以补全离线消息
function completionMessageList(state: ChatStore){
    for(let i=0;i<state.conversation.length;i++){
        let flag = false;
        for(let j=0;j<state.messageList.length;j++){
            if(state.conversation[i].key == state.messageList[j].key){
                flag = true;
                break;
            }
        }
        if(flag === false){
            state.messageList.push({
                key: state.conversation[i].key,
                msgs: []
            })
        }
    }
}
function addNoDisturb(state: ChatStore, noDisturb){
    for(let i=0;i<noDisturb.users.length;i++){
        for(let j=0;j<state.conversation.length;j++){
            if(noDisturb.users[i].username == state.conversation[j].name && state.conversation[j].type == 3){
                state.conversation[j].noDisturb = true;
                break;
            }
        }
    }
    for(let i=0;i<noDisturb.groups.length;i++){
        for(let j=0;j<state.conversation.length;j++){
            if(noDisturb.groups[i].gid == state.conversation[j].key && state.conversation[j].type == 4){
                state.conversation[j].noDisturb = true;
                break;
            }
        }
    }
}
function changeActivePerson(state: ChatStore){
    if(state.activePerson.group === true && state.activePerson.gid){
        state.activePerson.key = state.activePerson.gid;         
    }
    for(let i=0;i<state.messageList.length;i++){
        if(state.messageList[i].key == state.activePerson.key){
            state.activePerson.activeIndex = i;
            break;
        }
    }
}
function filterRecentMsg(state: ChatStore){
    console.log('000011111', state.conversation.length, state.messageList.length)
    for(let i=0;i<state.conversation.length;i++){
        for(let j=0;j<state.messageList.length;j++){
            if(state.conversation[i].key == state.messageList[j].key){
                let msgs = state.messageList[j].msgs;
                console.log('0');
                if(msgs.length > 0){
                    console.log(1);
                    msgs[msgs.length - 1].conversation_time_show = util.reducerDate(msgs[msgs.length - 1].content.create_time);
                    state.conversation[i].recentMsg = msgs[msgs.length - 1];               
                }
                break;                
            }
        }
    }
}
function filterMsgId(state: ChatStore, operation: string, payload?){
    if(operation === 'init'){
        let msgId = [];
        for(let i=0;i<state.conversation.length;i++){
            for(let j=0;j<state.messageList.length;j++){
                if(state.conversation[i].key == state.messageList[j].key){
                    let msgs = state.messageList[j].msgs;
                    if(!state.conversation[i].unreadNum && msgs.length > 0){
                        msgId.push({
                            key: state.messageList[j].key,
                            msgId: msgs[msgs.length - 1].msg_id
                        });
                    }else{
                        if(state.conversation[i].unreadNum !== msgs.length && msgs.length > 0){
                            msgId.push({
                                key: state.messageList[j].key,
                                msgId: msgs[msgs.length - 1 - state.conversation[i].unreadNum].msg_id
                            });
                        }
                    }
                    break;
                }
            }
        }
        return msgId;
    }else if(operation === 'update'){
        let msgId;
        for(let i=0;i<state.messageList.length;i++){
            for(let j=0;j<payload.length;j++){
                if(Number(state.messageList[i].key) === Number(payload[j].key)){
                    if(state.messageList[i].msgs.length > 0){
                        msgId = state.messageList[i].msgs[state.messageList[i].msgs.length - 1].msg_id;
                    }
                    let flag = true;
                    if(msgId){
                        for(let i=0;i<state.msgId.length;i++){
                            if(state.msgId[i].key == payload[j].key){
                                flag = false;
                                state.msgId[i] = {
                                    key: payload[j].key,
                                    msgId: msgId
                                };
                                break;
                            }
                        }
                    }
                    if(flag){
                        state.msgId.push({
                            key: payload[j].key,
                            msgId: msgId
                        })
                    }
                    break;
                }
            }
        }
        return state.msgId;
    }
}
// 将群主放在第一位
function sortGroupMember(memberList){
    for(let i = 0;i<memberList.length;i++){
        if(memberList[i].flag === 1){
            let temp = memberList.splice(i,1);
            memberList.unshift(temp[0]);
            break;
        }
    }
}
function unreadNum(state: ChatStore, payload){
    if(!payload.msgId){
        return ;
    }
    for(let a=0;a<state.messageList.length;a++){
        let flag = false;
        // 当localstorage里面存储了该会话人的msgId
        for(let i=0;i<payload.msgId.length;i++){
            if(state.messageList[a].key == payload.msgId[i].key){
                flag = true;
                for(let j=0;j<state.messageList[a].msgs.length;j++){
                    if(state.messageList[a].msgs[j].msg_id == payload.msgId[i].msgId){
                        let unreadNum = state.messageList[a].msgs.length - 1 - j;
                        for(let b=0;b<state.conversation.length;b++){
                            if(state.messageList[a].key == state.conversation[b].key){
                                state.conversation[b].unreadNum = unreadNum;
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        // 当localstorage里面没有存储该会话人的msgId
        if(flag === false){
            for(let b=0;b<state.conversation.length;b++){
                if(state.messageList[a].key == state.conversation[b].key){
                    state.conversation[b].unreadNum = state.messageList[a].msgs.length;
                    break;
                }
            }
        }
    }
}
// 完成消息的发送接口的调用后返回状态
function sendMsgComplete(state: ChatStore, payload){
    for(let i=0;i<state.messageList.length;i++){
        if(state.messageList[i].key == payload.key){
            for(let j=state.messageList[i].msgs.length-1;j>=0;j--){
                if(state.messageList[i].msgs[j].msgKey && payload.msgKey == state.messageList[i].msgs[j].msgKey){
                    if(payload.msgId){
                        state.messageList[i].msgs[j].msg_id = payload.msgId;                    
                    }
                    state.messageList[i].msgs[j].success = payload.success;
                    return;
                }
            }
        }
    }
}
// 删除本地的会话列表
function deleteConversationItem(state: ChatStore, payload){
    for(let i=0;i<state.conversation.length;i++){
        if(state.conversation[i].key == payload.item.key){
            state.conversation.splice(i,1);
            break;
        }
    }
    if(payload.item.key == state.activePerson.key){
        state.defaultPanelIsShow = true;
    }
}
// 添加消息到消息面板
function addMessage(state: ChatStore, payload){
    // 自己发消息将消息添加到消息列表   
    if(payload.key){
        console.log(55555, payload)
        for(let i=0;i<state.messageList.length;i++){
            if(state.messageList[i].key == payload.key && state.messageList[i].key){
                console.log(77777, payload.key)
                let msgs = state.messageList[i].msgs;
                if(msgs.length === 0){
                    payload.msgs.time_show = 'today';
                    msgs.push(payload.msgs);
                    state.newMessage = payload.msgs;
                    return ;
                }
                if((payload.msgs.content.create_time - msgs[msgs.length - 1].content.create_time) / 1000 / 60 > 5){
                    payload.msgs.time_show = 'today';
                }
                // payload.msgs.content.msg_body.text = payload.msgs.content.msg_body.text.replace('[a]','haha');
                msgs.push(payload.msgs);
                state.newMessage = payload.msgs;                 
            }
        }
        // 将当前会话放在第一位
        for(let a=0;a<state.conversation.length;a++){
            if(state.conversation[a].key == payload.key){
                payload.msgs.conversation_time_show = util.reducerDate(payload.msgs.content.create_time);
                state.conversation[a].recentMsg = payload.msgs;
                let item = state.conversation.splice(a,1);
                state.conversation.unshift(item[0]);
                break;                    
            }
        }
        // 清空会话草稿标志
        for(let i=0;i<state.conversation.length;i++){
            if((payload.key == state.conversation[i].key && payload.msgs.content.msg_type == 'text')){
                state.conversation[i].draft = '';
                break;
            }
        }
    // 接收到别人的消息添加到消息列表        
    }else{
        for(let j=0;j<payload.messages.length;j++){
            let flag = false;    
            // 如果发送人在会话列表里
            for(let i=0;i<state.messageList.length;i++){
                let groupMsg = payload.messages[j].msg_type === 4 && state.messageList[i].key == payload.messages[j].from_gid,
                    singleMsg = payload.messages[j].msg_type === 3 && state.messageList[i].key == payload.messages[j].from_uid;
                if(groupMsg || singleMsg){
                    let msgs = state.messageList[i].msgs;
                    if((payload.messages[j].content.create_time - msgs[msgs.length - 1].content.create_time) / 1000 / 60 > 5){
                        payload.messages[j].time_show = 'today';
                    }
                    payload.messages[j].content.avatarUrl = state.selfInfo.info.avatarUrl;
                    msgs.push(payload.messages[j]);
                    state.newMessage = payload.messages[j];
                    flag = true;
                    break;
                }
            }
            for(let a=0;a<state.conversation.length;a++){
                let groupMsg = payload.messages[j].msg_type === 4 && state.conversation[a].key == payload.messages[j].from_gid,
                    singleMsg = payload.messages[j].msg_type === 3 && state.conversation[a].key == payload.messages[j].from_uid;
                if(groupMsg || singleMsg){
                    let groupNoActive = payload.messages[j].msg_type === 4 && state.activePerson.key != payload.messages[j].from_gid,
                    singleNoActive = payload.messages[j].msg_type === 3 && state.activePerson.key != payload.messages[j].from_uid;
                    if(groupNoActive || singleNoActive){
                        if(!state.conversation[a].unreadNum){
                            state.conversation[a].unreadNum = 1;
                        }else{
                            state.conversation[a].unreadNum ++;
                        }
                    }
                    let item = state.conversation.splice(a,1);
                    state.conversation.unshift(item[0]);
                    payload.messages[j].conversation_time_show = util.reducerDate(payload.messages[j].content.create_time);
                    state.conversation[0].recentMsg = payload.messages[j];
                    return ;                    
                }
            }
            // 如果发送人不在会话列表里            
            if(flag === false){
                payload.messages[j].time_show = 'today';
                let msg = {
                    key: payload.messages[j].from_uid,
                    msgs: [
                        payload.messages[j]
                    ],
                    draft: ''
                }
                state.newMessage = msg;
                state.messageList.push(msg);
                let conversationItem = {
                    avatar: "",
                    key: payload.messages[j].from_uid,
                    mtime: payload.messages[j].content.create_time,
                    name: payload.messages[j].content.from_id,
                    nickName: payload.messages[j].content.from_name,
                    type: payload.messages[j].msg_type
                }
                state.conversation.unshift(conversationItem);
                payload.messages[j].time_show = util.reducerDate(payload.messages[j].content.create_time);
                state.conversation[0].recentMsg = payload.messages[j];
            }
        }

    }
}
// 添加资源路径
function messageListUrl(state: ChatStore, payload){
    for(let i=0;i<payload.length;i++){
        for(let j=0;j<state.messageList.length;j++){
            if(payload[i].key == state.messageList[j].key){
                for(let a=0;a<state.messageList[j].msgs.length;a++){
                    if(payload[i].media_id == state.messageList[j].msgs[a].content.msg_body.media_id){
                        state.messageList[j].msgs[a].content.msg_body.media_url = payload[i].url;
                    }
                }
            }
        }
    }
}
// 搜索用户、群组
function searchUser(state: ChatStore, payload){
    if(payload === ''){
        return {
            result: {
                groupArr: [],
                singleArr: []
            },
            isSearch: false
        };
    }
    let singleArr = [],
        groupArr = [];
    for(let i=0;i<state.conversation.length;i++){
        let existNickName = state.conversation[i].nickName && state.conversation[i].nickName.toLowerCase().indexOf(payload.toLowerCase()) != -1;
        let existName = state.conversation[i].name && state.conversation[i].name.toLowerCase().indexOf(payload.toLowerCase()) != -1;
        let existSingle = state.conversation[i].type === 3;
        if(existSingle && existNickName){
            state.conversation[i].existNickName = true;
            singleArr.push(state.conversation[i]);
        }else if(existSingle && existName){
            state.conversation[i].existName = true;
            singleArr.push(state.conversation[i]);
        }
    }
    for(let i=0;i<state.groupList.length;i++){
        let existGroup = (state.groupList[i].name.toLowerCase().indexOf(payload.toLowerCase()) != -1);
        if(existGroup){
            groupArr.push(state.groupList[i]);
        }
    }
    return {
        result: {
            singleArr,
            groupArr
        },
        isSearch: true
    };
}
// 选择搜索的用户、发起单聊
function selectUserResult(state, payload){
    if(payload.gid){
        payload.key = payload.gid;
    }
    let conversation = state.conversation,
        flag = false;
    for(let i=0;i<conversation.length;i++){
        if((conversation[i].key == payload.key && payload.key)){
            let item = conversation.splice(i,1);
            conversation.unshift(item[0]);
            flag = true;
            break;
        }
    }
    if(flag === false){
        conversation.unshift(payload);
        state.messageList.push({
            key: payload.key,
            msgs: []
        })
    }
}
// 切换当前会话时,清空未读消息数目
function emptyUnreadNum(state: ChatStore, payload){
    for(let i=0;i<state.conversation.length;i++){
        if(state.conversation[i].key == payload.key){
            if(state.conversation[i].unreadNum){
                state.conversation[i].unreadNum = 0;
                break;
            }
        }
    }
}
