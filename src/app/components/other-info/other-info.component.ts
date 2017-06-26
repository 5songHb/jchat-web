import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'other-info-component',
    templateUrl: './other-info.component.html',
    styleUrls: ['./other-info.component.scss']
})

export class OtherInfoComponent implements OnInit {
    @Input()
        private otherInfo;
    @Output()
        private isShow: EventEmitter<any> = new EventEmitter();
    @Output()
        private addBlackList: EventEmitter<any> = new EventEmitter();
    private addBlackHover = {
        tip: '加入黑名单',
        position: {
            left: -28,
            top: 27
        },
        show: false
    };
    constructor() {

    }
    ngOnChanges(){
        switch(this.otherInfo.gender){
            case 0 :
                this.otherInfo.gender = '未知';
                break;
            case 1 :
                this.otherInfo.gender = '男';
                break;
            case 2:
                this.otherInfo.gender = '女';

        }
    }
    public ngOnInit() {
        
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private sendMsgBtn(){
        let user = {
            avatar: this.otherInfo.avatar,
            avatarUrl: this.otherInfo.avatarUrl,
            key: this.otherInfo.key || this.otherInfo.uid,
            mtime: this.otherInfo.mtime,
            name: this.otherInfo.username,
            nickName: this.otherInfo.nickname,
            type: 3
        }
        this.isShow.emit(user);
    }
    private otherClose(){
        this.isShow.emit(false);
    }
    private addBlack(){
        this.addBlackList.emit(this.otherInfo);
    }
}