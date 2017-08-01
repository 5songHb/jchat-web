import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy,
    HashLocationStrategy } from '@angular/common';
import { StorageService } from './storage.service';
import { global } from './global';
import { authPayload } from './config';
import { md5 } from '../../services/tools';
import { Util } from '../../services/util';

@Injectable()
export class RouterGuard implements CanActivate {
    private util: Util = new Util();
    private username = '';
    private password = '';
    constructor(
        private router: Router,
        private location: LocationStrategy,
        private storageService: StorageService
    ) {}
    public canActivate(): boolean | Promise<boolean> {
        // 如果是从登陆界面跳转过来的就不执行以下代码
        if (window.location.href.match(/\/login$/g)) {
            return true;
        }
        const that = this;
        // 不是从登陆界面跳转过来的，如刷新时或者是关闭窗口五分钟内重新打开则自动登录
        const leaveLogin = this.storageService.get(md5('afterFiveMinutes-username'), true) &&
                this.storageService.get(md5('afterFiveMinutes-password'));
        if (leaveLogin) {
            this.username = this.storageService.get(md5('afterFiveMinutes-username'), true);
            this.password = this.storageService.get(md5('afterFiveMinutes-password'), true);
            return new Promise<boolean>((resolve, reject) => {
                that.JIMInit(resolve);
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
            console.log('success:' + JSON.stringify(data));
        }).onFail((data) => {
            console.log('error:' + JSON.stringify(data));
        }).onTimeout((data) => {
            console.log(data);
        });
    }
    private autoLogin(resolve) {
        const that = this;
        global.JIM.login({
            username: this.username,
            password: this.password,
            is_md5: true
        })
        .onSuccess((data) => {
            console.log('success:' + JSON.stringify(data));
            global.user = data.username;
            global.password = that.password;
            resolve(true);
        }).onFail((data) => {
            console.log('error:' + JSON.stringify(data));
            resolve(false);
        }).onTimeout((data) => {
            console.log('timeout:' + JSON.stringify(data));
            resolve(false);
        });
    }
}
