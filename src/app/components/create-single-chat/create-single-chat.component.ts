import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'create-single-chat-component',
    templateUrl: './create-single-chat.component.html',
    styleUrls: ['./create-single-chat.component.scss']
})

export class CreateSingleChatComponent implements AfterViewInit {
    @Input()
        private info;
    private singleName = '';
    @Output()
        private createSingleChat: EventEmitter<any> = new EventEmitter();
    constructor(
        private elementRef: ElementRef
    ) {

    }
    ngAfterViewInit(){
        this.elementRef.nativeElement.querySelector('#singleChatInput').focus();
    }
    private createSingleChatEmit(singleName){
        if(singleName || singleName === ''){
            this.createSingleChat.emit(singleName);
            this.singleName = '';            
        }else{
            this.singleName = '';            
            this.createSingleChat.emit();
        }
    }
}