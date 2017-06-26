import { Component, Input, Output, EventEmitter,ViewChild, OnInit, DoCheck, OnChanges, AfterViewInit, HostListener } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { chatAction } from '../../pages/chat/actions';

import { global, emojiConfig, jpushConfig } from '../../services/common';
import { Util } from '../../services/util';
// import { JsonpService } from '../../services/request/jsonp.service';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');
// const Viewer = require('viewerjs');

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
        jpushPath: '../../assets/images/jpush/',
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
    constructor(
        private store$: Store<AppStore>,
        // private jsonpService: JsonpService
    ) {

    }
    ngOnInit(){
        this.subscribeStore();
        if(!this.messageList[this.active.activeIndex].draft){
            this.messageList[this.active.activeIndex].draft = '';
        }
        this.contentDiv = document.getElementById('contentDiv');
        // let html = document.getElementsByTagName('html')[0],
        //     that = this;
        // html.addEventListener('click',function(){
        //     that.inputToLast = true;
        // },false);
    }
    @HostListener('window:click') onClick(){
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
                // 经纬度转换成地图
                this.msg = this.messageList[this.active.activeIndex].msgs.slice(this.messageList[this.active.activeIndex].msgs.length - 20);
                this.pointerToMap(chatState);
                break;
            case chatAction.changeActivePerson:
                this.loadingFlag = 1;
                // let msgs = chatState.messageList[chatState.activePerson.activeIndex].msgs;
                this.msg = this.messageList[this.active.activeIndex].msgs.slice(this.messageList[this.active.activeIndex].msgs.length - 20);
                for(let i=0;i<this.msg.length;i++){
                    if(this.msg[i].content.msg_type == 'location'){
                        setTimeout(function(){
                            this.util.theLocation({
                                id: 'allmap'+i,
                                longitude: this.msg[i].content.msg_body.longitude,
                                latitude: this.msg[i].content.msg_body.latitude
                            });
                        }.bind(this),100);
                    }
                }
                break;
            case chatAction.receiveMessage:
            
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
                this.msg = this.messageList[this.active.activeIndex].msgs.slice(this.messageList[this.active.activeIndex].msgs.length - 20);
                break;
        }
    }
    private pointerToMap(chatState){
        if(chatState.newMessage.content.msg_type == 'location'){
            setTimeout(function(){
                this.util.theLocation({
                    id: 'allmap' + (chatState.messageList[this.active.activeIndex].msgs.length - 1).toString(),
                    longitude: chatState.newMessage.content.msg_body.longitude,
                    latitude: chatState.newMessage.content.msg_body.latitude
                });                
            }.bind(this),100);
            // this.jsonpService.get(`http://api.map.baidu.com/geocoder/v2/?callback=JSONP_CALLBACK&location=${chatState.newMessage.content.msg_body.latitude},${chatState.newMessage.content.msg_body.longitude}&output=json&pois=1&ak=30jUnHmbTPaaVDsCqGITmEW6VsvzQvH3`)
            //     .subscribe((data) => {
            //         let msgs = chatState.messageList[this.active.activeIndex].msgs;
            //         if(data.result.formatted_address == ''){
            //             data.result.formatted_address = chatState.newMessage.content.msg_body.label;
            //         }
            //         msgs[msgs.length - 1].content.msg_body.address = data.result.formatted_address;
            //     })
        }
    }
    ngAfterViewInit(){
        // let viewer = new Viewer(
        //     document.getElementById('imgViewer'),{
        //     navbar: false,
        //     title: false,
        //     zoomRatio: 0.4
        // });
        // this.msg = this.messageList[this.active.activeIndex].msgs.slice(this.messageList[this.active.activeIndex].msgs.length - 20);
        for(let i=0;i<this.msg .length;i++){
            if(this.msg [i].content.msg_type == 'location'){
                this.util.theLocation({
                    id: 'allmap'+i,
                    longitude: this.msg [i].content.msg_body.longitude,
                    latitude:this.msg [i].content.msg_body.latitude
                });
                // this.jsonpService.get(`http://api.map.baidu.com/geocoder/v2/?callback=JSONP_CALLBACK&location=${msgs[i].content.msg_body.latitude},${msgs[i].content.msg_body.longitude}&output=json&pois=1&ak=30jUnHmbTPaaVDsCqGITmEW6VsvzQvH3`)
                //     .subscribe((data) => {
                //         msgs[i].content.msg_body.address = data.result.formatted_address;
                //     })
            }
        }
    }
    ngDoCheck(){
        if(!this.change && this.active.change || this.active.change !== this.change){
            this.componentScroll.update();
            this.componentScroll.scrollToBottom();
            if(this.msg.length <= 20){
                this.msg = this.messageList[this.active.activeIndex].msgs.slice(this.messageList[this.active.activeIndex].msgs.length - 20);
            }
            setTimeout(function(){
                this.change = this.active.change;
                // document.getElementById('msgContent').focus();
                document.getElementById('contentDiv').focus();
            }.bind(this),150);
        }
    }
    private sendMsgAction(){
        let draft = this.messageList[this.active.activeIndex].draft;
        if(draft){
            // draft = draft.replace(new RegExp('\n','g'),'<br>');
            draft = draft.replace(new RegExp('<','g'),'&lt;');
            draft = draft.replace(new RegExp('>','g'),'&gt;');
            // if(draft.match(new RegExp('<br>$'))){
            //     draft = draft.substring(0,draft.length-4);
            // }
            draft = draft.replace(/^(<br>){1,}$/g,'');
            this.sendMsg.emit({
                content: draft
            });
            this.messageList[this.active.activeIndex].draft = '';
            this.flag = true;
            this.contentDiv.innerHTML = '';
        }   
    }
    private jpushEmojiSelectEmit(item){
        this.sendMsg.emit({
            content: `&lt;img src="../../assets/images/jpush/${item.imgNum}.png" class="jpush-emoji" /&gt;`
        });
        this.emojiInfo.show = false;
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
        let active = this.util.deepCopy(this.active);
        // let value = event.target.value;
        let value = event.target.innerHTML;
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
    // private addBlack(){
    //     this.addBlackList.emit();
    // }
    private groupSettingAction(){
        this.groupSetting.emit();
    }
    // private ctrlEnterAction(event){
    //     if(event.keyCode == 13 && event.ctrlKey){
    //         this.messageList[this.active.activeIndex].draft += '\n';
    //     }else if(event.keyCode == 13 && !event.ctrlKey){
    //         this.sendMsgAction();
    //         return false;
    //     }
    // }
    private showEmojiPanel(event){
        this.inputNoBlur = false;
        // document.getElementById('msgContent').focus();
        event.stopPropagation();
        this.contentDiv.focus();
        if(this.inputToLast){
            this.util.focusLast(this.contentDiv);
        }
        this.emojiInfo.content = this.messageList[this.active.activeIndex];
        if(this.emojiInfo.show == true){
            this.emojiInfo.show = false;
        }else{
            this.emojiInfo.show = true;
        }
    }
    private msgContentClick(event){
        event.stopPropagation();
        this.inputToLast = false;
    }
    private preKeydown(event){
        if(event.keyCode == 13 && event.ctrlKey){
            let contentId = document.getElementById(this.emojiInfo.contentId),
            insertHtml = '<br>';
            if(window.getSelection){
                let next = window.getSelection().focusNode.nextSibling;
                do{
                    if(!next || next.nodeValue || "BR" == (next as HTMLElement).tagName)
                    break;
                }while(next = next.nextSibling);
                next || (insertHtml += insertHtml);
                if(next && next.nodeName == '#text' && insertHtml != '<br><br>' && event.target.innerHTML && !event.target.innerHTML.match(/<br>$/ig)){
                    insertHtml += insertHtml;
                }
                if(!event.target.innerHTML){
                    insertHtml += insertHtml;
                }
            }
            this.util.insertAtCursor(contentId,insertHtml,false);
        }else if(event.keyCode == 13){
            this.sendMsgAction();
            event.preventDefault();
        }
    }
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
    private scrollTopEvent(){
        if(!this.change && this.active.change || this.active.change !== this.change){
            return;
        }
        if(this.loadingFlag === 3){
            return ;
        }
        if(this.loadingFlag === 1){
            this.loadingFlag = 2;            
            setTimeout(function(){
                let length = this.messageList[this.active.activeIndex].msgs.length;
                this.msg = this.messageList[this.active.activeIndex].msgs.slice(length - 20 * this.loadingCount ++ );
                this.componentScroll.update();
                if(length === this.msg.length){
                    this.loadingFlag = 3;;
                }else{
                    this.loadingFlag = 1;
                }
            }.bind(this),1000);
        }
    }
    private scrollBottomEvent(){
        console.log(9999999)
    }
    private addGroupAction(){
        this.addGroup.emit();
    }
}