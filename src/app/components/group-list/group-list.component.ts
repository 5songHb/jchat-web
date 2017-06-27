import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
const avatarErrorIcon = require('../../../assets/images/group-avatar.png');

@Component({
    selector: 'group-list-component',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})

export class GroupListComponent implements OnInit {
    @Input()
        private groupList;
    @Output()
        private selectGroupItemEmit: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    public ngOnInit() {
        if(!this.groupList){
            this.groupList = [];
        }
    }
    private selectGroupItem(item){
        this.selectGroupItemEmit.emit(item);
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
}