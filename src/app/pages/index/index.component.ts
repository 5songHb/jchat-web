import { Component, OnInit } from '@angular/core';
import { global } from '../../services/common/global';
import '../../../assets/static/js/jmessage-sdk-web.2.2.1.min.js';
declare function JMessage(): void;

@Component({
    selector: 'my-app',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class AppComponent implements OnInit {
    constructor(){}
    ngOnInit(){
        // 创建JIM 对象
        global.JIM = new JMessage();
        //异常断线监听
        global.JIM.onDisconnect(function(){
            console.log("【disconnect】");
        });
    }
    
}