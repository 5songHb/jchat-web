webpackJsonp([8],{1187:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t(41),r=t(1);console.log("`Market` component loaded asynchronously");var u=(function(){function e(){}return e.prototype.ngOnInit=function(){console.log("hello `Market` component")},e})();u=n.__decorate([r.Component({selector:"market",template:t(1288)})],u),o.MarketComponent=u},1288:function(e,o){e.exports="<h1>market</h1>"},1404:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t(1405);o.MarketModule=n.MarketModule},1405:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t(41),r=t(83),u=t(211),l=t(1),a=t(84),c=t(1406),s=t(1187);console.log("`Detail` bundle loaded asynchronously");var d=(function(){function e(){}return e})();d.routes=c.routes,d=n.__decorate([l.NgModule({declarations:[s.MarketComponent],imports:[r.CommonModule,u.FormsModule,a.RouterModule.forChild(c.routes)]})],d),o.MarketModule=d},1406:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t(1187);o.routes=[{path:"",component:n.MarketComponent,pathMatch:"full"}]}});