import { Component, Input, Output, EventEmitter,ViewChild, OnInit, DoCheck, OnChanges, AfterViewInit, HostListener } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { chatAction } from '../../pages/chat/actions';
import { contactAction } from '../../pages/contact/actions';
import { mainAction } from '../../pages/main/actions';
import '../../../assets/static/js/emoji.js';
import { global, emojiConfig, jpushConfig } from '../../services/common';
import { Util } from '../../services/util';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');
import{ StorageService } from '../../services/common';
declare let Emoji;

@Component({
    selector: 'chat-panel-component',
    templateUrl: './chat-panel.component.html',
    styleUrls: ['./chat-panel.component.scss']
})

export class ChatPanelComponent implements OnInit , DoCheck , AfterViewInit{
    private util: Util = new Util();
    @ViewChild(PerfectScrollbarComponent) componentScroll;
    @Input()
        private messageList;
    @Input()
        private active;
    @Input()
        private selfInfo;
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
        active: {},
        show: false
    }
    private voiceState = [];
    constructor(
        private store$: Store<AppStore>,
        private storageService: StorageService
    ) {

    }
    ngOnInit(){
        this.subscribeStore();
        if(!this.messageList[this.active.activeIndex].draft){
            this.messageList[this.active.activeIndex].draft = '';
        }
        this.contentDiv = document.getElementById('contentDiv');
    }
    @HostListener('window:click') onClickWindow(){
        this.inputToLast = true;
    }
    private subscribeStore(){
        this.chatStream$ = this.store$.select((state) => {
            let chatState = state['chatReducer'];
            this.stateChanged(chatState);
            return state;
        }).subscribe((state) => {
            
        });
    }
    private stateChanged(chatState){
        console.log('chat-panel',chatState.actionType);
        switch(chatState.actionType){
            case chatAction.receiveMessage:
                // this.msg.push(chatState.newMessage);
                let msg = this.messageList[chatState.activePerson.activeIndex].msgs;
                if(msg.length > 20){
                    this.msg = msg.slice(msg.length - this.msg.length);
                }else{
                    this.msg = msg;
                }
                // 经纬度转换成地图                              
                this.pointerToMap(chatState);
                break;
            case chatAction.changeActivePerson:
                this.loadingFlag = 1;
                this.loadingCount = 1;
                let msgs = this.messageList[chatState.activePerson.activeIndex].msgs;
                if(msgs.length > 20){
                    this.msg = msgs.slice(msgs.length - 20);
                }else{
                    this.msg = msgs;
                }
                this.allPointerToMap(true);
                this.imageViewer.result = chatState.imageViewer;
                this.voiceState = chatState.voiceState;
                console.log(33333, this.voiceState)
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
                setTimeout(function(){
                    this.componentScroll.update();
                    this.componentScroll.scrollToBottom();
                    document.getElementById('contentDiv').focus();
                }.bind(this), 200);
                this.imageViewer.result = chatState.imageViewer;
                break;
            case mainAction.selectSearchUser:

            case mainAction.createSingleChatSuccess:

            case mainAction.createGroupSuccess:

            case chatAction.createOtherChat:

            case contactAction.selectContactItem:
                this.loadingFlag = 1;
                this.loadingCount = 1;
                setTimeout(function(){
                    this.allPointerToMap(true);
                    this.componentScroll.update();
                    this.componentScroll.scrollToBottom();
                    document.getElementById('contentDiv').focus();
                }.bind(this), 200);
                this.imageViewer.result = chatState.imageViewer;
                break;
            case chatAction.getAllMessageSuccess:
                if(chatState.imageViewer !== []){
                    this.imageViewer.result = chatState.imageViewer;
                }
                break;
        }
    }
    private imageViewerShow(src){
        for(let i=0;i<this.imageViewer.result.length;i++){
            if(this.imageViewer.result[i].src === src){
                this.imageViewer.active = this.imageViewer.result[i];
                break;
            }
        }
        this.imageViewer.show = true;
    }
    private allPointerToMap(timeout: boolean, index ?: number){
        let num = index ? index : this.msg.length;
        for(let i=0;i<num;i++){
            if(this.msg[i].content.msg_type === 'location'){
                if(timeout){
                    let that = this;
                    (function(i){
                        setTimeout(function(){
                            that.util.theLocation({
                                id: 'allmap' + i,
                                longitude: that.msg[i].content.msg_body.longitude,
                                latitude: that.msg[i].content.msg_body.latitude
                            });
                        }, 1000);
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
        if(chatState.newMessage.content.msg_type === 'location' && this.active.name === chatState.newMessage.content.from_id){
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
    }
    ngDoCheck(){
        if(!this.change && this.active.change || this.active.change !== this.change){
            this.componentScroll.update();
            this.componentScroll.scrollToBottom();
            let msgs = this.messageList[this.active.activeIndex].msgs;
            if(this.msg.length <= 20 && msgs.length > 20){
                this.msg = msgs.slice(msgs.length - 20);
            }else if(this.msg.length <= 20 && msgs.length < 20){
                this.msg = msgs;                
            }
            setTimeout(function(){
                this.change = this.active.change;
                document.getElementById('contentDiv').focus();
                this.util.focusLast(this.contentDiv);
            }.bind(this),150);
        }
    }
    private sendMsgAction(){
        let draft = this.messageList[this.active.activeIndex].draft;
        if(draft){
            draft = draft.replace(/^(<br>){1,}$/g,'');
            let imgReg = new RegExp('<img.{1,}?\.\.\/\.\.\/\.\.\/assets\/images\/emoji\/.{1,}?\.png">', 'g');
            if(draft.match(imgReg)){
                let arr = draft.match(imgReg);
                for(let i=0;i<arr.length;i++){
                    let str = arr[i].split('src="../../../assets/images/emoji/')[1],
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
        let img = this.util.getFileFormData('sendPic');
        this.sendPic.emit(img);
        event.target.value = '';
        this.inputNoBlur = true;
        this.contentDiv.focus();
        this.util.focusLast(this.contentDiv);
    }
    private inputNoBlurAction(){
        this.inputNoBlur = false;
    }
    private sendFileAction(event){
        let file = this.util.getFileFormData('sendFile');
        this.sendFile.emit({
            file,
            fileData: (document.getElementById('sendFile') as HTMLInputElement).files[0]
        });
        event.target.value = '';
        this.inputNoBlur = true;
        this.contentDiv.focus();
        this.util.focusLast(this.contentDiv);
    }
    private msgContentChange(event){
        let active = Object.assign({}, this.active, {}),
            value = event.target.innerHTML;
        setTimeout(function(){
            if(this.inputNoBlur){
                if(this.flag === true){
                    value = '';
                    this.flag = false;
                }
                this.saveDraft.emit([value,active]);
            }
        }.bind(this),200);
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
    private groupSettingAction(){
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
        }else{
            this.emojiInfo.show = true;
        }
    }
    private msgContentClick(event){
        event.stopPropagation();
        this.inputToLast = false;
    }
    // ctrl + enter换行，enter发送消息
    private preKeydown(event){
        if(event.keyCode === 13 && event.ctrlKey){
            let contentId = document.getElementById(this.emojiInfo.contentId),
            insertHtml = '<br>';
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
        if(!this.change && this.active.change || this.active.change !== this.change)
            return;
        /**
         * this.loadingFlag
         * value    1           2           3
         * state 更多消息   正在加载消息  没有更多了
         */
        if(this.loadingFlag !== 1)
            return ;
        if(this.loadingFlag === 1 && this.msg.length >= 20){
            this.loadingFlag = 2;
            let oldContentHeight = this.componentScroll.contentHeight;
            setTimeout(function(){
                this.componentScroll.scrollTo(0, 3);
                let msgs = this.messageList[this.active.activeIndex].msgs;
                if(msgs.length === this.msg.length){
                    this.loadingFlag = 3;
                }else{
                    let oldLength = this.msg.length;
                    if(msgs.length < 20 * ++ this.loadingCount){
                        this.msg = msgs;
                        this.loadingFlag = 3;
                    }else{
                        this.msg = msgs.slice(msgs.length - 20 * this.loadingCount ++ );
                        this.loadingFlag = 1;
                    }
                    this.componentScroll.update();
                    let newLength = this.msg.length;
                    this.allPointerToMap(newLength - oldLength);
                    let that = this;
                    return new Promise ((resolve, reject) => {
                        setTimeout(function(){
                            let newContentHeight = that.componentScroll.contentHeight;
                            that.componentScroll.scrollTo(0, newContentHeight - oldContentHeight);
                            resolve();
                        }, 100);
                    });
                }
            }.bind(this), 500);
        }
    }
    private addGroupAction(){
        this.addGroup.emit();
    }
    private contentFocus(){
        this.inputNoBlur = false;
        this.contentDiv.focus();
        this.util.focusLast(this.contentDiv);
    }
    private playVoice(index){
        let audio = (document.getElementById('audio' + index) as HTMLAudioElement);
        if (audio.paused) {
            audio.load();
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
            audio.load();
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
    private voiceEnded(index){
        clearInterval(this.msg[index].content.timer1);
        clearInterval(this.msg[index].content.timer2);
        clearInterval(this.msg[index].content.timer3);
        this.msg[index].content.playing = {
            single: true,
            double: true,
            max: true
        }
    }
    private videoLoadStart(index){
        this.msg[index].content.timer4 = setInterval(function(){
            this.msg[index].content.range ++;
        }.bind(this), 100);
    }
    private videoLoad(index){
        this.msg[index].content.load = 1;
        clearInterval(this.msg[index].content.timer4);
        this.msg[index].content.range = 0;
    }
    private playVideo(index){
        let video = (document.getElementById('video' + index) as HTMLVideoElement);
        if (video.paused) {
            video.play();
            this.msg[index].content.load = 2;
        }else{
            video.pause();
            this.msg[index].content.load = 1;
        }
    }
    private videoEnded(index){
        this.msg[index].content.load = 1;
    }
}