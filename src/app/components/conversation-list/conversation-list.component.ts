import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { global } from '../../services/common';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');
const groupAvatar = require('../../../assets/images/group-avatar.png');

@Component({
    selector: 'conversation-list-component',
    templateUrl: './conversation-list.component.html',
    styleUrls: ['./conversation-list.component.scss']
})

export class ConversationListComponent implements OnInit {
    @Input()
        private conversationList;
    @Output()
        private changeActive: EventEmitter<any> = new EventEmitter();
    @Output()
        private deleteConversationItem: EventEmitter<any> = new EventEmitter();
    @Input()
        private active;
    private global = global;
    private groupAvatar = groupAvatar;
    constructor() {

    }
    public ngOnInit() {
    }
    private selectTarget(item){
        this.changeActive.emit(item);
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private deleteThis(event, item){
        event.stopPropagation();
        this.deleteConversationItem.emit(item);
    }
    private avatarLoad(event, item){
        if(event.target.naturalHeight >= event.target.naturalWidth){
            event.target.style.width = '100%';
            event.target.style.height = 'auto';
        }else{
            event.target.style.height = '100%';
            event.target.style.width = 'auto';
        }
    }
}