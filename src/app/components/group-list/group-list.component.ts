import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
const avatarErrorIcon = require('../../../assets/images/group-avatar.png');

@Component({
    selector: 'group-list-component',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})

export class GroupListComponent implements OnInit, OnChanges {
    @Input()
        private groupList;
    @Output()
        private selectGroupItemEmit: EventEmitter<any> = new EventEmitter();
    private isEmpty = false;
    constructor() {

    }
    public ngOnInit() {
        if(!this.groupList){
            this.groupList = [];
        }
    }
    ngOnChanges(){
        for(let i=0;i<this.groupList.length;i++){
            if(this.groupList[i].data.length > 0){
                this.isEmpty = true;
                break;
            }
        }
    }
    private selectGroupItem(item){
        this.selectGroupItemEmit.emit(item);
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
}