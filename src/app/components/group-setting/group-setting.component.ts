import { Component, OnInit, Input, Output, EventEmitter, ViewChild,
    HostListener, ElementRef, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { AppStore } from '../../app.store';
import { chatAction } from '../../pages/chat/actions';
import { global } from '../../services/common';
const avatarErrorIcon = '../../../assets/images/single-avatar.png';

@Component({
    selector: 'group-setting-component',
    templateUrl: './group-setting.component.html',
    styleUrls: ['./group-setting.component.scss']
})

export class GroupSettingComponent implements OnInit, DoCheck {
    @ViewChild(PerfectScrollbarComponent) private componentScroll;
    @ViewChild(PerfectScrollbarDirective) private directiveScroll;

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
        // pass
    }
    public ngDoCheck() {
        // 修改群描述时，调整群成员列表的位置
        const header = this.elementRef.nativeElement.querySelector('#groupSettingHeader');
        if (header) {
            this.listTop = header.offsetHeight;
        }
        if (this.groupSetting.show) {
            this.settingAnimate = 'in';
        } else {
            this.settingAnimate = 'void';
        }
    }
    private stopPropagation(event) {
        event.stopPropagation();
        this.searchResult.show = false;
        this.searchResult.keywords = '';
    }
    @HostListener('window:click') private onWindowClick() {
        this.groupSetting.show = false;
        this.settingAnimate = 'void';
        this.searchResult.result = [];
        this.searchResult.show = false;
        this.elementRef.nativeElement.querySelector('#' + this.searchResult.id).value = '';
    }
    private clearInputEmit() {
        this.searchResult.result = [];
        this.searchResult.show = false;
    }
    private seachKeyupEmit(value) {
        this.searchResult.result = [];
        if (value) {
            this.searchResult.show = true;
            let result = [];
            for (let member of this.groupSetting.memberList) {
                let nickNameExist = member.nickName.indexOf(value) !== -1;
                let usernameExist = member.username.indexOf(value) !== -1;
                if (nickNameExist || usernameExist) {
                    result.push(member);
                }
            }
            this.searchResult.result = result;
        } else {
            this.searchResult.show = false;
        }
    }
    private addMemberAction() {
        this.addMember.emit();
    }
    private closeGroupSettingAction() {
        this.settingAnimate = 'void';
        this.closeGroupSetting.emit();
    }
    private exitGroupAction() {
        this.exitGroup.emit(this.groupSetting.groupInfo);
    }
    private modifyGroupDescriptionAction() {
        this.modifyGroupDescription.emit();
    }
    private modifyGroupNameAction() {
        this.modifyGroupNameShow = true;
        setTimeout(() => {
            this.elementRef.nativeElement.querySelector('#groupSettingNameInput').focus();
        }, 0);
    }
    private modifyGroupNameBlur(event) {
        this.modifyGroupName.emit(event.target.value);
        this.modifyGroupNameShow = false;
    }
    private changeGroupShieldEmit() {
        this.store$.dispatch({
            type: chatAction.changeGroupShield,
            payload: this.groupSetting.active
        });
    }
    private searchItemEmit(item) {
        if (item.username === global.user) {
            this.watchSelfInfo.emit();
        } else {
            this.watchOtherInfo.emit({
                username: item.username
            });
        }
        this.searchResult.result = [];
        this.searchResult.show = false;
    }
    private watchInfoAction(item) {
        if (item.username === global.user) {
            this.watchSelfInfo.emit();
        } else {
            let info: any = {
                username: item.username
            };
            if (item.hasOwnProperty('avatarUrl')) {
                info.avatarUrl = item.avatarUrl;
            }
            this.watchOtherInfo.emit(info);
        }
    }
    private deleteMemberAction(item) {
        this.deleteMember.emit(item);
    }
    private avatarLoad(event) {
        if (event.target.naturalHeight > event.target.naturalWidth) {
            event.target.style.width = '100%';
            event.target.style.height = 'auto';
        } else {
            event.target.style.height = '100%';
            event.target.style.width = 'auto';
        }
    }
    private avatarErrorIcon(event) {
        event.target.src = avatarErrorIcon;
    }
}
