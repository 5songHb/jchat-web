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
            if(payload.storage){
                state.conversation = payload.conversation;
                state.messageList = payload.messageList;
                state.imageViewer = filterImageViewer(state);
                unreadNum(state, payload);
                filterRecentMsg(state);
                state.msgId = filterMsgId(state, 'init');
                state.isLoaded = true;
                completionMessageList(state);
            }
            if(payload.shield){
                addGroupShield(state, payload.shield);
            }
            break;
        case chatAction.getAllMessageSuccess:
            // 登陆后，离线消息同步消息列表
            state.messageList = payload;
            state.imageViewer = filterImageViewer(state);
            break;
            // 接收消息
        case chatAction.receiveMessageSuccess:
            addMessage(state, payload);
            let newMsgKey = [];
            for(let i=0;i<payload.messages.length;i++){
                newMsgKey.push({
                    key: payload.messages[i].from_gid || payload.messages[i].from_uid
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
            clearTimer(state);
            state.activePerson = Object.assign({}, payload.item, {});
            state.defaultPanelIsShow = payload.defaultPanelIsShow;
            emptyUnreadNum(state, payload.item);
            state.msgId = filterMsgId(state, 'update', [{key: state.activePerson.key}]);
            changeActivePerson(state);
            break;
        case contactAction.selectContactItem:
            
        case mainAction.selectSearchUser:
            state.defaultPanelIsShow = false;
            clearTimer(state);
            state.activePerson = Object.assign({}, payload, {});
            selectUserResult(state, payload);
            changeActivePerson(state);            
            emptyUnreadNum(state, payload);
            state.msgId = filterMsgId(state, 'update', [{key: state.activePerson.key}]);
            break;
            // 删除本地会话列表
        case chatAction.deleteConversationItem:
            if(state.activePerson.activeIndex >= 0){
                if(state.messageList[state.activePerson.activeIndex].groupSetting){
                    state.messageList[state.activePerson.activeIndex].groupSetting.show = false;
                }
            }
            deleteConversationItem(state, payload);            
            break;
        case chatAction.getResourceUrl:
            // 获取静态资源路径
            messageListUrl(state, payload);
            break;
            // 保存草稿
        case chatAction.saveDraft:
            if(state.messageList[payload[1].activeIndex])
                state.messageList[payload[1].activeIndex].draft = payload[0];
            for(let i=0;i<state.conversation.length;i++){
                if(Number(payload[1].key) === Number(state.conversation[i].key)){
                    state.conversation[i].draft = payload[0];
                }
            }
            break;
            // 搜索用户
        case mainAction.searchUser:
            state.searchUserResult = searchUser(state, payload);
            break;
            // 成功查看别人的信息
        case chatAction.watchOtherInfoSuccess:
            if(state.activePerson.type === 3 ){
                payload.info.avatarUrl = state.activePerson.avatarUrl;                
            }
            if(payload.black){
                state.otherInfo.black = payload.black;
            }
            state.otherInfo.info = payload.info;
            state.otherInfo.show = payload.show;
            break;
            // 隐藏别人的信息框
        case chatAction.hideOtherInfo:
            state.otherInfo = payload;
            break;
            // 获取群组信息
        case chatAction.groupInfo:
            let name = '';
            if(payload.groupInfo){
                state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo = payload.groupInfo;
                if(name !== '' && payload.groupInfo.name === ''){
                    state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo.name = name;
                }
            }
            if(payload.memberList){
                sortGroupMember(payload.memberList);
                let groupSetting = state.messageList[state.activePerson.activeIndex].groupSetting;
                groupSetting.memberList = payload.memberList;
                // 如果群没有名字，给其用群成员名字代替
                name = '';
                for(let i=0;i<groupSetting.memberList.length;i++){
                    name += (groupSetting.memberList[i].nickName !== '' ? groupSetting.memberList[i].nickName : groupSetting.memberList[i].usernmae) + '、';
                }
                if(name.length > 20){
                    name = name.slice(0, 20);
                }else{
                    name = name.slice(0, name.length - 1);
                }
                let groupInfo = state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo;
                if(name !== '' && groupInfo && groupInfo.name === ''){
                    groupInfo.name = name;
                }
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
            state.otherInfo.info = payload;
            state.otherInfo.show = true;
            break;
        case mainAction.createGroupSuccess:
            clearTimer(state);
            state.activePerson = Object.assign({}, payload, {});
            state.defaultPanelIsShow = false;
            selectUserResult(state, payload);
            changeActivePerson(state);
            state.groupList.push(payload);
            break;
        case chatAction.createOtherChat:
            clearTimer(state);
            if(payload.username){
                payload.name = payload.username;
            }
            if(payload.uid){
                payload.key = payload.uid;
            }
            if(payload.nickname){
                payload.nickName = payload.nickname;
            }
            state.activePerson = Object.assign({}, payload, {});
            state.defaultPanelIsShow = false;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
        case contactAction.getGroupListSuccess:
            state.groupList = payload;
            break;
        case mainAction.exitGroupSuccess:
            let message = state.messageList[state.activePerson.activeIndex];
            if(!message.groupSetting){
                state.messageList[state.activePerson.activeIndex] = Object.assign({}, msg, {groupSetting: {}});
            }
            state.messageList[state.activePerson.activeIndex].groupSetting.show = payload.show;
            state.defaultPanelIsShow = true;
            state.messageList[state.activePerson.activeIndex].groupSetting.show = false;
            for(let i=0;i<state.groupList.length;i++){
                if(Number(state.groupList[i].gid) === Number(payload.gid)){
                    state.groupList.splice(i,1);
                    break;
                }
            }
            deleteConversationItem(state, payload);
            break;
        case mainAction.addBlackListSuccess:
            if(state.activePerson.type === 3){
                state.defaultPanelIsShow = true;
            }
            state.otherInfo.show = false;
            deleteConversationItem(state, payload.deleteItem);            
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
            updateGroupName(state, payload);
            break;
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
        case chatAction.changeGroupShieldSuccess:
            for(let i=0;i<state.conversation.length;i++){
                if(Number(payload.key) === Number(state.conversation[i].key)){
                    state.conversation[i].shield = !state.conversation[i].shield;                
                    break;
                }
            }
            break;
        case chatAction.addGroupMembersEventSuccess:
            groupMembersEvent(state, payload, '被添加进群聊了');
            break;
        case chatAction.updateGroupMembersEvent:
            updateGroupMembers(state, payload);
            break;
        case chatAction.deleteGroupMembersEvent:
            groupMembersEvent(state, payload, '被移出群聊了');
            deleteGroupMembersEvent(state, payload);
            break;
        // 获取voice是否已经播放的状态
        case chatAction.getVoiceStateSuccess:
            state.voiceState = payload;
            break;
        case chatAction.playVideoShow:
            state.playVideoShow = payload;
            break;
        default:
    }
    return state;
};
function deleteGroupMembersEvent(state, payload){
    for(let i=0;i<state.messageList.length;i++){
        if(Number(state.messageList[i].key) === Number(payload.gid)){
            if(state.messageList[i].groupSetting && state.messageList[i].groupSetting.memberList){
                state.messageList[i].groupSetting.memberList = state.messageList[i].groupSetting.memberList.filter(function(item1) {
                    return payload.to_usernames.every(function(item2) {
                        return item2.username !== item1.username;
                    })
                })
            }
            break;
        }
    }
}
function updateGroupName(state, payload){
    for(let i=0;i<state.groupList.length;i++){
        if(Number(payload.gid) === Number(state.groupList[i].gid)){
            state.groupList[i].name = payload.name;
            break;
        }
    }
}
// 切换用户前清除语音的定时器
function clearTimer(state: ChatStore){
    if(state.activePerson.activeIndex < 0 && !state.messageList[state.activePerson.activeIndex]){
        return;
    }
    let msg = state.messageList[state.activePerson.activeIndex].msgs;
    for(let i=0;i<msg.length;i++){
        if(msg[i].content.msg_type === 'voice' && msg[i].content.timer1){
            clearInterval(msg[i].content.timer1);
            clearInterval(msg[i].content.timer2);
            clearInterval(msg[i].content.timer3);
            msg[i].content.playing = {
                single: true,
                double: true,
                max: true
            }
        }
    }
}

// 被添加进群时更新群成员
function updateGroupMembers(state: ChatStore, payload){
    for(let i=0;i<state.messageList.length;i++){
        if(Number(state.messageList[i].key) === Number(payload.eventData.gid)){
            if(state.messageList[i].groupSetting){
                state.messageList[i].groupSetting.memberList = payload.memberList;
            }
            break;
        }
    }
}
function isRecentmsg(state, payload, addGroupOther, operation){
    for(let j=0;j<state.messageList.length;j++){
        if(Number(state.conversation[0].key) === Number(state.messageList[j].key)){
            if(payload.ctime * 1000 > state.messageList[j]['msgs'][state.messageList[j]['msgs'].length - 1].ctime_ms){
                state.conversation[0].recentMsg = {
                    ctime_ms: payload.ctime * 1000,
                    content: {
                        msg_body: {
                            text: addGroupOther + operation
                        },
                        msg_type: 'groupEvent'
                    },
                    conversation_time_show: 'today',
                    msg_type: 4
                }
            }
            break;
        }
    }
}
// 被添加进群的事件
function groupMembersEvent(state: ChatStore, payload, operation){
    let usernames = payload.to_usernames,
        addGroupOther = '';
    for(let i=0;i<usernames.length;i++){
        if(usernames[i].username === global.user){
            addGroupOther = '您' + '、';
        }else{
            let name = '';
            if(usernames[i].nickname && usernames[i].nickname !== ''){
                name = usernames[i].nickname;
            }else{
                name = usernames[i].username;
            }
            addGroupOther += name + '、';
        }
    }
    if(addGroupOther.length > 0){
        addGroupOther = addGroupOther.slice(0, addGroupOther.length - 1);
    }
    let flag1 = true;
    for(let i=0;i<state.conversation.length;i++){
        if(Number(payload.gid) === Number(state.conversation[i].key)){
            if(state.conversation[i].shield){
                return ;
            }
            flag1 = false;
            let item = state.conversation.splice(i, 1);
            state.conversation.unshift(item[0]);
            if(Number(state.activePerson.key) !== Number(state.conversation[0].key)){
                state.conversation[0].unreadNum ++;
            }
            isRecentmsg(state, payload, addGroupOther, operation);
            break;
        }
    }
    if(flag1){
        for(let i=0;i<state.groupList.length;i++){
            if(Number(state.groupList[i].gid) === Number(payload.gid)){
                if(state.groupList[i].shield){
                    return ;
                }
                state.groupList[i].type = 4;
                state.groupList[i].key = state.groupList[i].gid;
                state.groupList[i].unreadNum ++;
                state.conversation.unshift(state.groupList[i]);
                flag1 = false;
                isRecentmsg(state, payload, addGroupOther, operation);
                break;
            }
        }
    }
    if(flag1){
        let conversation = {
            key: payload.gid,
            name: payload.name,
            type: 4,
            unreadNum: 1,
            recentMsg: {
                ctime_ms: payload.ctime * 1000,
                content: {
                    msg_body: {
                        text: addGroupOther + operation
                    },
                    msg_type: 'groupEvent'
                },
                conversation_time_show: 'today',
                msg_type: 4
            }
        }
        state.conversation.unshift(conversation);
    }
    let flag2 = true;
    for(let j=0;j<state.messageList.length;j++){
        if(Number(payload.gid) === Number(state.messageList[j].key)){
            flag2 = false;
            let msgs = state.messageList[j].msgs;
            if(msgs.length === 0){
                if(!state.messageList[j].addGroupOther){
                    state.messageList[j].addGroupOther = [];
                }
                state.messageList[j].addGroupOther.push({
                    tip: addGroupOther,
                    operation,
                    ctime_ms: payload.ctime,
                    time_show: true
                });
            }else{
                for(let i=0;i<msgs.length;i++){
                    if(payload.ctime * 1000 <= msgs[0].ctime_ms){
                        let eventObj = {
                            tip: addGroupOther,
                            operation,
                            ctime_ms: payload.ctime * 1000,
                            time_show: true
                        };
                        if(msgs.addGroupOther){
                            eventObj.time_show = util.fiveMinutes(msgs.addGroupOther[msgs.addGroupOther.length - 1].ctime_ms, payload.ctime * 1000);
                            msgs.addGroupOther.push(eventObj);
                        }else{
                            msgs.addGroupOther = [eventObj];
                        }
                        return ;
                    }
                    if(payload.ctime * 1000 >= msgs[msgs.length - 1].ctime_ms){
                        let eventObj = {
                            tip: addGroupOther,
                            operation,
                            ctime_ms: payload.ctime * 1000,
                            time_show: util.fiveMinutes(msgs[msgs.length - 1].ctime_ms, payload.ctime * 1000)
                        }
                        if(msgs[msgs.length - 1].addGroupOther){
                            eventObj.time_show = util.fiveMinutes(msgs[msgs.length - 1].addGroupOther[msgs[msgs.length - 1].addGroupOther.length - 1].ctime_ms, payload.ctime * 1000);
                            msgs[msgs.length - 1].addGroupOther.push(eventObj);
                        }else{
                            msgs[msgs.length - 1].addGroupOther = [eventObj];
                        }
                        return ;
                    }
                    if(payload.ctime * 1000 > msgs[i].ctime_ms && payload.ctime * 1000 < msgs[i + 1].ctime_ms){
                        let eventObj = {
                            tip: addGroupOther,
                            operation,
                            ctime_ms: payload.ctime * 1000,
                            time_show: util.fiveMinutes(msgs[i].ctime_ms, payload.ctime * 1000)
                        }
                        if(msgs[i].addGroupOther){
                            eventObj.time_show = util.fiveMinutes(msgs[i].addGroupOther[msgs[i].addGroupOther.length - 1].ctime_ms, payload.ctime * 1000);
                            msgs[i].addGroupOther.push(eventObj);
                        }else{
                            msgs[i].addGroupOther = [eventObj];
                        }
                    }
                }
            }
            break;
        }
    }
    if(flag2){
        state.messageList.push({
            key: payload.gid,
            msgs: [],
            addGroupOther: [
                {
                    tip: addGroupOther,
                    operation,
                    ctime_ms: payload.ctime * 1000,
                    time_show: true
                }
            ]
        });
    }
}
// 删除群成员
function deleteGroupItem(state: ChatStore, payload){
    let memberList = state.messageList[state.activePerson.activeIndex].groupSetting.memberList;
    for(let i=0;i<memberList.length;i++){
        if(memberList[i].username === payload.deleteItem.username){
            memberList.splice(i, 1);
            break;
        }
    }
}
// 离线消息15天后消失，而会话列表依然存在，导致不一一对应，所以补全离线消息
function completionMessageList(state: ChatStore){
    for(let i=0;i<state.conversation.length;i++){
        let flag = false;
        for(let j=0;j<state.messageList.length;j++){
            if(Number(state.conversation[i].key) === Number(state.messageList[j].key)){
                flag = true;
                break;
            }
        }
        if(!flag){
            state.messageList.push({
                key: state.conversation[i].key,
                msgs: []
            })
        }
    }
}
function addGroupShield(state: ChatStore, shield){
    for(let i=0;i<shield.length;i++){
        for(let j=0;j<state.conversation.length;j++){
            if(Number(shield[i].gid) === Number(state.conversation[j].key)){
                state.conversation[j].shield = 'switchRight';
                break;
            }
        }
    }
}
function filterImageViewer(state: ChatStore){
    let messageList = state.messageList[state.activePerson.activeIndex];
    if(state.activePerson.activeIndex < 0 || !messageList || !messageList.msgs){
        return [];
    }
    let imgResult = [],
        msgs = messageList.msgs;
    for(let j=0;j<msgs.length;j++){
        let content = msgs[j].content;
        if(content.msg_type === 'image' && (!content.msg_body.extras || !content.msg_body.extras.kLargeEmoticon || content.msg_body.extras.kLargeEmoticon !== 'kLargeEmoticon')){
            imgResult.push({
                src: content.msg_body.media_url,
                width: content.msg_body.width,
                height: content.msg_body.height,
                index: j
            });
        }
    }
    return imgResult;
}
function changeActivePerson(state: ChatStore){
    if(state.activePerson.type === 4 && state.activePerson.gid){
        state.activePerson.key = state.activePerson.gid;         
    }
    for(let i=0;i<state.messageList.length;i++){
        if(Number(state.messageList[i].key) === Number(state.activePerson.key)){
            state.activePerson.activeIndex = i;
            break;
        }
    }
    let list = state.messageList[state.activePerson.activeIndex];
    for(let i=0;i<list.msgs.length;i++){
        if(list.msgs[i].content.msg_type === 'file' && list.msgs[i].content.msg_body.extras && list.msgs[i].content.msg_body.extras.video){
            //audio 0 正在加载  1 加载完成  2 正在播放
            list.msgs[i].content.load = 0;
            // 加载进度 0%
            list.msgs[i].content.range = 0;
        }else if(list.msgs[i].content.msg_type === 'voice'){
            // voice 播放时的动画
            list.msgs[i].content.playing = {
                single: true,
                double: true,
                max: true
            };
        }
    }
    // 初始化已读语音消息的状态
    for(let i=0;i<state.voiceState.length;i++){
        if(Number(state.voiceState[i].key) === Number(list.key)){
            let flag = true;
            for(let j=0;j<list.msgs.length;j++){
                if(Number(state.voiceState[i].msgId) === Number(list.msgs[j].msg_id)){
                    list.msgs[j].content.havePlay = true;
                    flag = false;
                    break;
                }
            }
            if(flag){
                state.voiceState.splice(i, 1);
            }
        }
    }
    state.imageViewer = filterImageViewer(state);
}
function filterRecentMsg(state: ChatStore){
    for(let i=0;i<state.conversation.length;i++){
        for(let j=0;j<state.messageList.length;j++){
            if(Number(state.conversation[i].key) === Number(state.messageList[j].key)){
                let msgs = state.messageList[j].msgs;
                if(msgs.length > 0){
                    msgs[msgs.length - 1].conversation_time_show = util.reducerDate(msgs[msgs.length - 1].ctime_ms);
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
                if(Number(state.conversation[i].key) === Number(state.messageList[j].key)){
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
                            if(Number(state.msgId[i].key) === Number(payload[j].key)){
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
            if(Number(state.messageList[a].key) === Number(payload.msgId[i].key)){
                flag = true;
                let idFlag = false;
                for(let j=0;j<state.messageList[a].msgs.length;j++){
                    if(Number(state.messageList[a].msgs[j].msg_id) === Number(payload.msgId[i].msgId)){
                        idFlag = true;
                        let unreadNum = 0;
                        for(let c=j + 1;c<state.messageList[a].msgs.length;c++){
                            if(state.messageList[a].msgs[c].content.from_id !== global.user){
                                unreadNum ++;
                            }
                        }
                        for(let b=0;b<state.conversation.length;b++){
                            if(Number(state.messageList[a].key) === Number(state.conversation[b].key)){
                                state.conversation[b].unreadNum = unreadNum;
                                break;
                            }
                        }
                        break;
                    }
                }
                // 当localstorage里面存储该会话人，但是没有储存对应的msgId
                if(!idFlag){
                    let unreadNum = 0;
                    for(let c=0;c<state.messageList[a].msgs.length;c++){
                        if(state.messageList[a].msgs[c].content.from_id !== global.user){
                            unreadNum ++;
                        }
                    }
                    for(let b=0;b<state.conversation.length;b++){
                        if(Number(state.messageList[a].key) === Number(state.conversation[b].key)){
                            state.conversation[b].unreadNum = unreadNum;
                            break;
                        }
                    }
                }
                break;
            }
        }
        // 当localstorage里面没有存储该会话人的msgId
        if(!flag){
            for(let b=0;b<state.conversation.length;b++){
                if(Number(state.messageList[a].key) === Number(state.conversation[b].key)){
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
        if(Number(state.messageList[i].key) === Number(payload.key)){
            let msgs = state.messageList[i].msgs;
            for(let j=msgs.length-1;j>=0;j--){
                if(msgs[j].msgKey && Number(payload.msgKey) === Number(msgs[j].msgKey)){
                    if(payload.msgId){
                        msgs[j].msg_id = payload.msgId;                    
                    }
                    msgs[j].success = payload.success;
                    return;
                }
            }
        }
    }
}
// 删除本地的会话列表
function deleteConversationItem(state: ChatStore, payload){
    for(let i=0;i<state.conversation.length;i++){
        if(Number(state.conversation[i].key) === Number(payload.item.key) || Number(state.conversation[i].key) === Number(payload.item.uid)){
            state.conversation.splice(i,1);
            break;
        }
    }
    for(let i=0;i<state.groupList.length;i++){
        let flag = Number(state.groupList[i].gid) === Number(payload.item.key) || Number(state.groupList[i].gid) === Number(payload.item.gid);
        if(flag){
            state.groupList[i] = Object.assign({}, state.groupList[i], payload.item);
            break;
        }
    }
    if(Number(payload.item.key) === Number(state.activePerson.key)){
        state.defaultPanelIsShow = true;
        state.activePerson.activeIndex = -1;
        state.activePerson.key = '0';
    }
}
// 添加消息到消息面板
function addMessage(state: ChatStore, payload){
    // 自己发消息将消息添加到消息列表
    if(payload.key){
        // 更新imageViewer的数组
        if(payload.msgs && payload.msgs.content.from_id === global.user && payload.msgs.content.msg_type === 'image'){
            state.imageViewer.push({
                src: payload.msgs.content.msg_body.media_url,
                width: payload.msgs.content.msg_body.width,
                height: payload.msgs.content.msg_body.height,
                index: state.messageList[state.activePerson.activeIndex].msgs.length
            })
        }
        for(let i=0;i<state.messageList.length;i++){
            if(state.messageList[i].key == payload.key && state.messageList[i].key){
                let msgs = state.messageList[i].msgs;
                if(msgs.length === 0){
                    payload.msgs.time_show = 'today';
                    msgs.push(payload.msgs);
                    state.newMessage = payload.msgs;
                    break ;
                }
                if((payload.msgs.ctime_ms - msgs[msgs.length - 1].ctime_ms) / 1000 / 60 > 5){
                    payload.msgs.time_show = 'today';
                }
                msgs.push(payload.msgs);
                state.newMessage = payload.msgs;                 
            }
        }
        // 将当前会话放在第一位
        for(let a=0;a<state.conversation.length;a++){
            if(state.conversation[a].key == payload.key){
                payload.msgs.conversation_time_show = util.reducerDate(payload.msgs.ctime_ms);
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
            // 更新imageViewer的数组
            if(payload.messages[j].msg_type === 3 && payload.messages[j].from_uid == state.activePerson.key && payload.messages[j].content.msg_type === 'image'){
                state.imageViewer.push({
                    src: payload.messages[j].content.msg_body.media_url,
                    width: payload.messages[j].content.msg_body.width,
                    height: payload.messages[j].content.msg_body.height,
                    index: state.messageList[state.activePerson.activeIndex].msgs.length
                })
            }
            if(payload.messages[j].msg_type === 4 && payload.messages[j].from_gid == state.activePerson.key && payload.messages[j].content.msg_type === 'image'){
                state.imageViewer.push({
                    src: payload.messages[j].content.msg_body.media_url,
                    width: payload.messages[j].content.msg_body.width,
                    height: payload.messages[j].content.msg_body.height,
                    index: state.messageList[state.activePerson.activeIndex].msgs.length
                })
            }
            if(payload.messages[j].content.msg_type === 'voice'){
                payload.messages[j].content.playing = {
                    single: true,
                    double: true,
                    max: true
                };
                payload.messages[j].content.havePlay = false;
            }
            if(payload.messages[j].content.msg_type === 'file' && payload.messages[j].content.msg_body.extras && payload.messages[j].content.msg_body.extras.video === 'video'){
                payload.messages[j].content.load = 0;
                payload.messages[j].content.range = 0;
            }
            let flag = false;    
            // 如果发送人在会话列表里
            for(let i=0;i<state.messageList.length;i++){
                let groupMsg = payload.messages[j].msg_type === 4 && Number(state.messageList[i].key) === Number(payload.messages[j].from_gid),
                    singleMsg = payload.messages[j].msg_type === 3 && Number(state.messageList[i].key) === Number(payload.messages[j].from_uid);
                // 给单聊会话人的消息添加头像
                if(singleMsg){
                    payload.messages[j].content.avatarUrl = state.activePerson.avatarUrl;                    
                }
                if(groupMsg || singleMsg){
                    let msgs = state.messageList[i].msgs;
                    if(msgs.length === 0 || (payload.messages[j].ctime_ms - msgs[msgs.length - 1].ctime_ms) / 1000 / 60 > 5){
                        payload.messages[j].time_show = 'today';
                    }
                    msgs.push(payload.messages[j]);
                    state.newMessage = payload.messages[j];
                    break;
                }
            }
            for(let a=0;a<state.conversation.length;a++){
                let groupMsg = payload.messages[j].msg_type === 4 && state.conversation[a].key == payload.messages[j].from_gid,
                    singleMsg = payload.messages[j].msg_type === 3 && state.conversation[a].key == payload.messages[j].from_uid;
                if(groupMsg || singleMsg){
                    let groupNoActive = payload.messages[j].msg_type === 4 && Number(state.activePerson.key) !== Number(payload.messages[j].from_gid),
                    singleNoActive = payload.messages[j].msg_type === 3 && Number(state.activePerson.key) !== Number(payload.messages[j].from_uid);
                    if(groupNoActive || singleNoActive){
                        if(!state.conversation[a].unreadNum){
                            state.conversation[a].unreadNum = 1;
                        }else{
                            state.conversation[a].unreadNum ++;
                        }
                    }
                    flag = true;                    
                    let item = state.conversation.splice(a,1);
                    state.conversation.unshift(item[0]);
                    payload.messages[j].conversation_time_show = util.reducerDate(payload.messages[j].ctime_ms);
                    state.conversation[0].recentMsg = payload.messages[j];
                    return ;                    
                }
            }
            // 如果发送人不在会话列表里            
            if(!flag){
                let msg,conversationItem;
                if(payload.messages[j].msg_type === 3){
                    msg = {
                        key: payload.messages[j].from_uid,
                        msgs: [
                            payload.messages[j]
                        ],
                        draft: '',
                        content: payload.messages[j].content
                    }
                    conversationItem = {
                        avatar: "",
                        avatarUrl: payload.messages[j].content.avatarUrl,
                        key: payload.messages[j].from_uid,
                        mtime: payload.messages[j].ctime_ms,
                        name: payload.messages[j].content.from_id,
                        nickName: payload.messages[j].content.from_name,
                        type: 3,
                        unreadNum: 1
                    }
                }else{
                    msg = {
                        key: payload.messages[j].from_gid,
                        msgs: [
                            payload.messages[j]
                        ],
                        draft: '',
                        content: payload.messages[j].content
                    }
                    conversationItem = {
                        avatar: "",
                        avatarUrl: payload.messages[j].content.avatarUrl,
                        key: payload.messages[j].from_gid,
                        mtime: payload.messages[j].ctime_ms,
                        name: payload.messages[j].content.target_name,
                        type: 4,
                        unreadNum: 1
                    }
                }
                payload.messages[j].conversation_time_show = 'today';                
                state.newMessage = msg;
                state.messageList.push(msg);
                state.conversation.unshift(conversationItem);
                state.conversation[0].recentMsg = payload.messages[j];
            }
        }

    }
}
// 添加资源路径
function messageListUrl(state: ChatStore, payload){
    for(let i=0;i<payload.length;i++){
        for(let j=0;j<state.messageList.length;j++){
            if(Number(payload[i].key) === Number(state.messageList[j].key)){
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
        let existNickName = state.conversation[i].nickName && state.conversation[i].nickName.toLowerCase().indexOf(payload.toLowerCase()) !== -1;
        let existName = state.conversation[i].name && state.conversation[i].name.toLowerCase().indexOf(payload.toLowerCase()) !== -1;
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
        let existGroup = (state.groupList[i].name.toLowerCase().indexOf(payload.toLowerCase()) !== -1);
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
        if((Number(conversation[i].key) === Number(payload.key) && payload.key)){
            let item = conversation.splice(i,1);
            conversation.unshift(item[0]);
            flag = true;
            break;
        }
    }
    if(!flag){
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
        if(Number(state.conversation[i].key) === Number(payload.key)){
            if(state.conversation[i].unreadNum){
                state.conversation[i].unreadNum = 0;
                break;
            }
        }
    }
}
