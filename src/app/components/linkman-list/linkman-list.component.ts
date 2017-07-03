import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'linkman-list-component',
    templateUrl: './linkman-list.component.html',
    styleUrls: ['./linkman-list.component.scss']
})

export class LinkmanListComponent implements OnInit, OnChanges {
    @Input()
        private conversation;
    @Output()
        private selectLinkmanItemEmit: EventEmitter<any> = new EventEmitter();
    private isEmpty = false;
    constructor() {

    }
    public ngOnInit() {
    }
    ngOnChanges(){
        for(let i=0;i<this.conversation.length;i++){
            if(this.conversation[i].data.length > 0){
                this.isEmpty = true;
                break;
            }
        }
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private selectLinkmanItem(item){
        this.selectLinkmanItemEmit.emit(item);
    }
}