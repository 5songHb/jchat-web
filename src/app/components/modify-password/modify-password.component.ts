import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'modify-password-component',
    templateUrl: './modify-password.component.html',
    styleUrls: ['./modify-password.component.scss']
})

export class ModifyPasswordComponent implements OnInit {
    private oldPassword = '';
    private newPassword = '';
    private newPasswordRepeat = '';
    @Output()
        private modifyPassword: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    public ngOnInit() {
    }
    private confirmModify(){
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