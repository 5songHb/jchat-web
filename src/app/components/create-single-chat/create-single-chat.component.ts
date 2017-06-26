import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'create-single-chat-component',
    templateUrl: './create-single-chat.component.html',
    styleUrls: ['./create-single-chat.component.scss']
})

export class CreateSingleChatComponent implements OnInit {
    @Input()
        private info;
    private singleName = '';
    @Output()
        private createSingleChat: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    ngOnInit() {
        document.getElementById('singleChatInput').focus();
    }
    private createSingleChatEmit(singleName){
        if(singleName || singleName === ''){
            this.createSingleChat.emit(singleName);
        }else{
            this.createSingleChat.emit();
        }
    }
}