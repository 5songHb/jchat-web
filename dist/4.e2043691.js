webpackJsonp([4],{1131:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1402);t.ListModule=n.ListModule},1186:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(41),r=o(1),u=(function(){function e(){}return e.prototype.ngOnInit=function(){console.log("hello `List` component")},e})();u=n.__decorate([r.Component({selector:"app-list",styles:[""],template:o(1287)})],u),t.ListComponent=u},1287:function(e,t){e.exports='<h1 style="color: #fff;font-size: 30px;">登陆成功</h1>\n<router-outlet></router-outlet>'},1402:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(41),r=o(83),u=o(211),l=o(1),i=o(84),s=o(1403),c=o(1186);console.log("`List` bundle loaded asynchronously");var d=(function(){function e(){}return e})();d.routes=s.LISTROUTER,d=n.__decorate([l.NgModule({declarations:[c.ListComponent],imports:[r.CommonModule,u.FormsModule,i.RouterModule.forChild(s.LISTROUTER)]})],d),t.ListModule=d},1403:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1186);t.LISTROUTER=[{path:"",children:[{path:"",component:n.ListComponent},{path:"market",loadChildren:function(){return o.e(8).then(o.bind(null,1404)).then((function(e){return e.MarketModule}))}}]}]}});