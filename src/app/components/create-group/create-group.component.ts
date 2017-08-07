import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { global, authPayload } from '../../services/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { mainAction } from '../../pages/main/actions';
const avatarErrorIcon = '../../../assets/images/single-avatar.png';

@Component({
    selector: 'create-group-component',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss']
})

export class CreateGroupComponent implements OnInit, OnDestroy {
    private groupName = '';
    private global = global;
    private createGroupStream$;
    @Input()
        private createGroup;
    @Output()
        private isCreateGroup: EventEmitter<any> = new EventEmitter();
    private selectList = [];
    private searchResult = {
        result: [],
        show: false,
        id: 'createGroupSearch',
        checkbox: {
            show: true,
            list: []
        },
        keywords: '',
        placeholder: '搜索'
    };
    private nameTip = false;
    constructor(
        private store$: Store<any>
    ) {

    }
    public ngOnInit() {
       this.initData();
       this.createGroupStream$ = this.store$.select((state) => {
            let mainState = state['mainReducer'];
            this.stateChanged(mainState);
            return state;
        }).subscribe((state) => {
            // pass
        });
    }
    public ngOnDestroy() {
        this.createGroupStream$.unsubscribe();
    }
    private stateChanged(mainState) {
        switch (mainState.actionType) {
            case  mainAction.createGroupSearchComplete:
                this.searchResult.show = true;
                if (mainState.createGroupSearch.info) {
                    let result = [];
                    result.push(mainState.createGroupSearch.info);
                    // 如果搜索自己，disabled
                    if (result[0].name === global.user) {
                        result[0].disabled = true;
                    }
                    // 如果搜索的结果有已经disabled的、checked的
                    for (let item of this.selectList) {
                        if (Number(result[0].key) === Number(item.key)) {
                            result[0].checked = item.checked;
                            result[0].disabled = item.disabled;
                        }
                    }
                    // 如果搜索的是已经在群里的，disabled
                    let filter = this.createGroup.info.filter;
                    if (filter) {
                        for (let item of filter) {
                            if (item.username === mainState.createGroupSearch.info.name) {
                                result[0].disabled = true;
                                break;
                            }
                        }
                    }
                    this.searchResult.result = result;
                } else {
                    this.searchResult.result = [];
                }
                break;
            default:
        }
    }
    private stopPropagation(event) {
        event.stopPropagation();
        this.searchResult.show = false;
        this.searchResult.keywords = '';
    }
    private initData() {
        // 多人会话
        for (let list of this.createGroup.list) {
            for (let member of list.data) {
                member.checked = false;
                member.disabled = false;
                member.show = true;
                let activeSingle = this.createGroup.info.activeSingle;
                let keyFlag = activeSingle && Number(activeSingle.key) === Number(member.key);
                if (keyFlag) {
                    member.checked = true;
                    member.disabled = true;
                    this.createGroup.info.activeSingle.disabled = true;
                    this.createGroup.info.activeSingle.checked = true;
                    this.selectList.push(this.createGroup.info.activeSingle);
                }
           }
       }
        // 添加群成员
        if (this.createGroup.info.filter) {
            for (let list of this.createGroup.list) {
                for (let data of list.data) {
                    for (let filter of this.createGroup.info.filter) {
                        let keyFlag = Number(filter.uid) === Number(data.key)
                                        || Number(filter.key) === Number(data.key);
                        let nameFlag = filter.username === data.name && data.type === 3;
                        if (keyFlag || nameFlag) {
                            data.show = false;
                            break;
                        }
                    }
                }
            }
        }
        // 如果整个letter的成员都不显示，则隐藏字母
        for (let list of this.createGroup.list) {
            let flag = false;
            for (let member of list.data) {
                if (member.show && member.type === 3) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                list.allFilter = true;
            } else {
                list.allFilter = false;
            }
        }
    }
    private searchKeyupEmit(value) {
        this.searchResult.result = [];
        if (value) {
            this.searchResult.show = true;
            for (let list of this.createGroup.list) {
                if (!list.allGroup) {
                    for (let user of list.data) {
                        let nameExist = user.name && user.name.indexOf(value) !== -1;
                        let nickNameExist = user.nickName && user.nickName.indexOf(value) !== -1;
                        if ((nameExist || nickNameExist) && user.show && user.type === 3) {
                            this.searchResult.result.push(user);
                        }
                    }
                }
            }
        } else {
            this.searchResult.show = false;
        }
    }
    private searchBtnEmit(keywords) {
        this.store$.dispatch({
            type: mainAction.createGroupSearchAction,
            payload: keywords
        });
    }
    private changeCheckedEmit(item) {
        let flag = true;
        for (let i = 0; i < this.selectList.length; i++) {
            if (Number(item.key) === Number(this.selectList[i].key)) {
                flag = false;
                this.selectList.splice(i, 1);
                item.checked = false;
                break;
            }
        }
        if (flag) {
            item.checked = true;
            this.selectList.push(item);
        }
        for (let list of this.createGroup.list) {
            if (!list.allGroup) {
                for (let member of list.data) {
                    if (Number(item.key) === Number(member.key) && member.type === 3) {
                        member.checked = item.checked;
                        return ;
                    }
                }
            }
        }
    }
    private clearInputEmit() {
        this.searchResult.show = false;
        this.searchResult.result = [];
    }
    private avatarErrorIcon(event) {
        event.target.src = avatarErrorIcon;
    }
    private confirmCreateGroup() {
        if (!this.createGroup.info.action && this.groupName.length === 0) {
            this.nameTip = true;
            return ;
        } else {
            this.nameTip = false;
        }
        let memberUsernames = [];
        for (let item of this.selectList) {
            memberUsernames.push({
                username: item.name,
                appkey: authPayload.appKey
            });
        }
        let groupInfo: any = {
            groupName: this.groupName,
            groupDescription: '',
            memberUsernames,
            detailMember: this.selectList,
            add: false
        };
        if (this.createGroup.info.action && this.createGroup.info.action === 'add') {
            groupInfo.add = true;
            groupInfo.activeGroup = this.createGroup.info.activeGroup;
        }else if (this.createGroup.info.action && this.createGroup.info.action === 'many') {
            groupInfo.groupName = this.createGroup.info.selfInfo.nickname ||
                this.createGroup.info.selfInfo.username;
            for (let item of this.selectList){
                let name;
                if (item.nickName && item.nickName !== '') {
                    name = item.nickName;
                }else if (item.nickname && item.nickname !== '') {
                    name = item.nickname;
                }else if (item.username && item.username !== '') {
                    name = item.username;
                }else if (item.name && item.name !== '') {
                    name = item.name;
                }
                groupInfo.groupName += '、' + name;
            }
            groupInfo.groupName = groupInfo.groupName.substr(0, 20);
        }
        this.isCreateGroup.emit(groupInfo);
    }
    private cancelCreateGroup(event) {
        event.stopPropagation();
        this.isCreateGroup.emit();
    }
    private selectItem(event, user) {
        if (!event.target.checked) {
            this.deleteItem(user);
        } else {
            if (user.key) {
                user.uid = user.key;
            }
            if (user.name) {
                user.username = user.name;
            }
            user.flag = 0;
            this.selectList.push(user);
        }
        for (let list of this.createGroup.list) {
            for (let member of list.data) {
                if (Number(member.key) === Number(user.key)) {
                    member.checked = event.target.checked;
                    return ;
                }
            }
        }
    }
    private cancelSelect(user) {
        this.deleteItem(user);
        for (let list of this.createGroup.list) {
            for (let member of list.data) {
                if (Number(member.key) === Number(user.key)) {
                    member.checked = false;
                    return ;
                }
            }
        }
    }
    // 删除已选元素操作
    private deleteItem(user) {
        for (let i = 0; i < this.selectList.length; i++) {
            if (Number(this.selectList[i].key) === Number(user.key)) {
                this.selectList.splice(i, 1);
                break;
            }
        }
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
    private emptyTip() {
        this.nameTip = false;
    }
}
