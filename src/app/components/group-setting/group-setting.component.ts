import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { AppStore } from '../../app.store';
import { chatAction } from '../../pages/chat/actions';
import { global } from '../../services/common';

const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'group-setting-component',
    templateUrl: './group-setting.component.html',
    styleUrls: ['./group-setting.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            state('void', style({transform: 'translateX(100%)'})),
            transition('void => in', animate(200)),
            transition('in => void', animate(200))
        ])
    ]
})

export class GroupSettingComponent implements OnInit {
    @ViewChild(PerfectScrollbarComponent) componentScroll;
    @ViewChild(PerfectScrollbarDirective) directiveScroll;

    @Input()
        private groupSetting;
    @Output()
        private closeGroupSetting: EventEmitter<any> = new EventEmitter();
    @Output()
        private exitGroup: EventEmitter<any> = new EventEmitter();
    @Output()
        private modifyGroupDescription: EventEmitter<any> = new EventEmitter();
    @Output()
        private addMember: EventEmitter<any> = new EventEmitter();
    @Output()
        private searchGroupMember: EventEmitter<any> = new EventEmitter();
    @Output()
        private watchOtherInfo: EventEmitter<any> = new EventEmitter();
    @Output()
        private watchSelfInfo: EventEmitter<any> = new EventEmitter();
    @Output()
        private deleteMember: EventEmitter<any> = new EventEmitter();
    @Output()
        private modifyGroupName: EventEmitter<any> = new EventEmitter();
    private global = global;
    private settingAnimate = 'in';
    private searchResult = {
        result: [],
        show: false,
        id: 'searchGroupMember'
    };
    private hostHover = {
        tip: '群主',
        position: {
            left: -10,
            top: 18
        },
        show: false
    };
    private modifyGroupNameShow = false;
    constructor(
        private store$: Store<AppStore>
    ) {

    }
    public ngOnInit() {
    }
    private clearInputEmit(){
        this.searchResult.result = [];
        this.searchResult.show = false;
    }
    private seachKeyupEmit(value){
        this.searchResult.result = [];
        if(value){
            this.searchResult.show = true;
            let result = [];
            for(let i=0;i<this.groupSetting.memberList.length;i++){
                let nickNameExist = this.groupSetting.memberList[i].nickName.indexOf(value) !== -1,
                    usernameExist = this.groupSetting.memberList[i].username.indexOf(value) !== -1;
                if(nickNameExist || usernameExist){
                    result.push(this.groupSetting.memberList[i]);
                }
            }
            this.searchResult.result = result;
        }else{
            this.searchResult.show = false;
        }
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private addMemberAction(){
        this.addMember.emit();
    }
    private closeGroupSettingAction(){
        this.settingAnimate = 'void';
        setTimeout(function(){
            this.closeGroupSetting.emit();
        }.bind(this),200);
    }
    private exitGroupAction(){
        this.exitGroup.emit(this.groupSetting.groupInfo);
    }
    private modifyGroupDescriptionAction(){
        this.modifyGroupDescription.emit();
    }
    private modifyGroupNameAction(){
        this.modifyGroupNameShow = true;
        document.getElementById('groupSettingNameInput').focus();
    }
    private modifyGroupNameBlur(event){
        this.modifyGroupName.emit(event.target.value);
        this.modifyGroupNameShow = false;
    }
    private changeNoDisturbEmit(){
        this.store$.dispatch({
            type: chatAction.changeNoDisturb,
            payload: this.groupSetting.active
        })
    }
    private searchItemEmit(item){
        for(let i=0;i<this.groupSetting.memberList.length;i++){
            if(item.uid === this.groupSetting.memberList[i].uid){
                this.directiveScroll.scrollTo(0, 50 * i);
                this.searchResult.result = [];
                this.searchResult.show = false;
                break;
            }
        }
    }
    private watchInfoAction(username){
        if(username === global.user){
            this.watchSelfInfo.emit();
        }else{
            this.watchOtherInfo.emit({
                username: username
            });
        }
    }
    private deleteMemberAction(item){
        this.deleteMember.emit(item);
    }
}