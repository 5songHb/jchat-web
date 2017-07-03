import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');
import { global, authPayload } from '../../services/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { mainAction } from '../../pages/main/actions';

@Component({
    selector: 'create-group-component',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss']
})

export class CreateGroupComponent implements OnInit {
    private groupName = '';
    private global = global;
    private mainStream$;
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
        }
    };
    private nameTip = false;
    constructor(
        private store$: Store<any>
    ) {

    }
    public ngOnInit() {
       this.initData();
       this.mainStream$ = this.store$.select((state) => {
            let mainState = state['mainReducer'];
            this.stateChanged(mainState);
            return state;
        }).subscribe((state) => {});
    }
    private stateChanged(mainState){
        switch(mainState.actionType){
            case  mainAction.createGroupSearchComplete:
                this.searchResult.show = true;
                if(mainState.createGroupSearch.info){
                    let result = [];
                    result.push(mainState.createGroupSearch.info);
                    for(let i=0;i<this.selectList.length;i++){
                        if(Number(result[0].key) === Number(this.selectList[i].key)){
                            result[0].checked = this.selectList[i].checked;
                            result[0].disabled = this.selectList[i].disabled;
                        }
                    }
                    this.searchResult.result = result;
                }else{
                    this.searchResult.result = [];
                }
                break;
        }
    }
    private initData(){
        // 多人会话
        for(let i=0;i<this.createGroup.list.length;i++){
            for(let j=0;j<this.createGroup.list[i].data.length;j++){
                this.createGroup.list[i].data[j].checked = false;
                this.createGroup.list[i].data[j].disabled = false;
                this.createGroup.list[i].data[j].show = true;
                if(Number(this.createGroup.info.activeSingle && this.createGroup.info.activeSingle.key) === Number(this.createGroup.list[i].data[j].key)){
                    this.createGroup.list[i].data[j].checked = true;
                    this.createGroup.list[i].data[j].disabled = true;
                    this.selectList.push(this.createGroup.info.activeSingle);
                }
           }
       }
        // 添加群成员
        if(this.createGroup.info.filter){
            for(let i=0;i<this.createGroup.list.length;i++){
                for(let j=0;j<this.createGroup.list[i].data.length;j++){
                    for(let a=0;a<this.createGroup.info.filter.length;a++){
                        if(Number(this.createGroup.info.filter[a].uid) === Number(this.createGroup.list[i].data[j].key) || Number(this.createGroup.info.filter[a].key) === Number(this.createGroup.list[i].data[j].key)){
                            this.createGroup.list[i].data[j].show = false;
                            break;
                        }
                    }
                }
            }
        }
    }
    private searchKeyupEmit(value){
        this.searchResult.result = [];
        if(value){
            this.searchResult.show = true;
            for(let i=0;i<this.createGroup.list.length;i++){
                if(!this.createGroup.list[i].allGroup){
                    for(let j=0;j<this.createGroup.list[i].data.length;j++){
                        let nameExist = this.createGroup.list[i].data[j].name && this.createGroup.list[i].data[j].name.indexOf(value) !== -1,
                            nickNameExist = this.createGroup.list[i].data[j].nickName && this.createGroup.list[i].data[j].nickName.indexOf(value) !== -1;
                        if((nameExist || nickNameExist) && this.createGroup.list[i].data[j].show && this.createGroup.list[i].data[j].type === 3){
                            this.searchResult.result.push(this.createGroup.list[i].data[j]);
                        }
                    }
                }
            }
        }else{
            this.searchResult.show = false;
        }
    }
    private searchBtnEmit(keywords){
        this.store$.dispatch({
            type: mainAction.createGroupSearchAction,
            payload: keywords
        });
    }
    private changeCheckedEmit(item){
        if(!item.checked){
            item.checked = true;
            this.selectList.push(item);
        }else{
            item.checked = false;
            for(let i=0;i<this.selectList.length;i++){
                if(Number(item.key) === Number(this.selectList[i].key)){
                    this.selectList.splice(i, 1);
                    break;
                }
            }
        }
        for(let i=0;i<this.createGroup.list.length;i++){
            if(!this.createGroup.list[i].allGroup){
                for(let j=0;j<this.createGroup.list[i].data.length;j++){
                    if(Number(item.key) === Number(this.createGroup.list[i].data[j].key)){
                        if(this.createGroup.list[i].data[j].type === 3 && this.createGroup.list[i].data[j].checked){
                            this.createGroup.list[i].data[j].checked = false;
                            return ;
                        }else if(this.createGroup.list[i].data[j].type === 3 && !this.createGroup.list[i].data[j].checked){
                            this.createGroup.list[i].data[j].checked = true;
                            return ;
                        }
                    }
                }
            }
        }
    }
    private clearInputEmit(){
        this.searchResult.show = false;
        this.searchResult.result = [];
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private confirmCreateGroup(){
        if(!this.createGroup.info.action && this.groupName.length === 0){
            this.nameTip = true;
            return ;
        }else{
            this.nameTip = false;
        }
        let memberUsernames = [];
        for(let i=0;i<this.selectList.length;i++){
            memberUsernames.push({
                username: this.selectList[i].name,
                appkey: authPayload.appKey
            })
        }
        let groupInfo:any = {
            groupName: this.groupName,
            groupDescription: '',
            memberUsernames,
            detailMember:this.selectList,
            add: false
        }
        if(this.createGroup.info.action && this.createGroup.info.action === 'add'){
            groupInfo.add = true;
            groupInfo.activeGroup = this.createGroup.info.activeGroup;
        }else if(this.createGroup.info.action && this.createGroup.info.action === 'many'){
            groupInfo.groupName = this.createGroup.info.selfInfo.nickname || this.createGroup.info.selfInfo.username;
            for(let i=0;i<this.selectList.length;i++){
                let name;
                if(this.selectList[i].nickName && this.selectList[i].nickName !== ''){
                    name = this.selectList[i].nickName;
                }else if(this.selectList[i].nickname && this.selectList[i].nickname !== ''){
                    name = this.selectList[i].nickname;
                }else if(this.selectList[i].username && this.selectList[i].username !== ''){
                    name = this.selectList[i].username;
                }else if(this.selectList[i].name && this.selectList[i].name !== ''){
                    name = this.selectList[i].name;
                }
                groupInfo.groupName += '、' + name;
            }
        }
        this.isCreateGroup.emit(groupInfo);
    }
    private cancelCreateGroup(){
        this.isCreateGroup.emit();
    }
    private selectItem(event, user){
        if(!event.target.checked){
            for(let i=0;i<this.selectList.length;i++){
                if(Number(this.selectList[i].key) === Number(user.key)){
                    this.selectList.splice(i, 1);
                    break;
                }
            }
        }else{
            if(user.key){
                user.uid = user.key;
            }
            if(user.name){
                user.username = user.name;
            }
            user.flag = 0;
            this.selectList.push(user);
        }
        for(let i=0;i<this.createGroup.list.length;i++){
            for(let j=0;j<this.createGroup.list[i].data.length;j++){
                if(Number(this.createGroup.list[i].data[j].key) === Number(user.key)){
                    this.createGroup.list[i].data[j].checked = event.target.checked;
                    return ;
                }
            }
        }
    }
    private cancelSelect(user){
        for(let i=0;i<this.selectList.length;i++){
            if(Number(this.selectList[i].key) === Number(user.key)){
                this.selectList.splice(i, 1);
                break;
            }
        }
        for(let i=0;i<this.createGroup.list.length;i++){
            for(let j=0;j<this.createGroup.list[i].data.length;j++){
                if(Number(this.createGroup.list[i].data[j].key) === Number(user.key)){
                    this.createGroup.list[i].data[j].checked = false;
                    return ;
                }
            }
        }
    }
}