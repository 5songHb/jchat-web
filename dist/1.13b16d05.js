webpackJsonp([1],{1135:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(function(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])})(n(1416))},1143:function(t,e,n){t.exports=n.p+"assets/images/copyright.10a5f683.png"},1147:function(t,e,n){t.exports=n.p+"assets/images/password-icon.0b10db99.png"},1148:function(t,e,n){t.exports=n.p+"assets/images/send-message-error.771d36fe.png"},1152:function(t,e,n){t.exports=n.p+"assets/images/logo.4f1fde94.png"},1154:function(t,e,n){t.exports=n.p+"assets/images/success-tip.ba6f38a2.png"},1155:function(t,e,n){t.exports=n.p+"assets/images/username-icon.95cd960c.png"},1156:function(t,e,n){e=t.exports=n(543)(),e.push([t.i,".paddingBottomNone {\n  padding-bottom: 0 !important; }\n\n.tip-modal-success, .tip-modal-error {\n  vertical-align: middle;\n  margin-right: 6px; }\n",""])},1157:function(t,e,n){t.exports='<div class="modal-shadow">\r\n    <div class="modal-content" [ngClass]="{\'paddingBottomNone\': this.info.success}">\r\n        <h2 class="modal-title">\r\n            {{info.title}}\r\n            <span class="modal-close" (click)="modalTip()"></span>\r\n        </h2>\r\n        <p class="modal-warn-tip">\r\n            <img src="'+n(1154)+'" class="tip-modal-success" *ngIf="this.info.success === 1">\r\n            <img src="'+n(1148)+'" class="tip-modal-error" *ngIf="this.info.success === 2">\r\n            {{info.tip}}\r\n            </p>\r\n        <p class="modal-btn" *ngIf="!info.success">\r\n            <button type="button" (click)="modalTip()" class="btn-cancel btn-white">取消</button>\r\n            <button type="button" (click)="modalTip(info)" class="btn-confirm btn-active">确定</button>            \r\n        </p>\r\n    </div>\r\n</div>'},1158:function(t,e,n){var i=n(1156);t.exports="string"==typeof i?i:i.toString()},1159:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(function(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])})(n(1161))},1160:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n(1),o=(function(){function t(){this.modalTipEmit=new r.EventEmitter}return t.prototype.ngOnInit=function(){this.info.success&&setTimeout(function(){this.modalTipEmit.emit()}.bind(this),1500)},t.prototype.modalTip=function(t){t?this.modalTipEmit.emit(t):this.modalTipEmit.emit()},t})();i.__decorate([r.Input(),i.__metadata("design:type",Object)],o.prototype,"info",void 0),i.__decorate([r.Output(),i.__metadata("design:type",r.EventEmitter)],o.prototype,"modalTipEmit",void 0),o=i.__decorate([r.Component({selector:"tip-modal-component",template:n(1157),styles:[n(1158)]}),i.__metadata("design:paramtypes",[])],o),e.TipModalComponent=o},1161:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n(83),o=n(211),s=n(1),a=n(1160),p=(function(){function t(){}return t})();p=i.__decorate([s.NgModule({declarations:[a.TipModalComponent],imports:[r.CommonModule,o.FormsModule],exports:[a.TipModalComponent],providers:[]})],p),e.TipModalModule=p},1192:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n(1),o=n(64),s=n(84),a=n(116),p=n(305),c=(function(){function t(t,e,n){this.store$=t,this.router=e,this.storageService=n,this.info={username:"",password:"",repeatPassword:""},this.tip={usernameTip:"",passwordTip:"",repeatPasswordTip:""},this.isButtonAvailable=!1,this.tipModal={show:!1,info:{}}}return t.prototype.ngOnInit=function(){var t=this;this.JIMInit(),this.registerStream=this.store$.select((function(e){var n=e.registerReducer;return n.isRegisterSuccess?t.tipModal=n.tipModal:(t.tip.usernameTip=n.usernameTip,t.tip.passwordTip=n.passwordTip,t.isButtonAvailable=n.isButtonAvailable,t.tip.repeatPasswordTip=n.repeatPasswordTip),e})).subscribe((function(t){}))},t.prototype.ngAfterViewInit=function(){document.getElementById("registerUsername").focus()},t.prototype.JIMInit=function(){a.global.JIM.init({appkey:a.authPayload.appKey,random_str:a.authPayload.randomStr,signature:a.authPayload.signature,timestamp:a.authPayload.timestamp,flag:a.authPayload.flag}).onSuccess((function(t){console.log("success:"+JSON.stringify(t))})).onFail((function(t){console.log("error:"+JSON.stringify(t))})).onTimeout((function(t){console.log(t)}))},t.prototype.register=function(){this.store$.dispatch({type:p.registerAction.register,payload:{username:this.info.username,password:this.info.password,repeatPassword:this.info.repeatPassword,isButtonAvailable:this.isButtonAvailable}})},t.prototype.isButtonAvailableAction=function(){this.store$.dispatch({type:p.registerAction.isButtonAvailableAction,payload:{username:this.info.username,password:this.info.password,repeatPassword:this.info.repeatPassword}})},t.prototype.usernameBlur=function(){this.store$.dispatch({type:p.registerAction.isUsernameAvailableAction,payload:{username:this.info.username}})},t.prototype.passwordBlur=function(){this.store$.dispatch({type:p.registerAction.password,payload:{password:this.info.password}})},t.prototype.modalTipEmit=function(){this.tipModal.show=!1,this.storageService.set("register-username",this.info.username),this.router.navigate(["/login"])},t.prototype.ngOnDestroy=function(){this.registerStream.unsubscribe()},t})();c=i.__decorate([r.Component({selector:"app-register",styles:[n(1335)],template:n(1293)}),i.__metadata("design:paramtypes",[o.Store,s.Router,a.StorageService])],c),e.RegisterComponent=c},1262:function(t,e,n){e=t.exports=n(543)(),e.push([t.i,".register-container {\n  width: 400px;\n  min-height: 454px;\n  background-color: #fff;\n  border-radius: 4px;\n  margin: 0 auto;\n  overflow: hidden;\n  text-align: center;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  padding-bottom: 42px;\n  box-sizing: border-box; }\n  .register-container h1 {\n    height: 143px;\n    line-height: 143px;\n    margin: 0; }\n  .register-container .register-info > div {\n    position: relative;\n    width: 320px;\n    margin: 0 auto; }\n  .register-container .register-info .register-tip {\n    position: absolute;\n    top: 46px;\n    left: 0;\n    font-size: 12px;\n    line-height: 17px;\n    color: #EB424C; }\n  .register-container .register-info input {\n    height: 42px;\n    width: 320px;\n    border: 1px solid #D9DEE4;\n    padding-left: 45px;\n    box-sizing: border-box;\n    background-size: 18px;\n    border-radius: 2px;\n    font-size: 12px; }\n  .register-container .register-info .register-username {\n    margin-bottom: 22px;\n    position: relative; }\n    .register-container .register-info .register-username input {\n      background: url("+n(1155)+") 13px center no-repeat; }\n    .register-container .register-info .register-username.register-tip-wrap {\n      margin-bottom: 32px; }\n  .register-container .register-info .register-pwd {\n    margin-bottom: 22px; }\n    .register-container .register-info .register-pwd input {\n      background: url("+n(1147)+") 13px center no-repeat; }\n    .register-container .register-info .register-pwd.register-tip-wrap {\n      margin-bottom: 32px; }\n  .register-container .register-info .register-re-pwd {\n    margin-bottom: 30px; }\n    .register-container .register-info .register-re-pwd input {\n      background: url("+n(1147)+") 13px center no-repeat; }\n    .register-container .register-info .register-re-pwd.register-tip-wrap {\n      margin-bottom: 32px; }\n  .register-container .register-info .register-btn button {\n    background-color: #2DD0CF;\n    border-radius: 2px;\n    width: 320px;\n    height: 42px;\n    font-size: 16px;\n    color: #FFFFFF; }\n    .register-container .register-info .register-btn button.disabled {\n      color: #d9f6f6 !important;\n      background-color: #81e3e2 !important;\n      border-color: #81e3e2 !important;\n      cursor: default; }\n  .register-container .register-info .register-to-login {\n    margin-top: 10px;\n    font-size: 12px;\n    color: #808080;\n    letter-spacing: 0; }\n    .register-container .register-info .register-to-login a {\n      font-size: 12px;\n      color: #2DD0CF;\n      letter-spacing: 0;\n      line-height: 17px;\n      cursor: pointer; }\n\n.copyright-container {\n  height: 55px;\n  position: absolute;\n  bottom: 76px;\n  text-align: center;\n  width: 100%;\n  font-size: 14px;\n  color: #FFFFFF;\n  opacity: 0.7; }\n  .copyright-container img {\n    margin-bottom: 8px; }\n\n@media (max-height: 650px) {\n  .copyright-container {\n    display: none; } }\n\n@media (min-height: 650px) and (max-height: 720px) {\n  .copyright-container {\n    bottom: 20px; } }\n\n@media (min-height: 720px) and (max-height: 780px) {\n  .copyright-container {\n    bottom: 45px; } }\n",""])},1293:function(t,e,n){t.exports='<div class="register-wrap">\n    <div class="register-container">\n        <h1>\n            <img src="'+n(1152)+'" alt="">\n        </h1>\n        <div class="register-info">\n            <div class="register-username" [ngClass]="{\'register-tip-wrap\': tip.usernameTip}">\n                <input spellcheck="false" id="registerUsername" class="input-focus" [ngClass]="{\'input-error\': tip.usernameTip}" [(ngModel)]="info.username" type="text" placeholder="请输入用户名" (blur)="usernameBlur()" (keyup)="isButtonAvailableAction()">\n                <p *ngIf="tip.usernameTip" class="register-tip">{{tip.usernameTip}}</p>\n            </div>\n            <div class="register-pwd" [ngClass]="{\'register-tip-wrap\': tip.passwordTip}">\n                <input spellcheck="false" class="input-focus" [ngClass]="{\'input-error\': tip.passwordTip}" [(ngModel)]="info.password" type="password" placeholder="请输入密码" (blur)="passwordBlur()" (keyup)="isButtonAvailableAction()">\n                <p *ngIf="tip.passwordTip" class="register-tip">{{tip.passwordTip}}</p>\n            </div>\n            <div class="register-re-pwd" [ngClass]="{\'register-tip-wrap\': tip.repeatPasswordTip}">\n                <input spellcheck="false" class="input-focus" [ngClass]="{\'input-error\': tip.repeatPasswordTip}" [(ngModel)]="info.repeatPassword" type="password" placeholder="请确认密码" (keyup.enter)="register()" (keyup)="isButtonAvailableAction()">\n                <p *ngIf="tip.repeatPasswordTip" class="register-tip">{{tip.repeatPasswordTip}}</p>\n            </div>\n            <p class="register-btn">\n                <button [ngClass]="{\'disabled\': !isButtonAvailable}" class="btn-active" type="button" (click)="register()">注册</button>\n            </p>\n            <p class="register-to-login">\n                已有账号？\n                <a routerLink="/login">立即登录</a>\n            </p>\n        </div>\n    </div>\n</div>\n<div class="copyright-container">\n    <img src="'+n(1143)+'" alt="">\n    <p>\n        深圳市和讯华谷信息技术有限公司 版权所有 @2011-2017  粤ICP备12056275号-13\n    </p>\n</div>\n<tip-modal-component *ngIf="tipModal.show" [info]="tipModal.info" (modalTipEmit)="modalTipEmit($event)"></tip-modal-component>\n'},1335:function(t,e,n){var i=n(1262);t.exports="string"==typeof i?i:i.toString()},1416:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(41),r=n(83),o=n(211),s=n(1),a=n(84),p=n(1417),c=n(1192),l=n(1159),d=(function(){function t(){}return t})();d.routes=p.REGISTER_ROUTER,d=i.__decorate([s.NgModule({declarations:[c.RegisterComponent],imports:[r.CommonModule,o.FormsModule,a.RouterModule.forChild(p.REGISTER_ROUTER),l.TipModalModule],providers:[]})],d),e.RegisterModule=d},1417:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1192);e.REGISTER_ROUTER=[{path:"",children:[{path:"",component:i.RegisterComponent}]}]}});