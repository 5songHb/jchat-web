import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';
import { global } from './global';
import { authPayload } from './config';
import { md5 } from '../../services/tools';
import { Util } from '../../services/util';

@Injectable()
export class MainCanActivate implements CanActivate {
    private util: Util = new Util();
    private username = '';
    private password = '';
    constructor(
        private router: Router,
        private storageService: StorageService
    ) {}
    public canActivate(): boolean | Promise<boolean> {
        // 如果是从登陆界面跳转过来的就直接return
        if (window.location.href.match(/\/login$/g)) {
            return true;
        }
        // 不是从登陆界面跳转过来的，如刷新时或者是关闭窗口五分钟内重新打开则自动登录
        const storageUsername = this.storageService.get(md5('afterFiveMinutes-username'), true);
        const storagePassword = this.storageService.get(md5('afterFiveMinutes-password'), true);
        if (storageUsername && storagePassword) {
            this.username = storageUsername;
            this.password = storagePassword;
            return new Promise<boolean>((resolve, reject) => {
                this.JIMInit(resolve);
            });
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    private JIMInit(resolve) {
        const that = this;
        const timestamp = new Date().getTime();
        const signature = this.util.createSignature(timestamp);
        global.JIM.init({
            appkey: authPayload.appKey,
            random_str: authPayload.randomStr,
            signature,
            timestamp,
            flag: authPayload.flag
        }).onSuccess((data) => {
            that.autoLogin(resolve);
        }).onFail((data) => {
            resolve(false);
        }).onTimeout((data) => {
            resolve(false);
        });
    }
    private autoLogin(resolve) {
        const that = this;
        global.JIM.login({
            username: this.username,
            password: this.password,
            is_md5: true
        }).onSuccess((data) => {
            global.user = data.username;
            global.password = that.password;
            resolve(true);
        }).onFail((data) => {
            resolve(false);
        }).onTimeout((data) => {
            resolve(false);
        });
    }
}
