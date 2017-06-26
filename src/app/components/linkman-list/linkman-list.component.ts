import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'linkman-list-component',
    templateUrl: './linkman-list.component.html',
    styleUrls: ['./linkman-list.component.scss']
})

export class LinkmanListComponent implements OnInit {
    @Input()
        private conversation;
    @Output()
        private selectLinkmanItemEmit: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    public ngOnInit() {
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private selectLinkmanItem(item){
        this.selectLinkmanItemEmit.emit(item);
    }
}