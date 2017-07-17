import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy,HashLocationStrategy } from '@angular/common';
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
        private router:Router,
        private location:LocationStrategy,
        private storageService: StorageService
    ) {}
    canActivate(): boolean | Promise<boolean> {
        if(window.location.href.match(/\/login$/g)){
            return true;
        }
        let that = this;
        // 判断是否登陆，前者是刷新时登录，后者是关闭窗口五分钟内打开窗口登录
        let leaveLogin = this.storageService.get(md5('afterFiveMinutes-username'), true) && this.storageService.get(md5('afterFiveMinutes-password'));
        // 测试一下兼容性
        // if(refrashLogin){
        //     this.username = window.sessionStorage.getItem(md5('login-persistence-username'));
        //     this.password = window.sessionStorage.getItem(md5('login-persistence-password'));
        // }else 
        if(leaveLogin){
            this.username = this.storageService.get(md5('afterFiveMinutes-username'), true);
            this.password = this.storageService.get(md5('afterFiveMinutes-password'), true);
        }
        if(leaveLogin){
            return new Promise<boolean>((resolve, reject) => {
                that.JIMInit(resolve);
            });
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
    private JIMInit(resolve){
        let that = this,
        timestamp = new Date().getTime(),
        signature = this.util.createSignature(timestamp);
        global.JIM.init({
            "appkey": authPayload.appKey,
            "random_str": authPayload.randomStr,
            "signature": signature,
            "timestamp": timestamp,
            "flag": authPayload.flag
        }).onSuccess(function(data) {
            that.autoLogin(resolve);
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data))
        }).onTimeout(function(data) {
            console.log(data)
        })
    }
    private autoLogin(resolve){
        let that = this;
        global.JIM.login({
            'username' : this.username,
            'password' : this.password,
            'is_md5': true
        })
        .onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
            global.user = data.username;
            global.password = that.password;
            resolve(true);
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data));
            resolve(false);
        }).onTimeout(function(data) {
            console.log('timeout:' + JSON.stringify(data));
            resolve(false);
        });
    }
}


