import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { global } from '../../services/common';
import { md5 } from '../../services/tools';

@Component({
    selector: 'modify-password-component',
    templateUrl: './modify-password.component.html',
    styleUrls: ['./modify-password.component.scss']
})

export class ModifyPasswordComponent implements OnInit {
    private oldPassword = '';
    private newPassword = '';
    private newPasswordRepeat = '';
    private oldPwdTip = false;
    private repeatPwdTip = 0;
    @Output()
        private modifyPassword: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    public ngOnInit() {
    }
    private confirmModify(){
        if(global.password !== md5(this.oldPassword)){
            this.oldPwdTip = true;
            return ;
        }
        if(this.newPassword !== this.newPasswordRepeat){
            this.repeatPwdTip = 1;
            return ;
        }else if(this.newPassword.length > 128 || this.newPassword.length < 4){
            this.repeatPwdTip = 2;
            return ;
        }
        this.modifyPassword.emit({
            'old_pwd' : this.oldPassword,
            'new_pwd' : this.newPassword,
            'is_md5' : false
        })
    }
    private cancelModify(){
        this.modifyPassword.emit();
    }
}