import { Component, Input, Output, EventEmitter,ViewChild, OnInit,
        OnChanges, AfterViewInit, HostListener, ElementRef, SimpleChanges } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { chatAction } from '../../pages/chat/actions';
import { contactAction } from '../../pages/contact/actions';
import { mainAction } from '../../pages/main/actions';
import '../../../assets/static/js/emoji.js';
import { global, emojiConfig, jpushConfig, imgRouter } from '../../services/common';
import { Util } from '../../services/util';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');
import{ StorageService } from '../../services/common';
declare let Emoji;
let download = require("downloadjs");

@Component({
    selector: 'chat-panel-component',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss']
})

export class ChatPanelComponent implements OnInit, AfterViewInit, OnChanges{
    private util: Util = new Util();
    @ViewChild(PerfectScrollbarComponent) componentScroll;
    @Input()
        private messageList;
    @Input()
        private active;
    @Input()
        private selfInfo;
    @Input()
        private scrollBottom;
    @Output()
        private sendMsg: EventEmitter<any> = new EventEmitter();
    @Output()
        private sendPic: EventEmitter<any> = new EventEmitter();
    @Output()
        private sendFile: EventEmitter<any> = new EventEmitter();
    @Output()
        private saveDraft: EventEmitter<any> = new EventEmitter();
    @Output()
        private otherInfo: EventEmitter<any> = new EventEmitter();
    @Output()
        private selfInfoEmit: EventEmitter<any> = new EventEmitter();
    @Output()
        private groupSetting: EventEmitter<any> = new EventEmitter();
    @Output()
        private addGroup: EventEmitter<any> = new EventEmitter();
    @Output()
        private videoPlay: EventEmitter<any> = new EventEmitter();
    private global = global;
    private change;
    private flag = false;
    private inputNoBlur = true;
    private inputToLast = false;
    private emojiInfo = {
        show: false,
        position: {
            left: 0,
            top: 0
        },
        emojiAlias: emojiConfig,
        jpushAlias: jpushConfig,
        content: '',
        contentId: 'contentDiv'
    };
    private contentDiv;
    private chatStream$;
    private msg = [];
    private groupConversationHover = {
        tip: '多人会话',
        position: {
            left: -40,
            top: 27
        },
        show: false
    };
    private groupSettingHover = {
        tip: '群设置',
        position: {
            left: -28,
            top: 27
        },
        show: false
    };
    private loadingFlag = 1;
    private loadingCount = 1;
    private imageViewer = {
        result: [],
        active: {
            index: -1
        },
        show: false,
    }
    private voiceState = [];
    private loadFlag = true;
    constructor(
        private store$: Store<AppStore>,
        private storageService: StorageService,
        private elementRef: ElementRef
    ) {

    }
    ngOnInit(){
        this.subscribeStore();
        // if(!this.messageList[this.active.activeIndex].draft){
        //     this.messageList[this.active.activeIndex].draft = '';
        // }
        // 禁止火狐下点击发送消息的输入框中的表情进行缩放
        document.designMode = "off";
        document.execCommand('enableObjectResizing', false, 'false');
    }
    ngOnChanges(changes: SimpleChanges){
        if(!this.messageList || this.messageList.length === 0){
            this.messageList = [{
                draft: ''
            }];
        }
        if(!this.active.activeIndex){
            this.active.activeIndex = 0;
        }
        if(changes.scrollBottom){
            this.loadFlag = false;
            setTimeout(function(){
                this.componentScroll.update();
                this.componentScroll.scrollToBottom();
                this.contentDiv.focus();
                this.util.focusLast(this.contentDiv);
                this.loadFlag = true;
            }.bind(this),150);
        }
    }
    @HostListener('window:click') onClickWindow(){
        this.inputToLast = true;
        this.inputNoBlur = true;
    }
    private subscribeStore(){
        this.chatStream$ = this.store$.select((state) => {
            const chatState = state['chatReducer'];
            this.stateChanged(chatState);
            return state;
        }).subscribe((state) => {
            
        });
    }
    private stateChanged(chatState){
        console.log('chat-panel',chatState.actionType);
        switch(chatState.actionType){
            case chatAction.receiveMessageSuccess:
                this.messageList = chatState.messageList;
                if(chatState.activePerson.activeIndex >= 0 && chatState.newMessageIsActive){
                    let msg = chatState.messageList[chatState.activePerson.activeIndex].msgs;
                    if(msg.length > 20){
                        this.msg = msg.slice(msg.length - this.msg.length);
                    }else{
                        this.msg = msg;
                    }
                }
                // 经纬度转换成地图                              
                this.pointerToMap(chatState);
                break;
            case chatAction.changeActivePerson:
                this.loadingFlag = 1;
                this.loadingCount = 1;
                let message = chatState.messageList[chatState.activePerson.activeIndex].msgs;
                if(message && message.length > 20){
                    this.msg = message.slice(message.length - 20);
                }else if(message && message.length <= 20){
                    this.msg = message;                
                }
                this.allPointerToMap(true);
                this.imageViewer.result = chatState.imageViewer;
                this.voiceState = chatState.voiceState;
                break;
            case chatAction.sendGroupFile:

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
                let msgs = chatState.messageList[chatState.activePerson.activeIndex].msgs;
                if(msgs.length > 20){
                    this.msg = msgs.slice(msgs.length - this.msg.length);
                }else{
                    this.msg = msgs;
                }
                this.imageViewer.result = chatState.imageViewer;
                this.messageList = chatState.messageList;
                break;
            case mainAction.selectSearchUser:

            case mainAction.createGroupSuccess:

            case chatAction.createOtherChat:

            case contactAction.selectContactItem:
                this.loadingFlag = 1;
                this.loadingCount = 1;
                let msg = chatState.messageList[chatState.activePerson.activeIndex].msgs;
                if(msg && msg.length > 20){
                    this.msg = msg.slice(msg.length - 20);
                }else if(msg && msg.length <= 20){
                    this.msg = msg;
                }
                this.allPointerToMap(true);
                this.imageViewer.result = chatState.imageViewer;
                break;
            case chatAction.getAllMessageSuccess:
                if(chatState.imageViewer !== []){
                    this.imageViewer.result = chatState.imageViewer;
                }
                break;
            case chatAction.addGroupMembersEventSuccess:
                this.messageList = chatState.messageList;
                break;
        }
    }
    private imageViewerShow(src, index){
        for(let i=0;i<this.imageViewer.result.length;i++){
            if(this.imageViewer.result[i].index === index + (this.messageList[this.active.activeIndex].msgs.length - this.msg.length)){
                this.imageViewer.active = Object.assign({}, this.imageViewer.result[i], {});
                this.imageViewer.active.index = i;
                break;
            }
        }
        this.imageViewer.show = true;
    }
    private allPointerToMap(timeout: boolean, index ?: number){
        const num = index ? index : this.msg.length;
        for(let i=0;i<num;i++){
            if(this.msg[i].content.msg_type === 'location'){
                if(timeout){
                    const that = this;
                    (function(i){
                        setTimeout(() => {
                            that.util.theLocation({
                                id: 'allmap' + i,
                                longitude: that.msg[i].content.msg_body.longitude,
                                latitude: that.msg[i].content.msg_body.latitude
                            });
                        }, 0);
                    })(i);
                }else{
                    this.util.theLocation({
                        id: 'allmap' + i,
                        longitude: this.msg[i].content.msg_body.longitude,
                        latitude: this.msg[i].content.msg_body.latitude
                    });
                }
            }
        }
    }
    private pointerToMap(chatState){
        const single = (Number(this.active.key) === Number(chatState.newMessage.from_uid) && chatState.newMessage.msg_type === 3),
            group = (Number(this.active.key) === Number(chatState.newMessage.from_gid) && chatState.newMessage.msg_type === 4);
        if(chatState.newMessage.content.msg_type === 'location' && (single || group)){
            setTimeout(function(){
                this.util.theLocation({
                    id: 'allmap' + (this.msg.length - 1).toString(),
                    longitude: chatState.newMessage.content.msg_body.longitude,
                    latitude: chatState.newMessage.content.msg_body.latitude
                });
            }.bind(this),100);
        }
    }
    ngAfterViewInit(){
        this.allPointerToMap(true);
        this.contentDiv = this.elementRef.nativeElement.querySelector('#contentDiv');        
    }
    private pasteMessage(event){
        let clipboardData = event.clipboardData || (<any>window).clipboardData;
        let pastedData = clipboardData.getData('Text');
        pastedData = pastedData.replace(/</g, '&lt;');
        pastedData = pastedData.replace(/>/g, '&gt;');
        pastedData = pastedData.replace(/\n/g, '<br>');
        pastedData = pastedData.replace(/ /g, '&nbsp;'); 
        this.util.insertAtCursor(this.contentDiv, pastedData, false);
        return false;
    }
    private sendMsgAction(){
        let draft = this.elementRef.nativeElement.querySelector('#contentDiv').innerHTML;
        if(draft){
            draft = draft.replace(/^(<br>){1,}$/g,'');
            draft = draft.replace(/&nbsp;/g,' ');
            draft = draft.replace(/<br>/g, '\n');
            const imgReg = new RegExp(`<img.+?${imgRouter}.{1,}?\.png".*?>`, 'g');
            if(draft.match(imgReg)){
                let arr = draft.match(imgReg);
                for(let i=0;i<arr.length;i++){
                    let str = arr[i].split(`src="${imgRouter}`)[1],
                        str2 = str.split('.png"')[0];
                    draft = draft.replace(arr[i], Emoji.convert(str2));
                }
            }
            draft = draft.replace(new RegExp('&lt;','g'),'<');
            draft = draft.replace(new RegExp('&gt;','g'),'>');
            this.sendMsg.emit({
                content: draft
            });
            this.messageList[this.active.activeIndex].draft = '';
            this.flag = true;
            this.contentDiv.innerHTML = '';
        }
    }
    private sendPicAction(event){
        const pic = this.elementRef.nativeElement.querySelector('#sendPic');
        // 为了防止首次选择了文件，第二次选择文件的时候点击取消按钮时触发change事件的报错
        if(!pic.files[0]){
            return;
        }
        let img = this.util.getFileFormData(pic);
        this.sendPic.emit(img);
        this.contentDiv.focus();
        this.util.focusLast(this.contentDiv);
        event.target.value = '';
    }
    private sendFileAction(event){
        const fileData = this.elementRef.nativeElement.querySelector('#sendFile');
        // 为了防止首次选择了文件，第二次选择文件的时候点击取消按钮时触发change事件的报错
        if(!fileData.files[0]){
            return;
        }
        let file = this.util.getFileFormData(fileData);
        this.sendFile.emit({
            file,
            fileData: this.elementRef.nativeElement.querySelector('#sendFile').files[0]
        });
        this.contentDiv.focus();
        this.util.focusLast(this.contentDiv);
        event.target.value = '';
    }
    private msgContentChange(event){
        let active = Object.assign({}, this.active, {}),
            value = event.target.innerHTML;
        value = value.replace(/^<br>?/, '');
        // 防止点击发送的时候或者点击emoji的时候触发保存草稿
        setTimeout(function(){
            if(this.inputNoBlur){
                if(this.flag === true){
                    value = '';
                    this.flag = false;
                }
                this.saveDraft.emit([value, active]);
            }
        }.bind(this), 200);
    }
    private msgContentFocus(){
        this.flag = false;
    }
    private watchOtherInfo(fromId){
        this.otherInfo.emit({
            username: fromId
        });
    }
    private watchSelfInfo(){
        this.selfInfoEmit.emit();
    }
    private groupSettingAction(event){
        event.stopPropagation();
        this.groupSetting.emit();
    }
    private showEmojiPanel(event){
        this.inputNoBlur = false;
        event.stopPropagation();
        this.contentDiv.focus();
        if(this.inputToLast){
            this.util.focusLast(this.contentDiv);
        }
        this.emojiInfo.content = this.messageList[this.active.activeIndex];
        if(this.emojiInfo.show === true){
            this.emojiInfo.show = false;
            setTimeout(function(){
                this.inputNoBlur = true;
            }.bind(this), 200);
        }else{
            this.emojiInfo.show = true;   
        }
    }
    private msgContentClick(){
        this.inputToLast = false;
    }
    // ctrl + enter换行，enter发送消息
    private preKeydown(event){
        if(event.keyCode === 13 && event.ctrlKey){
            const contentId = this.elementRef.nativeElement.querySelector('#' + this.emojiInfo.contentId);
            let insertHtml = '<br>';
            if(window.getSelection){
                let next = window.getSelection().focusNode.nextSibling;
                do{
                    if(!next || next.nodeValue || "BR" == (next as HTMLElement).tagName)
                    break;
                }while(next = next.nextSibling);
                next || (insertHtml += insertHtml);
                if(next && next.nodeName === '#text' && insertHtml !== '<br><br>' && event.target.innerHTML && !event.target.innerHTML.match(/<br>$/ig)){
                    insertHtml += insertHtml;
                }
                if(!event.target.innerHTML){
                    insertHtml += insertHtml;
                }
            }
            this.util.insertAtCursor(contentId, insertHtml, false);
        }else if(event.keyCode === 13){
            this.sendMsgAction();
            event.preventDefault();
        }
    }
    // 消息发送失败后点击重发消息
    private repeatSendMsgAction(item){
        item.success = 1;
        item.repeatSend = true;
        this.sendMsg.emit(item);
    }
    private repeatSendPicAction(item){
        item.success = 1;
        item.repeatSend = true;
        this.sendPic.emit(item);
    }
    private repeatSendFileAction(item){
        item.success = 1;
        item.repeatSend = true;
        this.sendFile.emit(item);
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    // 加载更多消息
    private scrollTopEvent(){
        if(!this.loadFlag){
            return;
        }
        /**
         * this.loadingFlag
         * value    1           2           3
         * state 更多消息   正在加载消息  没有更多了
         */
        if(this.loadingFlag === 1 && this.msg.length >= 20){
            this.loadingFlag = 2;
            const oldContentHeight = this.componentScroll.contentHeight,
                activeKey = this.active.key;
            setTimeout(function(){
                if(activeKey !== this.active.key || !this.messageList[this.active.activeIndex])
                    return;
                this.componentScroll.update();
                this.componentScroll.scrollTo(0, 10);
                let msgs = this.messageList[this.active.activeIndex].msgs;
                if(msgs.length === this.msg.length){
                    this.loadingFlag = 3;
                }else{
                    const oldLength = this.msg.length;
                    if(msgs.length < 20 * ++ this.loadingCount){
                        this.msg = msgs;
                        setTimeout(function(){
                            this.loadingFlag = 3;
                        }.bind(this), 0);
                    }else{
                        this.msg = msgs.slice(msgs.length - 20 * this.loadingCount ++ );
                        setTimeout(function(){
                            this.loadingFlag = 1;
                        }.bind(this), 0);
                    }
                    const newLength = this.msg.length;
                    this.allPointerToMap(newLength - oldLength);
                    const that = this;
                    return new Promise ((resolve, reject) => {
                        setTimeout(function(){
                            const newContentHeight = that.componentScroll.contentHeight;
                            that.componentScroll.scrollTo(0, newContentHeight - oldContentHeight);
                            resolve();
                        }, 0);
                    });
                }
            }.bind(this), 500);
        }
    }
    private addGroupAction(){
        this.addGroup.emit();
    }
    private contentFocus(event){
        event.stopPropagation();
        this.contentDiv.focus();
        this.util.focusLast(this.contentDiv);
        this.emojiInfo.show = false;
    }
    private playVoice(index){
        const audio = this.elementRef.nativeElement.querySelector('#audio' + index);
        if (audio.paused) {
            this.clearTimer(index);
            audio.play();
            this.msg[index].content.playing = {
                single: false,
                double: false,
                max: true
            }
            this.msg[index].content.timer1 = setInterval(function(){
                this.msg[index].content.playing.double = true;
            }.bind(this), 300);
            this.msg[index].content.timer2 = setInterval(function(){
                this.msg[index].content.playing.single = true;
            }.bind(this), 600);
            this.msg[index].content.timer3 = setInterval(function(){
                this.msg[index].content.playing = {
                    single: false,
                    double: false,
                    max: true
                }
            }.bind(this), 900);
            // 如果是未读
            if(!this.msg[index].content.havePlay){
                let voiceState = {
                    key: this.active.key,
                    msgId: this.msg[index].msg_id
                }
                this.voiceState.push(voiceState);
                this.msg[index].content.havePlay = true;
                this.storageService.set('voiceState' + global.user, JSON.stringify(this.voiceState));
            }
        }else{
            audio.pause();
            clearInterval(this.msg[index].content.timer1);
            clearInterval(this.msg[index].content.timer2);
            clearInterval(this.msg[index].content.timer3);
            this.msg[index].content.playing = {
                single: true,
                double: true,
                max: true
            }
        }
    }
    private clearTimer(index){
        for(let i=0;i<this.msg.length;i++){
            if(this.msg[i].content.msg_type === 'voice' && this.msg[i].content.timer1 && i !== index){
                clearInterval(this.msg[i].content.timer1);
                clearInterval(this.msg[i].content.timer2);
                clearInterval(this.msg[i].content.timer3);
                const otherAudio = this.elementRef.nativeElement.querySelector('#audio' + i);
                otherAudio.pause();
                otherAudio.currentTime = 0;
                this.msg[i].content.playing = {
                    single: true,
                    double: true,
                    max: true
                }
            }
        }
    }
    private voiceEnded(index){
        const audio = this.elementRef.nativeElement.querySelector('#audio' + index);
        clearInterval(this.msg[index].content.timer1);
        clearInterval(this.msg[index].content.timer2);
        clearInterval(this.msg[index].content.timer3);
        this.msg[index].content.playing = {
            single: true,
            double: true,
            max: true
        }
        audio.currentTime = 0;
        audio.pause();
    }
    private videoLoadStart(index){
        this.msg[index].content.timer4 = setInterval(function(){
            if(this.msg[index].content.range < 90){
                this.msg[index].content.range ++;
            }
        }.bind(this), 100);
    }
    private videoLoad(index){
        this.msg[index].content.duration = this.elementRef.nativeElement.querySelector('#video' + index).duration.toFixed(0);        
        this.msg[index].content.load = 1;
        clearInterval(this.msg[index].content.timer4);
        this.msg[index].content.range = 0;
    }
    private playVideo(url){
        this.videoPlay.emit(url);
    }
    private avatarLoad(event){
        if(event.target.naturalHeight >= event.target.naturalWidth){
            event.target.style.width = '100%';
            event.target.style.height = 'auto';
        }else{
            event.target.style.height = '100%';
            event.target.style.width = 'auto';
        }
    }
    private stopPropagation(event){
        event.stopPropagation();
    }
    private fileDownload(url){
        download(url);
    }
}