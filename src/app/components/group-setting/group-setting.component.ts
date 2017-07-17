import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition, animate, ViewChild, HostListener, ElementRef, DoCheck } from '@angular/core';
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

export class GroupSettingComponent implements OnInit, DoCheck {
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
        id: 'searchGroupMember',
        keywords: '',
        placeholder: '搜索群成员'
    };
    private hostHover = {
        tip: '群主',
        position: {
            left: -10,
            top: 23
        },
        show: false
    };
    private modifyGroupNameShow = false;
    private dec = '';
    private listTop = 203;
    constructor(
        private store$: Store<AppStore>,
        private elementRef: ElementRef
    ) {

    }
    public ngOnInit() {
    }
    private stopPropagation(event){
        event.stopPropagation();
        this.searchResult.show = false;
        this.searchResult.keywords = '';
    }
    @HostListener('window:click') onWindowClick(){
        this.groupSetting.show = false;
        this.settingAnimate = 'void';
        this.searchResult.result = [];
        this.searchResult.show = false;
        this.elementRef.nativeElement.querySelector('#' + this.searchResult.id).value = '';
    }
    ngDoCheck(){
        // 修改群描述时，调整群成员列表的位置
        let header = this.elementRef.nativeElement.querySelector('#groupSettingHeader');          
        if(header){
            this.listTop = header.offsetHeight;
        }
        if(this.groupSetting.show){
            this.settingAnimate = 'in';
        }else{
            this.settingAnimate = 'void';
        }
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
        this.closeGroupSetting.emit();
    }
    private exitGroupAction(){
        this.exitGroup.emit(this.groupSetting.groupInfo);
    }
    private modifyGroupDescriptionAction(){
        this.modifyGroupDescription.emit();
    }
    private modifyGroupNameAction(){
        this.modifyGroupNameShow = true;
        setTimeout(function(){
            this.elementRef.nativeElement.querySelector('#groupSettingNameInput').focus();
        }.bind(this), 0)
    }
    private modifyGroupNameBlur(event){
        this.modifyGroupName.emit(event.target.value);
        this.modifyGroupNameShow = false;
    }
    private changeGroupShieldEmit(){
        this.store$.dispatch({
            type: chatAction.changeGroupShield,
            payload: this.groupSetting.active
        })
    }
    private searchItemEmit(item){
        // for(let i=0;i<this.groupSetting.memberList.length;i++){
        //     if(item.uid === this.groupSetting.memberList[i].uid){
        //         this.directiveScroll.scrollTo(0, 50 * i);
        //         this.searchResult.result = [];
        //         this.searchResult.show = false;
        //         break;
        //     }
        // }
        if(item.username === global.user){
            this.watchSelfInfo.emit();
        }else{
            this.watchOtherInfo.emit({
                username: item.username
            });
        }
        this.searchResult.result = [];
        this.searchResult.show = false;
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
    private avatarLoad(event){
        if(event.target.naturalHeight > event.target.naturalWidth){
            event.target.style.width = '100%';
            event.target.style.height = 'auto';
        }else{
            event.target.style.height = '100%';
            event.target.style.width = 'auto';
        }
    }
}