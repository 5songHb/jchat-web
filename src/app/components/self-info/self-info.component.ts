import { Component, Input, Output, EventEmitter, OnChanges, ElementRef } from '@angular/core';

const avatarErrorIcon = require('../../../assets/images/single-avatar.png');
import { Util } from '../../services/util';

@Component({
    selector: 'self-info-component',
    templateUrl: './self-info.component.html',
    styleUrls: ['./self-info.component.scss']
})

export class SelfInfoComponent implements OnChanges {
    private util: Util = new Util();
    @Input()
        private selfInfo;
    @Output()
        private isShow: EventEmitter<any> = new EventEmitter();
    private isEdit = false;
    private sexList = {
        active: {
            key: 1,
            name: '男'
        },
        list: [{
            key: 1,
            name: '男'
        },{
            key: 2,
            name: '女'
        },{
            key: 0,
            name: '保密'
        }],
        width: 160,
        show: false
    };
    private newInfo = {
        signature: '',
        nickname: '',
        gender: 0,
        region: ''
    };
    private newAvatar = {
        formData: {},
        url: ''
    };
    private cameraShadow = true;
    constructor(
        private elementRef: ElementRef
    ) {}
    public ngOnChanges(){
        this.newInfo.signature = this.selfInfo.signature;
        this.newInfo.nickname = this.selfInfo.nickname;
        this.newInfo.gender = this.selfInfo.gender;
        this.newInfo.region = this.selfInfo.region;
        switch(this.selfInfo.gender){
            case 0 :
                this.selfInfo.gender = '保密';
                this.sexList.active = {
                    key: 0,
                    name: '保密'
                }
                break;
            case 1 :
                this.selfInfo.gender = '男';
                this.sexList.active = {
                    key: 1,
                    name: '男'
                }
                break;
            case 2:
                this.selfInfo.gender = '女';
                this.sexList.active = {
                    key: 2,
                    name: '女'
                }
        }
    }
    private hideSelect(event){
        event.stopPropagation();
        this.sexList.show = false;
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private selfCancel(){
        this.isEdit = false;
        this.isShow.emit();
    }
    private signatureChange(event){
        this.newInfo.signature = event.target.value;
    }
    private nicknameChange(event){
        this.newInfo.nickname = event.target.value;
    }
    private regionChange(event){
        this.newInfo.region = event.target.value;
    }
    private selfConfirm(){
        let newInfo = {
            info: Object.assign({},this.newInfo,{gender: this.sexList.active.key}),
            avatar: this.newAvatar
        };
        this.isEdit = false;
        this.isShow.emit(newInfo);
    }
    private selfAvatarChange(){
        let selfAvatarImg = this.elementRef.nativeElement.querySelector('#selfAvatarImg'),
            selfAvatarInput = this.elementRef.nativeElement.querySelector('#selfAvatarInput'),
            imgFile = this.util.fileReader(selfAvatarInput);
        if(imgFile){
            imgFile.then((url: string) => {
                selfAvatarImg.src = url;
                this.newAvatar.url = url;
                this.cameraShadow = false;
            })
        }
        this.newAvatar.formData = this.util.getFileFormData(selfAvatarInput);
    }
    private toEdit(){
        this.isEdit = true;
    }
}