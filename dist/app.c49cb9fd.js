webpackJsonp([6],{

/***/ 1129:
/***/ (function(module, exports, __webpack_require__) {

!(function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()})(this,(function(){return (function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)})([(function(t,e,n){var r=n(27);window.JMessage=t.exports=r}),(function(t,e,n){function r(t){if(t)return o(t)}function o(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}}),(function(t,e,n){(function(t){function r(t,n){var r="b"+e.packets[t.type]+t.data.data;return n(r)}function o(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=_[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return r(s.buffer)}function i(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=new FileReader;return o.onload=function(){t.data=o.result,e.encodePacket(t,n,!0,r)},o.readAsArrayBuffer(t.data)}function s(t,n,r){if(!n)return e.encodeBase64Packet(t,r);if(m)return i(t,n,r);var o=new Uint8Array(1);o[0]=_[t.type];var s=new E([o.buffer,t.data]);return r(s)}function a(t){try{t=d.decode(t)}catch(t){return!1}return t}function c(t,e,n){for(var r=new Array(t.length),o=f(t.length,n),i=function(t,n,o){e(n,(function(e,n){r[t]=n,o(e,r)}))},s=0;s<t.length;s++)i(s,t[s],o)}var u,h=n(48),p=n(16),l=n(34),f=n(33),d=n(62);t&&t.ArrayBuffer&&(u=n(36));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),g="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),m=y||g;e.protocol=3;var _=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},v=h(_),b={type:"error",data:"parser error"},E=n(37);e.encodePacket=function(e,n,i,a){"function"==typeof n&&(a=n,n=!1),"function"==typeof i&&(a=i,i=null);var c=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&c instanceof ArrayBuffer)return o(e,n,a);if(E&&c instanceof t.Blob)return s(e,n,a);if(c&&c.base64)return r(e,a);var u=_[e.type];return void 0!==e.data&&(u+=i?d.encode(String(e.data)):String(e.data)),a(""+u)},e.encodeBase64Packet=function(n,r){var o="b"+e.packets[n.type];if(E&&n.data instanceof t.Blob){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];r(o+t)},i.readAsDataURL(n.data)}var s;try{s=String.fromCharCode.apply(null,new Uint8Array(n.data))}catch(t){for(var a=new Uint8Array(n.data),c=new Array(a.length),u=0;u<a.length;u++)c[u]=a[u];s=String.fromCharCode.apply(null,c)}return o+=t.btoa(s),r(o)},e.decodePacket=function(t,n,r){if(void 0===t)return b;if("string"==typeof t){if("b"==t.charAt(0))return e.decodeBase64Packet(t.substr(1),n);if(r&&(t=a(t),t===!1))return b;var o=t.charAt(0);return Number(o)==o&&v[o]?t.length>1?{type:v[o],data:t.substring(1)}:{type:v[o]}:b}var i=new Uint8Array(t),o=i[0],s=l(t,1);return E&&"blob"===n&&(s=new E([s])),{type:v[o],data:s}},e.decodeBase64Packet=function(t,e){var n=v[t.charAt(0)];if(!u)return{type:n,data:{base64:!0,data:t.substr(1)}};var r=u.decode(t.substr(1));return"blob"===e&&E&&(r=new E([r])),{type:n,data:r}},e.encodePayload=function(t,n,r){function o(t){return t.length+":"+t}function i(t,r){e.encodePacket(t,!!s&&n,!0,(function(t){r(null,o(t))}))}"function"==typeof n&&(r=n,n=null);var s=p(t);return n&&s?E&&!m?e.encodePayloadAsBlob(t,r):e.encodePayloadAsArrayBuffer(t,r):t.length?void c(t,i,(function(t,e){return r(e.join(""))})):r("0:")},e.decodePayload=function(t,n,r){if("string"!=typeof t)return e.decodePayloadAsBinary(t,n,r);"function"==typeof n&&(r=n,n=null);var o;if(""==t)return r(b,0,1);for(var i,s,a="",c=0,u=t.length;c<u;c++){var h=t.charAt(c);if(":"!=h)a+=h;else{if(""==a||a!=(i=Number(a)))return r(b,0,1);if(s=t.substr(c+1,i),a!=s.length)return r(b,0,1);if(s.length){if(o=e.decodePacket(s,n,!0),b.type==o.type&&b.data==o.data)return r(b,0,1);var p=r(o,c+i,u);if(!1===p)return}c+=i,a=""}}return""!=a?r(b,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,(function(t){return n(null,t)}))}return t.length?void c(t,r,(function(t,e){var r=e.reduce((function(t,e){var n;return n="string"==typeof e?e.length:e.byteLength,t+n.toString().length+n+2}),0),o=new Uint8Array(r),i=0;return e.forEach((function(t){var e="string"==typeof t,n=t;if(e){for(var r=new Uint8Array(t.length),s=0;s<t.length;s++)r[s]=t.charCodeAt(s);n=r.buffer}e?o[i++]=0:o[i++]=1;for(var a=n.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var r=new Uint8Array(n),s=0;s<r.length;s++)o[i++]=r[s]})),n(o.buffer)})):n(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,(function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);t=r.buffer,e[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,E){var c=new E([e.buffer,a.buffer,t]);n(null,c)}}))}c(t,r,(function(t,e){return n(new E(e))}))},e.decodePayloadAsBinary=function(t,n,r){"function"==typeof n&&(r=n,n=null);for(var o=t,i=[],s=!1;o.byteLength>0;){for(var a=new Uint8Array(o),c=0===a[0],u="",h=1;255!=a[h];h++){if(u.length>310){s=!0;break}u+=a[h]}if(s)return r(b,0,1);o=l(o,2+u.length),u=parseInt(u);var p=l(o,0,u);if(c)try{p=String.fromCharCode.apply(null,new Uint8Array(p))}catch(t){var f=new Uint8Array(p);p="";for(var h=0;h<f.length;h++)p+=String.fromCharCode(f[h])}i.push(p),o=l(o,u)}var d=i.length;i.forEach((function(t,o){r(e.decodePacket(t,n,!0),o,d)}))}}).call(e,(function(){return this})())}),(function(t,e){t.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}}),(function(t,e,n){(function(r){function o(){return"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function i(){var t=arguments,n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),!n)return t;var r="color: "+this.color;t=[t[0],r,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,(function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))})),t.splice(i,0,r),t}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}}function c(){try{return e.storage.debug}catch(t){}if("undefined"!=typeof r&&"env"in r)return r.env.DEBUG}function u(){try{return window.localStorage}catch(t){}}e=t.exports=n(46),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},e.enable(c())}).call(e,n(10))}),(function(t,e,n){(function(r){function o(){return"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function i(){var t=arguments,n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),!n)return t;var r="color: "+this.color;t=[t[0],r,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,(function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))})),t.splice(i,0,r),t}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}}function c(){try{return e.storage.debug}catch(t){}if("undefined"!=typeof r&&"env"in r)return r.env.DEBUG}function u(){try{return window.localStorage}catch(t){}}e=t.exports=n(55),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},e.enable(c())}).call(e,n(10))}),(function(t,e){var n={SDK_VERSION:"2.2.0",WSS_ADDRESS:"wss://ws.im.jiguang.cn",UPLOAD_FILE:"http://sdk.im.jiguang.cn/resource",ALLOW_MSG_TYPE:["text","image","file","location","custom"],LOGIN_OUT_EVENT:[1,2],ACK_TIMEOUT:5e3,RESP_TIMEOUT:3e4,RETRY_TIMES:5,SYNC_INTERVAL:3e5,SYNC_TYPE_OPEN:1,SYNC_TYPE_CLOSE:0,EVENTS:{ACK:"ack",INIT:"c_init",LOGIN:"login",REGISTER:"register",GET_USER_INFO:"get_across_user_info",GET_ACROSS_USER_INFO:"get_across_user_info",S_SINGLE_TEXT:"s_across_single_text",S_SINGLE_TEXT_:"s_single_text",MSG_SYNC:"msg_sync",MSG_RECV:"msg_recv",SEND_GROUP_MSG:"send_group_msg",CREATE_GROUP:"create_group",GET_GROUPS_LIST:"get_groups_list",GET_GROUP_INFO:"get_group_info",ADD_GROUP_MEMBER:"add_group_member",ADD_ACROSS_GROUP_MEMBER:"add_across_group_member",DEL_GROUP_MEMBER:"del_group_member",DEL_ACROSS_GROUP_MEMBER:"del_across_group_member",GET_GROUP_MEMBERS:"get_group_members",UPDATE_GROUP_INFO:"update_group_info",EXIT_GROUP:"exit_group",EVENT_NOTIFICATION:"event_notification",GET_CONVERSATIONS:"get_conversations",GET_UPLOAD_TOKEN:"get_upload_token",NO_DISTURB:"no_disturb",ADD_MSG_NO_DISTURB_SINGLE:"add_msg_no_disturb_single",DELETE_MSG_NO_DISTURB_SINGLE:"delete_msg_no_disturb_single",ADD_MSG_NO_DISTURB_GROUP:"add_msg_no_disturb_group",DELETE_MSG_NO_DISTURB_GROUP:"delete_msg_no_disturb_group",ADD_MSG_NO_DISTURB_GLOBAL:"add_msg_no_disturb_global",DELETE_MSG_NO_DISTURB_GLOBAL:"delete_msg_no_disturb_global",DISCONNECT:"disconnect",GET_BLACK_LIST:"get_black_list",ADD_BLACK_LIST:"add_black_list",DEL_BLACK_LIST:"del_black_list",UPDATE_SELF_INFO:"update_user_inf",UPDATE_SELF_PWD:"update_user_pwd",ADD_MSG_SHIELD_GROUP:"add_msg_shield_group",DEL_MSG_SHIELD_GROUP:"del_msg_shield_group",ADD_FRIEND:"add_friend",DEL_FRIEND:"del_friend",UPDATE_FRIEND_MEMO:"update_friend_memo",GET_FRIEND_LIST:"get_friend_list",SYNC_CHECK:"sync_check",SYNC_CONVERSATION:"sync_conversation",SYNC_CONVERSATION_ACK:"sync_conversation_ack",GET_RESOURCE:"get_resource"}};t.exports=n}),(function(t,e,n){function r(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var o=n(2),i=n(1);t.exports=r,i(r.prototype),r.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},r.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},r.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},r.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},r.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},r.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e)},r.prototype.onPacket=function(t){this.emit("packet",t)},r.prototype.onClose=function(){this.readyState="closed",this.emit("close")}}),(function(t,e,n){(function(e){var r=n(49);t.exports=function(t){var n=t.xdomain,o=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!n||r))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!o&&i)return new XDomainRequest}catch(t){}if(!n)try{return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}}).call(e,(function(){return this})())}),(function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}}),(function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(h===setTimeout)return setTimeout(t,0);if((h===n||!h)&&setTimeout)return h=setTimeout,setTimeout(t,0);try{return h(t,0)}catch(e){try{return h.call(null,t,0)}catch(e){return h.call(this,t,0)}}}function i(t){if(p===clearTimeout)return clearTimeout(t);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(e){try{return p.call(null,t)}catch(e){return p.call(this,t)}}}function s(){y&&f&&(y=!1,f.length?d=f.concat(d):g=-1,d.length&&a())}function a(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(f=d,d=[];++g<e;)f&&f[g].run();g=-1,e=d.length}f=null,y=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function u(){}var h,p,l=t.exports={};!(function(){try{h="function"==typeof setTimeout?setTimeout:n}catch(t){h=n}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(t){p=r}})();var f,d=[],y=!1,g=-1;l.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new c(t,e)),1!==d.length||y||o(a)},c.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=u,l.addListener=u,l.once=u,l.off=u,l.removeListener=u,l.removeAllListeners=u,l.emit=u,l.binding=function(t){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(t){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}}),(function(t,e,n){function r(){}function o(t){var n="",r=!1;return n+=t.type,e.BINARY_EVENT!=t.type&&e.BINARY_ACK!=t.type||(n+=t.attachments,n+="-"),t.nsp&&"/"!=t.nsp&&(r=!0,n+=t.nsp),null!=t.id&&(r&&(n+=",",r=!1),n+=t.id),null!=t.data&&(r&&(n+=","),n+=l.stringify(t.data)),p("encoded %j as %s",t,n),n}function i(t,e){function n(t){var n=d.deconstructPacket(t),r=o(n.packet),i=n.buffers;i.unshift(r),e(i)}d.removeBlobs(t,n)}function s(){this.reconstructor=null}function a(t){var n={},r=0;if(n.type=Number(t.charAt(0)),null==e.types[n.type])return h();if(e.BINARY_EVENT==n.type||e.BINARY_ACK==n.type){for(var o="";"-"!=t.charAt(++r)&&(o+=t.charAt(r),r!=t.length););if(o!=Number(o)||"-"!=t.charAt(r))throw new Error("Illegal attachments");n.attachments=Number(o)}if("/"==t.charAt(r+1))for(n.nsp="";++r;){var i=t.charAt(r);if(","==i)break;if(n.nsp+=i,r==t.length)break}else n.nsp="/";var s=t.charAt(r+1);if(""!==s&&Number(s)==s){for(n.id="";++r;){var i=t.charAt(r);if(null==i||Number(i)!=i){--r;break}if(n.id+=t.charAt(r),r==t.length)break}n.id=Number(n.id)}return t.charAt(++r)&&(n=c(n,t.substr(r))),p("decoded %s as %j",t,n),n}function c(t,e){try{t.data=l.parse(e)}catch(t){return h()}return t}function u(t){this.reconPack=t,this.buffers=[]}function h(t){return{type:e.ERROR,data:"parser error"}}var p=n(38)("socket.io-parser"),l=n(50),f=n(58),d=n(57),y=n(23);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=r,e.Decoder=s,r.prototype.encode=function(t,n){if(p("encoding packet %j",t),e.BINARY_EVENT==t.type||e.BINARY_ACK==t.type)i(t,n);else{var r=o(t);n([r])}},f(s.prototype),s.prototype.add=function(t){var n;if("string"==typeof t)n=a(t),e.BINARY_EVENT==n.type||e.BINARY_ACK==n.type?(this.reconstructor=new u(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!y(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,this.emit("decoded",n))}},s.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},u.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length==this.reconPack.attachments){var e=d.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},u.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}}),(function(t,e,n){(function(t,r){function o(t,e){this._id=t,this._clearFn=e}var i=n(10).nextTick,s=Function.prototype.apply,a=Array.prototype.slice,c={},u=0;e.setTimeout=function(){return new o(s.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(s.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout((function(){t._onTimeout&&t._onTimeout()}),e))},e.setImmediate="function"==typeof t?t:function(t){var n=u++,r=!(arguments.length<2)&&a.call(arguments,1);return c[n]=!0,i((function(){c[n]&&(r?t.apply(null,r):t.call(null),e.clearImmediate(n))})),n},e.clearImmediate="function"==typeof r?r:function(t){delete c[t]}}).call(e,n(12).setImmediate,n(12).clearImmediate)}),(function(t,e){var n=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}}}),(function(t,e,n){(function(t){function r(e){var n,r=!1,a=!1,c=!1!==e.jsonp;if(t.location){var u="https:"===location.protocol,h=location.port;h||(h=u?443:80),r=e.hostname!==location.hostname||h!==e.port,a=e.secure!==u}if(e.xdomain=r,e.xscheme=a,n=new o(e),"open"in n&&!e.forceJSONP)return new i(e);if(!c)throw new Error("JSONP disabled");return new s(e)}var o=n(8),i=n(44),s=n(43),a=n(45);e.polling=r,e.websocket=a}).call(e,(function(){return this})())}),(function(t,e,n){function r(t){var e=t&&t.forceBase64;h&&!e||(this.supportsBinary=!1),o.call(this,t)}var o=n(7),i=n(9),s=n(2),a=n(3),c=n(25),u=n(4)("engine.io-client:polling");t.exports=r;var h=(function(){var t=n(8),e=new t({xdomain:!1});return null!=e.responseType})();a(r,o),r.prototype.name="polling",r.prototype.doOpen=function(){this.poll()},r.prototype.pause=function(t){function e(){u("paused"),n.readyState="paused",t()}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(u("we are currently polling - waiting to pause"),r++,this.once("pollComplete",(function(){u("pre-pause polling complete"),--r||e()}))),this.writable||(u("we are currently writing - waiting to pause"),r++,this.once("drain",(function(){u("pre-pause writing complete"),--r||e()})))}else e()},r.prototype.poll=function(){u("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},r.prototype.onData=function(t){var e=this;u("polling got data %s",t);var n=function(t,n,r){return"opening"===e.readyState&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,n),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():u('ignoring poll - transport state "%s"',this.readyState))},r.prototype.doClose=function(){function t(){u("writing close packet"),e.write([{type:"close"}])}var e=this;"open"===this.readyState?(u("transport open - closing"),t()):(u("transport not open - deferring close"),this.once("open",t))},r.prototype.write=function(t){var e=this;this.writable=!1;var n=function(){e.writable=!0,e.emit("drain")};s.encodePayload(t,this.supportsBinary,(function(t){e.doWrite(t,n)}))},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(n=":"+this.port),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t}}),(function(t,e,n){(function(e){function r(t){function n(t){if(!t)return!1;if(e.Buffer&&e.Buffer.isBuffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer||e.Blob&&t instanceof Blob||e.File&&t instanceof File)return!0;if(o(t)){for(var r=0;r<t.length;r++)if(n(t[r]))return!0}else if(t&&"object"==typeof t){t.toJSON&&"function"==typeof t.toJSON&&(t=t.toJSON());for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&n(t[i]))return!0}return!1}return n(t)}var o=n(18);t.exports=r}).call(e,(function(){return this})())}),(function(t,e){var n=[].indexOf;t.exports=function(t,e){if(n)return t.indexOf(e);for(var r=0;r<t.length;++r)if(t[r]===e)return r;return-1}}),(function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}}),(function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");o!=-1&&i!=-1&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=n.exec(t||""),a={},c=14;c--;)a[r[c]]=s[c]||"";return o!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}}),(function(t,e,n){function r(t,e){return this instanceof r?(t&&"object"==typeof t&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new l({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[],this.encoder=new a.Encoder,this.decoder=new a.Decoder,this.autoConnect=e.autoConnect!==!1,void(this.autoConnect&&this.open())):new r(t,e)}var o=n(40),i=n(22),s=n(1),a=n(11),c=n(21),u=n(13),h=n(5)("socket.io-client:manager"),p=n(17),l=n(35),f=Object.prototype.hasOwnProperty;t.exports=r,r.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)f.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},r.prototype.updateSocketIds=function(){for(var t in this.nsps)f.call(this.nsps,t)&&(this.nsps[t].id=this.engine.id)},s(r.prototype),r.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},r.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},r.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},r.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},r.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},r.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},r.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},r.prototype.open=r.prototype.connect=function(t,e){if(h("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;h("opening %s",this.uri),this.engine=o(this.uri,this.opts);var n=this.engine,r=this;this.readyState="opening",this.skipReconnect=!1;var i=c(n,"open",(function(){r.onopen(),t&&t()})),s=c(n,"error",(function(e){if(h("connect_error"),r.cleanup(),r.readyState="closed",r.emitAll("connect_error",e),t){var n=new Error("Connection error");n.data=e,t(n)}else r.maybeReconnectOnOpen()}));if(!1!==this._timeout){var a=this._timeout;h("connect attempt will timeout after %d",a);var u=setTimeout((function(){h("connect attempt timed out after %d",a),i.destroy(),n.close(),n.emit("error","timeout"),r.emitAll("connect_timeout",a)}),a);this.subs.push({destroy:function(){clearTimeout(u)}})}return this.subs.push(i),this.subs.push(s),this},r.prototype.onopen=function(){h("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(c(t,"data",u(this,"ondata"))),this.subs.push(c(t,"ping",u(this,"onping"))),this.subs.push(c(t,"pong",u(this,"onpong"))),this.subs.push(c(t,"error",u(this,"onerror"))),this.subs.push(c(t,"close",u(this,"onclose"))),this.subs.push(c(this.decoder,"decoded",u(this,"ondecoded")))},r.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},r.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},r.prototype.ondata=function(t){this.decoder.add(t)},r.prototype.ondecoded=function(t){this.emit("packet",t)},r.prototype.onerror=function(t){h("error",t),this.emitAll("error",t)},r.prototype.socket=function(t,e){function n(){~p(o.connecting,r)||o.connecting.push(r)}var r=this.nsps[t];if(!r){r=new i(this,t,e),this.nsps[t]=r;var o=this;r.on("connecting",n),r.on("connect",(function(){r.id=o.engine.id})),this.autoConnect&&n()}return r},r.prototype.destroy=function(t){var e=p(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},r.prototype.packet=function(t){h("writing packet %j",t);var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,(function(n){for(var r=0;r<n.length;r++)e.engine.write(n[r],t.options);e.encoding=!1,e.processPacketQueue()})))},r.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},r.prototype.cleanup=function(){h("cleanup");for(var t=this.subs.length,e=0;e<t;e++){var n=this.subs.shift();n.destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},r.prototype.close=r.prototype.disconnect=function(){h("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},r.prototype.onclose=function(t){h("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},r.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)h("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();h("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var n=setTimeout((function(){t.skipReconnect||(h("attempting reconnect"),t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open((function(e){e?(h("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(h("reconnect success"),t.onreconnect())})))}),e);this.subs.push({destroy:function(){clearTimeout(n)}})}},r.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}}),(function(t,e){function n(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n)}}}t.exports=n}),(function(t,e,n){function r(t,e,n){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open()}var o=n(11),i=n(1),s=n(60),a=n(21),c=n(13),u=n(5)("socket.io-client:socket"),h=n(16);t.exports=e=r;var p={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},l=i.prototype.emit;i(r.prototype),r.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[a(t,"open",c(this,"onopen")),a(t,"packet",c(this,"onpacket")),a(t,"close",c(this,"onclose"))]}},r.prototype.open=r.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},r.prototype.send=function(){var t=s(arguments);return t.unshift("message"),this.emit.apply(this,t),this},r.prototype.emit=function(t){if(p.hasOwnProperty(t))return l.apply(this,arguments),this;var e=s(arguments),n=o.EVENT;h(e)&&(n=o.BINARY_EVENT);var r={type:n,data:e};return r.options={},r.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(u("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),r.id=this.ids++),this.connected?this.packet(r):this.sendBuffer.push(r),delete this.flags,this},r.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},r.prototype.onopen=function(){u("transport is open - connecting"),"/"!==this.nsp&&(this.query?this.packet({type:o.CONNECT,query:this.query}):this.packet({type:o.CONNECT}))},r.prototype.onclose=function(t){u("close (%s)",t),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},r.prototype.onpacket=function(t){if(t.nsp===this.nsp)switch(t.type){case o.CONNECT:this.onconnect();break;case o.EVENT:this.onevent(t);break;case o.BINARY_EVENT:this.onevent(t);break;case o.ACK:this.onack(t);break;case o.BINARY_ACK:this.onack(t);break;case o.DISCONNECT:this.ondisconnect();break;case o.ERROR:this.emit("error",t.data)}},r.prototype.onevent=function(t){
var e=t.data||[];u("emitting event %j",e),null!=t.id&&(u("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?l.apply(this,e):this.receiveBuffer.push(e)},r.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var r=s(arguments);u("sending ack %j",r);var i=h(r)?o.BINARY_ACK:o.ACK;e.packet({type:i,id:t,data:r})}}},r.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e?(u("calling ack %s with %j",t.id,t.data),e.apply(this,t.data),delete this.acks[t.id]):u("bad ack %s",t.id)},r.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},r.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)l.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},r.prototype.ondisconnect=function(){u("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},r.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},r.prototype.close=r.prototype.disconnect=function(){return this.connected&&(u("performing disconnect (%s)",this.nsp),this.packet({type:o.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},r.prototype.compress=function(t){return this.flags=this.flags||{},this.flags.compress=t,this}}),(function(t,e){(function(e){function n(t){return e.Buffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer}t.exports=n}).call(e,(function(){return this})())}),(function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}}),(function(t,e){"use strict";function n(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function r(t){var e=0;for(h=0;h<t.length;h++)e=e*a+c[t.charAt(h)];return e}function o(){var t=n(+new Date);return t!==i?(u=0,i=t):t+"."+n(u++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},u=0,h=0;h<a;h++)c[s[h]]=h;o.encode=n,o.decode=r,t.exports=o}),(function(t,e,n){var r=n(1),o=n(53),i=n(6),s=function(t){this.init(t)};s.prototype.init=function(t){this.opts=t,this.dataCache={},this.memStore={},this.sync_key=0,this.sync_type=0,this.client=o(this.opts.address,{transports:["websocket","polling"]});var e=this,n=r.prototype.emit,i=this.client.onevent;this.client.onevent=function(t){var r=t.data||[];i.call(e.client,t),n.apply(e.client,["*"].concat(r))},this.client.on("*",(function(t,n){e.onReceive(t,n)}))},s.prototype.onReceive=function(t,e){if(this.opts.debug&&console.log("onReceive -- event:%s, data:%s",t,JSON.stringify(e)),t!==i.EVENTS.EVENT_NOTIFICATION&&t!==i.EVENTS.MSG_SYNC&&t!==i.EVENTS.SYNC_CONVERSATION){var n=this.dataCache[e.rid];delete e.rid,n&&(t===i.EVENTS.ACK?(n.ack&&n.ack({rid:e.rid,data:n.data}),n.cleanAckTimeout()):(e.code&&0!==e.code?n.fail&&n.fail(e):t!=i.EVENTS.S_SINGLE_TEXT_&&t!=i.EVENTS.SEND_GROUP_MSG?n.success&&n.success(e):(n.data.msg_id=e.msg_id,n.success&&n.success(e,n.data),n.innerCall&&n.innerCall(e.msg_id)),n.cleanRespTimeout(),delete this.dataCache[n.rid]))}},s.prototype.generateRid=function(){for(var t=Math.floor(Math.random()*-2147483646+2147483647);this.dataCache[t];)t=Math.floor(Math.random()*-2147483646+2147483647);return t},s.prototype.send=function(t,e){this.opts.debug&&console.log("send -- event:%s, data:%s",t,JSON.stringify(e)),this.client.emit(t,e)},t.exports=s}),(function(t,e,n){var r=n(59),o=n(32),i=n(26),s=n(6),a=n(29),c=n(30),u=n(28)(),h=n(31),p=function(t){var e=t?t:{};this.opts={address:e.address?e.address:s.WSS_ADDRESS,debug:!!e.debug},this.channel=new i(this.opts);var n=this;this.syncTask=0,this.syncTick=0,n.autoUrl=!0};p.prototype.init=function(t){var e=this;return t.autoUrl===!1&&(e.autoUrl=!1),e.autoDiscon=!0,t.flag===s.SYNC_TYPE_OPEN?e.channel.sync_type=s.SYNC_TYPE_OPEN:t.flag===s.SYNC_TYPE_CLOSE&&(e.channel.sync_type=s.SYNC_TYPE_CLOSE),this.channel.client.on(s.EVENTS.INIT,(function(n){n&&0==n.code&&(e.current_appkey=t.appkey),e.channel.client.removeListener(s.EVENTS.INIT)})),new a(this.channel).setEvent(s.EVENTS.INIT).setData(t).send()},p.prototype.loginOut=function(){if(this.current_user){this.autoDiscon=!1,clearTimeout(this.syncTask),this.channel.client.close();var t=this.channel.dataCache;for(var e in t)t[e].cleanAckTimeout(),t[e].cleanRespTimeout();this.current_user=null,this.current_appkey=null,this.channel.init(this.channel.opts)}},p.prototype.login=function(t){this.__checkInit(),t.is_md5||(t.password=u(t.password)),t.version=s.SDK_VERSION;var e=this;return this.channel.client.on(s.EVENTS.LOGIN,(function(n){if(n&&0==n.code){e.current_user=t.username,h.StorageUtils.addItem(e.current_user+"s_key",0),h.StorageUtils.removeItems(e.current_user);var r=h.StorageUtils.getItem(t.username+"s_key");r&&(e.channel.sync_key=r),e.syncCheck({sync_key:e.channel.sync_key,sync_type:e.channel.sync_type}).onSuccess((function(t){t&&0==t.code&&(e.channel.sync_key=t.sync_key,e.channel.sync_type=t.sync_type)})),e.syncTask=setInterval((function(){e.syncCheck({sync_key:e.channel.sync_key,sync_type:e.channel.sync_type}).onSuccess((function(t){t&&0==t.code&&(e.channel.sync_key=t.sync_key,e.channel.sync_type=t.sync_type)}))}),s.SYNC_INTERVAL),e.channel.client.removeListener(s.EVENTS.LOGIN)}})),new a(this.channel).setEvent(s.EVENTS.LOGIN).setData(t).send()},p.prototype.syncCheck=function(t){return this.__checkLogin(),new a(this.channel).setEvent(s.EVENTS.SYNC_CHECK).setData(t).send()},p.prototype.register=function(t){return this.__checkInit(),t.is_md5||(t.password=u(t.password)),new a(this.channel).setEvent(s.EVENTS.REGISTER).setData(t).send()},p.prototype.getUserInfo=function(t){return this.__checkLogin(),h.StringUtils.isBlack(t.appkey)&&(t.appkey=this.current_appkey),new a(this.channel).setEvent(s.EVENTS.GET_ACROSS_USER_INFO).setData(t).send()},p.prototype.updateSelfInfo=function(t){return this.__checkLogin(),h.StringUtils.isBlack(t.avatar)||delete t.avatar,new a(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO).setData(t).send()},p.prototype.updateSelfAvatar=function(t){this.__checkLogin();var e=new a(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO),n=this;return this.__uploadFile({appkey:n.current_appkey,username:n.current_user,file:t.avatar,type:"image"},(function(t,n){return t?t.is_timeout?e.timeout&&e.timeout(t.data):e.fail&&e.fail(t.data):void e.setData({avatar:n.media_id}).send()})),e},p.prototype.updateSelfPwd=function(t){return this.__checkLogin(),t.is_md5||(t.old_pwd=u(t.old_pwd),t.new_pwd=u(t.new_pwd)),new a(this.channel).setEvent(s.EVENTS.UPDATE_SELF_PWD).setData(t).send()},p.prototype.getConversation=function(){return this.__checkLogin(),new a(this.channel).setEvent(s.EVENTS.GET_CONVERSATIONS).setData({}).send()},p.prototype.sendSingleMsg=function(t){return this.__sendMsg({type:"single",target_id:t.target_username,target_name:t.target_nickname,content:t.content,extras:t.extras,appkey:t.appkey})},p.prototype.sendGroupMsg=function(t){return this.__sendMsg({type:"group",target_id:t.target_gid,target_name:t.target_gname,content:t.content,extras:t.extras,at_list:t.at_list})},p.prototype.sendSinglePic=function(t){return this.__sendPic({type:"single",target_id:t.target_username,target_name:t.target_nickname,file:t.image,extras:t.extras,appkey:t.appkey})},p.prototype.sendGroupPic=function(t){return this.__sendPic({type:"group",target_id:t.target_gid,target_name:t.target_gname,file:t.image,extras:t.extras})},p.prototype.sendSingleFile=function(t){return this.__sendFile({type:"single",target_id:t.target_username,target_name:t.target_nickname,file:t.file,extras:t.extras,appkey:t.appkey})},p.prototype.sendGroupFile=function(t){return this.__sendFile({type:"group",target_id:t.target_gid,target_name:t.target_gname,file:t.file,extras:t.extras})},p.prototype.sendSingleLocation=function(t){return this.__sendLocation({type:"single",target_id:t.target_username,target_name:t.target_nickname,latitude:t.latitude,longitude:t.longitude,scale:t.scale,label:t.label,extras:t.extras,appkey:t.appkey})},p.prototype.sendGroupLocation=function(t){return this.__sendLocation({type:"group",target_id:t.target_gid,target_name:t.target_gname,latitude:t.latitude,longitude:t.longitude,scale:t.scale,label:t.label,extras:t.extras})},p.prototype.sendSingleCustom=function(t){return this.__sendCustom({type:"single",target_id:t.target_username,target_name:t.target_nickname,custom:t.custom,appkey:t.appkey})},p.prototype.sendGroupCustom=function(t){return this.__sendCustom({type:"group",target_id:t.target_gid,target_name:t.target_gname,custom:t.custom})},p.prototype.createGroup=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.CREATE_GROUP).setData(t).send()},p.prototype.exitGroup=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.EXIT_GROUP).setData(t).send()},p.prototype.getGroups=function(){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.GET_GROUPS_LIST).setData({}).send()},p.prototype.getGroupInfo=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.GET_GROUP_INFO).setData(t).send()},p.prototype.updateGroupInfo=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.UPDATE_GROUP_INFO).setData(t).send()},p.prototype.getGroupMembers=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.GET_GROUP_MEMBERS).setData(t).send()},p.prototype.addGroupMembers=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.ADD_ACROSS_GROUP_MEMBER).setData(t).send()},p.prototype.delGroupMembers=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.DEL_ACROSS_GROUP_MEMBER).setData(t).send()},p.prototype.getNoDisturb=function(){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.NO_DISTURB).setData({version:0}).send()},p.prototype.addSingleNoDisturb=function(t){return this.__checkInit(),t.version=0,new a(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_SINGLE).setData(t).send()},p.prototype.delSingleNoDisturb=function(t){return this.__checkInit(),t.version=0,new a(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_SINGLE).setData(t).send()},p.prototype.addGroupNoDisturb=function(t){return this.__checkInit(),t.version=0,new a(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GROUP).setData(t).send()},p.prototype.delGroupNoDisturb=function(t){return this.__checkInit(),t.version=0,new a(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GROUP).setData(t).send()},p.prototype.addGlobalNoDisturb=function(){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GLOBAL).setData({version:0}).send()},p.prototype.delGlobalNoDisturb=function(){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GLOBAL).setData({version:0}).send()},p.prototype.getBlacks=function(){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.GET_BLACK_LIST).setData({version:0}).send()},p.prototype.addSingleBlacks=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.ADD_BLACK_LIST).setData(t).send()},p.prototype.delSingleBlacks=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.DEL_BLACK_LIST).setData(t).send()},p.prototype.getFriendList=function(){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.GET_FRIEND_LIST).setData({}).send()},p.prototype.addFriend=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send()},p.prototype.delFriend=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.DEL_FRIEND).setData(t).send()},p.prototype.updateFriendMemo=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.UPDATE_FRIEND_MEMO).setData(t).send()},p.prototype.addGroupShield=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.ADD_MSG_SHIELD_GROUP).setData(t).send()},p.prototype.delGroupShield=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.DEL_MSG_SHIELD_GROUP).setData(t).send()},p.prototype.getResource=function(t){return this.__checkInit(),new a(this.channel).setEvent(s.EVENTS.GET_RESOURCE).setData(t).send()},p.prototype.onMsgReceive=function(t){var e=this;this.channel.client.on(s.EVENTS.MSG_SYNC,(function(n){e.opts.debug&&console.log("onMsgReceive -- %s",JSON.stringify(n)),n.messages.forEach((function(r){var o={};o.target_type=r.content.target_type,o.target_name=r.content.target_name,o.target_id=r.content.target_id,o.from_name=r.content.from_name,o.from_id=r.content.from_id,o.from_platform=r.content.from_platform,o.create_time=r.ctime_ms,o.msg_type=r.content.msg_type,o.msg_body=r.content.msg_body,o.msg_body.isFileUploaded&&delete o.msg_body.isFileUploaded,0===r.msg_level?o.msg_level="normal":1===r.msg_level&&(o.msg_level="across",o.target_appkey=r.content.target_appkey,o.from_appkey=r.content.from_appkey),h.StorageUtils.addItem(r.msg_id,e.current_user),!e.autoUrl||"image"!==r.content.msg_type&&"voice"!==r.content.msg_type&&"file"!==r.content.msg_type?t&&t(n):e.getResource({media_id:r.content.msg_body.media_id}).onSuccess((function(e){o.msg_body.media_url=e.url,t&&t(n)})).onFail((function(e){t&&t(n)})).onTimeout((function(e){t&&t(n)}))}));var r=[];Array.prototype.push.apply(r,n.messages.map((function(t){return{msg_id:t.msg_id,msg_type:t.msg_type,from_uid:t.from_uid,from_gid:t.from_gid}}))),new a(e.channel).setEvent(s.EVENTS.MSG_RECV).setData({messages:r}).send()}))},p.prototype.onEventNotification=function(t){var e=this;this.channel.client.on(s.EVENTS.EVENT_NOTIFICATION,(function(n){e.opts.debug&&console.log("onEventNotification -- %s",JSON.stringify(n));var r={};r.event_id=n.event_id,r.event_type=n.event_type,r.from_username=n.from_username,r.gid=n.gid,r.to_usernames=n.to_usernames,r.ctime=n.ctime,r.extra=n.extra,r.return_code=n.return_code,r.description=n.description,r.from_appkey=n.from_appkey,t&&t(r);var o={event_id:n.event_id,event_type:n.event_type,from_uid:n.from_uid,gid:n.gid};new a(e.channel).setEvent(s.EVENTS.EVENT_NOTIFICATION).setData(o).send(),s.LOGIN_OUT_EVENT.indexOf(n.event_type)!=-1&&e.loginOut()}))},p.prototype.onSyncConversation=function(t){var e=this;this.channel.client.on(s.EVENTS.SYNC_CONVERSATION,(function(n){if(e.opts.debug&&console.log("onSyncMsg -- %s",JSON.stringify(n)),e.channel.sync_key=n.sync_key,h.StorageUtils.addItem(e.current_user+"s_key",n.sync_key),!n.syncInit){var r=h.StorageUtils.checkRepeatItems(n.messages,e.current_user);t&&r.length>0&&t(r)}var o={sync_key:e.channel.sync_key};new a(e.channel).setEvent(s.EVENTS.SYNC_CONVERSATION_ACK).setData(o).send(),e.syncTick++,e.syncTick%3==0&&h.StorageUtils.removeItems(e.current_user)}))},p.prototype.onDisconnect=function(t){var e=this;this.channel.client.on("disconnect",(function(){e.autoDiscon&&(e.current_appkey=null,e.current_user=null,t())}))},p.prototype.__checkConnect=function(){if(!this.channel.client.connected)throw new Error("wss socket not connect")},p.prototype.__checkInit=function(){if(!this.current_appkey)throw new Error("必须执行init操作后能执行此动作")},p.prototype.__checkLogin=function(){if(!this.current_user)throw new Error("必须执行login操作后能执行此动作")},p.prototype.__getUploadToken=function(){return this.__checkLogin(),new a(this.channel).setEvent(s.EVENTS.GET_UPLOAD_TOKEN).setData({}).send()},p.prototype.__uploadFile0=function(t,e){var n=new XMLHttpRequest;n.open("POST",s.UPLOAD_FILE+"?type="+t.type),n.setRequestHeader("X-App-Key",t.appkey),n.setRequestHeader("Authorization","Basic "+o.btoa(t.username+":"+t.token)),n.onreadystatechange=function(){if(4==this.readyState)if(200==this.status){var t=JSON.parse(this.responseText);e(null,t)}else{var n=JSON.parse(this.responseText);e(n)}},n.send(t.file)},p.prototype.__uploadFile=function(t,e){var n=this;r((function(t){n.__getUploadToken().onSuccess((function(e){t(null,e.uptoken)})).onFail((function(e){t(e)})).onTimeout((function(t){e({is_timeout:!0,data:t})}))})).then((function(e,r){n.__uploadFile0({type:t.type,file:t.file,appkey:t.appkey,username:t.username,token:r},e)})).then((function(t,n){e(null,n)})).fail((function(t,n){e({data:n})}))},p.prototype.__sendMsg=function(t){this.__checkLogin();var e=this;return new a(this.channel).setEvent("single"===t.type?s.EVENTS.S_SINGLE_TEXT:s.EVENTS.SEND_GROUP_MSG).setData(new c(this.current_user,this.current_appkey).setType(t.type).setAppkey(t.appkey).setTarget(t.target_id,t.target_name).setText(t.content,t.extras).setAtList(t.at_list).build()).send().onInnerCall((function(t){h.StorageUtils.addItem(t,e.current_user)}))},p.prototype.__sendPic=function(t){this.__checkLogin();var e=new a(this.channel).setEvent("single"===t.type?s.EVENTS.S_SINGLE_TEXT:s.EVENTS.SEND_GROUP_MSG),n=this;return this.__uploadFile({appkey:n.current_appkey,username:n.current_user,file:t.file,type:"image"},(function(r,o){return r?r.is_timeout?e.timeout&&e.timeout(r.data):e.fail&&e.fail(r.data):void e.setData(new c(n.current_user,n.current_appkey).setType(t.type).setAppkey(t.appkey).setTarget(t.target_id,t.target_name).setImage(o,t.extras).build()).send().onInnerCall((function(t){h.StorageUtils.addItem(t,n.current_user)}))})),e},p.prototype.__sendFile=function(t){this.__checkLogin();var e=new a(this.channel).setEvent("single"===t.type?s.EVENTS.S_SINGLE_TEXT:s.EVENTS.SEND_GROUP_MSG),n=this;return this.__uploadFile({appkey:n.current_appkey,username:n.current_user,file:t.file,type:"file"},(function(r,o){return r?r.is_timeout?e.timeout&&e.timeout(r.data):e.fail&&e.fail(r.data):void e.setData(new c(n.current_user,n.current_appkey).setType(t.type).setAppkey(t.appkey).setTarget(t.target_id,t.target_name).setFile(o,t.extras).build()).send().onInnerCall((function(t){h.StorageUtils.addItem(t,n.current_user)}))})),e},p.prototype.__sendLocation=function(t){this.__checkLogin();var e=this;return new a(this.channel).setEvent("single"===t.type?s.EVENTS.S_SINGLE_TEXT:s.EVENTS.SEND_GROUP_MSG).setData(new c(this.current_user,this.current_appkey).setType(t.type).setAppkey(t.appkey).setTarget(t.target_id,t.target_name).setLocation(t,t.extras).build()).send().onInnerCall((function(t){h.StorageUtils.addItem(t,e.current_user)}))},p.prototype.__sendCustom=function(t){this.__checkLogin();var e=this;return new a(this.channel).setEvent("single"===t.type?s.EVENTS.S_SINGLE_TEXT:s.EVENTS.SEND_GROUP_MSG).setData(new c(this.current_user,this.current_appkey).setType(t.type).setAppkey(t.appkey).setTarget(t.target_id,t.target_name).setCustom(t.custom).build()).send().onInnerCall((function(t){h.StorageUtils.addItem(t,e.current_user)}))},t.exports=p}),(function(t,e){"use strict";t.exports=function(){function t(t,e){var n=(65535&t)+(65535&e),r=(t>>16)+(e>>16)+(n>>16);return r<<16|65535&n}function e(t,e){return t<<e|t>>>32-e}function n(n,r,o,i,s,a){return t(e(t(t(r,n),t(i,a)),s),o)}function r(t,e,r,o,i,s,a){return n(e&r|~e&o,t,e,i,s,a)}function o(t,e,r,o,i,s,a){return n(e&o|r&~o,t,e,i,s,a)}function i(t,e,r,o,i,s,a){return n(e^r^o,t,e,i,s,a)}function s(t,e,r,o,i,s,a){return n(r^(e|~o),t,e,i,s,a)}function a(e,n){e[n>>5]|=128<<n%32,e[(n+64>>>9<<4)+14]=n;var a,c,u,h,p,l=1732584193,f=-271733879,d=-1732584194,y=271733878;for(a=0;a<e.length;a+=16)c=l,u=f,h=d,p=y,l=r(l,f,d,y,e[a],7,-680876936),y=r(y,l,f,d,e[a+1],12,-389564586),d=r(d,y,l,f,e[a+2],17,606105819),f=r(f,d,y,l,e[a+3],22,-1044525330),l=r(l,f,d,y,e[a+4],7,-176418897),y=r(y,l,f,d,e[a+5],12,1200080426),d=r(d,y,l,f,e[a+6],17,-1473231341),f=r(f,d,y,l,e[a+7],22,-45705983),l=r(l,f,d,y,e[a+8],7,1770035416),y=r(y,l,f,d,e[a+9],12,-1958414417),d=r(d,y,l,f,e[a+10],17,-42063),f=r(f,d,y,l,e[a+11],22,-1990404162),l=r(l,f,d,y,e[a+12],7,1804603682),y=r(y,l,f,d,e[a+13],12,-40341101),d=r(d,y,l,f,e[a+14],17,-1502002290),f=r(f,d,y,l,e[a+15],22,1236535329),l=o(l,f,d,y,e[a+1],5,-165796510),y=o(y,l,f,d,e[a+6],9,-1069501632),d=o(d,y,l,f,e[a+11],14,643717713),f=o(f,d,y,l,e[a],20,-373897302),l=o(l,f,d,y,e[a+5],5,-701558691),y=o(y,l,f,d,e[a+10],9,38016083),d=o(d,y,l,f,e[a+15],14,-660478335),f=o(f,d,y,l,e[a+4],20,-405537848),l=o(l,f,d,y,e[a+9],5,568446438),y=o(y,l,f,d,e[a+14],9,-1019803690),d=o(d,y,l,f,e[a+3],14,-187363961),f=o(f,d,y,l,e[a+8],20,1163531501),l=o(l,f,d,y,e[a+13],5,-1444681467),y=o(y,l,f,d,e[a+2],9,-51403784),d=o(d,y,l,f,e[a+7],14,1735328473),f=o(f,d,y,l,e[a+12],20,-1926607734),l=i(l,f,d,y,e[a+5],4,-378558),y=i(y,l,f,d,e[a+8],11,-2022574463),d=i(d,y,l,f,e[a+11],16,1839030562),f=i(f,d,y,l,e[a+14],23,-35309556),l=i(l,f,d,y,e[a+1],4,-1530992060),y=i(y,l,f,d,e[a+4],11,1272893353),d=i(d,y,l,f,e[a+7],16,-155497632),f=i(f,d,y,l,e[a+10],23,-1094730640),l=i(l,f,d,y,e[a+13],4,681279174),y=i(y,l,f,d,e[a],11,-358537222),d=i(d,y,l,f,e[a+3],16,-722521979),f=i(f,d,y,l,e[a+6],23,76029189),l=i(l,f,d,y,e[a+9],4,-640364487),y=i(y,l,f,d,e[a+12],11,-421815835),d=i(d,y,l,f,e[a+15],16,530742520),f=i(f,d,y,l,e[a+2],23,-995338651),l=s(l,f,d,y,e[a],6,-198630844),y=s(y,l,f,d,e[a+7],10,1126891415),d=s(d,y,l,f,e[a+14],15,-1416354905),f=s(f,d,y,l,e[a+5],21,-57434055),l=s(l,f,d,y,e[a+12],6,1700485571),y=s(y,l,f,d,e[a+3],10,-1894986606),d=s(d,y,l,f,e[a+10],15,-1051523),f=s(f,d,y,l,e[a+1],21,-2054922799),l=s(l,f,d,y,e[a+8],6,1873313359),y=s(y,l,f,d,e[a+15],10,-30611744),d=s(d,y,l,f,e[a+6],15,-1560198380),f=s(f,d,y,l,e[a+13],21,1309151649),l=s(l,f,d,y,e[a+4],6,-145523070),y=s(y,l,f,d,e[a+11],10,-1120210379),d=s(d,y,l,f,e[a+2],15,718787259),f=s(f,d,y,l,e[a+9],21,-343485551),l=t(l,c),f=t(f,u),d=t(d,h),y=t(y,p);return[l,f,d,y]}function c(t){var e,n="";for(e=0;e<32*t.length;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function u(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;for(e=0;e<8*t.length;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function h(t){return c(a(u(t),8*t.length))}function p(t,e){var n,r,o=u(t),i=[],s=[];for(i[15]=s[15]=void 0,o.length>16&&(o=a(o,8*t.length)),n=0;n<16;n+=1)i[n]=909522486^o[n],s[n]=1549556828^o[n];return r=a(i.concat(u(e)),512+8*e.length),c(a(s.concat(r),640))}function l(t){var e,n,r="0123456789abcdef",o="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),o+=r.charAt(e>>>4&15)+r.charAt(15&e);return o}function f(t){return unescape(encodeURIComponent(t))}function d(t){return h(f(t))}function y(t){return l(d(t))}function g(t,e){return p(f(t),f(e))}function m(t,e){return l(g(t,e))}function _(t,e,n){return e?n?g(e,t):m(e,t):n?d(t):y(t)}return _}}),(function(t,e,n){var r=n(6),o=function(t){this.channel=t,this.rid=this.channel.generateRid(),this.times=1};o.prototype.setEvent=function(t){return this.event=t,this},o.prototype.setData=function(t){return this.data=t,this},o.prototype.onSuccess=function(t){return"function"==typeof t&&(this.success=t),this},o.prototype.onFail=function(t){return"function"==typeof t&&(this.fail=t),this},o.prototype.onTimeout=function(t){if("function"==typeof t){this.timeout=t;var e=this;this.respTimeoutTaskId=setTimeout((function(){e.respTimeoutTask()}),r.RESP_TIMEOUT)}return this},o.prototype.onAck=function(t){return"function"==typeof t&&(this.ack=t),this},o.prototype.onInnerCall=function(t){return"function"==typeof t&&(this.innerCall=t),this},o.prototype.ackTimeoutTask=function(){if(this.times<r.RETRY_TIMES){this.channel.send(this.event,this._data),this.times++;var t=this;this.ackTimeoutTaskId=setTimeout((function(){t.ackTimeoutTask()}),r.ACK_TIMEOUT)}else this.timeout&&this.timeout({rid:this.rid,data:this.data,response_timeout:!1}),delete this.channel.dataCache[this.rid];return this},o.prototype.respTimeoutTask=function(){if(this.times<r.RETRY_TIMES){this.channel.send(this.event,this._data),this.times++;var t=this;this.respTimeoutTaskId=setTimeout((function(){t.respTimeoutTask()}),r.RESP_TIMEOUT)}else this.timeout&&this.timeout({rid:this.rid,data:this.data,response_timeout:!0}),delete this.channel.dataCache[this.rid];return this},o.prototype.cleanAckTimeout=function(){return this.ackTimeoutTaskId&&clearTimeout(this.ackTimeoutTaskId),this},o.prototype.cleanRespTimeout=function(){return this.respTimeoutTaskId&&clearTimeout(this.respTimeoutTaskId),this},o.prototype.send=function(){if(!this.event||!this.data)return void console.error("发送消息失败，event与data不能为空");var t=this;return this.ackTimeoutTaskId=setTimeout((function(){t.ackTimeoutTask()}),r.ACK_TIMEOUT),this._data=JSON.parse(JSON.stringify(this.data)),this._data.rid=this.rid,this.channel.send(this.event,this._data),this.channel.dataCache[this.rid]=this,this},t.exports=o}),(function(t,e){var n=function(t,e){this.current_user=t,this.current_appkey=e,this.version=1,this.from_platform="web"};n.prototype.setType=function(t){return this.type=t,this},n.prototype.setAtList=function(t){return this.at_list=t,this},n.prototype.setAppkey=function(t){return t&&(this.appkey=t),this},n.prototype.setTarget=function(t,e){return this.target_id=t.toString(),this.target_name=e,this},n.prototype.setFromName=function(t){return this.from_name=t,this},n.prototype.setText=function(t,e){return this.msg_type="text",this.msg_body={text:t},e&&(this.msg_body.extras=e),this},n.prototype.setImage=function(t,e){return this.msg_type="image",this.msg_body={media_id:t.media_id,media_crc32:t.media_crc32,width:t.width,height:t.height,format:t.format,fsize:t.fsize},e&&(this.msg_body.extras=e),this},n.prototype.setFile=function(t,e){return this.msg_type="file",this.msg_body={media_id:t.media_id,media_crc32:t.media_crc32,hash:t.hash,fsize:t.fsize,fname:t.fname},e&&(this.msg_body.extras=e),this},n.prototype.setLocation=function(t,e){return this.msg_type="location",this.msg_body={latitude:t.latitude,longitude:t.longitude,scale:t.scale,label:t.label},e&&(this.msg_body.extras=e),this},n.prototype.setCustom=function(t){return this.msg_type="custom",this.msg_body=t,this},n.prototype.build=function(){var t=this.current_user;if(!t)return console.error("必须执行login操作后能执行此动作");if("single"!=this.type&&"group"!=this.type&&"across_single"!=this.type)return console.log("消息类型必须是single或group");if(!this.target_id)return console.error("target_id不能为空");if("text"==this.msg_type){if(!this.msg_body.text&&this.at_list&&"single"!=this.type)this.msg_body.text=" ";else if(!this.msg_body.text&&!this.at_list)return console.error("未设置文本消息内容")}else if("custom"==this.msg_type){if(!this.msg_body)return console.error("custom对象不能为空")}else if("image"==this.msg_type){if(!this.msg_body.media_id)return console.error("未设置image消息media_id字段");if(!this.msg_body.media_crc32)return console.error("未设置image消息media_crc32字段");if(!this.msg_body.width)return console.error("未设置image消息width字段");if(!this.msg_body.height)return console.error("未设置image消息height字段")}else if("file"==this.msg_type){if(!this.msg_body.media_id)return console.error("未设置file消息media_id字段");if(!this.msg_body.media_crc32)return console.error("未设置file消息media_crc32字段");if(!this.msg_body.fsize)return console.error("未设置file消息fsize字段");if(!this.msg_body.fname)return console.error("未设置file消息fname字段")}else{if("location"!=this.msg_type)return console.error("请设置合法的msg_type");if(!this.msg_body.latitude)return console.error("未设置location消息latitude字段");if(!this.msg_body.longitude)return console.error("未设置location消息longitude字段");if(!this.msg_body.scale)return console.error("未设置location消息scale字段");if(!this.msg_body.label)return console.error("未设置location消息label字段")}var e={version:this.version,target_type:this.type,from_platform:this.from_platform,target_id:this.target_id,target_name:this.target_name,from_id:t,from_name:this.from_name,create_time:(new Date).getTime(),msg_type:this.msg_type,msg_body:this.msg_body};this.appkey&&(e.target_appkey=this.appkey,e.from_appkey=this.current_appkey);var n={content:e};if("single"==e.target_type)n.target_name=e.target_id;else if(n.target_gid=e.target_id,this.at_list&&this.at_list instanceof Array)n.users=this.at_list;else if(this.at_list&&!(this.at_list instanceof Array))return console.error("参数值不合法，at_list必须为数组类型");return this.appkey?n.appkey=this.appkey:n.appkey=this.current_appkey,n},t.exports=n}),(function(t,e){"use strict";var n={};n.isBlack=function(t){return!(t&&"string"==typeof t&&t.length>0)};var r={};r.addItem=function(t,e){window.localStorage&&localStorage.setItem(t,e)},r.removeItems=function(t){if(window.localStorage){for(var e=localStorage.length,n=[],r=0;r<e;r++)localStorage.getItem(localStorage.key(r))===t&&n.push(localStorage.key(r));n.forEach((function(t){localStorage.removeItem(t)}))}},r.getItem=function(t){return window.localStorage?localStorage.getItem(t):null},r.checkRepeatItems=function(t,e){var n=new Array;if(window.localStorage){for(var r=0;r<t.length;r++){var o=[];if(t[r].msgs.forEach((function(t){localStorage.getItem(t.msg_id)&&localStorage.getItem(t.msg_id)==e||o.push(t)})),o.length>0){var i={key:t[r].key,msgs:o};n.push(i)}}return n}return t},t.exports={StringUtils:n,StorageUtils:r}}),(function(t,e,n){!(function(){function t(t){this.message=t}var n=e,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=new Error,t.prototype.name="InvalidCharacterError",n.btoa||(n.btoa=function(e){for(var n,o,i=String(e),s=0,a=r,c="";i.charAt(0|s)||(a="=",s%1);c+=a.charAt(63&n>>8-s%1*8)){if(o=i.charCodeAt(s+=.75),o>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");n=n<<8|o}return c}),n.atob||(n.atob=function(e){var n=String(e).replace(/=+$/,"");if(n.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,i,s=0,a=0,c="";i=n.charAt(a++);~i&&(o=s%4?64*o+i:i,s++%4)?c+=String.fromCharCode(255&o>>(-2*s&6)):0)i=r.indexOf(i);return c})})()}),(function(t,e){function n(t,e,n){function o(t,r){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=n):0!==o.count||i||e(null,r)}var i=!1;return n=n||r,o.count=t,0===t?e():o}function r(){}t.exports=n}),(function(t,e){t.exports=function(t,e,n){var r=t.byteLength;if(e=e||0,n=n||r,t.slice)return t.slice(e,n);if(e<0&&(e+=r),n<0&&(n+=r),n>r&&(n=r),e>=r||e>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(n-e),s=e,a=0;s<n;s++,a++)i[a]=o[s];return i.buffer}}),(function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}),(function(t,e){!(function(){"use strict";for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=new Uint8Array(256),r=0;r<t.length;r++)n[t.charCodeAt(r)]=r;e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,r,o,i,s,a=.75*t.length,c=t.length,u=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var h=new ArrayBuffer(a),p=new Uint8Array(h);for(e=0;e<c;e+=4)r=n[t.charCodeAt(e)],o=n[t.charCodeAt(e+1)],i=n[t.charCodeAt(e+2)],s=n[t.charCodeAt(e+3)],p[u++]=r<<2|o>>4,p[u++]=(15&o)<<4|i>>2,p[u++]=(3&i)<<6|63&s;return h}})()}),(function(t,e){(function(e){function n(t){for(var e=0;e<t.length;e++){var n=t[e];if(n.buffer instanceof ArrayBuffer){var r=n.buffer;if(n.byteLength!==r.byteLength){var o=new Uint8Array(n.byteLength);o.set(new Uint8Array(r,n.byteOffset,n.byteLength)),r=o.buffer}t[e]=r}}}function r(t,e){e=e||{};var r=new i;n(t);for(var o=0;o<t.length;o++)r.append(t[o]);return e.type?r.getBlob(e.type):r.getBlob()}function o(t,e){return n(t),new Blob(t,e||{})}var i=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,s=(function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(t){return!1}})(),a=s&&(function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size;
}catch(t){return!1}})(),c=i&&i.prototype.append&&i.prototype.getBlob;t.exports=(function(){return s?a?e.Blob:o:c?r:void 0})()}).call(e,(function(){return this})())}),(function(t,e,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var t=arguments,n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),!n)return t;var r="color: "+this.color;t=[t[0],r,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,(function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))})),t.splice(i,0,r),t}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}}function a(){var t;try{t=e.storage.debug}catch(t){}return t}function c(){try{return window.localStorage}catch(t){}}e=t.exports=n(39),e.log=i,e.formatArgs=o,e.save=s,e.load=a,e.useColors=r,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){return JSON.stringify(t)},e.enable(a())}),(function(t,e,n){function r(){return e.colors[h++%e.colors.length]}function o(t){function n(){}function o(){var t=o,n=+new Date,i=n-(u||n);t.diff=i,t.prev=u,t.curr=n,u=n,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=r());var s=Array.prototype.slice.call(arguments);s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,(function(n,r){if("%%"===n)return n;a++;var o=e.formatters[r];if("function"==typeof o){var i=s[a];n=o.call(t,i),s.splice(a,1),a--}return n})),"function"==typeof e.formatArgs&&(s=e.formatArgs.apply(t,s));var c=o.log||e.log||console.log.bind(console);c.apply(t,s)}n.enabled=!1,o.enabled=!0;var i=e.enabled(t)?o:n;return i.namespace=t,i}function i(t){e.save(t);for(var n=(t||"").split(/[\s,]+/),r=n.length,o=0;o<r;o++)n[o]&&(t=n[o].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=n(51),e.names=[],e.skips=[],e.formatters={};var u,h=0}),(function(t,e,n){t.exports=n(41)}),(function(t,e,n){t.exports=n(42),t.exports.parser=n(2)}),(function(t,e,n){(function(e){function r(t,n){if(!(this instanceof r))return new r(t,n);n=n||{},t&&"object"==typeof t&&(n=t,t=null),t?(t=h(t),n.hostname=t.host,n.secure="https"===t.protocol||"wss"===t.protocol,n.port=t.port,t.query&&(n.query=t.query)):n.host&&(n.hostname=h(n.host).host),this.secure=null!=n.secure?n.secure:e.location&&"https:"===location.protocol,n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.agent=n.agent||!1,this.hostname=n.hostname||(e.location?location.hostname:"localhost"),this.port=n.port||(e.location&&location.port?location.port:this.secure?443:80),this.query=n.query||{},"string"==typeof this.query&&(this.query=l.decode(this.query)),this.upgrade=!1!==n.upgrade,this.path=(n.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!n.forceJSONP,this.jsonp=!1!==n.jsonp,this.forceBase64=!!n.forceBase64,this.enablesXDR=!!n.enablesXDR,this.timestampParam=n.timestampParam||"t",this.timestampRequests=n.timestampRequests,this.transports=n.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=n.policyPort||843,this.rememberUpgrade=n.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=n.onlyBinaryUpgrades,this.perMessageDeflate=!1!==n.perMessageDeflate&&(n.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=n.pfx||null,this.key=n.key||null,this.passphrase=n.passphrase||null,this.cert=n.cert||null,this.ca=n.ca||null,this.ciphers=n.ciphers||null,this.rejectUnauthorized=void 0===n.rejectUnauthorized?null:n.rejectUnauthorized,this.forceNode=!!n.forceNode;var o="object"==typeof e&&e;o.global===o&&(n.extraHeaders&&Object.keys(n.extraHeaders).length>0&&(this.extraHeaders=n.extraHeaders),n.localAddress&&(this.localAddress=n.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}function o(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var i=n(14),s=n(1),a=n(4)("engine.io-client:socket"),c=n(17),u=n(2),h=n(19),p=n(52),l=n(9);t.exports=r,r.priorWebsocketSuccess=!1,s(r.prototype),r.protocol=u.protocol,r.Socket=r,r.Transport=n(7),r.transports=n(14),r.parser=n(2),r.prototype.createTransport=function(t){a('creating transport "%s"',t);var e=o(this.query);e.EIO=u.protocol,e.transport=t,this.id&&(e.sid=this.id);var n=new i[t]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:e,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders,forceNode:this.forceNode,localAddress:this.localAddress});return n},r.prototype.open=function(){var t;if(this.rememberUpgrade&&r.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout((function(){e.emit("error","No transports available")}),0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},r.prototype.setTransport=function(t){a("setting transport %s",t.name);var e=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",(function(){e.onDrain()})).on("packet",(function(t){e.onPacket(t)})).on("error",(function(t){e.onError(t)})).on("close",(function(){e.onClose("transport close")}))},r.prototype.probe=function(t){function e(){if(l.onlyBinaryUpgrades){var e=!this.supportsBinary&&l.transport.supportsBinary;p=p||e}p||(a('probe transport "%s" opened',t),h.send([{type:"ping",data:"probe"}]),h.once("packet",(function(e){if(!p)if("pong"===e.type&&"probe"===e.data){if(a('probe transport "%s" pong',t),l.upgrading=!0,l.emit("upgrading",h),!h)return;r.priorWebsocketSuccess="websocket"===h.name,a('pausing current transport "%s"',l.transport.name),l.transport.pause((function(){p||"closed"!==l.readyState&&(a("changing transport and sending upgrade packet"),u(),l.setTransport(h),h.send([{type:"upgrade"}]),l.emit("upgrade",h),h=null,l.upgrading=!1,l.flush())}))}else{a('probe transport "%s" failed',t);var n=new Error("probe error");n.transport=h.name,l.emit("upgradeError",n)}})))}function n(){p||(p=!0,u(),h.close(),h=null)}function o(e){var r=new Error("probe error: "+e);r.transport=h.name,n(),a('probe transport "%s" failed because of error: %s',t,e),l.emit("upgradeError",r)}function i(){o("transport closed")}function s(){o("socket closed")}function c(t){h&&t.name!==h.name&&(a('"%s" works - aborting "%s"',t.name,h.name),n())}function u(){h.removeListener("open",e),h.removeListener("error",o),h.removeListener("close",i),l.removeListener("close",s),l.removeListener("upgrading",c)}a('probing transport "%s"',t);var h=this.createTransport(t,{probe:1}),p=!1,l=this;r.priorWebsocketSuccess=!1,h.once("open",e),h.once("error",o),h.once("close",i),this.once("close",s),this.once("upgrading",c),h.open()},r.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",r.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},r.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(a('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(p(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else a('packet received with socket readyState "%s"',this.readyState)},r.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},r.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout((function(){"closed"!==e.readyState&&e.onClose("ping timeout")}),t||e.pingInterval+e.pingTimeout)},r.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout((function(){a("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)}),t.pingInterval)},r.prototype.ping=function(){var t=this;this.sendPacket("ping",(function(){t.emit("ping")}))},r.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},r.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},r.prototype.write=r.prototype.send=function(t,e,n){return this.sendPacket("message",t,e,n),this},r.prototype.sendPacket=function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){n=n||{},n.compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}},r.prototype.close=function(){function t(){r.onClose("forced close"),a("socket closing - telling transport to close"),r.transport.close()}function e(){r.removeListener("upgrade",e),r.removeListener("upgradeError",e),t()}function n(){r.once("upgrade",e),r.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var r=this;this.writeBuffer.length?this.once("drain",(function(){this.upgrading?n():t()})):this.upgrading?n():t()}return this},r.prototype.onError=function(t){a("socket error %j",t),r.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},r.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){a('socket close with reason: "%s"',t);var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),n.writeBuffer=[],n.prevBufferLen=0}},r.prototype.filterUpgrades=function(t){for(var e=[],n=0,r=t.length;n<r;n++)~c(this.transports,t[n])&&e.push(t[n]);return e}}).call(e,(function(){return this})())}),(function(t,e,n){(function(e){function r(){}function o(t){i.call(this,t),this.query=this.query||{},a||(e.___eio||(e.___eio=[]),a=e.___eio),this.index=a.length;var n=this;a.push((function(t){n.onData(t)})),this.query.j=this.index,e.document&&e.addEventListener&&e.addEventListener("beforeunload",(function(){n.script&&(n.script.onerror=r)}),!1)}var i=n(15),s=n(3);t.exports=o;var a,c=/\n/g,u=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e;var r="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);r&&setTimeout((function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)}),100)},o.prototype.doWrite=function(t,e){function n(){r(),e()}function r(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(t)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),h=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=h,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),r(),t=t.replace(u,"\\\n"),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&n()}:this.iframe.onload=n}}).call(e,(function(){return this})())}),(function(t,e,n){(function(e){function r(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,e.location){var n="https:"===location.protocol,r=location.port;r||(r=n?443:80),this.xd=t.hostname!==e.location.hostname||r!==t.port,this.xs=t.secure!==n}else this.extraHeaders=t.extraHeaders}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=n(8),c=n(15),u=n(1),h=n(3),p=n(4)("engine.io-client:polling-xhr");t.exports=o,t.exports.Request=i,h(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var n="string"!=typeof t&&void 0!==t,r=this.request({method:"POST",data:t,isBinary:n}),o=this;r.on("success",e),r.on("error",(function(t){o.onError("xhr post error",t)})),this.sendXhr=r},o.prototype.doPoll=function(){p("xhr poll");var t=this.request(),e=this;t.on("data",(function(t){e.onData(t)})),t.on("error",(function(t){e.onError("xhr poll error",t)})),this.pollXhr=t},u(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var n=this.xhr=new a(t),r=this;try{p("xhr open %s: %s",this.method,this.uri),n.open(this.method,this.uri,this.async);try{if(this.extraHeaders){n.setDisableHeaderCheck(!0);for(var o in this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&n.setRequestHeader(o,this.extraHeaders[o])}}catch(t){}if(this.supportsBinary&&(n.responseType="arraybuffer"),"POST"===this.method)try{this.isBinary?n.setRequestHeader("Content-type","application/octet-stream"):n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{n.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in n&&(n.withCredentials=!0),this.requestTimeout&&(n.timeout=this.requestTimeout),this.hasXDR()?(n.onload=function(){r.onLoad()},n.onerror=function(){r.onError(n.responseText)}):n.onreadystatechange=function(){4===n.readyState&&(200===n.status||1223===n.status?r.onLoad():setTimeout((function(){r.onError(n.status)}),0))},p("xhr data %s",this.data),n.send(this.data)}catch(t){return void setTimeout((function(){r.onError(t)}),0)}e.document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=r:this.xhr.onreadystatechange=r,t)try{this.xhr.abort()}catch(t){}e.document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(t){}if("application/octet-stream"===e)t=this.xhr.response||this.xhr.responseText;else if(this.supportsBinary)try{t=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response))}catch(e){for(var n=new Uint8Array(this.xhr.response),r=[],o=0,i=n.length;o<i;o++)r.push(n[o]);t=String.fromCharCode.apply(null,r)}else t=this.xhr.responseText}catch(t){this.onError(t)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof e.XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},i.requestsCount=0,i.requests={},e.document&&(e.attachEvent?e.attachEvent("onunload",s):e.addEventListener&&e.addEventListener("beforeunload",s,!1))}).call(e,(function(){return this})())}),(function(t,e,n){(function(e){function r(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=p&&!t.forceNode,this.usingBrowserWebSocket||(l=o),i.call(this,t)}var o,i=n(7),s=n(2),a=n(9),c=n(3),u=n(25),h=n(4)("engine.io-client:websocket"),p=e.WebSocket||e.MozWebSocket;if("undefined"==typeof window)try{o=n(63)}catch(t){}var l=p;l||"undefined"!=typeof window||(l=o),t.exports=r,c(r,i),r.prototype.name="websocket",r.prototype.supportsBinary=!0,r.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=void 0,n={agent:this.agent,perMessageDeflate:this.perMessageDeflate};n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket?new l(t):new l(t,e,n)}catch(t){return this.emit("error",t)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},r.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},r.prototype.write=function(t){function n(){r.emit("flush"),setTimeout((function(){r.writable=!0,r.emit("drain")}),0)}var r=this;this.writable=!1;for(var o=t.length,i=0,a=o;i<a;i++)!(function(t){s.encodePacket(t,r.supportsBinary,(function(i){if(!r.usingBrowserWebSocket){var s={};if(t.options&&(s.compress=t.options.compress),r.perMessageDeflate){var a="string"==typeof i?e.Buffer.byteLength(i):i.length;a<r.perMessageDeflate.threshold&&(s.compress=!1)}}try{r.usingBrowserWebSocket?r.ws.send(i):r.ws.send(i,s)}catch(t){h("websocket closed before onclose event")}--o||n()}))})(t[i])},r.prototype.onClose=function(){i.prototype.onClose.call(this)},r.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=u()),this.supportsBinary||(t.b64=1),t=a.encode(t),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t},r.prototype.check=function(){return!(!l||"__initialize"in l&&this.name===r.prototype.name)}}).call(e,(function(){return this})())}),(function(t,e,n){function r(){return e.colors[h++%e.colors.length]}function o(t){function n(){}function o(){var t=o,n=+new Date,i=n-(u||n);t.diff=i,t.prev=u,t.curr=n,u=n,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=r());for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var c=0;s[0]=s[0].replace(/%([a-z%])/g,(function(n,r){if("%%"===n)return n;c++;var o=e.formatters[r];if("function"==typeof o){var i=s[c];n=o.call(t,i),s.splice(c,1),c--}return n})),s=e.formatArgs.apply(t,s);var h=o.log||e.log||console.log.bind(console);h.apply(t,s)}n.enabled=!1,o.enabled=!0;var i=e.enabled(t)?o:n;return i.namespace=t,i}function i(t){e.save(t);for(var n=(t||"").split(/[\s,]+/),r=n.length,o=0;o<r;o++)n[o]&&(t=n[o].replace(/[\\^$+?.()|[\]{}]/g,"\\$&").replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=n(47),e.names=[],e.skips=[],e.formatters={};var u,h=0}),(function(t,e){function n(t){if(t=String(t),!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*h;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,h=365.25*u;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return n(t);if("number"===i&&isNaN(t)===!1)return e.long?o(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}}),(function(t,e){t.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var r in t)n.call(t,r)&&e.push(r);return e}}),(function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}}),(function(t,e,n){var r;(function(t,o){(function(){function i(t,e){function n(t){if(n[t]!==g)return n[t];var i;if("bug-string-char-index"==t)i="a"!="a"[0];else if("json"==t)i=n("json-stringify")&&n("json-parse");else{var s,a='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==t){var u=e.stringify,h="function"==typeof u&&v;if(h){(s=function(){return 1}).toJSON=s;try{h="0"===u(0)&&"0"===u(new r)&&'""'==u(new o)&&u(_)===g&&u(g)===g&&u()===g&&"1"===u(s)&&"[1]"==u([s])&&"[null]"==u([g])&&"null"==u(null)&&"[null,null,null]"==u([g,_,null])&&u({a:[s,!0,!1,null,"\0\b\n\f\r\t"]})==a&&"1"===u(null,s)&&"[\n 1,\n 2\n]"==u([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==u(new c(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==u(new c(864e13))&&'"-000001-01-01T00:00:00.000Z"'==u(new c(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==u(new c(-1))}catch(t){h=!1}}i=h}if("json-parse"==t){var p=e.parse;if("function"==typeof p)try{if(0===p("0")&&!p(!1)){s=p(a);var l=5==s.a.length&&1===s.a[0];if(l){try{l=!p('"\t"')}catch(t){}if(l)try{l=1!==p("01")}catch(t){}if(l)try{l=1!==p("1.")}catch(t){}}}}catch(t){l=!1}i=l}}return n[t]=!!i}t||(t=u.Object()),e||(e=u.Object());var r=t.Number||u.Number,o=t.String||u.String,s=t.Object||u.Object,c=t.Date||u.Date,h=t.SyntaxError||u.SyntaxError,p=t.TypeError||u.TypeError,l=t.Math||u.Math,f=t.JSON||u.JSON;"object"==typeof f&&f&&(e.stringify=f.stringify,e.parse=f.parse);var d,y,g,m=s.prototype,_=m.toString,v=new c(-0xc782b5b800cec);try{v=v.getUTCFullYear()==-109252&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()}catch(t){}if(!n("json")){var b="[object Function]",E="[object Date]",k="[object Number]",T="[object String]",S="[object Array]",w="[object Boolean]",N=n("bug-string-char-index");if(!v)var A=l.floor,C=[0,31,59,90,120,151,181,212,243,273,304,334],x=function(t,e){return C[e]+365*(t-1970)+A((t-1969+(e=+(e>1)))/4)-A((t-1901+e)/100)+A((t-1601+e)/400)};if((d=m.hasOwnProperty)||(d=function(t){var e,n={};return(n.__proto__=null,n.__proto__={toString:1},n).toString!=_?d=function(t){var e=this.__proto__,n=t in(this.__proto__=null,this);return this.__proto__=e,n}:(e=n.constructor,d=function(t){var n=(this.constructor||e).prototype;return t in this&&!(t in n&&this[t]===n[t])}),n=null,d.call(this,t)}),y=function(t,e){var n,r,o,i=0;(n=function(){this.valueOf=0}).prototype.valueOf=0,r=new n;for(o in r)d.call(r,o)&&i++;return n=r=null,i?y=2==i?function(t,e){var n,r={},o=_.call(t)==b;for(n in t)o&&"prototype"==n||d.call(r,n)||!(r[n]=1)||!d.call(t,n)||e(n)}:function(t,e){var n,r,o=_.call(t)==b;for(n in t)o&&"prototype"==n||!d.call(t,n)||(r="constructor"===n)||e(n);(r||d.call(t,n="constructor"))&&e(n)}:(r=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],y=function(t,e){var n,o,i=_.call(t)==b,s=!i&&"function"!=typeof t.constructor&&a[typeof t.hasOwnProperty]&&t.hasOwnProperty||d;for(n in t)i&&"prototype"==n||!s.call(t,n)||e(n);for(o=r.length;n=r[--o];s.call(t,n)&&e(n));}),y(t,e)},!n("json-stringify")){var I={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},O="000000",D=function(t,e){return(O+(e||0)).slice(-t)},R="\\u00",B=function(t){for(var e='"',n=0,r=t.length,o=!N||r>10,i=o&&(N?t.split(""):t);n<r;n++){var s=t.charCodeAt(n);switch(s){case 8:case 9:case 10:case 12:case 13:case 34:case 92:e+=I[s];break;default:if(s<32){e+=R+D(2,s.toString(16));break}e+=o?i[n]:t.charAt(n)}}return e+'"'},U=function(t,e,n,r,o,i,s){var a,c,u,h,l,f,m,v,b,N,C,I,O,R,L,P;try{a=e[t]}catch(t){}if("object"==typeof a&&a)if(c=_.call(a),c!=E||d.call(a,"toJSON"))"function"==typeof a.toJSON&&(c!=k&&c!=T&&c!=S||d.call(a,"toJSON"))&&(a=a.toJSON(t));else if(a>-1/0&&a<1/0){if(x){for(l=A(a/864e5),u=A(l/365.2425)+1970-1;x(u+1,0)<=l;u++);for(h=A((l-x(u,0))/30.42);x(u,h+1)<=l;h++);l=1+l-x(u,h),f=(a%864e5+864e5)%864e5,m=A(f/36e5)%24,v=A(f/6e4)%60,b=A(f/1e3)%60,N=f%1e3}else u=a.getUTCFullYear(),h=a.getUTCMonth(),l=a.getUTCDate(),m=a.getUTCHours(),v=a.getUTCMinutes(),b=a.getUTCSeconds(),N=a.getUTCMilliseconds();a=(u<=0||u>=1e4?(u<0?"-":"+")+D(6,u<0?-u:u):D(4,u))+"-"+D(2,h+1)+"-"+D(2,l)+"T"+D(2,m)+":"+D(2,v)+":"+D(2,b)+"."+D(3,N)+"Z"}else a=null;if(n&&(a=n.call(e,t,a)),null===a)return"null";if(c=_.call(a),c==w)return""+a;if(c==k)return a>-1/0&&a<1/0?""+a:"null";if(c==T)return B(""+a);if("object"==typeof a){for(R=s.length;R--;)if(s[R]===a)throw p();if(s.push(a),C=[],L=i,i+=o,c==S){for(O=0,R=a.length;O<R;O++)I=U(O,a,n,r,o,i,s),C.push(I===g?"null":I);P=C.length?o?"[\n"+i+C.join(",\n"+i)+"\n"+L+"]":"["+C.join(",")+"]":"[]"}else y(r||a,(function(t){var e=U(t,a,n,r,o,i,s);e!==g&&C.push(B(t)+":"+(o?" ":"")+e)})),P=C.length?o?"{\n"+i+C.join(",\n"+i)+"\n"+L+"}":"{"+C.join(",")+"}":"{}";return s.pop(),P}};e.stringify=function(t,e,n){var r,o,i,s;if(a[typeof e]&&e)if((s=_.call(e))==b)o=e;else if(s==S){i={};for(var c,u=0,h=e.length;u<h;c=e[u++],s=_.call(c),(s==T||s==k)&&(i[c]=1));}if(n)if((s=_.call(n))==k){if((n-=n%1)>0)for(r="",n>10&&(n=10);r.length<n;r+=" ");}else s==T&&(r=n.length<=10?n:n.slice(0,10));return U("",(c={},c[""]=t,c),o,i,r,"",[])}}if(!n("json-parse")){var L,P,M=o.fromCharCode,G={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},j=function(){throw L=P=null,h()},V=function(){for(var t,e,n,r,o,i=P,s=i.length;L<s;)switch(o=i.charCodeAt(L)){case 9:case 10:case 13:case 32:L++;break;case 123:case 125:case 91:case 93:case 58:case 44:return t=N?i.charAt(L):i[L],L++,t;case 34:for(t="@",L++;L<s;)if(o=i.charCodeAt(L),o<32)j();else if(92==o)switch(o=i.charCodeAt(++L)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:t+=G[o],L++;break;case 117:for(e=++L,n=L+4;L<n;L++)o=i.charCodeAt(L),o>=48&&o<=57||o>=97&&o<=102||o>=65&&o<=70||j();t+=M("0x"+i.slice(e,L));break;default:j()}else{if(34==o)break;for(o=i.charCodeAt(L),e=L;o>=32&&92!=o&&34!=o;)o=i.charCodeAt(++L);t+=i.slice(e,L)}if(34==i.charCodeAt(L))return L++,t;j();default:if(e=L,45==o&&(r=!0,o=i.charCodeAt(++L)),o>=48&&o<=57){for(48==o&&(o=i.charCodeAt(L+1),o>=48&&o<=57)&&j(),r=!1;L<s&&(o=i.charCodeAt(L),o>=48&&o<=57);L++);if(46==i.charCodeAt(L)){for(n=++L;n<s&&(o=i.charCodeAt(n),o>=48&&o<=57);n++);n==L&&j(),L=n}if(o=i.charCodeAt(L),101==o||69==o){for(o=i.charCodeAt(++L),43!=o&&45!=o||L++,n=L;n<s&&(o=i.charCodeAt(n),o>=48&&o<=57);n++);n==L&&j(),L=n}return+i.slice(e,L)}if(r&&j(),"true"==i.slice(L,L+4))return L+=4,!0;if("false"==i.slice(L,L+5))return L+=5,!1;if("null"==i.slice(L,L+4))return L+=4,null;j()}return"$"},F=function(t){var e,n;if("$"==t&&j(),"string"==typeof t){if("@"==(N?t.charAt(0):t[0]))return t.slice(1);if("["==t){for(e=[];t=V(),"]"!=t;n||(n=!0))n&&(","==t?(t=V(),"]"==t&&j()):j()),","==t&&j(),e.push(F(t));return e}if("{"==t){for(e={};t=V(),"}"!=t;n||(n=!0))n&&(","==t?(t=V(),"}"==t&&j()):j()),","!=t&&"string"==typeof t&&"@"==(N?t.charAt(0):t[0])&&":"==V()||j(),e[t.slice(1)]=F(V());return e}j()}return t},q=function(t,e,n){var r=H(t,e,n);r===g?delete t[e]:t[e]=r},H=function(t,e,n){var r,o=t[e];if("object"==typeof o&&o)if(_.call(o)==S)for(r=o.length;r--;)q(o,r,n);else y(o,(function(t){q(o,t,n)}));return n.call(t,e,o)};e.parse=function(t,e){var n,r;return L=0,P=""+t,n=F(V()),"$"!=V()&&j(),L=P=null,e&&_.call(e)==b?H((r={},r[""]=n,r),"",e):n}}}return e.runInContext=i,e}var s=n(61),a={function:!0,object:!0},c=a[typeof e]&&e&&!e.nodeType&&e,u=a[typeof window]&&window||this,h=c&&a[typeof t]&&t&&!t.nodeType&&"object"==typeof o&&o;if(!h||h.global!==h&&h.window!==h&&h.self!==h||(u=h),
c&&!s)i(u,c);else{var p=u.JSON,l=u.JSON3,f=!1,d=i(u,u.JSON3={noConflict:function(){return f||(f=!0,u.JSON=p,u.JSON3=l,p=l=null),d}});u.JSON={parse:d.parse,stringify:d.stringify}}s&&(r=function(){return d}.call(e,n,e,t),!(void 0!==r&&(t.exports=r)))}).call(this)}).call(e,n(24)(t),(function(){return this})())}),(function(t,e){function n(t){if(t=""+t,!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*h;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function r(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,h=365.25*u;t.exports=function(t,e){return e=e||{},"string"==typeof t?n(t):e.long?o(t):r(t)}}),(function(t,e){(function(e){var n=/^[\],:{}\s]*$/,r=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,i=/(?:^|:|,)(?:\s*\[)+/g,s=/^\s+/,a=/\s+$/;t.exports=function(t){return"string"==typeof t&&t?(t=t.replace(s,"").replace(a,""),e.JSON&&JSON.parse?JSON.parse(t):n.test(t.replace(r,"@").replace(o,"]").replace(i,""))?new Function("return "+t)():void 0):null}}).call(e,(function(){return this})())}),(function(t,e,n){function r(t,e){"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,r=i(t),s=r.source,h=r.id,p=r.path,l=u[h]&&p in u[h].nsps,f=e.forceNew||e["force new connection"]||!1===e.multiplex||l;return f?(c("ignoring socket cache for %s",s),n=a(s,e)):(u[h]||(c("new io instance for %s",s),u[h]=a(s,e)),n=u[h]),r.query&&!e.query?e.query=r.query:e&&"object"==typeof e.query&&(e.query=o(e.query)),n.socket(r.path,e)}function o(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")}var i=n(54),s=n(11),a=n(20),c=n(5)("socket.io-client");t.exports=e=r;var u=e.managers={};e.protocol=s.protocol,e.connect=r,e.Manager=n(20),e.Socket=n(22)}),(function(t,e,n){(function(e){function r(t,n){var r=t;n=n||e.location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(i("protocol-less url %s",t),t="undefined"!=typeof n?n.protocol+"//"+t:"https://"+t),i("parse %s",t),r=o(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";var s=r.host.indexOf(":")!==-1,a=s?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+a+":"+r.port,r.href=r.protocol+"://"+a+(n&&n.port===r.port?"":":"+r.port),r}var o=n(19),i=n(5)("socket.io-client:url");t.exports=r}).call(e,(function(){return this})())}),(function(t,e,n){function r(){return e.colors[h++%e.colors.length]}function o(t){function n(){}function o(){var t=o,n=+new Date,i=n-(u||n);t.diff=i,t.prev=u,t.curr=n,u=n,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=r());for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var c=0;s[0]=s[0].replace(/%([a-z%])/g,(function(n,r){if("%%"===n)return n;c++;var o=e.formatters[r];if("function"==typeof o){var i=s[c];n=o.call(t,i),s.splice(c,1),c--}return n})),s=e.formatArgs.apply(t,s);var h=o.log||e.log||console.log.bind(console);h.apply(t,s)}n.enabled=!1,o.enabled=!0;var i=e.enabled(t)?o:n;return i.namespace=t,i}function i(t){e.save(t);for(var n=(t||"").split(/[\s,]+/),r=n.length,o=0;o<r;o++)n[o]&&(t=n[o].replace(/[\\^$+?.()|[\]{}]/g,"\\$&").replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=n(56),e.names=[],e.skips=[],e.formatters={};var u,h=0}),(function(t,e){function n(t){if(t=String(t),!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*h;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,h=365.25*u;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return n(t);if("number"===i&&isNaN(t)===!1)return e.long?o(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}}),(function(t,e,n){(function(t){var r=n(18),o=n(23);e.deconstructPacket=function(t){function e(t){if(!t)return t;if(o(t)){var i={_placeholder:!0,num:n.length};return n.push(t),i}if(r(t)){for(var s=new Array(t.length),a=0;a<t.length;a++)s[a]=e(t[a]);return s}if("object"==typeof t&&!(t instanceof Date)){var s={};for(var c in t)s[c]=e(t[c]);return s}return t}var n=[],i=t.data,s=t;return s.data=e(i),s.attachments=n.length,{packet:s,buffers:n}},e.reconstructPacket=function(t,e){function n(t){if(t&&t._placeholder){var o=e[t.num];return o}if(r(t)){for(var i=0;i<t.length;i++)t[i]=n(t[i]);return t}if(t&&"object"==typeof t){for(var s in t)t[s]=n(t[s]);return t}return t}return t.data=n(t.data),t.attachments=void 0,t},e.removeBlobs=function(e,n){function i(e,c,u){if(!e)return e;if(t.Blob&&e instanceof Blob||t.File&&e instanceof File){s++;var h=new FileReader;h.onload=function(){u?u[c]=this.result:a=this.result,--s||n(a)},h.readAsArrayBuffer(e)}else if(r(e))for(var p=0;p<e.length;p++)i(e[p],p,e);else if(e&&"object"==typeof e&&!o(e))for(var l in e)i(e[l],l,e)}var s=0,a=e;i(a),s||n(a)}}).call(e,(function(){return this})())}),(function(t,e){function n(t){if(t)return r(t)}function r(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){r.off(t,n),e.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks[t];if(!n)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks[t];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}}),(function(t,e,n){var r,o,i;(function(n){!(function(n,s){"use strict";"object"==typeof t&&"object"==typeof t.exports?t.exports=s():(o=[],r=s,i="function"==typeof r?r.apply(e,o):r,!(void 0!==i&&(t.exports=i)))})("object"==typeof window?window:this,(function(){"use strict";function t(t,e){if(e=e||0,e>=t.length)return[];for(var n=t.length,r=Array(n-e);n-- >e;)r[n-e]=t[n];return r}function e(t,e){for(var n=[],r=0,o=t.length;r<o;r++)n.push(e(t[r],r,t));return n}function r(e,n){try{n.apply(null,t(arguments,2))}catch(t){e(t)}}function o(t,e){var n=arguments;k((function(){r.apply(null,n)}))}function i(t){return null==t?t:"function"==typeof t.toThunk?t.toThunk():"function"==typeof t.then?function(e){t.then((function(t){e(null,t)}),e)}:t}function s(t,n){return e(t,(function(t,e,r){return function(o){n(o,t,e,r)}}))}function a(t,e){var n,r=this;return t instanceof a?t:r instanceof a?(r._chain=0,r._success=r._parallel=r._series=null,r._finally=r._error=r._result=r._nextThen=null,arguments.length?(n=p(r,e),t=i(t),void(void 0===t?n():"function"==typeof t?o(n,t,n):n(null,t))):r):new a(t,e)}function c(){var e=this,n=t(arguments);e._result!==!1&&(!e._result&&e._chain&&e.debug.apply(e,["\nChain "+e._chain+": "].concat(t(n))),e._result=!1,r((function(t){t===n[0]?h(e,t):c.call(e._nextThen,t)}),u,e,n))}function u(e,n){if(null==n[0])n[0]=null;else if(n=[n[0]],!e._finally)throw n[0];if(e._finally)return e._finally.apply(null,n);var r=e._success||e._parallel||e._series;return r?r.apply(null,t(n,1)):void(e._result=n)}function h(t,e){for(var n=t,o=t._error||t._finally;!o&&n._nextThen;)n=n._nextThen,o=n._error||n._finally;if(o)return r((function(t){c.call(n._nextThen,t)}),o,e);if(a.onerror)return a.onerror(e);for(;n._nextThen;)n=n._nextThen;n._result=[e]}function p(t,e){function n(){return c.apply(t,arguments)}return n._isCont=!0,e&&(S.debug="function"==typeof e?e:m,t._chain=1),n}function l(t,e,n){var r=new a,o=p(r,n);return t(o,e),e?(e._nextThen=r,e._chain&&(r._chain=e._chain+1),e._result&&k((function(){c.apply(e,e._result)})),r):r}function f(e,n){return n._isCont?n:function(){var r=t(arguments);r.unshift(e),n.apply(null,r)}}function d(t,e){function n(e){function n(n,i){if(!(r<=0))return null==n?(o[e]=i,!--r&&t(null,o)):(r=0,void t(n))}return n._isCont=!0,n}if(!T(e))return t(_(e,"parallel"));var r=e.length,o=[];if(r<=0)return t(null,o);for(var i=0,s=r;i<s;i++)e[i](n(i))}function y(t,e){function n(h,p){return null!=h?t(h):(c[s]=p,++s>a?t(null,c):(i=--u>0?r:(u=v,o),void i(t,e[s],n)))}if(!T(e))return t(_(e,"series"));var i,s=0,a=e.length-1,c=[],u=v;return a<0?t(null,c):(n._isCont=!0,void e[0](n))}function g(t,e,n){function r(){if(!h)return i>=c?(h=!0,d(t,u)):void(s>=n||(s++,u.push(o())))}function o(){return new a(e[i++]).fin((function(e,n,o){return null!=n?(h=!0,t(n)):(s--,r(),void e(null,o))})).toThunk()}var i=0,s=0,c=e.length,u=[],h=!1;n=n>=1?Math.floor(n):Number.MAX_VALUE;do r();while(i<c&&s<n)}function m(){console.log.apply(console,arguments)}function _(t,e){return new Error("The argument "+(t&&t.toString())+' in "'+e+'" is not Array!')}var v=100,b=Object.prototype.toString,E=Object.prototype.hasOwnProperty,k="function"==typeof n?n:function(t){setTimeout(t,0)},T=Array.isArray||function(t){return"[object Array]"===b.call(t)};a.defer=o,a.parallel=function(t,e){return new a(function(e){r(e,d,e,t)},e)},a.series=function(t,e){return new a(function(e){r(e,y,e,t)},e)},a.each=function(t,e,n){return new a(function(n){r(n,d,n,s(t,e))},n)},a.eachSeries=function(t,e,n){return new a(function(n){r(n,y,n,s(t,e))},n)},a.parallelLimit=function(t,e,n){return new a(function(n){g(n,t,e)},n)},a.eachLimit=function(t,e,n,r){return new a(function(r){g(r,s(t,e),n)},r)},a.nextTick=function(e){var n=t(arguments,1);k((function(){e.apply(null,n)}))},a.onerror=function(t){throw console.error("Thenjs caught error: ",t),t};var S=a.prototype;return S.fin=S.finally=function(t){return l((function(e,n){n._finally=f(e,t)}),this)},S.then=function(t,e){return l((function(n,r){t&&(r._success=f(n,t)),e&&(r._error=f(n,e))}),this)},S.fail=S.catch=function(e){return l((function(n,r){r._error=f(n,e),r._success=function(){var e=t(arguments);e.unshift(null),n.apply(null,e)}}),this)},S.parallel=function(t){return l((function(e,n){n._parallel=function(n){d(e,t||n)}}),this)},S.series=function(t){return l((function(e,n){n._series=function(n){y(e,t||n)}}),this)},S.each=function(t,e){return l((function(n,r){r._parallel=function(r,o){d(n,s(t||r,e||o))}}),this)},S.eachSeries=function(t,e){return l((function(n,r){r._series=function(r,o){y(n,s(t||r,e||o))}}),this)},S.parallelLimit=function(t,e){return l((function(n,r){r._parallel=function(r){g(n,t||r,e)}}),this)},S.eachLimit=function(t,e,n){return l((function(r,o){o._series=function(o,i){g(r,s(t||o,e||i),n)}}),this)},S.toThunk=function(){var t=this;return function(e){t._result?(e.apply(null,t._result),t._result=!1):t._result!==!1&&(t._finally=t._error=e)}},S.inspect=function(){var t={};for(var e in this)E.call(this,e)&&(t[e]="_nextThen"===e?this[e]&&this[e]._chain:this[e]);return t},a.NAME="Thenjs",a.VERSION="2.0.3",a}))}).call(e,n(12).setImmediate)}),(function(t,e){function n(t,e){var n=[];e=e||0;for(var r=e||0;r<t.length;r++)n[r-e]=t[r];return n}t.exports=n}),(function(t,e){(function(e){t.exports=e}).call(e,{})}),(function(t,e,n){var r;(function(t,o){!(function(i){function s(t){for(var e,n,r=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function a(t){for(var e,n=t.length,r=-1,o="";++r<n;)e=t[r],e>65535&&(e-=65536,o+=v(e>>>10&1023|55296),e=56320|1023&e),o+=v(e);return o}function c(t,e){return v(t>>e&63|128)}function u(t){if(0==(4294967168&t))return v(t);var e="";return 0==(4294965248&t)?e=v(t>>6&31|192):0==(4294901760&t)?(e=v(t>>12&15|224),e+=c(t,6)):0==(4292870144&t)&&(e=v(t>>18&7|240),e+=c(t,12),e+=c(t,6)),e+=v(63&t|128)}function h(t){for(var e,n=s(t),r=n.length,o=-1,i="";++o<r;)e=n[o],i+=u(e);return i}function p(){if(_>=m)throw Error("Invalid byte index");var t=255&g[_];if(_++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function l(){var t,e,n,r,o;if(_>m)throw Error("Invalid byte index");if(_==m)return!1;if(t=255&g[_],_++,0==(128&t))return t;if(192==(224&t)){var e=p();if(o=(31&t)<<6|e,o>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&t)){if(e=p(),n=p(),o=(15&t)<<12|e<<6|n,o>=2048)return o;throw Error("Invalid continuation byte")}if(240==(248&t)&&(e=p(),n=p(),r=p(),o=(15&t)<<18|e<<12|n<<6|r,o>=65536&&o<=1114111))return o;throw Error("Invalid WTF-8 detected")}function f(t){g=s(t),m=g.length,_=0;for(var e,n=[];(e=l())!==!1;)n.push(e);return a(n)}var d="object"==typeof e&&e,y=("object"==typeof t&&t&&t.exports==d&&t,"object"==typeof o&&o);y.global!==y&&y.window!==y||(i=y);var g,m,_,v=String.fromCharCode,b={version:"1.0.0",encode:h,decode:f};r=function(){return b}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))})(this)}).call(e,n(24)(t),(function(){return this})())}),(function(t,e){})])}));

/***/ }),

/***/ 1130:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/modal-close.3e0ddefb.png";

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(500));
__export(__webpack_require__(851));
__export(__webpack_require__(96));
__export(__webpack_require__(287));
__export(__webpack_require__(852));
__export(__webpack_require__(501));


/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(819));


/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(839));


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(826));


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(853));


/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(854));


/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(84);
var common_1 = __webpack_require__(83);
var storage_service_1 = __webpack_require__(501);
var global_1 = __webpack_require__(96);
var config_1 = __webpack_require__(500);
var tools_1 = __webpack_require__(151);
var RouterGuard = (function () {
    function RouterGuard(router, location, storageService) {
        this.router = router;
        this.location = location;
        this.storageService = storageService;
        this.username = '';
        this.password = '';
    }
    RouterGuard.prototype.canActivate = function () {
        if (window.location.href.match(/\/login$/g)) {
            return true;
        }
        var that = this;
        // 判断是否登陆，前者是刷新时登录，后者是关闭窗口五分钟内打开窗口登录
        var refrashLogin = window.sessionStorage.getItem(tools_1.md5('login-persistence-username')) && window.sessionStorage.getItem(tools_1.md5('login-persistence-password')), leaveLogin = this.storageService.get(tools_1.md5('afterFiveMinutes-username'), true) && this.storageService.get(tools_1.md5('afterFiveMinutes-password'));
        // 测试一下兼容性
        // if(refrashLogin){
        //     this.username = window.sessionStorage.getItem(md5('login-persistence-username'));
        //     this.password = window.sessionStorage.getItem(md5('login-persistence-password'));
        // }else 
        if (leaveLogin) {
            this.username = this.storageService.get(tools_1.md5('afterFiveMinutes-username'), true);
            this.password = this.storageService.get(tools_1.md5('afterFiveMinutes-password'), true);
        }
        if (refrashLogin || leaveLogin) {
            return new Promise(function (resolve, reject) {
                that.JIMInit(resolve);
            });
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    RouterGuard.prototype.JIMInit = function (resolve) {
        var that = this;
        global_1.global.JIM.init({
            "appkey": config_1.authPayload.appKey,
            "random_str": config_1.authPayload.randomStr,
            "signature": config_1.authPayload.signature,
            "timestamp": config_1.authPayload.timestamp,
            "flag": config_1.authPayload.flag
        }).onSuccess((function (data) {
            that.autoLogin(resolve);
            console.log('success:' + JSON.stringify(data));
        })).onFail((function (data) {
            console.log('error:' + JSON.stringify(data));
        })).onTimeout((function (data) {
            console.log(data);
        }));
    };
    RouterGuard.prototype.autoLogin = function (resolve) {
        var that = this;
        global_1.global.JIM.login({
            'username': this.username,
            'password': this.password,
            'is_md5': true
        })
            .onSuccess((function (data) {
            console.log('success:' + JSON.stringify(data));
            global_1.global.user = data.username;
            global_1.global.password = that.password;
            resolve(true);
        })).onFail((function (data) {
            console.log('error:' + JSON.stringify(data));
            resolve(false);
        })).onTimeout((function (data) {
            console.log('timeout:' + JSON.stringify(data));
            resolve(false);
        }));
    };
    return RouterGuard;
}());
RouterGuard = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [router_1.Router,
        common_1.LocationStrategy,
        storage_service_1.StorageService])
], RouterGuard);
exports.default = RouterGuard;


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;//! moment.js
//! version : 2.7.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.7.0",
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // moment internal properties
        momentProperties = {
            _isAMomentObject: null,
            _i : null,
            _f : null,
            _l : null,
            _strict : null,
            _tzm : null,
            _isUTC : null,
            _offset : null,  // optional. Combine with _isUTC
            _pf : null,
            _lang : null  // optional
        },

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
          s: 45,   //seconds to minutes
          m: 45,   //minutes to hours
          h: 22,   //hours to days
          dd: 25,  //days to month (month == 1)
          dm: 45,  //days to months (months > 1)
          dy: 345  //days to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error("Implement me");
        }
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        function printMsg() {
            if (moment.suppressDeprecationWarnings === false &&
                    typeof console !== 'undefined' && console.warn) {
                console.warn("Deprecation warning: " + msg);
            }
        }
        return extend((function () {
            if (firstTime) {
                printMsg();
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }), fn);
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function cloneMoment(m) {
        var result = {}, i;
        for (i in m) {
            if (m.hasOwnProperty(i) && momentProperties.hasOwnProperty(i)) {
                result[i] = m[i];
            }
        }

        return result;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, (function (val) {
                    return val.slice(1);
                }));
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        __webpack_require__(813)("./" + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) { return parseTokenOneDigit; }
            /* falls through */
        case 'SS':
            if (strict) { return parseTokenTwoDigits; }
            /* falls through */
        case 'SSS':
            if (strict) { return parseTokenThreeDigits; }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || "";
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = getLangDefinition(config._l).weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, lang;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            lang = getLangDefinition(config._l);
            dow = lang._week.dow;
            doy = lang._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < relativeTimeThresholds.s  && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= relativeTimeThresholds.dd && ['dd', days] ||
                days <= relativeTimeThresholds.dm && ['M'] ||
                days < relativeTimeThresholds.dy && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = cloneMoment(input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = lang;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
            "moment construction falls back to js Date. This is " +
            "discouraged and will be removed in upcoming major " +
            "release. Please refer to " +
            "https://github.com/moment/moment/issues/1407 for more info.",
            (function (config) {
        config._d = new Date(config._i);
    }));

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = lang;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function(threshold, limit) {
      if (relativeTimeThresholds[threshold] === undefined) {
        return false;
      }
      relativeTimeThresholds[threshold] = limit;
      return true;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string' && typeof val === 'string') {
                dur = moment.duration(isNaN(+val) ? +input : +val, isNaN(+val) ? val : input);
            } else if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string' && typeof val === 'string') {
                dur = moment.duration(isNaN(+val) ? +input : +val, isNaN(+val) ? val : input);
            } else if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: deprecate(
                 "moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",
                 (function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 })
         ),

        max: deprecate(
                "moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",
                (function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                })
        ),

        // keepTime = true means only change the timezone, without affecting
        // the local hour. So 5:31:26 +0300 --[zone(2, true)]--> 5:31:26 +0200
        // It is possible that 5:31:26 doesn't exist int zone +0200, so we
        // adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepTime) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    if (!keepTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this._lang._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.lang().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    "Accessing Moment through the global scope is " +
                    "deprecated, and will be removed in an upcoming " +
                    "release.",
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40), __webpack_require__(812)(module)))

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(834));


/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(846));


/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return Actions; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// TODO: This is a copy of this: https://github.com/redux-observable/redux-observable/blob/master/src/ActionsObservable.js
// Remove after this is resolved: https://github.com/redux-observable/redux-observable/issues/95




var Actions = Actions_1 = (function (_super) {
    __extends(Actions, _super);
    function Actions(actionsSubject) {
        var _this = _super.call(this) || this;
        _this.source = actionsSubject;
        return _this;
    }
    Actions.prototype.lift = function (operator) {
        var observable = new Actions_1(this);
        observable.operator = operator;
        return observable;
    };
    Actions.prototype.ofType = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(this, (function (_a) {
            var type = _a.type;
            var len = keys.length;
            if (len === 1) {
                return type === keys[0];
            }
            else {
                for (var i = 0; i < len; i++) {
                    if (keys[i] === type) {
                        return true;
                    }
                }
            }
            return false;
        }));
    };
    return Actions;
}(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]));
Actions = Actions_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Dispatcher"])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]])
], Actions);

var Actions_1;
//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", (function() { return afterBootstrapEffects; }));
/* harmony export (immutable) */ __webpack_exports__["a"] = runAfterBootstrapEffects;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

var afterBootstrapEffects = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('ngrx:effects: Bootstrap Effects');
function runAfterBootstrapEffects(injector, subscription) {
    return function () {
        var effectInstances = injector.get(afterBootstrapEffects, false);
        if (effectInstances) {
            subscription.addEffects(effectInstances);
        }
    };
}
//# sourceMappingURL=bootstrap-listener.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", (function() { return effects; }));
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return EffectsSubscription; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__effects__ = __webpack_require__(310);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var effects = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('ngrx/effects: Effects');
var EffectsSubscription = (function (_super) {
    __extends(EffectsSubscription, _super);
    function EffectsSubscription(store, parent, effectInstances) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.parent = parent;
        if (Boolean(parent)) {
            parent.add(_this);
        }
        if (Boolean(effectInstances)) {
            _this.addEffects(effectInstances);
        }
        return _this;
    }
    EffectsSubscription.prototype.addEffects = function (effectInstances) {
        var sources = effectInstances.map(__WEBPACK_IMPORTED_MODULE_4__effects__["b" /* mergeEffects */]);
        var merged = __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__["merge"].apply(void 0, sources);
        this.add(merged.subscribe(this.store));
    };
    EffectsSubscription.prototype.ngOnDestroy = function () {
        if (!this.closed) {
            this.unsubscribe();
        }
    };
    return EffectsSubscription;
}(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["Subscription"]));
EffectsSubscription = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"])),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(effects)),
    __metadata("design:paramtypes", [Object, EffectsSubscription, Array])
], EffectsSubscription);

//# sourceMappingURL=effects-subscription.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Effect;
/* unused harmony export getEffectsMetadata */
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeEffects;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements__);


var METADATA_KEY = '@ngrx/effects';
function Effect(_a) {
    var dispatch = (_a === void 0 ? { dispatch: true } : _a).dispatch;
    return function (target, propertyName) {
        if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, [], target);
        }
        var effects = Reflect.getOwnMetadata(METADATA_KEY, target);
        var metadata = { propertyName: propertyName, dispatch: dispatch };
        Reflect.defineMetadata(METADATA_KEY, effects.concat([metadata]), target);
    };
}
function getEffectsMetadata(instance) {
    var target = Object.getPrototypeOf(instance);
    if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
        return [];
    }
    return Reflect.getOwnMetadata(METADATA_KEY, target);
}
function mergeEffects(instance) {
    var observables = getEffectsMetadata(instance).map((function (_a) {
        var propertyName = _a.propertyName, dispatch = _a.dispatch;
        var observable = typeof instance[propertyName] === 'function' ?
            instance[propertyName]() : instance[propertyName];
        if (dispatch === false) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_ignoreElements__["ignoreElements"].call(observable);
        }
        return observable;
    }));
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_merge__["merge"].apply(void 0, observables);
}
//# sourceMappingURL=effects.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return Dispatcher; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        return _super.call(this, { type: Dispatcher.INIT }) || this;
    }
    Dispatcher.prototype.dispatch = function (action) {
        this.next(action);
    };
    Dispatcher.prototype.complete = function () {
        // noop
    };
    return Dispatcher;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]));

Dispatcher.INIT = '@ngrx/store/init';
//# sourceMappingURL=dispatcher.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return Reducer; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Reducer = (function (_super) {
    __extends(Reducer, _super);
    function Reducer(_dispatcher, initialReducer) {
        var _this = _super.call(this, initialReducer) || this;
        _this._dispatcher = _dispatcher;
        return _this;
    }
    Reducer.prototype.replaceReducer = function (reducer) {
        this.next(reducer);
    };
    Reducer.prototype.next = function (reducer) {
        _super.prototype.next.call(this, reducer);
        this._dispatcher.dispatch({ type: Reducer.REPLACE });
    };
    return Reducer;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]));

Reducer.REPLACE = '@ngrx/store/replace-reducer';
//# sourceMappingURL=reducer.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return State; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var State = (function (_super) {
    __extends(State, _super);
    function State(_initialState, action$, reducer$) {
        var _this = _super.call(this, _initialState) || this;
        var actionInQueue$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__["observeOn"].call(action$, __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__["queue"]);
        var actionAndReducer$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__["withLatestFrom"].call(actionInQueue$, reducer$);
        var state$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__["scan"].call(actionAndReducer$, (function (state, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(state, action);
        }), _initialState);
        state$.subscribe((function (value) { return _this.next(value); }));
        return _this;
    }
    return State;
}(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]));

//# sourceMappingURL=state.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return Store; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Store = (function (_super) {
    __extends(Store, _super);
    function Store(_dispatcher, _reducer, state$) {
        var _this = _super.call(this) || this;
        _this._dispatcher = _dispatcher;
        _this._reducer = _reducer;
        _this.select = __WEBPACK_IMPORTED_MODULE_0__ngrx_core__["a" /* select */].bind(_this);
        _this.source = state$;
        return _this;
    }
    Store.prototype.lift = function (operator) {
        var store = new Store(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    Store.prototype.replaceReducer = function (reducer) {
        this._reducer.next(reducer);
    };
    Store.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    Store.prototype.complete = function () {
        // noop
    };
    return Store;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]));

//# sourceMappingURL=store.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", (function() { return __assign; }));
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Moroccan Arabic (ar-ma)
// author : ElFadili Yassine : https://github.com/ElFadiliY
// author : Abdel Said : https://github.com/abdelsaid

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('ar-ma', {
        months : "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        monthsShort : "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekdays : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort : "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin : "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "في %s",
            past : "منذ %s",
            s : "ثوان",
            m : "دقيقة",
            mm : "%d دقائق",
            h : "ساعة",
            hh : "%d ساعات",
            d : "يوم",
            dd : "%d أيام",
            M : "شهر",
            MM : "%d أشهر",
            y : "سنة",
            yy : "%d سنوات"
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Arabic Saudi Arabia (ar-sa)
// author : Suhail Alkowaileet : https://github.com/xsoh

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };

    return moment.lang('ar-sa', {
        months : "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        monthsShort : "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdays : "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort : "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin : "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return "ص";
            } else {
                return "م";
            }
        },
        calendar : {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "في %s",
            past : "منذ %s",
            s : "ثوان",
            m : "دقيقة",
            mm : "%d دقائق",
            h : "ساعة",
            hh : "%d ساعات",
            d : "يوم",
            dd : "%d أيام",
            M : "شهر",
            MM : "%d أشهر",
            y : "سنة",
            yy : "%d سنوات"
        },
        preparse: function (string) {
            return string.replace(/[۰-۹]/g, (function (match) {
                return numberMap[match];
            })).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            })).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Arabic (ar)
// author : Abdel Said : https://github.com/abdelsaid
// changes in months, weekdays : Ahmed Elkhatib

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };

    return moment.lang('ar', {
        months : "يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
        monthsShort : "يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
        weekdays : "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort : "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin : "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return "ص";
            } else {
                return "م";
            }
        },
        calendar : {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "في %s",
            past : "منذ %s",
            s : "ثوان",
            m : "دقيقة",
            mm : "%d دقائق",
            h : "ساعة",
            hh : "%d ساعات",
            d : "يوم",
            dd : "%d أيام",
            M : "شهر",
            MM : "%d أشهر",
            y : "سنة",
            yy : "%d سنوات"
        },
        preparse: function (string) {
            return string.replace(/[۰-۹]/g, (function (match) {
                return numberMap[match];
            })).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            })).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : azerbaijani (az)
// author : topchiyev : https://github.com/topchiyev

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    var suffixes = {
        1: "-inci",
        5: "-inci",
        8: "-inci",
        70: "-inci",
        80: "-inci",

        2: "-nci",
        7: "-nci",
        20: "-nci",
        50: "-nci",

        3: "-üncü",
        4: "-üncü",
        100: "-üncü",

        6: "-ncı",

        9: "-uncu",
        10: "-uncu",
        30: "-uncu",

        60: "-ıncı",
        90: "-ıncı"
    };
    return moment.lang('az', {
        months : "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
        monthsShort : "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
        weekdays : "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
        weekdaysShort : "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
        weekdaysMin : "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[bugün saat] LT',
            nextDay : '[sabah saat] LT',
            nextWeek : '[gələn həftə] dddd [saat] LT',
            lastDay : '[dünən] LT',
            lastWeek : '[keçən həftə] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s sonra",
            past : "%s əvvəl",
            s : "birneçə saniyyə",
            m : "bir dəqiqə",
            mm : "%d dəqiqə",
            h : "bir saat",
            hh : "%d saat",
            d : "bir gün",
            dd : "%d gün",
            M : "bir ay",
            MM : "%d ay",
            y : "bir il",
            yy : "%d il"
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "gecə";
            } else if (hour < 12) {
                return "səhər";
            } else if (hour < 17) {
                return "gündüz";
            } else {
                return "axşam";
            }
        },
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + "-ıncı";
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;

            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : bulgarian (bg)
// author : Krasen Borisov : https://github.com/kraz

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('bg', {
        months : "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
        monthsShort : "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
        weekdays : "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
        weekdaysShort : "нед_пон_вто_сря_чет_пет_съб".split("_"),
        weekdaysMin : "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "D.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Днес в] LT',
            nextDay : '[Утре в] LT',
            nextWeek : 'dddd [в] LT',
            lastDay : '[Вчера в] LT',
            lastWeek : function () {
                switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[В изминалата] dddd [в] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[В изминалия] dddd [в] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "след %s",
            past : "преди %s",
            s : "няколко секунди",
            m : "минута",
            mm : "%d минути",
            h : "час",
            hh : "%d часа",
            d : "ден",
            dd : "%d дни",
            M : "месец",
            MM : "%d месеца",
            y : "година",
            yy : "%d години"
        },
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Bengali (bn)
// author : Kaushik Gandhi : https://github.com/kaushikgandhi

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '0': '০'
    },
    numberMap = {
        '১': '1',
        '২': '2',
        '৩': '3',
        '৪': '4',
        '৫': '5',
        '৬': '6',
        '৭': '7',
        '৮': '8',
        '৯': '9',
        '০': '0'
    };

    return moment.lang('bn', {
        months : 'জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split("_"),
        monthsShort : 'জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্'.split("_"),
        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রুবার_শনিবার'.split("_"),
        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্রু_শনি'.split("_"),
        weekdaysMin : 'রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি'.split("_"),
        longDateFormat : {
            LT : "A h:mm সময়",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY, LT",
            LLLL : "dddd, D MMMM YYYY, LT"
        },
        calendar : {
            sameDay : '[আজ] LT',
            nextDay : '[আগামীকাল] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[গতকাল] LT',
            lastWeek : '[গত] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s পরে",
            past : "%s আগে",
            s : "কএক সেকেন্ড",
            m : "এক মিনিট",
            mm : "%d মিনিট",
            h : "এক ঘন্টা",
            hh : "%d ঘন্টা",
            d : "এক দিন",
            dd : "%d দিন",
            M : "এক মাস",
            MM : "%d মাস",
            y : "এক বছর",
            yy : "%d বছর"
        },
        preparse: function (string) {
            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, (function (match) {
                return numberMap[match];
            }));
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            }));
        },
        //Bengali is a vast language its spoken 
        //in different forms in various parts of the world.
        //I have just generalized with most common one used
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "রাত";
            } else if (hour < 10) {
                return "শকাল";
            } else if (hour < 17) {
                return "দুপুর";
            } else if (hour < 20) {
                return "বিকেল";
            } else {
                return "রাত";
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : breton (br)
// author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            'mm': "munutenn",
            'MM': "miz",
            'dd': "devezh"
        };
        return number + ' ' + mutation(format[key], number);
    }

    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 9:
            return number + ' bloaz';
        default:
            return number + ' vloaz';
        }
    }

    function lastNumber(number) {
        if (number > 9) {
            return lastNumber(number % 10);
        }
        return number;
    }

    function mutation(text, number) {
        if (number === 2) {
            return softMutation(text);
        }
        return text;
    }

    function softMutation(text) {
        var mutationTable = {
            'm': 'v',
            'b': 'v',
            'd': 'z'
        };
        if (mutationTable[text.charAt(0)] === undefined) {
            return text;
        }
        return mutationTable[text.charAt(0)] + text.substring(1);
    }

    return moment.lang('br', {
        months : "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
        monthsShort : "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
        weekdays : "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
        weekdaysShort : "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
        weekdaysMin : "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
        longDateFormat : {
            LT : "h[e]mm A",
            L : "DD/MM/YYYY",
            LL : "D [a viz] MMMM YYYY",
            LLL : "D [a viz] MMMM YYYY LT",
            LLLL : "dddd, D [a viz] MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Hiziv da] LT',
            nextDay : '[Warc\'hoazh da] LT',
            nextWeek : 'dddd [da] LT',
            lastDay : '[Dec\'h da] LT',
            lastWeek : 'dddd [paset da] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "a-benn %s",
            past : "%s 'zo",
            s : "un nebeud segondennoù",
            m : "ur vunutenn",
            mm : relativeTimeWithMutation,
            h : "un eur",
            hh : "%d eur",
            d : "un devezh",
            dd : relativeTimeWithMutation,
            M : "ur miz",
            MM : relativeTimeWithMutation,
            y : "ur bloaz",
            yy : specialMutationForYears
        },
        ordinal : function (number) {
            var output = (number === 1) ? 'añ' : 'vet';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : bosnian (bs)
// author : Nedim Cholich : https://github.com/frontyard
// based on (hr) translation by Bojan Marković

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    function translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
        case 'm':
            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minuta';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'jedan sat' : 'jednog sata';
        case 'hh':
            if (number === 1) {
                result += 'sat';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'sata';
            } else {
                result += 'sati';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dana';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mjesec';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'mjeseca';
            } else {
                result += 'mjeseci';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'godina';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'godine';
            } else {
                result += 'godina';
            }
            return result;
        }
    }

    return moment.lang('bs', {
		months : "januar_februar_mart_april_maj_juni_juli_avgust_septembar_oktobar_novembar_decembar".split("_"),
		monthsShort : "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        weekdays : "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort : "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin : "ne_po_ut_sr_če_pe_su".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD. MM. YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',

            nextWeek : function () {
                switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[jučer u] LT',
            lastWeek : function () {
                switch (this.day()) {
                case 0:
                case 3:
                    return '[prošlu] dddd [u] LT';
                case 6:
                    return '[prošle] [subote] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prošli] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "za %s",
            past   : "prije %s",
            s      : "par sekundi",
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : "dan",
            dd     : translate,
            M      : "mjesec",
            MM     : translate,
            y      : "godinu",
            yy     : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : catalan (ca)
// author : Juan G. Hurtado : https://github.com/juanghurtado

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('ca', {
        months : "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
        monthsShort : "gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
        weekdays : "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
        weekdaysShort : "dg._dl._dt._dc._dj._dv._ds.".split("_"),
        weekdaysMin : "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay : function () {
                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextDay : function () {
                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastDay : function () {
                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "en %s",
            past : "fa %s",
            s : "uns segons",
            m : "un minut",
            mm : "%d minuts",
            h : "una hora",
            hh : "%d hores",
            d : "un dia",
            dd : "%d dies",
            M : "un mes",
            MM : "%d mesos",
            y : "un any",
            yy : "%d anys"
        },
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : czech (cs)
// author : petrbela : https://github.com/petrbela

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var months = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
        monthsShort = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");

    function plural(n) {
        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
    }

    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'minuty' : 'minut');
            } else {
                return result + 'minutami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'hodiny' : 'hodin');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'dny' : 'dní');
            } else {
                return result + 'dny';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'měsíce' : 'měsíců');
            } else {
                return result + 'měsíci';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'roky' : 'let');
            } else {
                return result + 'lety';
            }
            break;
        }
    }

    return moment.lang('cs', {
        months : months,
        monthsShort : monthsShort,
        monthsParse : (function (months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; i < 12; i++) {
                // use custom parser to solve problem with July (červenec)
                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
            }
            return _monthsParse;
        }(months, monthsShort)),
        weekdays : "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
        weekdaysShort : "ne_po_út_st_čt_pá_so".split("_"),
        weekdaysMin : "ne_po_út_st_čt_pá_so".split("_"),
        longDateFormat : {
            LT: "H.mm",
            L : "DD. MM. YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd D. MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[dnes v] LT",
            nextDay: '[zítra v] LT',
            nextWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[v neděli v] LT';
                case 1:
                case 2:
                    return '[v] dddd [v] LT';
                case 3:
                    return '[ve středu v] LT';
                case 4:
                    return '[ve čtvrtek v] LT';
                case 5:
                    return '[v pátek v] LT';
                case 6:
                    return '[v sobotu v] LT';
                }
            },
            lastDay: '[včera v] LT',
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[minulou neděli v] LT';
                case 1:
                case 2:
                    return '[minulé] dddd [v] LT';
                case 3:
                    return '[minulou středu v] LT';
                case 4:
                case 5:
                    return '[minulý] dddd [v] LT';
                case 6:
                    return '[minulou sobotu v] LT';
                }
            },
            sameElse: "L"
        },
        relativeTime : {
            future : "za %s",
            past : "před %s",
            s : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : chuvash (cv)
// author : Anatoly Mironov : https://github.com/mirontoli

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('cv', {
        months : "кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),
        monthsShort : "кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),
        weekdays : "вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),
        weekdaysShort : "выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),
        weekdaysMin : "вр_тн_ыт_юн_кç_эр_шм".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD-MM-YYYY",
            LL : "YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",
            LLL : "YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",
            LLLL : "dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"
        },
        calendar : {
            sameDay: '[Паян] LT [сехетре]',
            nextDay: '[Ыран] LT [сехетре]',
            lastDay: '[Ĕнер] LT [сехетре]',
            nextWeek: '[Çитес] dddd LT [сехетре]',
            lastWeek: '[Иртнĕ] dddd LT [сехетре]',
            sameElse: 'L'
        },
        relativeTime : {
            future : function (output) {
                var affix = /сехет$/i.exec(output) ? "рен" : /çул$/i.exec(output) ? "тан" : "ран";
                return output + affix;
            },
            past : "%s каялла",
            s : "пĕр-ик çеккунт",
            m : "пĕр минут",
            mm : "%d минут",
            h : "пĕр сехет",
            hh : "%d сехет",
            d : "пĕр кун",
            dd : "%d кун",
            M : "пĕр уйăх",
            MM : "%d уйăх",
            y : "пĕр çул",
            yy : "%d çул"
        },
        ordinal : '%d-мĕш',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Welsh (cy)
// author : Robert Allen

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang("cy", {
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        // time formats are the same as en-gb
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd, D MMMM YYYY LT"
        },
        calendar: {
            sameDay: '[Heddiw am] LT',
            nextDay: '[Yfory am] LT',
            nextWeek: 'dddd [am] LT',
            lastDay: '[Ddoe am] LT',
            lastWeek: 'dddd [diwethaf am] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: "mewn %s",
            past: "%s yn ôl",
            s: "ychydig eiliadau",
            m: "munud",
            mm: "%d munud",
            h: "awr",
            hh: "%d awr",
            d: "diwrnod",
            dd: "%d diwrnod",
            M: "mis",
            MM: "%d mis",
            y: "blwyddyn",
            yy: "%d flynedd"
        },
        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
        ordinal: function (number) {
            var b = number,
                output = '',
                lookup = [
                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
                ];

            if (b > 20) {
                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                    output = 'fed'; // not 30ain, 70ain or 90ain
                } else {
                    output = 'ain';
                }
            } else if (b > 0) {
                output = lookup[b];
            }

            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : danish (da)
// author : Ulrik Nielsen : https://github.com/mrbase

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('da', {
        months : "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
        monthsShort : "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays : "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort : "søn_man_tir_ons_tor_fre_lør".split("_"),
        weekdaysMin : "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd [d.] D. MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[I dag kl.] LT',
            nextDay : '[I morgen kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[I går kl.] LT',
            lastWeek : '[sidste] dddd [kl] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "om %s",
            past : "%s siden",
            s : "få sekunder",
            m : "et minut",
            mm : "%d minutter",
            h : "en time",
            hh : "%d timer",
            d : "en dag",
            dd : "%d dage",
            M : "en måned",
            MM : "%d måneder",
            y : "et år",
            yy : "%d år"
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : austrian german (de-at)
// author : lluchs : https://github.com/lluchs
// author: Menelion Elensúle: https://github.com/Oire
// author : Martin Groller : https://github.com/MadMG

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    return moment.lang('de-at', {
        months : "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort : "Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin : "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat : {
            LT: "HH:mm [Uhr]",
            L : "DD.MM.YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Heute um] LT",
            sameElse: "L",
            nextDay: '[Morgen um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gestern um] LT',
            lastWeek: '[letzten] dddd [um] LT'
        },
        relativeTime : {
            future : "in %s",
            past : "vor %s",
            s : "ein paar Sekunden",
            m : processRelativeTime,
            mm : "%d Minuten",
            h : processRelativeTime,
            hh : "%d Stunden",
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : german (de)
// author : lluchs : https://github.com/lluchs
// author: Menelion Elensúle: https://github.com/Oire

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    return moment.lang('de', {
        months : "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort : "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin : "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat : {
            LT: "HH:mm [Uhr]",
            L : "DD.MM.YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Heute um] LT",
            sameElse: "L",
            nextDay: '[Morgen um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gestern um] LT',
            lastWeek: '[letzten] dddd [um] LT'
        },
        relativeTime : {
            future : "in %s",
            past : "vor %s",
            s : "ein paar Sekunden",
            m : processRelativeTime,
            mm : "%d Minuten",
            h : processRelativeTime,
            hh : "%d Stunden",
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : modern greek (el)
// author : Aggelos Karalias : https://github.com/mehiel

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('el', {
        monthsNominativeEl : "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
        monthsGenitiveEl : "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
        months : function (momentToFormat, format) {
            if (/D/.test(format.substring(0, format.indexOf("MMMM")))) { // if there is a day number before 'MMMM'
                return this._monthsGenitiveEl[momentToFormat.month()];
            } else {
                return this._monthsNominativeEl[momentToFormat.month()];
            }
        },
        monthsShort : "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
        weekdays : "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
        weekdaysShort : "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
        weekdaysMin : "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'μμ' : 'ΜΜ';
            } else {
                return isLower ? 'πμ' : 'ΠΜ';
            }
        },
        longDateFormat : {
            LT : "h:mm A",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendarEl : {
            sameDay : '[Σήμερα {}] LT',
            nextDay : '[Αύριο {}] LT',
            nextWeek : 'dddd [{}] LT',
            lastDay : '[Χθες {}] LT',
            lastWeek : function() {
                switch (this.day()) {
                    case 6:
                        return '[το προηγούμενο] dddd [{}] LT';
                    default:
                        return '[την προηγούμενη] dddd [{}] LT';
                }
            },
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendarEl[key],
                hours = mom && mom.hours();

            if (typeof output === 'function') {
                output = output.apply(mom);
            }

            return output.replace("{}", (hours % 12 === 1 ? "στη" : "στις"));
        },
        relativeTime : {
            future : "σε %s",
            past : "%s πριν",
            s : "δευτερόλεπτα",
            m : "ένα λεπτό",
            mm : "%d λεπτά",
            h : "μία ώρα",
            hh : "%d ώρες",
            d : "μία μέρα",
            dd : "%d μέρες",
            M : "ένας μήνας",
            MM : "%d μήνες",
            y : "ένας χρόνος",
            yy : "%d χρόνια"
        },
        ordinal : function (number) {
            return number + 'η';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : australian english (en-au)

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('en-au', {
        months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat : {
            LT : "h:mm A",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : canadian english (en-ca)
// author : Jonathan Abourbih : https://github.com/jonbca

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('en-ca', {
        months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat : {
            LT : "h:mm A",
            L : "YYYY-MM-DD",
            LL : "D MMMM, YYYY",
            LLL : "D MMMM, YYYY LT",
            LLLL : "dddd, D MMMM, YYYY LT"
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });
})));


/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : great britain english (en-gb)
// author : Chris Gedrim : https://github.com/chrisgedrim

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('en-gb', {
        months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : esperanto (eo)
// author : Colin Dean : https://github.com/colindean
// komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
//          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('eo', {
        months : "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
        monthsShort : "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
        weekdays : "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
        weekdaysShort : "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
        weekdaysMin : "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "YYYY-MM-DD",
            LL : "D[-an de] MMMM, YYYY",
            LLL : "D[-an de] MMMM, YYYY LT",
            LLLL : "dddd, [la] D[-an de] MMMM, YYYY LT"
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'p.t.m.' : 'P.T.M.';
            } else {
                return isLower ? 'a.t.m.' : 'A.T.M.';
            }
        },
        calendar : {
            sameDay : '[Hodiaŭ je] LT',
            nextDay : '[Morgaŭ je] LT',
            nextWeek : 'dddd [je] LT',
            lastDay : '[Hieraŭ je] LT',
            lastWeek : '[pasinta] dddd [je] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "je %s",
            past : "antaŭ %s",
            s : "sekundoj",
            m : "minuto",
            mm : "%d minutoj",
            h : "horo",
            hh : "%d horoj",
            d : "tago",//ne 'diurno', ĉar estas uzita por proksimumo
            dd : "%d tagoj",
            M : "monato",
            MM : "%d monatoj",
            y : "jaro",
            yy : "%d jaroj"
        },
        ordinal : "%da",
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : spanish (es)
// author : Julio Napurí : https://github.com/julionc

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var monthsShortDot = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        monthsShort = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");

    return moment.lang('es', {
        months : "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        weekdays : "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort : "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD/MM/YYYY",
            LL : "D [de] MMMM [del] YYYY",
            LLL : "D [de] MMMM [del] YYYY LT",
            LLLL : "dddd, D [de] MMMM [del] YYYY LT"
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "en %s",
            past : "hace %s",
            s : "unos segundos",
            m : "un minuto",
            mm : "%d minutos",
            h : "una hora",
            hh : "%d horas",
            d : "un día",
            dd : "%d días",
            M : "un mes",
            MM : "%d meses",
            y : "un año",
            yy : "%d años"
        },
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : estonian (et)
// author : Henry Kehlmann : https://github.com/madhenry
// improvements : Illimar Tambek : https://github.com/ragulka

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
            'm' : ['ühe minuti', 'üks minut'],
            'mm': [number + ' minuti', number + ' minutit'],
            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
            'hh': [number + ' tunni', number + ' tundi'],
            'd' : ['ühe päeva', 'üks päev'],
            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
            'MM': [number + ' kuu', number + ' kuud'],
            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
            'yy': [number + ' aasta', number + ' aastat']
        };
        if (withoutSuffix) {
            return format[key][2] ? format[key][2] : format[key][1];
        }
        return isFuture ? format[key][0] : format[key][1];
    }

    return moment.lang('et', {
        months        : "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
        monthsShort   : "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
        weekdays      : "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
        weekdaysShort : "P_E_T_K_N_R_L".split("_"),
        weekdaysMin   : "P_E_T_K_N_R_L".split("_"),
        longDateFormat : {
            LT   : "H:mm",
            L    : "DD.MM.YYYY",
            LL   : "D. MMMM YYYY",
            LLL  : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay  : '[Täna,] LT',
            nextDay  : '[Homme,] LT',
            nextWeek : '[Järgmine] dddd LT',
            lastDay  : '[Eile,] LT',
            lastWeek : '[Eelmine] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s pärast",
            past   : "%s tagasi",
            s      : processRelativeTime,
            m      : processRelativeTime,
            mm     : processRelativeTime,
            h      : processRelativeTime,
            hh     : processRelativeTime,
            d      : processRelativeTime,
            dd     : '%d päeva',
            M      : processRelativeTime,
            MM     : processRelativeTime,
            y      : processRelativeTime,
            yy     : processRelativeTime
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : euskara (eu)
// author : Eneko Illarramendi : https://github.com/eillarra

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('eu', {
        months : "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
        monthsShort : "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
        weekdays : "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
        weekdaysShort : "ig._al._ar._az._og._ol._lr.".split("_"),
        weekdaysMin : "ig_al_ar_az_og_ol_lr".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "YYYY-MM-DD",
            LL : "YYYY[ko] MMMM[ren] D[a]",
            LLL : "YYYY[ko] MMMM[ren] D[a] LT",
            LLLL : "dddd, YYYY[ko] MMMM[ren] D[a] LT",
            l : "YYYY-M-D",
            ll : "YYYY[ko] MMM D[a]",
            lll : "YYYY[ko] MMM D[a] LT",
            llll : "ddd, YYYY[ko] MMM D[a] LT"
        },
        calendar : {
            sameDay : '[gaur] LT[etan]',
            nextDay : '[bihar] LT[etan]',
            nextWeek : 'dddd LT[etan]',
            lastDay : '[atzo] LT[etan]',
            lastWeek : '[aurreko] dddd LT[etan]',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s barru",
            past : "duela %s",
            s : "segundo batzuk",
            m : "minutu bat",
            mm : "%d minutu",
            h : "ordu bat",
            hh : "%d ordu",
            d : "egun bat",
            dd : "%d egun",
            M : "hilabete bat",
            MM : "%d hilabete",
            y : "urte bat",
            yy : "%d urte"
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Persian Language
// author : Ebrahim Byagowi : https://github.com/ebraminio

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰'
    }, numberMap = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };

    return moment.lang('fa', {
        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return "قبل از ظهر";
            } else {
                return "بعد از ظهر";
            }
        },
        calendar : {
            sameDay : '[امروز ساعت] LT',
            nextDay : '[فردا ساعت] LT',
            nextWeek : 'dddd [ساعت] LT',
            lastDay : '[دیروز ساعت] LT',
            lastWeek : 'dddd [پیش] [ساعت] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'در %s',
            past : '%s پیش',
            s : 'چندین ثانیه',
            m : 'یک دقیقه',
            mm : '%d دقیقه',
            h : 'یک ساعت',
            hh : '%d ساعت',
            d : 'یک روز',
            dd : '%d روز',
            M : 'یک ماه',
            MM : '%d ماه',
            y : 'یک سال',
            yy : '%d سال'
        },
        preparse: function (string) {
            return string.replace(/[۰-۹]/g, (function (match) {
                return numberMap[match];
            })).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            })).replace(/,/g, '،');
        },
        ordinal : '%dم',
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12 // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : finnish (fi)
// author : Tarmo Aidantausta : https://github.com/bleadof

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
        numbersFuture = ['nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
                          numbersPast[7], numbersPast[8], numbersPast[9]];

    function translate(number, withoutSuffix, key, isFuture) {
        var result = "";
        switch (key) {
        case 's':
            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
        case 'm':
            return isFuture ? 'minuutin' : 'minuutti';
        case 'mm':
            result = isFuture ? 'minuutin' : 'minuuttia';
            break;
        case 'h':
            return isFuture ? 'tunnin' : 'tunti';
        case 'hh':
            result = isFuture ? 'tunnin' : 'tuntia';
            break;
        case 'd':
            return isFuture ? 'päivän' : 'päivä';
        case 'dd':
            result = isFuture ? 'päivän' : 'päivää';
            break;
        case 'M':
            return isFuture ? 'kuukauden' : 'kuukausi';
        case 'MM':
            result = isFuture ? 'kuukauden' : 'kuukautta';
            break;
        case 'y':
            return isFuture ? 'vuoden' : 'vuosi';
        case 'yy':
            result = isFuture ? 'vuoden' : 'vuotta';
            break;
        }
        result = verbalNumber(number, isFuture) + " " + result;
        return result;
    }

    function verbalNumber(number, isFuture) {
        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
    }

    return moment.lang('fi', {
        months : "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
        monthsShort : "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
        weekdays : "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
        weekdaysShort : "su_ma_ti_ke_to_pe_la".split("_"),
        weekdaysMin : "su_ma_ti_ke_to_pe_la".split("_"),
        longDateFormat : {
            LT : "HH.mm",
            L : "DD.MM.YYYY",
            LL : "Do MMMM[ta] YYYY",
            LLL : "Do MMMM[ta] YYYY, [klo] LT",
            LLLL : "dddd, Do MMMM[ta] YYYY, [klo] LT",
            l : "D.M.YYYY",
            ll : "Do MMM YYYY",
            lll : "Do MMM YYYY, [klo] LT",
            llll : "ddd, Do MMM YYYY, [klo] LT"
        },
        calendar : {
            sameDay : '[tänään] [klo] LT',
            nextDay : '[huomenna] [klo] LT',
            nextWeek : 'dddd [klo] LT',
            lastDay : '[eilen] [klo] LT',
            lastWeek : '[viime] dddd[na] [klo] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s päästä",
            past : "%s sitten",
            s : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        ordinal : "%d.",
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : faroese (fo)
// author : Ragnar Johannesen : https://github.com/ragnar123

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('fo', {
        months : "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort : "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays : "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
        weekdaysShort : "sun_mán_týs_mik_hós_frí_ley".split("_"),
        weekdaysMin : "su_má_tý_mi_hó_fr_le".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D. MMMM, YYYY LT"
        },
        calendar : {
            sameDay : '[Í dag kl.] LT',
            nextDay : '[Í morgin kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[Í gjár kl.] LT',
            lastWeek : '[síðstu] dddd [kl] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "um %s",
            past : "%s síðani",
            s : "fá sekund",
            m : "ein minutt",
            mm : "%d minuttir",
            h : "ein tími",
            hh : "%d tímar",
            d : "ein dagur",
            dd : "%d dagar",
            M : "ein mánaði",
            MM : "%d mánaðir",
            y : "eitt ár",
            yy : "%d ár"
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : canadian french (fr-ca)
// author : Jonathan Abourbih : https://github.com/jonbca

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('fr-ca', {
        months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "YYYY-MM-DD",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "dans %s",
            past : "il y a %s",
            s : "quelques secondes",
            m : "une minute",
            mm : "%d minutes",
            h : "une heure",
            hh : "%d heures",
            d : "un jour",
            dd : "%d jours",
            M : "un mois",
            MM : "%d mois",
            y : "un an",
            yy : "%d ans"
        },
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        }
    });
})));


/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : french (fr)
// author : John Fischer : https://github.com/jfroffice

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('fr', {
        months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "dans %s",
            past : "il y a %s",
            s : "quelques secondes",
            m : "une minute",
            mm : "%d minutes",
            h : "une heure",
            hh : "%d heures",
            d : "un jour",
            dd : "%d jours",
            M : "un mois",
            MM : "%d mois",
            y : "un an",
            yy : "%d ans"
        },
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : galician (gl)
// author : Juan G. Hurtado : https://github.com/juanghurtado

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('gl', {
        months : "Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
        monthsShort : "Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
        weekdays : "Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),
        weekdaysShort : "Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
        weekdaysMin : "Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay : function () {
                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
            },
            nextDay : function () {
                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
            },
            lastDay : function () {
                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
            },
            lastWeek : function () {
                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : function (str) {
                if (str === "uns segundos") {
                    return "nuns segundos";
                }
                return "en " + str;
            },
            past : "hai %s",
            s : "uns segundos",
            m : "un minuto",
            mm : "%d minutos",
            h : "unha hora",
            hh : "%d horas",
            d : "un día",
            dd : "%d días",
            M : "un mes",
            MM : "%d meses",
            y : "un ano",
            yy : "%d anos"
        },
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Hebrew (he)
// author : Tomer Cohen : https://github.com/tomer
// author : Moshe Simantov : https://github.com/DevelopmentIL
// author : Tal Ater : https://github.com/TalAter

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('he', {
        months : "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
        monthsShort : "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
        weekdays : "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
        weekdaysShort : "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
        weekdaysMin : "א_ב_ג_ד_ה_ו_ש".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D [ב]MMMM YYYY",
            LLL : "D [ב]MMMM YYYY LT",
            LLLL : "dddd, D [ב]MMMM YYYY LT",
            l : "D/M/YYYY",
            ll : "D MMM YYYY",
            lll : "D MMM YYYY LT",
            llll : "ddd, D MMM YYYY LT"
        },
        calendar : {
            sameDay : '[היום ב־]LT',
            nextDay : '[מחר ב־]LT',
            nextWeek : 'dddd [בשעה] LT',
            lastDay : '[אתמול ב־]LT',
            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "בעוד %s",
            past : "לפני %s",
            s : "מספר שניות",
            m : "דקה",
            mm : "%d דקות",
            h : "שעה",
            hh : function (number) {
                if (number === 2) {
                    return "שעתיים";
                }
                return number + " שעות";
            },
            d : "יום",
            dd : function (number) {
                if (number === 2) {
                    return "יומיים";
                }
                return number + " ימים";
            },
            M : "חודש",
            MM : function (number) {
                if (number === 2) {
                    return "חודשיים";
                }
                return number + " חודשים";
            },
            y : "שנה",
            yy : function (number) {
                if (number === 2) {
                    return "שנתיים";
                }
                return number + " שנים";
            }
        }
    });
})));


/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : hindi (hi)
// author : Mayank Singhal : https://github.com/mayanksinghal

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    },
    numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    return moment.lang('hi', {
        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split("_"),
        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split("_"),
        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split("_"),
        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split("_"),
        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split("_"),
        longDateFormat : {
            LT : "A h:mm बजे",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY, LT",
            LLLL : "dddd, D MMMM YYYY, LT"
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[कल] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[कल] LT',
            lastWeek : '[पिछले] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s में",
            past : "%s पहले",
            s : "कुछ ही क्षण",
            m : "एक मिनट",
            mm : "%d मिनट",
            h : "एक घंटा",
            hh : "%d घंटे",
            d : "एक दिन",
            dd : "%d दिन",
            M : "एक महीने",
            MM : "%d महीने",
            y : "एक वर्ष",
            yy : "%d वर्ष"
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, (function (match) {
                return numberMap[match];
            }));
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            }));
        },
        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "रात";
            } else if (hour < 10) {
                return "सुबह";
            } else if (hour < 17) {
                return "दोपहर";
            } else if (hour < 20) {
                return "शाम";
            } else {
                return "रात";
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : hrvatski (hr)
// author : Bojan Marković : https://github.com/bmarkovic

// based on (sl) translation by Robert Sedovšek

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    function translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
        case 'm':
            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minuta';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'jedan sat' : 'jednog sata';
        case 'hh':
            if (number === 1) {
                result += 'sat';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'sata';
            } else {
                result += 'sati';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dana';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mjesec';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'mjeseca';
            } else {
                result += 'mjeseci';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'godina';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'godine';
            } else {
                result += 'godina';
            }
            return result;
        }
    }

    return moment.lang('hr', {
        months : "sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),
        monthsShort : "sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
        weekdays : "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort : "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin : "ne_po_ut_sr_če_pe_su".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD. MM. YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',

            nextWeek : function () {
                switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[jučer u] LT',
            lastWeek : function () {
                switch (this.day()) {
                case 0:
                case 3:
                    return '[prošlu] dddd [u] LT';
                case 6:
                    return '[prošle] [subote] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prošli] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "za %s",
            past   : "prije %s",
            s      : "par sekundi",
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : "dan",
            dd     : translate,
            M      : "mjesec",
            MM     : translate,
            y      : "godinu",
            yy     : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : hungarian (hu)
// author : Adam Brunner : https://github.com/adambrunner

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');

    function translate(number, withoutSuffix, key, isFuture) {
        var num = number,
            suffix;

        switch (key) {
        case 's':
            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
        case 'm':
            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'mm':
            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'h':
            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
        case 'hh':
            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
        case 'd':
            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'dd':
            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'M':
            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
        case 'MM':
            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
        case 'y':
            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
        case 'yy':
            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
        }

        return '';
    }

    function week(isFuture) {
        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
    }

    return moment.lang('hu', {
        months : "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
        monthsShort : "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
        weekdays : "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
        weekdaysShort : "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
        weekdaysMin : "v_h_k_sze_cs_p_szo".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "YYYY.MM.DD.",
            LL : "YYYY. MMMM D.",
            LLL : "YYYY. MMMM D., LT",
            LLLL : "YYYY. MMMM D., dddd LT"
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower === true ? 'de' : 'DE';
            } else {
                return isLower === true ? 'du' : 'DU';
            }
        },
        calendar : {
            sameDay : '[ma] LT[-kor]',
            nextDay : '[holnap] LT[-kor]',
            nextWeek : function () {
                return week.call(this, true);
            },
            lastDay : '[tegnap] LT[-kor]',
            lastWeek : function () {
                return week.call(this, false);
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s múlva",
            past : "%s",
            s : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Armenian (hy-am)
// author : Armendarabyan : https://github.com/armendarabyan

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_'),
            'accusative': 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return months[nounCase][m.month()];
    }

    function monthsShortCaseReplace(m, format) {
        var monthsShort = 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_');

        return monthsShort[m.month()];
    }

    function weekdaysCaseReplace(m, format) {
        var weekdays = 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_');

        return weekdays[m.day()];
    }

    return moment.lang('hy-am', {
        months : monthsCaseReplace,
        monthsShort : monthsShortCaseReplace,
        weekdays : weekdaysCaseReplace,
        weekdaysShort : "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        weekdaysMin : "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY թ.",
            LLL : "D MMMM YYYY թ., LT",
            LLLL : "dddd, D MMMM YYYY թ., LT"
        },
        calendar : {
            sameDay: '[այսօր] LT',
            nextDay: '[վաղը] LT',
            lastDay: '[երեկ] LT',
            nextWeek: function () {
                return 'dddd [օրը ժամը] LT';
            },
            lastWeek: function () {
                return '[անցած] dddd [օրը ժամը] LT';
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "%s հետո",
            past : "%s առաջ",
            s : "մի քանի վայրկյան",
            m : "րոպե",
            mm : "%d րոպե",
            h : "ժամ",
            hh : "%d ժամ",
            d : "օր",
            dd : "%d օր",
            M : "ամիս",
            MM : "%d ամիս",
            y : "տարի",
            yy : "%d տարի"
        },

        meridiem : function (hour) {
            if (hour < 4) {
                return "գիշերվա";
            } else if (hour < 12) {
                return "առավոտվա";
            } else if (hour < 17) {
                return "ցերեկվա";
            } else {
                return "երեկոյան";
            }
        },

        ordinal: function (number, period) {
            switch (period) {
            case 'DDD':
            case 'w':
            case 'W':
            case 'DDDo':
                if (number === 1) {
                    return number + '-ին';
                }
                return number + '-րդ';
            default:
                return number;
            }
        },

        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Bahasa Indonesia (id)
// author : Mohammad Satrio Utomo : https://github.com/tyok
// reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('id', {
        months : "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        monthsShort : "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
        weekdays : "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        weekdaysShort : "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        weekdaysMin : "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat : {
            LT : "HH.mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY [pukul] LT",
            LLLL : "dddd, D MMMM YYYY [pukul] LT"
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'siang';
            } else if (hours < 19) {
                return 'sore';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Besok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kemarin pukul] LT',
            lastWeek : 'dddd [lalu pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "dalam %s",
            past : "%s yang lalu",
            s : "beberapa detik",
            m : "semenit",
            mm : "%d menit",
            h : "sejam",
            hh : "%d jam",
            d : "sehari",
            dd : "%d hari",
            M : "sebulan",
            MM : "%d bulan",
            y : "setahun",
            yy : "%d tahun"
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : icelandic (is)
// author : Hinrik Örn Sigurðsson : https://github.com/hinrik

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function plural(n) {
        if (n % 100 === 11) {
            return true;
        } else if (n % 10 === 1) {
            return false;
        }
        return true;
    }

    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
        case 'm':
            return withoutSuffix ? 'mínúta' : 'mínútu';
        case 'mm':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
            } else if (withoutSuffix) {
                return result + 'mínúta';
            }
            return result + 'mínútu';
        case 'hh':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
            }
            return result + 'klukkustund';
        case 'd':
            if (withoutSuffix) {
                return 'dagur';
            }
            return isFuture ? 'dag' : 'degi';
        case 'dd':
            if (plural(number)) {
                if (withoutSuffix) {
                    return result + 'dagar';
                }
                return result + (isFuture ? 'daga' : 'dögum');
            } else if (withoutSuffix) {
                return result + 'dagur';
            }
            return result + (isFuture ? 'dag' : 'degi');
        case 'M':
            if (withoutSuffix) {
                return 'mánuður';
            }
            return isFuture ? 'mánuð' : 'mánuði';
        case 'MM':
            if (plural(number)) {
                if (withoutSuffix) {
                    return result + 'mánuðir';
                }
                return result + (isFuture ? 'mánuði' : 'mánuðum');
            } else if (withoutSuffix) {
                return result + 'mánuður';
            }
            return result + (isFuture ? 'mánuð' : 'mánuði');
        case 'y':
            return withoutSuffix || isFuture ? 'ár' : 'ári';
        case 'yy':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
            }
            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
        }
    }

    return moment.lang('is', {
        months : "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
        monthsShort : "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
        weekdays : "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
        weekdaysShort : "sun_mán_þri_mið_fim_fös_lau".split("_"),
        weekdaysMin : "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD/MM/YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY [kl.] LT",
            LLLL : "dddd, D. MMMM YYYY [kl.] LT"
        },
        calendar : {
            sameDay : '[í dag kl.] LT',
            nextDay : '[á morgun kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[í gær kl.] LT',
            lastWeek : '[síðasta] dddd [kl.] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "eftir %s",
            past : "fyrir %s síðan",
            s : translate,
            m : translate,
            mm : translate,
            h : "klukkustund",
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : italian (it)
// author : Lorenzo : https://github.com/aliem
// author: Mattia Larentis: https://github.com/nostalgiaz

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('it', {
        months : "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        monthsShort : "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdays : "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
        weekdaysShort : "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        weekdaysMin : "D_L_Ma_Me_G_V_S".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: '[lo scorso] dddd [alle] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? "tra" : "in") + " " + s;
            },
            past : "%s fa",
            s : "alcuni secondi",
            m : "un minuto",
            mm : "%d minuti",
            h : "un'ora",
            hh : "%d ore",
            d : "un giorno",
            dd : "%d giorni",
            M : "un mese",
            MM : "%d mesi",
            y : "un anno",
            yy : "%d anni"
        },
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : japanese (ja)
// author : LI Long : https://github.com/baryon

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('ja', {
        months : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays : "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        weekdaysShort : "日_月_火_水_木_金_土".split("_"),
        weekdaysMin : "日_月_火_水_木_金_土".split("_"),
        longDateFormat : {
            LT : "Ah時m分",
            L : "YYYY/MM/DD",
            LL : "YYYY年M月D日",
            LLL : "YYYY年M月D日LT",
            LLLL : "YYYY年M月D日LT dddd"
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return "午前";
            } else {
                return "午後";
            }
        },
        calendar : {
            sameDay : '[今日] LT',
            nextDay : '[明日] LT',
            nextWeek : '[来週]dddd LT',
            lastDay : '[昨日] LT',
            lastWeek : '[前週]dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s後",
            past : "%s前",
            s : "数秒",
            m : "1分",
            mm : "%d分",
            h : "1時間",
            hh : "%d時間",
            d : "1日",
            dd : "%d日",
            M : "1ヶ月",
            MM : "%dヶ月",
            y : "1年",
            yy : "%d年"
        }
    });
})));


/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Georgian (ka)
// author : Irakli Janiashvili : https://github.com/irakli-janiashvili

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
            'accusative': 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
        },

        nounCase = (/D[oD] *MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return months[nounCase][m.month()];
    }

    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
            'accusative': 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_')
        },

        nounCase = (/(წინა|შემდეგ)/).test(format) ?
            'accusative' :
            'nominative';

        return weekdays[nounCase][m.day()];
    }

    return moment.lang('ka', {
        months : monthsCaseReplace,
        monthsShort : "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
        weekdays : weekdaysCaseReplace,
        weekdaysShort : "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
        weekdaysMin : "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
        longDateFormat : {
            LT : "h:mm A",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[დღეს] LT[-ზე]',
            nextDay : '[ხვალ] LT[-ზე]',
            lastDay : '[გუშინ] LT[-ზე]',
            nextWeek : '[შემდეგ] dddd LT[-ზე]',
            lastWeek : '[წინა] dddd LT-ზე',
            sameElse : 'L'
        },
        relativeTime : {
            future : function (s) {
                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
                    s.replace(/ი$/, "ში") :
                    s + "ში";
            },
            past : function (s) {
                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
                    return s.replace(/(ი|ე)$/, "ის წინ");
                }
                if ((/წელი/).test(s)) {
                    return s.replace(/წელი$/, "წლის წინ");
                }
            },
            s : "რამდენიმე წამი",
            m : "წუთი",
            mm : "%d წუთი",
            h : "საათი",
            hh : "%d საათი",
            d : "დღე",
            dd : "%d დღე",
            M : "თვე",
            MM : "%d თვე",
            y : "წელი",
            yy : "%d წელი"
        },
        ordinal : function (number) {
            if (number === 0) {
                return number;
            }

            if (number === 1) {
                return number + "-ლი";
            }

            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
                return "მე-" + number;
            }

            return number + "-ე";
        },
        week : {
            dow : 1,
            doy : 7
        }
    });
})));


/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : khmer (km)
// author : Kruy Vanna : https://github.com/kruyvanna

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('km', {
        months: "មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
        monthsShort: "មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
        weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        weekdaysShort: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        weekdaysMin: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd, D MMMM YYYY LT"
        },
        calendar: {
            sameDay: '[ថ្ងៃនៈ ម៉ោង] LT',
            nextDay: '[ស្អែក ម៉ោង] LT',
            nextWeek: 'dddd [ម៉ោង] LT',
            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: "%sទៀត",
            past: "%sមុន",
            s: "ប៉ុន្មានវិនាទី",
            m: "មួយនាទី",
            mm: "%d នាទី",
            h: "មួយម៉ោង",
            hh: "%d ម៉ោង",
            d: "មួយថ្ងៃ",
            dd: "%d ថ្ងៃ",
            M: "មួយខែ",
            MM: "%d ខែ",
            y: "មួយឆ្នាំ",
            yy: "%d ឆ្នាំ"
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : korean (ko)
//
// authors 
//
// - Kyungwook, Park : https://github.com/kyungw00k
// - Jeeeyul Lee <jeeeyul@gmail.com>
(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('ko', {
        months : "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        monthsShort : "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        weekdays : "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        weekdaysShort : "일_월_화_수_목_금_토".split("_"),
        weekdaysMin : "일_월_화_수_목_금_토".split("_"),
        longDateFormat : {
            LT : "A h시 mm분",
            L : "YYYY.MM.DD",
            LL : "YYYY년 MMMM D일",
            LLL : "YYYY년 MMMM D일 LT",
            LLLL : "YYYY년 MMMM D일 dddd LT"
        },
        meridiem : function (hour, minute, isUpper) {
            return hour < 12 ? '오전' : '오후';
        },
        calendar : {
            sameDay : '오늘 LT',
            nextDay : '내일 LT',
            nextWeek : 'dddd LT',
            lastDay : '어제 LT',
            lastWeek : '지난주 dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s 후",
            past : "%s 전",
            s : "몇초",
            ss : "%d초",
            m : "일분",
            mm : "%d분",
            h : "한시간",
            hh : "%d시간",
            d : "하루",
            dd : "%d일",
            M : "한달",
            MM : "%d달",
            y : "일년",
            yy : "%d년"
        },
        ordinal : '%d일',
        meridiemParse : /(오전|오후)/,
        isPM : function (token) {
            return token === "오후";
        }
    });
})));


/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Luxembourgish (lb)
// author : mweimerskirch : https://github.com/mweimerskirch

// Note: Luxembourgish has a very particular phonological rule ("Eifeler Regel") that causes the
// deletion of the final "n" in certain contexts. That's what the "eifelerRegelAppliesToWeekday"
// and "eifelerRegelAppliesToNumber" methods are meant for

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eng Minutt', 'enger Minutt'],
            'h': ['eng Stonn', 'enger Stonn'],
            'd': ['een Dag', 'engem Dag'],
            'dd': [number + ' Deeg', number + ' Deeg'],
            'M': ['ee Mount', 'engem Mount'],
            'MM': [number + ' Méint', number + ' Méint'],
            'y': ['ee Joer', 'engem Joer'],
            'yy': [number + ' Joer', number + ' Joer']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return "a " + string;
        }
        return "an " + string;
    }

    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return "viru " + string;
        }
        return "virun " + string;
    }

    function processLastWeek(string1) {
        var weekday = this.format('d');
        if (eifelerRegelAppliesToWeekday(weekday)) {
            return '[Leschte] dddd [um] LT';
        }
        return '[Leschten] dddd [um] LT';
    }

    /**
     * Returns true if the word before the given week day loses the "-n" ending.
     * e.g. "Leschten Dënschdeg" but "Leschte Méindeg"
     *
     * @param weekday {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToWeekday(weekday) {
        weekday = parseInt(weekday, 10);
        switch (weekday) {
        case 0: // Sonndeg
        case 1: // Méindeg
        case 3: // Mëttwoch
        case 5: // Freideg
        case 6: // Samschdeg
            return true;
        default: // 2 Dënschdeg, 4 Donneschdeg
            return false;
        }
    }

    /**
     * Returns true if the word before the given number loses the "-n" ending.
     * e.g. "an 10 Deeg" but "a 5 Deeg"
     *
     * @param number {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToNumber(number) {
        number = parseInt(number, 10);
        if (isNaN(number)) {
            return false;
        }
        if (number < 0) {
            // Negative Number --> always true
            return true;
        } else if (number < 10) {
            // Only 1 digit
            if (4 <= number && number <= 7) {
                return true;
            }
            return false;
        } else if (number < 100) {
            // 2 digits
            var lastDigit = number % 10, firstDigit = number / 10;
            if (lastDigit === 0) {
                return eifelerRegelAppliesToNumber(firstDigit);
            }
            return eifelerRegelAppliesToNumber(lastDigit);
        } else if (number < 10000) {
            // 3 or 4 digits --> recursively check first digit
            while (number >= 10) {
                number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
        } else {
            // Anything larger than 4 digits: recursively check first n-3 digits
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
        }
    }

    return moment.lang('lb', {
        months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "H:mm [Auer]",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY LT",
            LLLL: "dddd, D. MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Haut um] LT",
            sameElse: "L",
            nextDay: '[Muer um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gëschter um] LT',
            lastWeek: processLastWeek
        },
        relativeTime: {
            future: processFutureTime,
            past: processPastTime,
            s: "e puer Sekonnen",
            m: processRelativeTime,
            mm: "%d Minutten",
            h: processRelativeTime,
            hh: "%d Stonnen",
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Lithuanian (lt)
// author : Mindaugas Mozūras : https://github.com/mmozuras

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var units = {
        "m" : "minutė_minutės_minutę",
        "mm": "minutės_minučių_minutes",
        "h" : "valanda_valandos_valandą",
        "hh": "valandos_valandų_valandas",
        "d" : "diena_dienos_dieną",
        "dd": "dienos_dienų_dienas",
        "M" : "mėnuo_mėnesio_mėnesį",
        "MM": "mėnesiai_mėnesių_mėnesius",
        "y" : "metai_metų_metus",
        "yy": "metai_metų_metus"
    },
    weekDays = "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_");

    function translateSeconds(number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
            return "kelios sekundės";
        } else {
            return isFuture ? "kelių sekundžių" : "kelias sekundes";
        }
    }

    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
    }

    function special(number) {
        return number % 10 === 0 || (number > 10 && number < 20);
    }

    function forms(key) {
        return units[key].split("_");
    }

    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        if (number === 1) {
            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
        } else if (withoutSuffix) {
            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
        } else {
            if (isFuture) {
                return result + forms(key)[1];
            } else {
                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
            }
        }
    }

    function relativeWeekDay(moment, format) {
        var nominative = format.indexOf('dddd HH:mm') === -1,
            weekDay = weekDays[moment.day()];

        return nominative ? weekDay : weekDay.substring(0, weekDay.length - 2) + "į";
    }

    return moment.lang("lt", {
        months : "sausio_vasario_kovo_balandžio_gegužės_biržėlio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
        monthsShort : "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
        weekdays : relativeWeekDay,
        weekdaysShort : "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
        weekdaysMin : "S_P_A_T_K_Pn_Š".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "YYYY-MM-DD",
            LL : "YYYY [m.] MMMM D [d.]",
            LLL : "YYYY [m.] MMMM D [d.], LT [val.]",
            LLLL : "YYYY [m.] MMMM D [d.], dddd, LT [val.]",
            l : "YYYY-MM-DD",
            ll : "YYYY [m.] MMMM D [d.]",
            lll : "YYYY [m.] MMMM D [d.], LT [val.]",
            llll : "YYYY [m.] MMMM D [d.], ddd, LT [val.]"
        },
        calendar : {
            sameDay : "[Šiandien] LT",
            nextDay : "[Rytoj] LT",
            nextWeek : "dddd LT",
            lastDay : "[Vakar] LT",
            lastWeek : "[Praėjusį] dddd LT",
            sameElse : "L"
        },
        relativeTime : {
            future : "po %s",
            past : "prieš %s",
            s : translateSeconds,
            m : translateSingular,
            mm : translate,
            h : translateSingular,
            hh : translate,
            d : translateSingular,
            dd : translate,
            M : translateSingular,
            MM : translate,
            y : translateSingular,
            yy : translate
        },
        ordinal : function (number) {
            return number + '-oji';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : latvian (lv)
// author : Kristaps Karlsons : https://github.com/skakri

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var units = {
        'mm': 'minūti_minūtes_minūte_minūtes',
        'hh': 'stundu_stundas_stunda_stundas',
        'dd': 'dienu_dienas_diena_dienas',
        'MM': 'mēnesi_mēnešus_mēnesis_mēneši',
        'yy': 'gadu_gadus_gads_gadi'
    };

    function format(word, number, withoutSuffix) {
        var forms = word.split('_');
        if (withoutSuffix) {
            return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
        } else {
            return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
        }
    }

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        return number + ' ' + format(units[key], number, withoutSuffix);
    }

    return moment.lang('lv', {
        months : "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
        monthsShort : "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
        weekdays : "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
        weekdaysShort : "Sv_P_O_T_C_Pk_S".split("_"),
        weekdaysMin : "Sv_P_O_T_C_Pk_S".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "YYYY. [gada] D. MMMM",
            LLL : "YYYY. [gada] D. MMMM, LT",
            LLLL : "YYYY. [gada] D. MMMM, dddd, LT"
        },
        calendar : {
            sameDay : '[Šodien pulksten] LT',
            nextDay : '[Rīt pulksten] LT',
            nextWeek : 'dddd [pulksten] LT',
            lastDay : '[Vakar pulksten] LT',
            lastWeek : '[Pagājušā] dddd [pulksten] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s vēlāk",
            past : "%s agrāk",
            s : "dažas sekundes",
            m : "minūti",
            mm : relativeTimeWithPlural,
            h : "stundu",
            hh : relativeTimeWithPlural,
            d : "dienu",
            dd : relativeTimeWithPlural,
            M : "mēnesi",
            MM : relativeTimeWithPlural,
            y : "gadu",
            yy : relativeTimeWithPlural
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : macedonian (mk)
// author : Borislav Mickov : https://github.com/B0k0

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('mk', {
        months : "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
        monthsShort : "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
        weekdays : "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
        weekdaysShort : "нед_пон_вто_сре_чет_пет_саб".split("_"),
        weekdaysMin : "нe_пo_вт_ср_че_пе_сa".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "D.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Денес во] LT',
            nextDay : '[Утре во] LT',
            nextWeek : 'dddd [во] LT',
            lastDay : '[Вчера во] LT',
            lastWeek : function () {
                switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[Во изминатата] dddd [во] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[Во изминатиот] dddd [во] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "после %s",
            past : "пред %s",
            s : "неколку секунди",
            m : "минута",
            mm : "%d минути",
            h : "час",
            hh : "%d часа",
            d : "ден",
            dd : "%d дена",
            M : "месец",
            MM : "%d месеци",
            y : "година",
            yy : "%d години"
        },
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : malayalam (ml)
// author : Floyd Pink : https://github.com/floydpink

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('ml', {
        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split("_"),
        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split("_"),
        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split("_"),
        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split("_"),
        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split("_"),
        longDateFormat : {
            LT : "A h:mm -നു",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY, LT",
            LLLL : "dddd, D MMMM YYYY, LT"
        },
        calendar : {
            sameDay : '[ഇന്ന്] LT',
            nextDay : '[നാളെ] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[ഇന്നലെ] LT',
            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s കഴിഞ്ഞ്",
            past : "%s മുൻപ്",
            s : "അൽപ നിമിഷങ്ങൾ",
            m : "ഒരു മിനിറ്റ്",
            mm : "%d മിനിറ്റ്",
            h : "ഒരു മണിക്കൂർ",
            hh : "%d മണിക്കൂർ",
            d : "ഒരു ദിവസം",
            dd : "%d ദിവസം",
            M : "ഒരു മാസം",
            MM : "%d മാസം",
            y : "ഒരു വർഷം",
            yy : "%d വർഷം"
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "രാത്രി";
            } else if (hour < 12) {
                return "രാവിലെ";
            } else if (hour < 17) {
                return "ഉച്ച കഴിഞ്ഞ്";
            } else if (hour < 20) {
                return "വൈകുന്നേരം";
            } else {
                return "രാത്രി";
            }
        }
    });
})));


/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Marathi (mr)
// author : Harshad Kale : https://github.com/kalehv

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    },
    numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    return moment.lang('mr', {
        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split("_"),
        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split("_"),
        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split("_"),
        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split("_"),
        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split("_"),
        longDateFormat : {
            LT : "A h:mm वाजता",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY, LT",
            LLLL : "dddd, D MMMM YYYY, LT"
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[उद्या] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[काल] LT',
            lastWeek: '[मागील] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s नंतर",
            past : "%s पूर्वी",
            s : "सेकंद",
            m: "एक मिनिट",
            mm: "%d मिनिटे",
            h : "एक तास",
            hh : "%d तास",
            d : "एक दिवस",
            dd : "%d दिवस",
            M : "एक महिना",
            MM : "%d महिने",
            y : "एक वर्ष",
            yy : "%d वर्षे"
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, (function (match) {
                return numberMap[match];
            }));
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            }));
        },
        meridiem: function (hour, minute, isLower)
        {
            if (hour < 4) {
                return "रात्री";
            } else if (hour < 10) {
                return "सकाळी";
            } else if (hour < 17) {
                return "दुपारी";
            } else if (hour < 20) {
                return "सायंकाळी";
            } else {
                return "रात्री";
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Bahasa Malaysia (ms-MY)
// author : Weldan Jamili : https://github.com/weldan

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('ms-my', {
        months : "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort : "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays : "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort : "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin : "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat : {
            LT : "HH.mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY [pukul] LT",
            LLLL : "dddd, D MMMM YYYY [pukul] LT"
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "dalam %s",
            past : "%s yang lepas",
            s : "beberapa saat",
            m : "seminit",
            mm : "%d minit",
            h : "sejam",
            hh : "%d jam",
            d : "sehari",
            dd : "%d hari",
            M : "sebulan",
            MM : "%d bulan",
            y : "setahun",
            yy : "%d tahun"
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : norwegian bokmål (nb)
// authors : Espen Hovlandsdal : https://github.com/rexxars
//           Sigurd Gartmann : https://github.com/sigurdga

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('nb', {
        months : "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort : "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
        weekdays : "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort : "sø._ma._ti._on._to._fr._lø.".split("_"),
        weekdaysMin : "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat : {
            LT : "H.mm",
            L : "DD.MM.YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY [kl.] LT",
            LLLL : "dddd D. MMMM YYYY [kl.] LT"
        },
        calendar : {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[forrige] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "om %s",
            past : "for %s siden",
            s : "noen sekunder",
            m : "ett minutt",
            mm : "%d minutter",
            h : "en time",
            hh : "%d timer",
            d : "en dag",
            dd : "%d dager",
            M : "en måned",
            MM : "%d måneder",
            y : "ett år",
            yy : "%d år"
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : nepali/nepalese
// author : suvash : https://github.com/suvash

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    },
    numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    return moment.lang('ne', {
        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split("_"),
        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split("_"),
        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split("_"),
        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split("_"),
        weekdaysMin : 'आइ._सो._मङ्_बु._बि._शु._श.'.split("_"),
        longDateFormat : {
            LT : "Aको h:mm बजे",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY, LT",
            LLLL : "dddd, D MMMM YYYY, LT"
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, (function (match) {
                return numberMap[match];
            }));
        },
        postformat: function (string) {
            return string.replace(/\d/g, (function (match) {
                return symbolMap[match];
            }));
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 3) {
                return "राती";
            } else if (hour < 10) {
                return "बिहान";
            } else if (hour < 15) {
                return "दिउँसो";
            } else if (hour < 18) {
                return "बेलुका";
            } else if (hour < 20) {
                return "साँझ";
            } else {
                return "राती";
            }
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[भोली] LT',
            nextWeek : '[आउँदो] dddd[,] LT',
            lastDay : '[हिजो] LT',
            lastWeek : '[गएको] dddd[,] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%sमा",
            past : "%s अगाडी",
            s : "केही समय",
            m : "एक मिनेट",
            mm : "%d मिनेट",
            h : "एक घण्टा",
            hh : "%d घण्टा",
            d : "एक दिन",
            dd : "%d दिन",
            M : "एक महिना",
            MM : "%d महिना",
            y : "एक बर्ष",
            yy : "%d बर्ष"
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : dutch (nl)
// author : Joris Röling : https://github.com/jjupiter

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var monthsShortWithDots = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        monthsShortWithoutDots = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");

    return moment.lang('nl', {
        months : "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },
        weekdays : "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort : "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin : "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD-MM-YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "over %s",
            past : "%s geleden",
            s : "een paar seconden",
            m : "één minuut",
            mm : "%d minuten",
            h : "één uur",
            hh : "%d uur",
            d : "één dag",
            dd : "%d dagen",
            M : "één maand",
            MM : "%d maanden",
            y : "één jaar",
            yy : "%d jaar"
        },
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : norwegian nynorsk (nn)
// author : https://github.com/mechuwind

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('nn', {
        months : "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort : "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays : "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
        weekdaysShort : "sun_mån_tys_ons_tor_fre_lau".split("_"),
        weekdaysMin : "su_må_ty_on_to_fr_lø".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: '[I dag klokka] LT',
            nextDay: '[I morgon klokka] LT',
            nextWeek: 'dddd [klokka] LT',
            lastDay: '[I går klokka] LT',
            lastWeek: '[Føregåande] dddd [klokka] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "om %s",
            past : "for %s sidan",
            s : "nokre sekund",
            m : "eit minutt",
            mm : "%d minutt",
            h : "ein time",
            hh : "%d timar",
            d : "ein dag",
            dd : "%d dagar",
            M : "ein månad",
            MM : "%d månader",
            y : "eit år",
            yy : "%d år"
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : polish (pl)
// author : Rafal Hirsz : https://github.com/evoL

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var monthsNominative = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
        monthsSubjective = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");

    function plural(n) {
        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
    }

    function translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
        case 'm':
            return withoutSuffix ? 'minuta' : 'minutę';
        case 'mm':
            return result + (plural(number) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix  ? 'godzina'  : 'godzinę';
        case 'hh':
            return result + (plural(number) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (plural(number) ? 'miesiące' : 'miesięcy');
        case 'yy':
            return result + (plural(number) ? 'lata' : 'lat');
        }
    }

    return moment.lang('pl', {
        months : function (momentToFormat, format) {
            if (/D MMMM/.test(format)) {
                return monthsSubjective[momentToFormat.month()];
            } else {
                return monthsNominative[momentToFormat.month()];
            }
        },
        monthsShort : "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        weekdays : "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        weekdaysShort : "nie_pon_wt_śr_czw_pt_sb".split("_"),
        weekdaysMin : "N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay: '[Dziś o] LT',
            nextDay: '[Jutro o] LT',
            nextWeek: '[W] dddd [o] LT',
            lastDay: '[Wczoraj o] LT',
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[W zeszłą niedzielę o] LT';
                case 3:
                    return '[W zeszłą środę o] LT';
                case 6:
                    return '[W zeszłą sobotę o] LT';
                default:
                    return '[W zeszły] dddd [o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "za %s",
            past : "%s temu",
            s : "kilka sekund",
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : "1 dzień",
            dd : '%d dni',
            M : "miesiąc",
            MM : translate,
            y : "rok",
            yy : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : brazilian portuguese (pt-br)
// author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('pt-br', {
        months : "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort : "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        weekdays : "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
        weekdaysShort : "dom_seg_ter_qua_qui_sex_sáb".split("_"),
        weekdaysMin : "dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D [de] MMMM [de] YYYY",
            LLL : "D [de] MMMM [de] YYYY [às] LT",
            LLLL : "dddd, D [de] MMMM [de] YYYY [às] LT"
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "em %s",
            past : "%s atrás",
            s : "segundos",
            m : "um minuto",
            mm : "%d minutos",
            h : "uma hora",
            hh : "%d horas",
            d : "um dia",
            dd : "%d dias",
            M : "um mês",
            MM : "%d meses",
            y : "um ano",
            yy : "%d anos"
        },
        ordinal : '%dº'
    });
})));


/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : portuguese (pt)
// author : Jefferson : https://github.com/jalex79

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('pt', {
        months : "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort : "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        weekdays : "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
        weekdaysShort : "dom_seg_ter_qua_qui_sex_sáb".split("_"),
        weekdaysMin : "dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D [de] MMMM [de] YYYY",
            LLL : "D [de] MMMM [de] YYYY LT",
            LLLL : "dddd, D [de] MMMM [de] YYYY LT"
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "em %s",
            past : "há %s",
            s : "segundos",
            m : "um minuto",
            mm : "%d minutos",
            h : "uma hora",
            hh : "%d horas",
            d : "um dia",
            dd : "%d dias",
            M : "um mês",
            MM : "%d meses",
            y : "um ano",
            yy : "%d anos"
        },
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : romanian (ro)
// author : Vlad Gurdiga : https://github.com/gurdiga
// author : Valentin Agachi : https://github.com/avaly

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'minute',
            'hh': 'ore',
            'dd': 'zile',
            'MM': 'luni',
            'yy': 'ani'
        },
            separator = ' ';
        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
            separator = ' de ';
        }

        return number + separator + format[key];
    }

    return moment.lang('ro', {
        months : "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
        monthsShort : "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
        weekdays : "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
        weekdaysShort : "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        weekdaysMin : "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY H:mm",
            LLLL : "dddd, D MMMM YYYY H:mm"
        },
        calendar : {
            sameDay: "[azi la] LT",
            nextDay: '[mâine la] LT',
            nextWeek: 'dddd [la] LT',
            lastDay: '[ieri la] LT',
            lastWeek: '[fosta] dddd [la] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "peste %s",
            past : "%s în urmă",
            s : "câteva secunde",
            m : "un minut",
            mm : relativeTimeWithPlural,
            h : "o oră",
            hh : relativeTimeWithPlural,
            d : "o zi",
            dd : relativeTimeWithPlural,
            M : "o lună",
            MM : relativeTimeWithPlural,
            y : "un an",
            yy : relativeTimeWithPlural
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : russian (ru)
// author : Viktorminator : https://github.com/Viktorminator
// Author : Menelion Elensúle : https://github.com/Oire

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
            'accusative': 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return months[nounCase][m.month()];
    }

    function monthsShortCaseReplace(m, format) {
        var monthsShort = {
            'nominative': 'янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
            'accusative': 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return monthsShort[nounCase][m.month()];
    }

    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            'accusative': 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_')
        },

        nounCase = (/\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/).test(format) ?
            'accusative' :
            'nominative';

        return weekdays[nounCase][m.day()];
    }

    return moment.lang('ru', {
        months : monthsCaseReplace,
        monthsShort : monthsShortCaseReplace,
        weekdays : weekdaysCaseReplace,
        weekdaysShort : "вс_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin : "вс_пн_вт_ср_чт_пт_сб".split("_"),
        monthsParse : [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY г.",
            LLL : "D MMMM YYYY г., LT",
            LLLL : "dddd, D MMMM YYYY г., LT"
        },
        calendar : {
            sameDay: '[Сегодня в] LT',
            nextDay: '[Завтра в] LT',
            lastDay: '[Вчера в] LT',
            nextWeek: function () {
                return this.day() === 2 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
            },
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[В прошлое] dddd [в] LT';
                case 1:
                case 2:
                case 4:
                    return '[В прошлый] dddd [в] LT';
                case 3:
                case 5:
                case 6:
                    return '[В прошлую] dddd [в] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "через %s",
            past : "%s назад",
            s : "несколько секунд",
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : "час",
            hh : relativeTimeWithPlural,
            d : "день",
            dd : relativeTimeWithPlural,
            M : "месяц",
            MM : relativeTimeWithPlural,
            y : "год",
            yy : relativeTimeWithPlural
        },

        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM : function (input) {
            return /^(дня|вечера)$/.test(input);
        },

        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "ночи";
            } else if (hour < 12) {
                return "утра";
            } else if (hour < 17) {
                return "дня";
            } else {
                return "вечера";
            }
        },

        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
            }
        },

        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : slovak (sk)
// author : Martin Minka : https://github.com/k2s
// based on work of petrbela : https://github.com/petrbela

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    var months = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
        monthsShort = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");

    function plural(n) {
        return (n > 1) && (n < 5);
    }

    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'minúty' : 'minút');
            } else {
                return result + 'minútami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'hodiny' : 'hodín');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'dni' : 'dní');
            } else {
                return result + 'dňami';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'mesiace' : 'mesiacov');
            } else {
                return result + 'mesiacmi';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'roky' : 'rokov');
            } else {
                return result + 'rokmi';
            }
            break;
        }
    }

    return moment.lang('sk', {
        months : months,
        monthsShort : monthsShort,
        monthsParse : (function (months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; i < 12; i++) {
                // use custom parser to solve problem with July (červenec)
                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
            }
            return _monthsParse;
        }(months, monthsShort)),
        weekdays : "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
        weekdaysShort : "ne_po_ut_st_št_pi_so".split("_"),
        weekdaysMin : "ne_po_ut_st_št_pi_so".split("_"),
        longDateFormat : {
            LT: "H:mm",
            L : "DD.MM.YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd D. MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[dnes o] LT",
            nextDay: '[zajtra o] LT',
            nextWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[v nedeľu o] LT';
                case 1:
                case 2:
                    return '[v] dddd [o] LT';
                case 3:
                    return '[v stredu o] LT';
                case 4:
                    return '[vo štvrtok o] LT';
                case 5:
                    return '[v piatok o] LT';
                case 6:
                    return '[v sobotu o] LT';
                }
            },
            lastDay: '[včera o] LT',
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[minulú nedeľu o] LT';
                case 1:
                case 2:
                    return '[minulý] dddd [o] LT';
                case 3:
                    return '[minulú stredu o] LT';
                case 4:
                case 5:
                    return '[minulý] dddd [o] LT';
                case 6:
                    return '[minulú sobotu o] LT';
                }
            },
            sameElse: "L"
        },
        relativeTime : {
            future : "za %s",
            past : "pred %s",
            s : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : slovenian (sl)
// author : Robert Sedovšek : https://github.com/sedovsek

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
        case 'm':
            return withoutSuffix ? 'ena minuta' : 'eno minuto';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2) {
                result += 'minuti';
            } else if (number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minut';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'ena ura' : 'eno uro';
        case 'hh':
            if (number === 1) {
                result += 'ura';
            } else if (number === 2) {
                result += 'uri';
            } else if (number === 3 || number === 4) {
                result += 'ure';
            } else {
                result += 'ur';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dni';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mesec';
            } else if (number === 2) {
                result += 'meseca';
            } else if (number === 3 || number === 4) {
                result += 'mesece';
            } else {
                result += 'mesecev';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'leto';
            } else if (number === 2) {
                result += 'leti';
            } else if (number === 3 || number === 4) {
                result += 'leta';
            } else {
                result += 'let';
            }
            return result;
        }
    }

    return moment.lang('sl', {
        months : "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort : "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        weekdays : "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
        weekdaysShort : "ned._pon._tor._sre._čet._pet._sob.".split("_"),
        weekdaysMin : "ne_po_to_sr_če_pe_so".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD. MM. YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay  : '[danes ob] LT',
            nextDay  : '[jutri ob] LT',

            nextWeek : function () {
                switch (this.day()) {
                case 0:
                    return '[v] [nedeljo] [ob] LT';
                case 3:
                    return '[v] [sredo] [ob] LT';
                case 6:
                    return '[v] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[v] dddd [ob] LT';
                }
            },
            lastDay  : '[včeraj ob] LT',
            lastWeek : function () {
                switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[prejšnja] dddd [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prejšnji] dddd [ob] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "čez %s",
            past   : "%s nazaj",
            s      : "nekaj sekund",
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : "en dan",
            dd     : translate,
            M      : "en mesec",
            MM     : translate,
            y      : "eno leto",
            yy     : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Albanian (sq)
// author : Flakërim Ismani : https://github.com/flakerimi
// author: Menelion Elensúle: https://github.com/Oire (tests)
// author : Oerd Cukalla : https://github.com/oerd (fixes)

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('sq', {
        months : "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
        monthsShort : "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
        weekdays : "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
        weekdaysShort : "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
        weekdaysMin : "D_H_Ma_Më_E_P_Sh".split("_"),
        meridiem : function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Sot në] LT',
            nextDay : '[Nesër në] LT',
            nextWeek : 'dddd [në] LT',
            lastDay : '[Dje në] LT',
            lastWeek : 'dddd [e kaluar në] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "në %s",
            past : "%s më parë",
            s : "disa sekonda",
            m : "një minutë",
            mm : "%d minuta",
            h : "një orë",
            hh : "%d orë",
            d : "një ditë",
            dd : "%d ditë",
            M : "një muaj",
            MM : "%d muaj",
            y : "një vit",
            yy : "%d vite"
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Serbian-cyrillic (sr-cyrl)
// author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    var translator = {
        words: { //Different grammatical cases
            m: ['један минут', 'једне минуте'],
            mm: ['минут', 'минуте', 'минута'],
            h: ['један сат', 'једног сата'],
            hh: ['сат', 'сата', 'сати'],
            dd: ['дан', 'дана', 'дана'],
            MM: ['месец', 'месеца', 'месеци'],
            yy: ['година', 'године', 'година']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    return moment.lang('sr-cyrl', {
        months: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'],
        monthsShort: ['јан.', 'феб.', 'мар.', 'апр.', 'мај', 'јун', 'јул', 'авг.', 'сеп.', 'окт.', 'нов.', 'дец.'],
        weekdays: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота'],
        weekdaysShort: ['нед.', 'пон.', 'уто.', 'сре.', 'чет.', 'пет.', 'суб.'],
        weekdaysMin: ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су'],
        longDateFormat: {
            LT: "H:mm",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY LT",
            LLLL: "dddd, D. MMMM YYYY LT"
        },
        calendar: {
            sameDay: '[данас у] LT',
            nextDay: '[сутра у] LT',

            nextWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[у] [недељу] [у] LT';
                case 3:
                    return '[у] [среду] [у] LT';
                case 6:
                    return '[у] [суботу] [у] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[у] dddd [у] LT';
                }
            },
            lastDay  : '[јуче у] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[прошле] [недеље] [у] LT',
                    '[прошлог] [понедељка] [у] LT',
                    '[прошлог] [уторка] [у] LT',
                    '[прошле] [среде] [у] LT',
                    '[прошлог] [четвртка] [у] LT',
                    '[прошлог] [петка] [у] LT',
                    '[прошле] [суботе] [у] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "за %s",
            past   : "пре %s",
            s      : "неколико секунди",
            m      : translator.translate,
            mm     : translator.translate,
            h      : translator.translate,
            hh     : translator.translate,
            d      : "дан",
            dd     : translator.translate,
            M      : "месец",
            MM     : translator.translate,
            y      : "годину",
            yy     : translator.translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Serbian-latin (sr)
// author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    var translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jedne minute'],
            mm: ['minut', 'minute', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mesec', 'meseca', 'meseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    return moment.lang('sr', {
        months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
        monthsShort: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
        weekdays: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
        weekdaysShort: ['ned.', 'pon.', 'uto.', 'sre.', 'čet.', 'pet.', 'sub.'],
        weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
        longDateFormat: {
            LT: "H:mm",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY LT",
            LLLL: "dddd, D. MMMM YYYY LT"
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',

            nextWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[u] [nedelju] [u] LT';
                case 3:
                    return '[u] [sredu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[juče u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[prošle] [nedelje] [u] LT',
                    '[prošlog] [ponedeljka] [u] LT',
                    '[prošlog] [utorka] [u] LT',
                    '[prošle] [srede] [u] LT',
                    '[prošlog] [četvrtka] [u] LT',
                    '[prošlog] [petka] [u] LT',
                    '[prošle] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "za %s",
            past   : "pre %s",
            s      : "nekoliko sekundi",
            m      : translator.translate,
            mm     : translator.translate,
            h      : translator.translate,
            hh     : translator.translate,
            d      : "dan",
            dd     : translator.translate,
            M      : "mesec",
            MM     : translator.translate,
            y      : "godinu",
            yy     : translator.translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : swedish (sv)
// author : Jens Alm : https://github.com/ulmus

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('sv', {
        months : "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort : "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays : "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort : "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin : "sö_må_ti_on_to_fr_lö".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "YYYY-MM-DD",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: '[Idag] LT',
            nextDay: '[Imorgon] LT',
            lastDay: '[Igår] LT',
            nextWeek: 'dddd LT',
            lastWeek: '[Förra] dddd[en] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "om %s",
            past : "för %s sedan",
            s : "några sekunder",
            m : "en minut",
            mm : "%d minuter",
            h : "en timme",
            hh : "%d timmar",
            d : "en dag",
            dd : "%d dagar",
            M : "en månad",
            MM : "%d månader",
            y : "ett år",
            yy : "%d år"
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'e' :
                (b === 1) ? 'a' :
                (b === 2) ? 'a' :
                (b === 3) ? 'e' : 'e';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : tamil (ta)
// author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    /*var symbolMap = {
            '1': '௧',
            '2': '௨',
            '3': '௩',
            '4': '௪',
            '5': '௫',
            '6': '௬',
            '7': '௭',
            '8': '௮',
            '9': '௯',
            '0': '௦'
        },
        numberMap = {
            '௧': '1',
            '௨': '2',
            '௩': '3',
            '௪': '4',
            '௫': '5',
            '௬': '6',
            '௭': '7',
            '௮': '8',
            '௯': '9',
            '௦': '0'
        }; */

    return moment.lang('ta', {
        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split("_"),
        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split("_"),
        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split("_"),
        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split("_"),
        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY, LT",
            LLLL : "dddd, D MMMM YYYY, LT"
        },
        calendar : {
            sameDay : '[இன்று] LT',
            nextDay : '[நாளை] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[நேற்று] LT',
            lastWeek : '[கடந்த வாரம்] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s இல்",
            past : "%s முன்",
            s : "ஒரு சில விநாடிகள்",
            m : "ஒரு நிமிடம்",
            mm : "%d நிமிடங்கள்",
            h : "ஒரு மணி நேரம்",
            hh : "%d மணி நேரம்",
            d : "ஒரு நாள்",
            dd : "%d நாட்கள்",
            M : "ஒரு மாதம்",
            MM : "%d மாதங்கள்",
            y : "ஒரு வருடம்",
            yy : "%d ஆண்டுகள்"
        },
/*        preparse: function (string) {
            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },*/
        ordinal : function (number) {
            return number + 'வது';
        },


// refer http://ta.wikipedia.org/s/1er1      

        meridiem : function (hour, minute, isLower) {
            if (hour >= 6 && hour <= 10) {
                return " காலை";
            } else   if (hour >= 10 && hour <= 14) {
                return " நண்பகல்";
            } else    if (hour >= 14 && hour <= 18) {
                return " எற்பாடு";
            } else   if (hour >= 18 && hour <= 20) {
                return " மாலை";
            } else  if (hour >= 20 && hour <= 24) {
                return " இரவு";
            } else  if (hour >= 0 && hour <= 6) {
                return " வைகறை";
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : thai (th)
// author : Kridsada Thanabulpong : https://github.com/sirn

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('th', {
        months : "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
        monthsShort : "มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),
        weekdays : "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
        weekdaysShort : "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"), // yes, three characters difference
        weekdaysMin : "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
        longDateFormat : {
            LT : "H นาฬิกา m นาที",
            L : "YYYY/MM/DD",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY เวลา LT",
            LLLL : "วันddddที่ D MMMM YYYY เวลา LT"
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return "ก่อนเที่ยง";
            } else {
                return "หลังเที่ยง";
            }
        },
        calendar : {
            sameDay : '[วันนี้ เวลา] LT',
            nextDay : '[พรุ่งนี้ เวลา] LT',
            nextWeek : 'dddd[หน้า เวลา] LT',
            lastDay : '[เมื่อวานนี้ เวลา] LT',
            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "อีก %s",
            past : "%sที่แล้ว",
            s : "ไม่กี่วินาที",
            m : "1 นาที",
            mm : "%d นาที",
            h : "1 ชั่วโมง",
            hh : "%d ชั่วโมง",
            d : "1 วัน",
            dd : "%d วัน",
            M : "1 เดือน",
            MM : "%d เดือน",
            y : "1 ปี",
            yy : "%d ปี"
        }
    });
})));


/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Tagalog/Filipino (tl-ph)
// author : Dan Hagman

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('tl-ph', {
        months : "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
        monthsShort : "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
        weekdays : "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
        weekdaysShort : "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
        weekdaysMin : "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "MM/D/YYYY",
            LL : "MMMM D, YYYY",
            LLL : "MMMM D, YYYY LT",
            LLLL : "dddd, MMMM DD, YYYY LT"
        },
        calendar : {
            sameDay: "[Ngayon sa] LT",
            nextDay: '[Bukas sa] LT',
            nextWeek: 'dddd [sa] LT',
            lastDay: '[Kahapon sa] LT',
            lastWeek: 'dddd [huling linggo] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "sa loob ng %s",
            past : "%s ang nakalipas",
            s : "ilang segundo",
            m : "isang minuto",
            mm : "%d minuto",
            h : "isang oras",
            hh : "%d oras",
            d : "isang araw",
            dd : "%d araw",
            M : "isang buwan",
            MM : "%d buwan",
            y : "isang taon",
            yy : "%d taon"
        },
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : turkish (tr)
// authors : Erhan Gundogan : https://github.com/erhangundogan,
//           Burak Yiğit Kaya: https://github.com/BYK

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {

    var suffixes = {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",

        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",

        3: "'üncü",
        4: "'üncü",
        100: "'üncü",

        6: "'ncı",

        9: "'uncu",
        10: "'uncu",
        30: "'uncu",

        60: "'ıncı",
        90: "'ıncı"
    };

    return moment.lang('tr', {
        months : "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
        monthsShort : "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays : "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
        weekdaysShort : "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
        weekdaysMin : "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[bugün saat] LT',
            nextDay : '[yarın saat] LT',
            nextWeek : '[haftaya] dddd [saat] LT',
            lastDay : '[dün] LT',
            lastWeek : '[geçen hafta] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s sonra",
            past : "%s önce",
            s : "birkaç saniye",
            m : "bir dakika",
            mm : "%d dakika",
            h : "bir saat",
            hh : "%d saat",
            d : "bir gün",
            dd : "%d gün",
            M : "bir ay",
            MM : "%d ay",
            y : "bir yıl",
            yy : "%d yıl"
        },
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + "'ıncı";
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;

            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Morocco Central Atlas Tamaziɣt in Latin (tzm-latn)
// author : Abdel Said : https://github.com/abdelsaid

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('tzm-latn', {
        months : "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        monthsShort : "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        weekdays : "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        weekdaysShort : "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        weekdaysMin : "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[asdkh g] LT",
            nextDay: '[aska g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assant g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "dadkh s yan %s",
            past : "yan %s",
            s : "imik",
            m : "minuḍ",
            mm : "%d minuḍ",
            h : "saɛa",
            hh : "%d tassaɛin",
            d : "ass",
            dd : "%d ossan",
            M : "ayowr",
            MM : "%d iyyirn",
            y : "asgas",
            yy : "%d isgasn"
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : Morocco Central Atlas Tamaziɣt (tzm)
// author : Abdel Said : https://github.com/abdelsaid

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('tzm', {
        months : "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        monthsShort : "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        weekdays : "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        weekdaysShort : "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        weekdaysMin : "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
            nextWeek: 'dddd [ⴴ] LT',
            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
            lastWeek: 'dddd [ⴴ] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
            past : "ⵢⴰⵏ %s",
            s : "ⵉⵎⵉⴽ",
            m : "ⵎⵉⵏⵓⴺ",
            mm : "%d ⵎⵉⵏⵓⴺ",
            h : "ⵙⴰⵄⴰ",
            hh : "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
            d : "ⴰⵙⵙ",
            dd : "%d oⵙⵙⴰⵏ",
            M : "ⴰⵢoⵓⵔ",
            MM : "%d ⵉⵢⵢⵉⵔⵏ",
            y : "ⴰⵙⴳⴰⵙ",
            yy : "%d ⵉⵙⴳⴰⵙⵏ"
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : ukrainian (uk)
// author : zemlanin : https://github.com/zemlanin
// Author : Menelion Elensúle : https://github.com/Oire

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'хвилина_хвилини_хвилин',
            'hh': 'година_години_годин',
            'dd': 'день_дні_днів',
            'MM': 'місяць_місяці_місяців',
            'yy': 'рік_роки_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        }
        else if (key === 'h') {
            return withoutSuffix ? 'година' : 'годину';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
            'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
        },

        nounCase = (/D[oD]? *MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return months[nounCase][m.month()];
    }

    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
        },

        nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
            'accusative' :
            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
                'genitive' :
                'nominative');

        return weekdays[nounCase][m.day()];
    }

    function processHoursFunction(str) {
        return function () {
            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
        };
    }

    return moment.lang('uk', {
        months : monthsCaseReplace,
        monthsShort : "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
        weekdays : weekdaysCaseReplace,
        weekdaysShort : "нд_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin : "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY р.",
            LLL : "D MMMM YYYY р., LT",
            LLLL : "dddd, D MMMM YYYY р., LT"
        },
        calendar : {
            sameDay: processHoursFunction('[Сьогодні '),
            nextDay: processHoursFunction('[Завтра '),
            lastDay: processHoursFunction('[Вчора '),
            nextWeek: processHoursFunction('[У] dddd ['),
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return processHoursFunction('[Минулої] dddd [').call(this);
                case 1:
                case 2:
                case 4:
                    return processHoursFunction('[Минулого] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "за %s",
            past : "%s тому",
            s : "декілька секунд",
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : "годину",
            hh : relativeTimeWithPlural,
            d : "день",
            dd : relativeTimeWithPlural,
            M : "місяць",
            MM : relativeTimeWithPlural,
            y : "рік",
            yy : relativeTimeWithPlural
        },

        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason

        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "ночі";
            } else if (hour < 12) {
                return "ранку";
            } else if (hour < 17) {
                return "дня";
            } else {
                return "вечора";
            }
        },

        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return number + '-й';
            case 'D':
                return number + '-го';
            default:
                return number;
            }
        },

        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : uzbek
// author : Sardor Muminov : https://github.com/muminoff

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('uz', {
        months : "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
        monthsShort : "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
        weekdays : "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
        weekdaysShort : "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
        weekdaysMin : "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "D MMMM YYYY, dddd LT"
        },
        calendar : {
            sameDay : '[Бугун соат] LT [да]',
            nextDay : '[Эртага] LT [да]',
            nextWeek : 'dddd [куни соат] LT [да]',
            lastDay : '[Кеча соат] LT [да]',
            lastWeek : '[Утган] dddd [куни соат] LT [да]',
            sameElse : 'L'
        },
        relativeTime : {
            future : "Якин %s ичида",
            past : "Бир неча %s олдин",
            s : "фурсат",
            m : "бир дакика",
            mm : "%d дакика",
            h : "бир соат",
            hh : "%d соат",
            d : "бир кун",
            dd : "%d кун",
            M : "бир ой",
            MM : "%d ой",
            y : "бир йил",
            yy : "%d йил"
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : vietnamese (vi)
// author : Bang Nguyen : https://github.com/bangnk

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('vi', {
        months : "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
        monthsShort : "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
        weekdays : "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
        weekdaysShort : "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysMin : "CN_T2_T3_T4_T5_T6_T7".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM [năm] YYYY",
            LLL : "D MMMM [năm] YYYY LT",
            LLLL : "dddd, D MMMM [năm] YYYY LT",
            l : "DD/M/YYYY",
            ll : "D MMM YYYY",
            lll : "D MMM YYYY LT",
            llll : "ddd, D MMM YYYY LT"
        },
        calendar : {
            sameDay: "[Hôm nay lúc] LT",
            nextDay: '[Ngày mai lúc] LT',
            nextWeek: 'dddd [tuần tới lúc] LT',
            lastDay: '[Hôm qua lúc] LT',
            lastWeek: 'dddd [tuần rồi lúc] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "%s tới",
            past : "%s trước",
            s : "vài giây",
            m : "một phút",
            mm : "%d phút",
            h : "một giờ",
            hh : "%d giờ",
            d : "một ngày",
            dd : "%d ngày",
            M : "một tháng",
            MM : "%d tháng",
            y : "một năm",
            yy : "%d năm"
        },
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : chinese
// author : suupic : https://github.com/suupic
// author : Zeno Zeng : https://github.com/zenozeng

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('zh-cn', {
        months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort : "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin : "日_一_二_三_四_五_六".split("_"),
        longDateFormat : {
            LT : "Ah点mm",
            L : "YYYY-MM-DD",
            LL : "YYYY年MMMD日",
            LLL : "YYYY年MMMD日LT",
            LLLL : "YYYY年MMMD日ddddLT",
            l : "YYYY-MM-DD",
            ll : "YYYY年MMMD日",
            lll : "YYYY年MMMD日LT",
            llll : "YYYY年MMMD日ddddLT"
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return "凌晨";
            } else if (hm < 900) {
                return "早上";
            } else if (hm < 1130) {
                return "上午";
            } else if (hm < 1230) {
                return "中午";
            } else if (hm < 1800) {
                return "下午";
            } else {
                return "晚上";
            }
        },
        calendar : {
            sameDay : function () {
                return this.minutes() === 0 ? "[今天]Ah[点整]" : "[今天]LT";
            },
            nextDay : function () {
                return this.minutes() === 0 ? "[明天]Ah[点整]" : "[明天]LT";
            },
            lastDay : function () {
                return this.minutes() === 0 ? "[昨天]Ah[点整]" : "[昨天]LT";
            },
            nextWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
                return this.minutes() === 0 ? prefix + "dddAh点整" : prefix + "dddAh点mm";
            },
            lastWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
                return this.minutes() === 0 ? prefix + "dddAh点整" : prefix + "dddAh点mm";
            },
            sameElse : 'LL'
        },
        ordinal : function (number, period) {
            switch (period) {
            case "d":
            case "D":
            case "DDD":
                return number + "日";
            case "M":
                return number + "月";
            case "w":
            case "W":
                return number + "周";
            default:
                return number;
            }
        },
        relativeTime : {
            future : "%s内",
            past : "%s前",
            s : "几秒",
            m : "1分钟",
            mm : "%d分钟",
            h : "1小时",
            hh : "%d小时",
            d : "1天",
            dd : "%d天",
            M : "1个月",
            MM : "%d个月",
            y : "1年",
            yy : "%d年"
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
})));


/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// moment.js language configuration
// language : traditional chinese (zh-tw)
// author : Ben : https://github.com/ben-lin

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}((function (moment) {
    return moment.lang('zh-tw', {
        months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort : "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin : "日_一_二_三_四_五_六".split("_"),
        longDateFormat : {
            LT : "Ah點mm",
            L : "YYYY年MMMD日",
            LL : "YYYY年MMMD日",
            LLL : "YYYY年MMMD日LT",
            LLLL : "YYYY年MMMD日ddddLT",
            l : "YYYY年MMMD日",
            ll : "YYYY年MMMD日",
            lll : "YYYY年MMMD日LT",
            llll : "YYYY年MMMD日ddddLT"
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 900) {
                return "早上";
            } else if (hm < 1130) {
                return "上午";
            } else if (hm < 1230) {
                return "中午";
            } else if (hm < 1800) {
                return "下午";
            } else {
                return "晚上";
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        ordinal : function (number, period) {
            switch (period) {
            case "d" :
            case "D" :
            case "DDD" :
                return number + "日";
            case "M" :
                return number + "月";
            case "w" :
            case "W" :
                return number + "週";
            default :
                return number;
            }
        },
        relativeTime : {
            future : "%s內",
            past : "%s前",
            s : "幾秒",
            m : "一分鐘",
            mm : "%d分鐘",
            h : "一小時",
            hh : "%d小時",
            d : "一天",
            dd : "%d天",
            M : "一個月",
            MM : "%d個月",
            y : "一年",
            yy : "%d年"
        }
    });
})));


/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = __webpack_require__(151);
// 签名算法
var timestamp = new Date().getTime(), randomStr = '404', appKey = '4f7aef34fb361292c566a1cd', masterkey = '054d6103823a726fc12d0466', signature = tools_1.md5("appkey=" + appKey + "&timestamp=" + timestamp + "&random_str=" + randomStr + "&key=" + masterkey);
exports.authPayload = {
    appKey: appKey,
    randomStr: randomStr,
    signature: signature,
    timestamp: timestamp,
    flag: 1
};
exports.PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    minScrollbarLength: 40
};
// js中静态资源的七牛路径，因为webpack不能将js的文件路径编译，所以需要手动配置
exports.imgRouter = 'http://7xo28s.com1.z0.glb.clouddn.com/web-jchat/0.0.1/';


/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var StorageService = (function () {
    function StorageService() {
    }
    StorageService.prototype.set = function (key, data, useCookie, time, path) {
        if (localStorage && !useCookie) {
            try {
                localStorage.setItem(key, data);
                return;
            }
            catch (err) {
                // go ahead
            }
        }
        var exp = new Date();
        if (time) {
            exp.setTime(exp.getTime() + time);
        }
        else {
            exp.setTime(exp.getTime() + 23.9 * 60 * 60 * 1000);
        }
        if (path) {
            document.cookie = key + "=" + data + ";expires=" + exp.toUTCString() + ";path=" + path;
            return null;
        }
        document.cookie = key + "=" + data + ";expires=" + exp.toUTCString();
    };
    StorageService.prototype.get = function (key, useCookie) {
        if (localStorage && !useCookie) {
            var value = localStorage.getItem(key);
            if (value) {
                return value;
            }
        }
        // 从cookie里面取
        var reg = new RegExp(key + '=([^;]*)');
        var m = document.cookie.match(reg);
        if (m && m.length > 1) {
            return m[1];
        }
        return null;
    };
    StorageService.prototype.remove = function (key, useCookie, path) {
        if (localStorage && !useCookie) {
            var value_1 = localStorage.getItem(key);
            if (value_1) {
                localStorage.removeItem(key);
                return value_1;
            }
        }
        // 从localstorage里没发现这个key
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var value = this.get(key);
        if (path) {
            document.cookie = key + '=' + value + ';expires=' + exp.toUTCString() + ";path=" + path;
        }
        else {
            document.cookie = key + '=' + value + ';expires=' + exp.toUTCString();
        }
        return value;
    };
    return StorageService;
}());
StorageService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;


/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(211);
var http_1 = __webpack_require__(213);
var platform_browser_1 = __webpack_require__(115);
var store_1 = __webpack_require__(64);
var effects_1 = __webpack_require__(97);
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
var reducers_1 = __webpack_require__(837);
var effects_2 = __webpack_require__(835);
var reducers_2 = __webpack_require__(849);
var effects_3 = __webpack_require__(847);
var _1 = __webpack_require__(844);
var effects_4 = __webpack_require__(840);
// import { ChatPanelEffect } from './pages/main/effects';
var _2 = __webpack_require__(825);
var effects_5 = __webpack_require__(821);
var reducers_3 = __webpack_require__(832);
var effects_6 = __webpack_require__(828);
// import { LoginService } from './services/request/login';
var router_guard_service_1 = __webpack_require__(287);
var hmr_1 = __webpack_require__(855);
var app_router_1 = __webpack_require__(818);
var index_component_1 = __webpack_require__(833);
var common_1 = __webpack_require__(116);
__webpack_require__(557);
__webpack_require__(558);
var AppModule = (function (_super) {
    tslib_1.__extends(AppModule, _super);
    function AppModule(appRef) {
        var _this = _super.call(this, appRef) || this;
        _this.appRef = appRef;
        return _this;
    }
    return AppModule;
}(hmr_1.HMR));
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_router_1.routing,
            store_1.StoreModule.provideStore({ loginReducer: reducers_1.loginReducer, registerReducer: reducers_2.registerReducer, mainReducer: _1.mainReducer, chatReducer: _2.chatReducer, contactReducer: reducers_3.contactReducer }),
            effects_1.EffectsModule.run(effects_2.LoginEffect),
            effects_1.EffectsModule.run(effects_3.RegisterEffect),
            effects_1.EffectsModule.run(effects_4.MainEffect),
            // EffectsModule.run(ChatPanelEffect),
            effects_1.EffectsModule.run(effects_5.ChatEffect),
            effects_1.EffectsModule.run(effects_6.ContactEffect),
        ],
        declarations: [
            index_component_1.AppComponent
        ],
        bootstrap: [index_component_1.AppComponent],
        providers: [
            // LoginService
            router_guard_service_1.default,
            common_1.StorageService
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ApplicationRef])
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 543:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(543)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 545:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n";

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(544);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_operator_enterZone__ = __webpack_require__(550);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_operator_leaveZone__ = __webpack_require__(551);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_operator_select__ = __webpack_require__(552);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return __WEBPACK_IMPORTED_MODULE_2__src_operator_select__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_compose__ = __webpack_require__(549);
/* unused harmony namespace reexport */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export compose */
var compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight((function (composed, fn) { return fn(composed); }), last(arg));
    };
};
//# sourceMappingURL=compose.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export enterZone */
/* unused harmony export EnterZoneOperator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function enterZone(zone) {
    return this.lift(new EnterZoneOperator(zone));
}
var EnterZoneOperator = (function () {
    function EnterZoneOperator(_zone) {
        this._zone = _zone;
    }
    EnterZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new EnterZoneSubscriber(subscriber, this._zone));
    };
    return EnterZoneOperator;
}());
var EnterZoneSubscriber = (function (_super) {
    __extends(EnterZoneSubscriber, _super);
    function EnterZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    EnterZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.run((function () { return _this.destination.next(value); }));
    };
    return EnterZoneSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__["Subscriber"]));
//# sourceMappingURL=enterZone.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export leaveZone */
/* unused harmony export LeaveZoneOperator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function leaveZone(zone) {
    return this.lift(new LeaveZoneOperator(zone));
}
var LeaveZoneOperator = (function () {
    function LeaveZoneOperator(_zone) {
        this._zone = _zone;
    }
    LeaveZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new LeaveZoneSubscriber(subscriber, this._zone));
    };
    return LeaveZoneOperator;
}());
var LeaveZoneSubscriber = (function (_super) {
    __extends(LeaveZoneSubscriber, _super);
    function LeaveZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    LeaveZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.runOutsideAngular((function () { return _this.destination.next(value); }));
    };
    return LeaveZoneSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__["Subscriber"]));
//# sourceMappingURL=leaveZone.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = select;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__);



function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__["pluck"].call.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__["pluck"], [this, pathOrMapFn].concat(paths));
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__["map"].call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(("Unexpected type " + typeof pathOrMapFn + " in select operator,")
            + " expected 'string' or 'function'");
    }
    return __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__["distinctUntilChanged"].call(mapped$);
}
//# sourceMappingURL=select.js.map

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Hot Module Replacement
function bootloader(main) {
    if (document.readyState === 'complete') {
        main();
    }
    else {
        document.addEventListener('DOMContentLoaded', main);
    }
}
exports.bootloader = bootloader;
// create new elements
function createNewHosts(cmps) {
    var components = cmps.map((function (componentNode) {
        var newNode = document.createElement(componentNode.tagName);
        // display none
        var currentDisplay = newNode.style.display;
        newNode.style.display = 'none';
        var parentNode = componentNode.parentNode;
        parentNode.insertBefore(newNode, componentNode);
        return { currentDisplay: currentDisplay, newNode: newNode };
    }));
    return function () {
        components.forEach((function (cmp) {
            cmp.newNode.style.display = cmp.currentDisplay;
            cmp.newNode = null;
            cmp.currentDisplay = null;
        }));
    };
}
exports.createNewHosts = createNewHosts;
// remove old styles
function removeNgStyles() {
    Array.prototype.slice.call(document.head.querySelectorAll('style'), 0)
        .filter((function (style) { return style.innerText.indexOf('_ng') !== -1; }))
        .map((function (el) { return el.remove(); }));
}
exports.removeNgStyles = removeNgStyles;
// get input values
function getInputValues() {
    var inputs = document.querySelectorAll('input');
    return Array.prototype.slice.call(inputs).map((function (input) { return input.value; }));
}
exports.getInputValues = getInputValues;
// set input values
function setInputValues($inputs) {
    var inputs = document.querySelectorAll('input');
    if ($inputs && inputs.length === $inputs.length) {
        $inputs.forEach((function (value, i) {
            var el = inputs[i];
            el.value = value;
            el.dispatchEvent(new CustomEvent('input', { detail: el.value }));
        }));
    }
}
exports.setInputValues = setInputValues;
// get/set input values
function createInputTransfer() {
    var $inputs = getInputValues();
    return function restoreInputValues() {
        setInputValues($inputs);
    };
}
exports.createInputTransfer = createInputTransfer;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Hot Module Replacement
__export(__webpack_require__(553));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return EffectsModule; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effects_subscription__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bootstrap_listener__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EffectsModule = EffectsModule_1 = (function () {
    function EffectsModule(effectsSubscription) {
        this.effectsSubscription = effectsSubscription;
    }
    EffectsModule.run = function (type) {
        return {
            ngModule: EffectsModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */],
                type,
                { provide: __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["b" /* effects */], useExisting: type, multi: true }
            ]
        };
    };
    EffectsModule.runAfterBootstrap = function (type) {
        return {
            ngModule: EffectsModule_1,
            providers: [
                type,
                { provide: __WEBPACK_IMPORTED_MODULE_3__bootstrap_listener__["b" /* afterBootstrapEffects */], useExisting: type, multi: true }
            ]
        };
    };
    return EffectsModule;
}());
EffectsModule = EffectsModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* Actions */],
            __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_BOOTSTRAP_LISTENER"],
                multi: true,
                deps: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */]],
                useFactory: __WEBPACK_IMPORTED_MODULE_3__bootstrap_listener__["a" /* runAfterBootstrapEffects */]
            }
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__effects_subscription__["a" /* EffectsSubscription */]])
], EffectsModule);

var EffectsModule_1;
//# sourceMappingURL=effects.module.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toPayload;
function toPayload(action) {
    return action.payload;
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 557:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", (function() { return INITIAL_REDUCER; }));
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", (function() { return INITIAL_STATE; }));
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", (function() { return _INITIAL_REDUCER; }));
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", (function() { return _INITIAL_STATE; }));
/* harmony export (immutable) */ __webpack_exports__["e"] = _initialReducerFactory;
/* harmony export (immutable) */ __webpack_exports__["f"] = _initialStateFactory;
/* harmony export (immutable) */ __webpack_exports__["g"] = _storeFactory;
/* harmony export (immutable) */ __webpack_exports__["h"] = _stateFactory;
/* harmony export (immutable) */ __webpack_exports__["i"] = _reducerFactory;
/* harmony export (immutable) */ __webpack_exports__["j"] = provideStore;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", (function() { return StoreModule; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dispatcher__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var INITIAL_REDUCER = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token ngrx/store/reducer');
var INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token ngrx/store/initial-state');
var _INITIAL_REDUCER = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token _ngrx/store/reducer');
var _INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token _ngrx/store/initial-state');
function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* combineReducers */])(reducer);
}
function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */].INIT });
    }
    return initialState;
}
function _storeFactory(dispatcher, reducer, state$) {
    return new __WEBPACK_IMPORTED_MODULE_3__store__["a" /* Store */](dispatcher, reducer, state$);
}
function _stateFactory(initialState, dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */](initialState, dispatcher, reducer);
}
function _reducerFactory(dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */](dispatcher, reducer);
}
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
function provideStore(_reducer, _initialState) {
    return [
        __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */],
        { provide: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* Store */], useFactory: _storeFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */], __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */]] },
        { provide: __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */], useFactory: _reducerFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], INITIAL_REDUCER] },
        { provide: __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */], useFactory: _stateFactory, deps: [INITIAL_STATE, __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */]] },
        { provide: INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [_INITIAL_REDUCER] },
        { provide: INITIAL_STATE, useFactory: _initialStateFactory, deps: [_INITIAL_STATE, INITIAL_REDUCER] },
        { provide: _INITIAL_STATE, useValue: _initialState },
        { provide: _INITIAL_REDUCER, useValue: _reducer }
    ];
}
var StoreModule = StoreModule_1 = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule_1,
            providers: provideStore(_reducer, _initialState)
        };
    };
    return StoreModule;
}());
StoreModule = StoreModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({})
], StoreModule);

var StoreModule_1;
//# sourceMappingURL=ng2.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dispatcher__ = __webpack_require__(311);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Dispatcher", (function() { return __WEBPACK_IMPORTED_MODULE_0__src_dispatcher__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ng2__ = __webpack_require__(559);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INITIAL_REDUCER", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["a"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INITIAL_STATE", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["b"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_INITIAL_REDUCER", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["c"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_INITIAL_STATE", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["d"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_initialReducerFactory", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["e"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_initialStateFactory", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["f"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_storeFactory", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["g"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_stateFactory", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["h"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "_reducerFactory", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["i"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "provideStore", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["j"]; }));
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StoreModule", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["k"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_reducer__ = __webpack_require__(312);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Reducer", (function() { return __WEBPACK_IMPORTED_MODULE_2__src_reducer__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_state__ = __webpack_require__(313);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "State", (function() { return __WEBPACK_IMPORTED_MODULE_3__src_state__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_store__ = __webpack_require__(314);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Store", (function() { return __WEBPACK_IMPORTED_MODULE_4__src_store__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils__ = __webpack_require__(315);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "combineReducers", (function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["a"]; }));






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 812:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ar": 428,
	"./ar-ma": 426,
	"./ar-ma.js": 426,
	"./ar-sa": 427,
	"./ar-sa.js": 427,
	"./ar.js": 428,
	"./az": 429,
	"./az.js": 429,
	"./bg": 430,
	"./bg.js": 430,
	"./bn": 431,
	"./bn.js": 431,
	"./br": 432,
	"./br.js": 432,
	"./bs": 433,
	"./bs.js": 433,
	"./ca": 434,
	"./ca.js": 434,
	"./cs": 435,
	"./cs.js": 435,
	"./cv": 436,
	"./cv.js": 436,
	"./cy": 437,
	"./cy.js": 437,
	"./da": 438,
	"./da.js": 438,
	"./de": 440,
	"./de-at": 439,
	"./de-at.js": 439,
	"./de.js": 440,
	"./el": 441,
	"./el.js": 441,
	"./en-au": 442,
	"./en-au.js": 442,
	"./en-ca": 443,
	"./en-ca.js": 443,
	"./en-gb": 444,
	"./en-gb.js": 444,
	"./eo": 445,
	"./eo.js": 445,
	"./es": 446,
	"./es.js": 446,
	"./et": 447,
	"./et.js": 447,
	"./eu": 448,
	"./eu.js": 448,
	"./fa": 449,
	"./fa.js": 449,
	"./fi": 450,
	"./fi.js": 450,
	"./fo": 451,
	"./fo.js": 451,
	"./fr": 453,
	"./fr-ca": 452,
	"./fr-ca.js": 452,
	"./fr.js": 453,
	"./gl": 454,
	"./gl.js": 454,
	"./he": 455,
	"./he.js": 455,
	"./hi": 456,
	"./hi.js": 456,
	"./hr": 457,
	"./hr.js": 457,
	"./hu": 458,
	"./hu.js": 458,
	"./hy-am": 459,
	"./hy-am.js": 459,
	"./id": 460,
	"./id.js": 460,
	"./is": 461,
	"./is.js": 461,
	"./it": 462,
	"./it.js": 462,
	"./ja": 463,
	"./ja.js": 463,
	"./ka": 464,
	"./ka.js": 464,
	"./km": 465,
	"./km.js": 465,
	"./ko": 466,
	"./ko.js": 466,
	"./lb": 467,
	"./lb.js": 467,
	"./lt": 468,
	"./lt.js": 468,
	"./lv": 469,
	"./lv.js": 469,
	"./mk": 470,
	"./mk.js": 470,
	"./ml": 471,
	"./ml.js": 471,
	"./mr": 472,
	"./mr.js": 472,
	"./ms-my": 473,
	"./ms-my.js": 473,
	"./nb": 474,
	"./nb.js": 474,
	"./ne": 475,
	"./ne.js": 475,
	"./nl": 476,
	"./nl.js": 476,
	"./nn": 477,
	"./nn.js": 477,
	"./pl": 478,
	"./pl.js": 478,
	"./pt": 480,
	"./pt-br": 479,
	"./pt-br.js": 479,
	"./pt.js": 480,
	"./ro": 481,
	"./ro.js": 481,
	"./ru": 482,
	"./ru.js": 482,
	"./sk": 483,
	"./sk.js": 483,
	"./sl": 484,
	"./sl.js": 484,
	"./sq": 485,
	"./sq.js": 485,
	"./sr": 487,
	"./sr-cyrl": 486,
	"./sr-cyrl.js": 486,
	"./sr.js": 487,
	"./sv": 488,
	"./sv.js": 488,
	"./ta": 489,
	"./ta.js": 489,
	"./th": 490,
	"./th.js": 490,
	"./tl-ph": 491,
	"./tl-ph.js": 491,
	"./tr": 492,
	"./tr.js": 492,
	"./tzm": 494,
	"./tzm-latn": 493,
	"./tzm-latn.js": 493,
	"./tzm.js": 494,
	"./uk": 495,
	"./uk.js": 495,
	"./uz": 496,
	"./uz.js": 496,
	"./vi": 497,
	"./vi.js": 497,
	"./zh-cn": 498,
	"./zh-cn.js": 498,
	"./zh-tw": 499,
	"./zh-tw.js": 499
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 813;

/***/ }),

/***/ 814:
/***/ (function(module, exports) {

module.exports = {
"èr":"二贰",
"shí":"十时实蚀",
"yǐ":"乙已以蚁倚",
"yī":"一衣医依伊揖壹",
"chǎng,ān,hàn":"厂",
"dīng,zhēng":"丁",
"qī":"七戚欺漆柒凄嘁",
"bǔ,bo":"卜",
"rén":"人仁",
"rù":"入褥",
"jiǔ":"九久酒玖灸韭",
"ér":"儿而",
"bā":"八巴疤叭芭捌笆",
"jǐ,jī":"几",
"le,liǎo":"了",
"lì":"力历厉立励利例栗粒吏沥荔俐莉砾雳痢",
"dāo":"刀",
"nǎi":"乃奶",
"sān":"三叁",
"yòu":"又右幼诱佑",
"yú":"于余鱼娱渔榆愚隅逾舆",
"shì":"士示世市式势事侍饰试视柿是适室逝释誓拭恃嗜",
"gān,gàn":"干",
"gōng":"工弓公功攻宫恭躬",
"kuī":"亏盔窥",
"tǔ":"土",
"cùn":"寸",
"dà,dài,tài":"大",
"cái":"才材财裁",
"xià":"下夏",
"zhàng":"丈仗帐胀障杖账",
"yǔ,yù,yú":"与",
"shàng,shǎng":"上",
"wàn,mò":"万",
"kǒu":"口",
"xiǎo":"小晓",
"jīn":"巾斤今金津筋襟",
"shān":"山删衫珊",
"qiān":"千迁牵谦签",
"qǐ":"乞企启起",
"chuān":"川穿",
"gè,gě":"个各",
"sháo":"勺芍",
"yì":"亿义艺忆议亦异役译易疫益谊意毅翼屹抑邑绎奕逸肄溢",
"jí":"及吉级极即急疾集籍棘辑嫉",
"fán":"凡烦矾樊",
"xī":"夕西吸希析牺息悉惜稀锡溪熄膝昔晰犀熙嬉蟋",
"wán":"丸完玩顽",
"me,mó,ma,yāo":"么",
"guǎng,ān":"广",
"wáng,wú":"亡",
"mén":"门们",
"shī":"尸失师诗狮施湿虱",
"zhī":"之支汁芝肢脂蜘",
"jǐ":"己挤脊",
"zǐ":"子紫姊籽滓",
"wèi":"卫未位味畏胃喂慰谓猬蔚魏",
"yě":"也冶野",
"nǚ,rǔ":"女",
"rèn":"刃认韧纫",
"fēi":"飞非啡",
"xí":"习席袭媳",
"mǎ":"马码玛",
"chā,chá,chǎ":"叉",
"fēng":"丰封疯峰锋蜂枫",
"xiāng":"乡香箱厢湘镶",
"jǐng":"井警阱",
"wáng,wàng":"王",
"kāi":"开揩",
"tiān":"天添",
"wú":"无吴芜梧蜈",
"fū,fú":"夫",
"zhuān":"专砖",
"yuán":"元园原圆援缘源袁猿辕",
"yún":"云匀耘",
"zhā,zā,zhá":"扎",
"mù":"木目牧墓幕暮慕沐募睦穆",
"wǔ":"五午伍武侮舞捂鹉",
"tīng":"厅听",
"bù,fǒu":"不",
"qū,ōu":"区",
"quǎn":"犬",
"tài":"太态泰汰",
"yǒu":"友",
"chē,jū":"车",
"pǐ":"匹",
"yóu":"尤由邮犹油游",
"jù":"巨拒具俱剧距惧锯聚炬",
"yá":"牙芽崖蚜涯衙",
"bǐ":"比彼笔鄙匕秕",
"jiē":"皆阶接街秸",
"hù":"互户护沪",
"qiè,qiē":"切",
"wǎ,wà":"瓦",
"zhǐ":"止旨址纸指趾",
"tún,zhūn":"屯",
"shǎo,shào":"少",
"rì":"日",
"zhōng,zhòng":"中",
"gāng":"冈刚纲缸肛",
"nèi,nà":"内",
"bèi":"贝备倍辈狈惫焙",
"shuǐ":"水",
"jiàn,xiàn":"见",
"niú":"牛",
"shǒu":"手守首",
"máo":"毛矛茅锚",
"qì":"气弃汽器迄泣",
"shēng":"升生声牲笙甥",
"cháng,zhǎng":"长",
"shén,shí":"什",
"piàn,piān":"片",
"pú,pū":"仆",
"huà,huā":"化",
"bì":"币必毕闭毙碧蔽弊避壁庇蓖痹璧",
"chóu,qiú":"仇",
"zhuǎ,zhǎo":"爪",
"jǐn,jìn":"仅",
"réng":"仍",
"fù,fǔ":"父",
"cóng,zòng":"从",
"fǎn":"反返",
"jiè":"介戒届界借诫",
"xiōng":"凶兄胸匈汹",
"fēn,fèn":"分",
"fá":"乏伐罚阀筏",
"cāng":"仓苍舱沧",
"yuè":"月阅悦跃越岳粤",
"shì,zhī":"氏",
"wù":"勿务物误悟雾坞晤",
"qiàn":"欠歉",
"fēng,fěng":"风",
"dān":"丹耽",
"wū":"乌污呜屋巫诬",
"fèng":"凤奉",
"gōu,gòu":"勾",
"wén":"文闻蚊",
"liù,lù":"六",
"huǒ":"火伙",
"fāng":"方芳",
"dǒu,dòu":"斗",
"wèi,wéi":"为",
"dìng":"订定锭",
"jì":"计记技忌际季剂迹既继寄绩妓荠寂鲫冀",
"xīn":"心辛欣新薪锌",
"chǐ,chě":"尺",
"yǐn":"引饮蚓瘾",
"chǒu":"丑",
"kǒng":"孔恐",
"duì":"队对",
"bàn":"办半扮伴瓣绊",
"yǔ,yú":"予",
"yǔn":"允陨",
"quàn":"劝",
"shū":"书叔殊梳舒疏输蔬抒枢淑",
"shuāng":"双霜",
"yù":"玉育狱浴预域欲遇御裕愈誉芋郁喻寓豫",
"huàn":"幻换唤患宦涣焕痪",
"kān":"刊堪勘",
"mò":"末沫漠墨默茉陌寞",
"jī":"击饥圾机肌鸡积基激讥叽唧畸箕",
"dǎ,dá":"打",
"qiǎo":"巧",
"zhèng,zhēng":"正症挣",
"pū":"扑",
"bā,pá":"扒",
"gān":"甘肝竿柑",
"qù":"去",
"rēng":"扔",
"gǔ":"古谷股鼓",
"běn":"本",
"jié,jiē":"节结",
"shù,shú,zhú":"术",
"bǐng":"丙柄饼秉禀",
"kě,kè":"可",
"zuǒ":"左",
"bù":"布步怖部埠",
"shí,dàn":"石",
"lóng":"龙聋隆咙胧窿",
"yà":"轧亚讶",
"miè":"灭蔑",
"píng":"平评凭瓶萍坪",
"dōng":"东冬",
"kǎ,qiǎ":"卡",
"běi,bèi":"北",
"yè":"业页夜液谒腋",
"jiù":"旧救就舅臼疚",
"shuài":"帅蟀",
"guī":"归规闺硅瑰",
"zhàn,zhān":"占",
"dàn":"旦但诞淡蛋氮",
"qiě,jū":"且",
"yè,xié":"叶",
"jiǎ":"甲钾",
"dīng":"叮盯",
"shēn":"申伸身深呻绅",
"hào,háo":"号",
"diàn":"电店垫殿玷淀惦奠",
"tián":"田甜恬",
"shǐ":"史使始驶矢屎",
"zhī,zhǐ":"只",
"yāng":"央殃秧鸯",
"diāo":"叼雕刁碉",
"jiào":"叫轿较窖酵",
"lìng":"另",
"dāo,tāo":"叨",
"sì":"四寺饲肆",
"tàn":"叹炭探碳",
"qiū":"丘秋蚯",
"hé":"禾河荷盒",
"fù":"付负妇附咐赴复傅富腹覆赋缚",
"dài":"代带贷怠袋逮戴",
"xiān":"仙先掀锨",
"yí":"仪宜姨移遗夷胰",
"bái":"白",
"zǎi,zǐ,zī":"仔",
"chì":"斥赤翅",
"tā":"他它塌",
"guā":"瓜刮",
"hū":"乎呼忽",
"cóng":"丛",
"lìng,líng,lǐng":"令",
"yòng":"用",
"shuǎi":"甩",
"yìn":"印",
"lè,yuè":"乐",
"jù,gōu":"句",
"cōng":"匆葱聪囱",
"fàn":"犯饭泛范贩",
"cè":"册厕测策",
"wài":"外",
"chù,chǔ":"处",
"niǎo":"鸟",
"bāo":"包胞苞褒",
"zhǔ":"主煮嘱拄",
"shǎn":"闪陕",
"lán":"兰拦栏蓝篮澜",
"tóu,tou":"头",
"huì":"汇绘贿惠慧讳诲晦秽",
"hàn":"汉旱捍悍焊撼翰憾",
"tǎo":"讨",
"xué":"穴学",
"xiě":"写",
"níng,nìng,zhù":"宁",
"ràng":"让",
"lǐ":"礼李里理鲤",
"xùn":"训讯迅汛驯逊殉",
"yǒng":"永咏泳勇蛹踊",
"mín":"民",
"chū":"出初",
"ní":"尼",
"sī":"司丝私斯撕嘶",
"liáo":"辽疗僚聊寥嘹缭",
"jiā":"加佳嘉枷",
"nú":"奴",
"zhào,shào":"召",
"biān":"边编鞭蝙",
"pí":"皮疲脾啤",
"yùn":"孕运韵酝蕴",
"fā,fà":"发",
"shèng":"圣胜剩",
"tái,tāi":"台苔",
"jiū":"纠究揪鸠",
"mǔ":"母亩牡拇姆",
"káng,gāng":"扛",
"xíng":"刑形型邢",
"dòng":"动冻栋洞",
"kǎo":"考烤拷",
"kòu":"扣寇",
"tuō":"托拖脱",
"lǎo":"老",
"gǒng":"巩汞拱",
"zhí":"执直侄值职植",
"kuò":"扩阔廓",
"yáng":"扬阳杨洋",
"dì,de":"地",
"sǎo,sào":"扫",
"chǎng,cháng":"场",
"ěr":"耳尔饵",
"máng":"芒忙盲茫",
"xiǔ":"朽",
"pǔ,pò,pō,piáo":"朴",
"quán":"权全泉拳痊",
"guò,guo,guō":"过",
"chén":"臣尘辰沉陈晨忱",
"zài":"再在",
"xié":"协胁斜携鞋谐",
"yā,yà":"压",
"yàn":"厌艳宴验雁焰砚唁谚堰",
"yǒu,yòu":"有",
"cún":"存",
"bǎi":"百摆",
"kuā,kuà":"夸",
"jiàng":"匠酱",
"duó":"夺踱",
"huī":"灰挥恢辉徽",
"dá":"达",
"sǐ":"死",
"liè":"列劣烈猎",
"guǐ":"轨鬼诡",
"xié,yá,yé,yú,xú":"邪",
"jiá,jiā,gā,xiá":"夹",
"chéng":"成呈诚承城程惩橙",
"mài":"迈麦卖",
"huà,huá":"划",
"zhì":"至志帜制质治致秩智置挚掷窒滞稚",
"cǐ":"此",
"zhēn":"贞针侦珍真斟榛",
"jiān":"尖奸歼坚肩艰兼煎",
"guāng":"光",
"dāng,dàng":"当",
"zǎo":"早枣澡蚤藻",
"tù,tǔ":"吐",
"xià,hè":"吓",
"chóng":"虫崇",
"tuán":"团",
"tóng,tòng":"同",
"qū,qǔ":"曲",
"diào":"吊钓掉",
"yīn":"因阴音姻茵",
"chī":"吃嗤痴",
"ma,má,mǎ":"吗",
"yǔ":"屿宇羽",
"fān":"帆翻",
"huí":"回茴蛔",
"qǐ,kǎi":"岂",
"zé":"则责",
"suì":"岁碎穗祟遂隧",
"ròu":"肉",
"zhū,shú":"朱",
"wǎng":"网往枉",
"nián":"年",
"diū":"丢",
"shé":"舌",
"zhú":"竹逐烛",
"qiáo":"乔侨桥瞧荞憔",
"wěi":"伟伪苇纬萎",
"chuán,zhuàn":"传",
"pāng":"乓",
"pīng":"乒",
"xiū,xǔ":"休",
"fú":"伏扶俘浮符幅福凫芙袱辐蝠",
"yōu":"优忧悠幽",
"yán":"延严言岩炎沿盐颜阎蜒檐",
"jiàn":"件建荐贱剑健舰践鉴键箭涧",
"rèn,rén":"任",
"huá,huà,huā":"华",
"jià,jiè,jie":"价",
"shāng":"伤商",
"fèn,bīn":"份",
"fǎng":"仿访纺",
"yǎng,áng":"仰",
"zì":"自字",
"xiě,xuè":"血",
"xiàng":"向项象像橡",
"sì,shì":"似",
"hòu":"后厚候",
"zhōu":"舟州周洲",
"háng,xíng":"行",
"huì,kuài":"会",
"shā":"杀纱杉砂",
"hé,gě":"合",
"zhào":"兆赵照罩",
"zhòng":"众仲",
"yé":"爷",
"sǎn":"伞",
"chuàng,chuāng":"创",
"duǒ":"朵躲",
"wēi":"危威微偎薇巍",
"xún":"旬寻巡询循",
"zá":"杂砸",
"míng":"名明鸣铭螟",
"duō":"多哆",
"zhēng":"争征睁筝蒸怔狰",
"sè":"色涩瑟",
"zhuàng":"壮状撞",
"chōng,chòng":"冲",
"bīng":"冰兵",
"zhuāng":"庄装妆桩",
"qìng":"庆",
"liú":"刘留流榴琉硫瘤",
"qí,jì,zī,zhāi":"齐",
"cì":"次赐",
"jiāo":"交郊浇娇骄胶椒焦蕉礁",
"chǎn":"产铲阐",
"wàng":"妄忘旺望",
"chōng":"充",
"wèn":"问",
"chuǎng":"闯",
"yáng,xiáng":"羊",
"bìng,bīng":"并",
"dēng":"灯登蹬",
"mǐ":"米",
"guān":"关官棺",
"hàn,hán":"汗",
"jué":"决绝掘诀爵",
"jiāng":"江姜僵缰",
"tāng,shāng":"汤",
"chí":"池驰迟持弛",
"xīng,xìng":"兴",
"zhái":"宅",
"ān":"安氨庵鞍",
"jiǎng":"讲奖桨蒋",
"jūn":"军均君钧",
"xǔ,hǔ":"许",
"fěng":"讽",
"lùn,lún":"论",
"nóng":"农浓脓",
"shè":"设社舍涉赦",
"nà,nǎ,nèi,nā":"那",
"jìn,jǐn":"尽",
"dǎo":"导岛蹈捣祷",
"sūn,xùn":"孙",
"zhèn":"阵振震镇",
"shōu":"收",
"fáng":"防妨房肪",
"rú":"如儒蠕",
"mā":"妈",
"xì,hū":"戏",
"hǎo,hào":"好",
"tā,jiě":"她",
"guān,guàn":"观冠",
"huān":"欢",
"hóng,gōng":"红",
"mǎi":"买",
"xiān,qiàn":"纤",
"jì,jǐ":"纪济",
"yuē,yāo":"约",
"shòu":"寿受授售兽瘦",
"nòng,lòng":"弄",
"jìn":"进近晋浸",
"wéi":"违围唯维桅",
"yuǎn,yuàn":"远",
"tūn":"吞",
"tán":"坛谈痰昙谭潭檀",
"fǔ":"抚斧府俯辅腐甫脯",
"huài,pēi,pī,péi":"坏",
"rǎo":"扰",
"pī":"批披坯霹",
"zhǎo":"找沼",
"chě":"扯",
"zǒu":"走",
"chāo":"抄钞超",
"bà":"坝爸霸",
"gòng":"贡",
"zhé,shé,zhē":"折",
"qiǎng,qiāng,chēng":"抢",
"zhuā":"抓",
"xiào":"孝笑效哮啸",
"pāo":"抛",
"tóu":"投",
"kàng":"抗炕",
"fén":"坟焚",
"kēng":"坑",
"dǒu":"抖陡蚪",
"ké,qiào":"壳",
"fāng,fáng":"坊",
"niǔ":"扭纽钮",
"kuài":"块快筷",
"bǎ,bà":"把",
"bào":"报抱爆豹",
"jié":"劫杰洁捷截竭",
"què":"却确鹊",
"huā":"花",
"fēn":"芬吩纷氛",
"qín":"芹琴禽勤秦擒",
"láo":"劳牢",
"lú":"芦炉卢庐颅",
"gān,gǎn":"杆",
"kè":"克刻客课",
"sū,sù":"苏",
"dù":"杜渡妒镀",
"gàng,gāng":"杠",
"cūn":"村",
"qiú":"求球囚",
"xìng":"杏幸性姓",
"gèng,gēng":"更",
"liǎng":"两",
"lì,lí":"丽",
"shù":"束述树竖恕庶墅漱",
"dòu":"豆逗痘",
"hái,huán":"还",
"fǒu,pǐ":"否",
"lái":"来莱",
"lián":"连怜帘莲联廉镰",
"xiàn,xuán":"县",
"zhù,chú":"助",
"dāi":"呆",
"kuàng":"旷况矿框眶",
"ya,yā":"呀",
"zú":"足族",
"dūn":"吨蹲墩",
"kùn":"困",
"nán":"男",
"chǎo,chāo":"吵",
"yuán,yún,yùn":"员",
"chuàn":"串",
"chuī":"吹炊",
"ba,bā":"吧",
"hǒu":"吼",
"gǎng":"岗",
"bié,biè":"别",
"dīng,dìng":"钉",
"gào":"告",
"wǒ":"我",
"luàn":"乱",
"tū":"秃突凸",
"xiù":"秀袖绣锈嗅",
"gū,gù":"估",
"měi":"每美",
"hé,hē,hè":"何",
"tǐ,tī,bèn":"体",
"bó,bǎi,bà":"伯",
"zuò":"作坐座做",
"líng":"伶灵铃陵零龄玲凌菱蛉翎",
"dī":"低堤滴",
"yòng,yōng":"佣",
"nǐ":"你拟",
"zhù":"住注驻柱祝铸贮蛀",
"zào":"皂灶造燥躁噪",
"fó,fú,bì,bó":"佛",
"chè":"彻撤澈",
"tuǒ":"妥椭",
"lín":"邻林临琳磷鳞",
"hán":"含寒函涵韩",
"chà":"岔衩",
"cháng":"肠尝常偿",
"dù,dǔ":"肚",
"guī,jūn,qiū":"龟",
"miǎn":"免勉娩冕缅",
"jiǎo,jué":"角",
"kuáng":"狂",
"tiáo,tiāo":"条",
"luǎn":"卵",
"yíng":"迎盈营蝇赢荧莹萤",
"xì,jì":"系",
"chuáng":"床",
"kù":"库裤酷",
"yìng,yīng":"应",
"lěng":"冷",
"zhè,zhèi":"这",
"xù":"序叙绪续絮蓄旭恤酗婿",
"xián":"闲贤弦咸衔嫌涎舷",
"jiān,jiàn":"间监",
"pàn":"判盼叛畔",
"mēn,mèn":"闷",
"wāng":"汪",
"dì,tì,tuí":"弟",
"shā,shà":"沙",
"shà,shā":"煞",
"càn":"灿",
"wò":"沃卧握",
"méi,mò":"没",
"gōu":"沟钩",
"shěn,chén":"沈",
"huái":"怀槐徊淮",
"sòng":"宋送诵颂讼",
"hóng":"宏虹洪鸿",
"qióng":"穷琼",
"zāi":"灾栽",
"liáng":"良梁粮粱",
"zhèng":"证郑政",
"bǔ":"补捕哺",
"sù":"诉肃素速塑粟溯",
"shí,zhì":"识",
"cí":"词辞慈磁祠瓷雌",
"zhěn":"诊枕疹",
"niào,suī":"尿",
"céng":"层",
"jú":"局菊橘",
"wěi,yǐ":"尾",
"zhāng":"张章彰樟",
"gǎi":"改",
"lù":"陆录鹿路赂",
"ē,ā":"阿",
"zǔ":"阻组祖诅",
"miào":"妙庙",
"yāo":"妖腰邀夭吆",
"nǔ":"努",
"jìn,jìng":"劲",
"rěn":"忍",
"qū":"驱屈岖蛆躯",
"chún":"纯唇醇",
"nà":"纳钠捺",
"bó":"驳脖博搏膊舶渤",
"zòng,zǒng":"纵",
"wén,wèn":"纹",
"lǘ":"驴",
"huán":"环",
"qīng":"青轻倾清蜻氢卿",
"xiàn":"现限线宪陷馅羡献腺",
"biǎo":"表",
"mǒ,mò,mā":"抹",
"lǒng":"拢垄",
"dān,dàn,dǎn":"担",
"bá":"拔跋",
"jiǎn":"拣茧俭捡检减剪简柬碱",
"tǎn":"坦毯袒",
"chōu":"抽",
"yā":"押鸦鸭",
"guǎi":"拐",
"pāi":"拍",
"zhě":"者",
"dǐng":"顶鼎",
"yōng":"拥庸",
"chāi,cā":"拆",
"dǐ":"抵",
"jū,gōu":"拘",
"lā":"垃",
"lā,lá":"拉",
"bàn,pàn":"拌",
"zhāo":"招昭",
"pō":"坡泼颇",
"bō":"拨波玻菠播",
"zé,zhái":"择",
"tái":"抬",
"qí,jī":"其奇",
"qǔ":"取娶",
"kǔ":"苦",
"mào":"茂贸帽貌",
"ruò,rě":"若",
"miáo":"苗描瞄",
"píng,pēng":"苹",
"yīng":"英樱鹰莺婴缨鹦",
"qié":"茄",
"jīng":"茎京经惊晶睛精荆兢鲸",
"zhī,qí":"枝",
"bēi":"杯悲碑卑",
"guì,jǔ":"柜",
"bǎn":"板版",
"sōng":"松",
"qiāng":"枪腔",
"gòu":"构购够垢",
"sàng,sāng":"丧",
"huà":"画话桦",
"huò":"或货获祸惑霍",
"cì,cī":"刺",
"yǔ,yù":"雨语",
"bēn,bèn":"奔",
"fèn":"奋粪愤忿",
"hōng":"轰烘",
"qī,qì":"妻",
"ōu":"欧殴鸥",
"qǐng":"顷请",
"zhuǎn,zhuàn,zhuǎi":"转",
"zhǎn":"斩盏展",
"ruǎn":"软",
"lún":"轮仑伦沦",
"dào":"到盗悼道稻",
"chǐ":"齿耻侈",
"kěn":"肯垦恳啃",
"hǔ":"虎",
"xiē,suò":"些",
"lǔ":"虏鲁卤",
"shèn":"肾渗慎",
"shàng":"尚",
"guǒ":"果裹",
"kūn":"昆坤",
"guó":"国",
"chāng":"昌猖",
"chàng":"畅唱",
"diǎn":"典点碘",
"gù":"固故顾雇",
"áng":"昂",
"zhōng":"忠终钟盅衷",
"ne,ní":"呢",
"àn":"岸按案暗",
"tiě,tiē,tiè,":"帖",
"luó":"罗萝锣箩骡螺逻",
"kǎi":"凯慨",
"lǐng,líng":"岭",
"bài":"败拜",
"tú":"图徒途涂屠",
"chuí":"垂锤捶",
"zhī,zhì":"知织",
"guāi":"乖",
"gǎn":"秆赶敢感橄",
"hé,hè,huó,huò,hú":"和",
"gòng,gōng":"供共",
"wěi,wēi":"委",
"cè,zè,zhāi":"侧",
"pèi":"佩配沛",
"pò,pǎi":"迫",
"de,dì,dí":"的",
"pá":"爬",
"suǒ":"所索锁琐",
"jìng":"径竞竟敬静境镜靖",
"mìng":"命",
"cǎi,cài":"采",
"niàn":"念",
"tān":"贪摊滩瘫",
"rǔ":"乳辱",
"pín":"贫",
"fū":"肤麸孵敷",
"fèi":"肺废沸费吠",
"zhǒng":"肿",
"péng":"朋棚蓬膨硼鹏澎篷",
"fú,fù":"服",
"féi":"肥",
"hūn":"昏婚荤",
"tù":"兔",
"hú":"狐胡壶湖蝴弧葫",
"gǒu":"狗苟",
"bǎo":"饱宝保",
"xiǎng":"享响想",
"biàn":"变遍辨辩辫",
"dǐ,de":"底",
"jìng,chēng":"净",
"fàng":"放",
"nào":"闹",
"zhá":"闸铡",
"juàn,juǎn":"卷",
"quàn,xuàn":"券",
"dān,shàn,chán":"单",
"chǎo":"炒",
"qiǎn,jiān":"浅",
"fǎ":"法",
"xiè,yì":"泄",
"lèi":"泪类",
"zhān":"沾粘毡瞻",
"pō,bó":"泊",
"pào,pāo":"泡",
"xiè":"泻卸屑械谢懈蟹",
"ní,nì":"泥",
"zé,shì":"泽",
"pà":"怕帕",
"guài":"怪",
"zōng":"宗棕踪",
"shěn":"审婶",
"zhòu":"宙昼皱骤咒",
"kōng,kòng,kǒng":"空",
"láng,làng":"郎",
"chèn":"衬趁",
"gāi":"该",
"xiáng,yáng":"详",
"lì,dài":"隶",
"jū":"居鞠驹",
"shuā,shuà":"刷",
"mèng":"孟梦",
"gū":"孤姑辜咕沽菇箍",
"jiàng,xiáng":"降",
"mèi":"妹昧媚",
"jiě":"姐",
"jià":"驾架嫁稼",
"cān,shēn,cēn,sān":"参",
"liàn":"练炼恋链",
"xì":"细隙",
"shào":"绍哨",
"tuó":"驼驮鸵",
"guàn":"贯惯灌罐",
"zòu":"奏揍",
"chūn":"春椿",
"bāng":"帮邦梆",
"dú,dài":"毒",
"guà":"挂卦褂",
"kuǎ":"垮",
"kuà,kū":"挎",
"náo":"挠",
"dǎng,dàng":"挡",
"shuān":"拴栓",
"tǐng":"挺艇",
"kuò,guā":"括",
"shí,shè":"拾",
"tiāo,tiǎo":"挑",
"wā":"挖蛙洼",
"pīn":"拼",
"shèn,shén":"甚",
"mǒu":"某",
"nuó":"挪",
"gé":"革阁格隔",
"xiàng,hàng":"巷",
"cǎo":"草",
"chá":"茶察茬",
"dàng":"荡档",
"huāng":"荒慌",
"róng":"荣绒容熔融茸蓉溶榕",
"nán,nā":"南",
"biāo":"标彪膘",
"yào":"药耀",
"kū":"枯哭窟",
"xiāng,xiàng":"相",
"chá,zhā":"查",
"liǔ":"柳",
"bǎi,bó,bò":"柏",
"yào,yāo":"要",
"wāi":"歪",
"yán,yàn":"研",
"lí":"厘狸离犁梨璃黎漓篱",
"qì,qiè":"砌",
"miàn":"面",
"kǎn":"砍坎",
"shuǎ":"耍",
"nài":"耐奈",
"cán":"残蚕惭",
"zhàn":"战站栈绽蘸",
"bèi,bēi":"背",
"lǎn":"览懒揽缆榄",
"shěng,xǐng":"省",
"xiāo,xuē":"削",
"zhǎ":"眨",
"hǒng,hōng,hòng":"哄",
"xiǎn":"显险",
"mào,mò":"冒",
"yǎ,yā":"哑",
"yìng":"映硬",
"zuó":"昨",
"xīng":"星腥猩",
"pā":"趴",
"guì":"贵桂跪刽",
"sī,sāi":"思",
"xiā":"虾瞎",
"mǎ,mā,mà":"蚂",
"suī":"虽",
"pǐn":"品",
"mà":"骂",
"huá,huā":"哗",
"yè,yàn,yān":"咽",
"zán,zǎ":"咱",
"hā,hǎ,hà":"哈",
"yǎo":"咬舀",
"nǎ,něi,na,né":"哪",
"hāi,ké":"咳",
"xiá":"峡狭霞匣侠暇辖",
"gǔ,gū":"骨",
"gāng,gàng":"钢",
"tiē":"贴",
"yào,yuè":"钥",
"kàn,kān":"看",
"jǔ":"矩举",
"zěn":"怎",
"xuǎn":"选癣",
"zhòng,zhǒng,chóng":"种",
"miǎo":"秒渺藐",
"kē":"科棵颗磕蝌",
"biàn,pián":"便",
"zhòng,chóng":"重",
"liǎ":"俩",
"duàn":"段断缎锻",
"cù":"促醋簇",
"shùn":"顺瞬",
"xiū":"修羞",
"sú":"俗",
"qīn":"侵钦",
"xìn,shēn":"信",
"huáng":"皇黄煌凰惶蝗蟥",
"zhuī,duī":"追",
"jùn":"俊峻骏竣",
"dài,dāi":"待",
"xū":"须虚需",
"hěn":"很狠",
"dùn":"盾顿钝",
"lǜ":"律虑滤氯",
"pén":"盆",
"shí,sì,yì":"食",
"dǎn":"胆",
"táo":"逃桃陶萄淘",
"pàng":"胖",
"mài,mò":"脉",
"dú":"独牍",
"jiǎo":"狡饺绞脚搅",
"yuàn":"怨院愿",
"ráo":"饶",
"wān":"弯湾豌",
"āi":"哀哎埃",
"jiāng,jiàng":"将浆",
"tíng":"亭庭停蜓廷",
"liàng":"亮谅辆晾",
"dù,duó":"度",
"chuāng":"疮窗",
"qīn,qìng":"亲",
"zī":"姿资滋咨",
"dì":"帝递第蒂缔",
"chà,chā,chāi,cī":"差",
"yǎng":"养氧痒",
"qián":"前钱钳潜黔",
"mí":"迷谜靡",
"nì":"逆昵匿腻",
"zhà,zhá":"炸",
"zǒng":"总",
"làn":"烂滥",
"pào,páo,bāo":"炮",
"tì":"剃惕替屉涕",
"sǎ,xǐ":"洒",
"zhuó":"浊啄灼茁卓酌",
"xǐ,xiǎn":"洗",
"qià":"洽恰",
"pài":"派湃",
"huó":"活",
"rǎn":"染",
"héng":"恒衡",
"hún":"浑魂",
"nǎo":"恼脑",
"jué,jiào":"觉",
"hèn":"恨",
"xuān":"宣轩喧",
"qiè":"窃怯",
"biǎn,piān":"扁",
"ǎo":"袄",
"shén":"神",
"shuō,shuì,yuè":"说",
"tuì":"退蜕",
"chú":"除厨锄雏橱",
"méi":"眉梅煤霉玫枚媒楣",
"hái":"孩",
"wá":"娃",
"lǎo,mǔ":"姥",
"nù":"怒",
"hè":"贺赫褐鹤",
"róu":"柔揉蹂",
"bǎng":"绑膀",
"lěi":"垒蕾儡",
"rào":"绕",
"gěi,jǐ":"给",
"luò":"骆洛",
"luò,lào":"络",
"tǒng":"统桶筒捅",
"gēng":"耕羹",
"hào":"耗浩",
"bān":"班般斑搬扳颁",
"zhū":"珠株诸猪蛛",
"lāo":"捞",
"fěi":"匪诽",
"zǎi,zài":"载",
"mái,mán":"埋",
"shāo,shào":"捎稍",
"zhuō":"捉桌拙",
"niē":"捏",
"kǔn":"捆",
"dū,dōu":"都",
"sǔn":"损笋",
"juān":"捐鹃",
"zhé":"哲辙",
"rè":"热",
"wǎn":"挽晚碗惋婉",
"ái,āi":"挨",
"mò,mù":"莫",
"è,wù,ě,wū":"恶",
"tóng":"桐铜童彤瞳",
"xiào,jiào":"校",
"hé,hú":"核",
"yàng":"样漾",
"gēn":"根跟",
"gē":"哥鸽割歌戈",
"chǔ":"础储楚",
"pò":"破魄",
"tào":"套",
"chái":"柴豺",
"dǎng":"党",
"mián":"眠绵棉",
"shài":"晒",
"jǐn":"紧锦谨",
"yūn,yùn":"晕",
"huàng,huǎng":"晃",
"shǎng":"晌赏",
"ēn":"恩",
"ài,āi":"唉",
"ā,á,ǎ,à,a":"啊",
"bà,ba,pí":"罢",
"zéi":"贼",
"tiě":"铁",
"zuàn,zuān":"钻",
"qiān,yán":"铅",
"quē":"缺",
"tè":"特",
"chéng,shèng":"乘",
"dí":"敌笛涤嘀嫡",
"zū":"租",
"chèng":"秤",
"mì,bì":"秘泌",
"chēng,chèn,chèng":"称",
"tòu":"透",
"zhài":"债寨",
"dào,dǎo":"倒",
"tǎng,cháng":"倘",
"chàng,chāng":"倡",
"juàn":"倦绢眷",
"chòu,xiù":"臭",
"shè,yè,yì":"射",
"xú":"徐",
"háng":"航杭",
"ná":"拿",
"wēng":"翁嗡",
"diē":"爹跌",
"ài":"爱碍艾隘",
"gē,gé":"胳搁",
"cuì":"脆翠悴粹",
"zàng":"脏葬",
"láng":"狼廊琅榔",
"féng":"逢",
"è":"饿扼遏愕噩鳄",
"shuāi,cuī":"衰",
"gāo":"高糕羔篙",
"zhǔn":"准",
"bìng":"病",
"téng":"疼腾誊藤",
"liáng,liàng":"凉量",
"táng":"唐堂塘膛糖棠搪",
"pōu":"剖",
"chù,xù":"畜",
"páng,bàng":"旁磅",
"lǚ":"旅屡吕侣铝缕履",
"fěn":"粉",
"liào":"料镣",
"shāo":"烧",
"yān":"烟淹",
"tāo":"涛掏滔",
"lào":"涝酪",
"zhè":"浙蔗",
"xiāo":"消宵销萧硝箫嚣",
"hǎi":"海",
"zhǎng,zhàng":"涨",
"làng":"浪",
"rùn":"润闰",
"tàng":"烫",
"yǒng,chōng":"涌",
"huǐ":"悔毁",
"qiāo,qiǎo":"悄",
"hài":"害亥骇",
"jiā,jia,jie":"家",
"kuān":"宽",
"bīn":"宾滨彬缤濒",
"zhǎi":"窄",
"lǎng":"朗",
"dú,dòu":"读",
"zǎi":"宰",
"shàn,shān":"扇",
"shān,shàn":"苫",
"wà":"袜",
"xiáng":"祥翔",
"shuí":"谁",
"páo":"袍咆",
"bèi,pī":"被",
"tiáo,diào,zhōu":"调",
"yuān":"冤鸳渊",
"bō,bāo":"剥",
"ruò":"弱",
"péi":"陪培赔",
"niáng":"娘",
"tōng":"通",
"néng,nài":"能",
"nán,nàn,nuó":"难",
"sāng":"桑",
"pěng":"捧",
"dǔ":"堵赌睹",
"yǎn":"掩眼演衍",
"duī":"堆",
"pái,pǎi":"排",
"tuī":"推",
"jiào,jiāo":"教",
"lüè":"掠略",
"jù,jū":"据",
"kòng":"控",
"zhù,zhuó,zhe":"著",
"jūn,jùn":"菌",
"lè,lēi":"勒",
"méng":"萌盟檬朦",
"cài":"菜",
"tī":"梯踢剔",
"shāo,sào":"梢",
"fù,pì":"副",
"piào,piāo":"票",
"shuǎng":"爽",
"shèng,chéng":"盛",
"què,qiāo,qiǎo":"雀",
"xuě":"雪",
"chí,shi":"匙",
"xuán":"悬玄漩",
"mī,mí":"眯",
"la,lā":"啦",
"shé,yí":"蛇",
"lèi,léi,lěi":"累",
"zhǎn,chán":"崭",
"quān,juàn,juān":"圈",
"yín":"银吟淫",
"bèn":"笨",
"lóng,lǒng":"笼",
"mǐn":"敏皿闽悯",
"nín":"您",
"ǒu":"偶藕",
"tōu":"偷",
"piān":"偏篇翩",
"dé,děi,de":"得",
"jiǎ,jià":"假",
"pán":"盘",
"chuán":"船",
"cǎi":"彩睬踩",
"lǐng":"领",
"liǎn":"脸敛",
"māo,máo":"猫",
"měng":"猛锰",
"cāi":"猜",
"háo":"毫豪壕嚎",
"má":"麻",
"guǎn":"馆管",
"còu":"凑",
"hén":"痕",
"kāng":"康糠慷",
"xuán,xuàn":"旋",
"zhe,zhuó,zháo,zhāo":"着",
"lǜ,shuài":"率",
"gài,gě,hé":"盖",
"cū":"粗",
"lín,lìn":"淋",
"qú,jù":"渠",
"jiàn,jiān":"渐溅",
"hùn,hún":"混",
"pó":"婆",
"qíng":"情晴擎",
"cǎn":"惨",
"sù,xiǔ,xiù":"宿",
"yáo":"窑谣摇遥肴姚",
"móu":"谋",
"mì":"密蜜觅",
"huǎng":"谎恍幌",
"tán,dàn":"弹",
"suí":"随",
"yǐn,yìn":"隐",
"jǐng,gěng":"颈",
"shéng":"绳",
"qí":"骑棋旗歧祈脐畦崎鳍",
"chóu":"绸酬筹稠愁畴",
"lǜ,lù":"绿",
"dā":"搭",
"kuǎn":"款",
"tǎ":"塔",
"qū,cù":"趋",
"tí,dī,dǐ":"提",
"jiē,qì":"揭",
"xǐ":"喜徙",
"sōu":"搜艘",
"chā":"插",
"lǒu,lōu":"搂",
"qī,jī":"期",
"rě":"惹",
"sàn,sǎn":"散",
"dǒng":"董懂",
"gě,gé":"葛",
"pú":"葡菩蒲",
"zhāo,cháo":"朝",
"luò,là,lào":"落",
"kuí":"葵魁",
"bàng":"棒傍谤",
"yǐ,yī":"椅",
"sēn":"森",
"gùn,hùn":"棍",
"bī":"逼",
"zhí,shi":"殖",
"xià,shà":"厦",
"liè,liě":"裂",
"xióng":"雄熊",
"zàn":"暂赞",
"yǎ":"雅",
"chǎng":"敞",
"zhǎng":"掌",
"shǔ":"暑鼠薯黍蜀署曙",
"zuì":"最罪醉",
"hǎn":"喊罕",
"jǐng,yǐng":"景",
"lǎ":"喇",
"pēn,pèn":"喷",
"pǎo,páo":"跑",
"chuǎn":"喘",
"hē,hè,yè":"喝",
"hóu":"喉猴",
"pù,pū":"铺",
"hēi":"黑",
"guō":"锅郭",
"ruì":"锐瑞",
"duǎn":"短",
"é":"鹅额讹俄",
"děng":"等",
"kuāng":"筐",
"shuì":"税睡",
"zhù,zhú":"筑",
"shāi":"筛",
"dá,dā":"答",
"ào":"傲澳懊",
"pái":"牌徘",
"bǎo,bǔ,pù":"堡",
"ào,yù":"奥",
"fān,pān":"番",
"là,xī":"腊",
"huá":"猾滑",
"rán":"然燃",
"chán":"馋缠蝉",
"mán":"蛮馒",
"tòng":"痛",
"shàn":"善擅膳赡",
"zūn":"尊遵",
"pǔ":"普谱圃浦",
"gǎng,jiǎng":"港",
"céng,zēng":"曾",
"wēn":"温瘟",
"kě":"渴",
"zhā":"渣",
"duò":"惰舵跺",
"gài":"溉概丐钙",
"kuì":"愧",
"yú,tōu":"愉",
"wō":"窝蜗",
"cuàn":"窜篡",
"qún":"裙群",
"qiáng,qiǎng,jiàng":"强",
"shǔ,zhǔ":"属",
"zhōu,yù":"粥",
"sǎo":"嫂",
"huǎn":"缓",
"piàn":"骗",
"mō":"摸",
"shè,niè":"摄",
"tián,zhèn":"填",
"gǎo":"搞稿镐",
"suàn":"蒜算",
"méng,mēng,měng":"蒙",
"jìn,jīn":"禁",
"lóu":"楼娄",
"lài":"赖癞",
"lù,liù":"碌",
"pèng":"碰",
"léi":"雷",
"báo":"雹",
"dū":"督",
"nuǎn":"暖",
"xiē":"歇楔蝎",
"kuà":"跨胯",
"tiào,táo":"跳",
"é,yǐ":"蛾",
"sǎng":"嗓",
"qiǎn":"遣谴",
"cuò":"错挫措锉",
"ǎi":"矮蔼",
"shǎ":"傻",
"cuī":"催摧崔",
"tuǐ":"腿",
"chù":"触矗",
"jiě,jiè,xiè":"解",
"shù,shǔ,shuò":"数",
"mǎn":"满",
"liū,liù":"溜",
"gǔn":"滚",
"sāi,sài,sè":"塞",
"pì,bì":"辟",
"dié":"叠蝶谍碟",
"fèng,féng":"缝",
"qiáng":"墙",
"piě,piē":"撇",
"zhāi":"摘斋",
"shuāi":"摔",
"mó,mú":"模",
"bǎng,bàng":"榜",
"zhà":"榨乍诈",
"niàng":"酿",
"zāo":"遭糟",
"suān":"酸",
"shang,cháng":"裳",
"sòu":"嗽",
"là":"蜡辣",
"qiāo":"锹敲跷",
"zhuàn":"赚撰",
"wěn":"稳吻紊",
"bí":"鼻荸",
"mó":"膜魔馍摹蘑",
"xiān,xiǎn":"鲜",
"yí,nǐ":"疑",
"gāo,gào":"膏",
"zhē":"遮",
"duān":"端",
"màn":"漫慢曼幔",
"piāo,piào,piǎo":"漂",
"lòu":"漏陋",
"sài":"赛",
"nèn":"嫩",
"dèng":"凳邓瞪",
"suō,sù":"缩",
"qù,cù":"趣",
"sā,sǎ":"撒",
"tàng,tāng":"趟",
"chēng":"撑",
"zēng":"增憎",
"cáo":"槽曹",
"héng,hèng":"横",
"piāo":"飘",
"mán,mén":"瞒",
"tí":"题蹄啼",
"yǐng":"影颖",
"bào,pù":"暴",
"tà":"踏蹋",
"kào":"靠铐",
"pì":"僻屁譬",
"tǎng":"躺",
"dé":"德",
"mó,mā":"摩",
"shú":"熟秫赎",
"hú,hū,hù":"糊",
"pī,pǐ":"劈",
"cháo":"潮巢",
"cāo":"操糙",
"yàn,yān":"燕",
"diān":"颠掂",
"báo,bó,bò":"薄",
"cān":"餐",
"xǐng":"醒",
"zhěng":"整拯",
"zuǐ":"嘴",
"zèng":"赠",
"mó,mò":"磨",
"níng":"凝狞柠",
"jiǎo,zhuó":"缴",
"cā":"擦",
"cáng,zàng":"藏",
"fán,pó":"繁",
"bì,bei":"臂",
"bèng":"蹦泵",
"pān":"攀潘",
"chàn,zhàn":"颤",
"jiāng,qiáng":"疆",
"rǎng":"壤攘",
"jiáo,jué,jiào":"嚼",
"rǎng,rāng":"嚷",
"chǔn":"蠢",
"lù,lòu":"露",
"náng,nāng":"囊",
"dǎi":"歹",
"rǒng":"冗",
"hāng,bèn":"夯",
"āo,wā":"凹",
"féng,píng":"冯",
"yū":"迂淤",
"xū,yù":"吁",
"lèi,lē":"肋",
"kōu":"抠",
"lūn,lún":"抡",
"jiè,gài":"芥",
"xīn,xìn":"芯",
"chā,chà":"杈",
"xiāo,xiào":"肖",
"zhī,zī":"吱",
"ǒu,ōu,òu":"呕",
"nà,nè":"呐",
"qiàng,qiāng":"呛",
"tún,dùn":"囤",
"kēng,háng":"吭",
"shǔn":"吮",
"diàn,tián":"佃",
"sì,cì":"伺",
"zhǒu":"肘帚",
"diàn,tián,shèng":"甸",
"páo,bào":"刨",
"lìn":"吝赁躏",
"duì,ruì,yuè":"兑",
"zhuì":"坠缀赘",
"kē,kě":"坷",
"tuò,tà,zhí":"拓",
"fú,bì":"拂",
"nǐng,níng,nìng":"拧",
"ào,ǎo,niù":"拗",
"kē,hē":"苛",
"yān,yǎn":"奄",
"hē,a,kē":"呵",
"gā,kā":"咖",
"biǎn":"贬匾",
"jiǎo,yáo":"侥",
"chà,shā":"刹",
"āng":"肮",
"wèng":"瓮",
"nüè,yào":"疟",
"páng":"庞螃",
"máng,méng":"氓",
"gē,yì":"疙",
"jǔ,jù":"沮",
"zú,cù":"卒",
"nìng":"泞",
"chǒng":"宠",
"wǎn,yuān":"宛",
"mí,mǐ":"弥",
"qì,qiè,xiè":"契",
"xié,jiā":"挟",
"duò,duǒ":"垛",
"jiá":"荚颊",
"zhà,shān,shi,cè":"栅",
"bó,bèi":"勃",
"zhóu,zhòu":"轴",
"nüè":"虐",
"liē,liě,lié,lie":"咧",
"dǔn":"盹",
"xūn":"勋",
"yo,yō":"哟",
"mī":"咪",
"qiào,xiào":"俏",
"hóu,hòu":"侯",
"pēi":"胚",
"tāi":"胎",
"luán":"峦",
"sà":"飒萨",
"shuò":"烁",
"xuàn":"炫",
"píng,bǐng":"屏",
"nà,nuó":"娜",
"pá,bà":"耙",
"gěng":"埂耿梗",
"niè":"聂镊孽",
"mǎng":"莽",
"qī,xī":"栖",
"jiǎ,gǔ":"贾",
"chěng":"逞",
"pēng":"砰烹",
"láo,lào":"唠",
"bàng,bèng":"蚌",
"gōng,zhōng":"蚣",
"li,lǐ,lī":"哩",
"suō":"唆梭嗦",
"hēng":"哼",
"zāng":"赃",
"qiào":"峭窍撬",
"mǎo":"铆",
"ǎn":"俺",
"sǒng":"耸",
"juè,jué":"倔",
"yīn,yān,yǐn":"殷",
"guàng":"逛",
"něi":"馁",
"wō,guō":"涡",
"lào,luò":"烙",
"nuò":"诺懦糯",
"zhūn":"谆",
"niǎn,niē":"捻",
"qiā":"掐",
"yè,yē":"掖",
"chān,xiān,càn,shǎn":"掺",
"dǎn,shàn":"掸",
"fēi,fěi":"菲",
"qián,gān":"乾",
"shē":"奢赊",
"shuò,shí":"硕",
"luō,luó,luo":"啰",
"shá":"啥",
"hǔ,xià":"唬",
"tuò":"唾",
"bēng":"崩",
"dāng,chēng":"铛",
"xiǎn,xǐ":"铣",
"jiǎo,jiáo":"矫",
"tiáo":"笤",
"kuǐ,guī":"傀",
"xìn":"衅",
"dōu":"兜",
"jì,zhài":"祭",
"xiáo":"淆",
"tǎng,chǎng":"淌",
"chún,zhūn":"淳",
"shuàn":"涮",
"dāng":"裆",
"wèi,yù":"尉",
"duò,huī":"堕",
"chuò,chāo":"绰",
"bēng,běng,bèng":"绷",
"zōng,zèng":"综",
"zhuó,zuó":"琢",
"chuǎi,chuài,chuāi,tuán,zhuī":"揣",
"péng,bāng":"彭",
"chān":"搀",
"cuō":"搓",
"sāo":"搔",
"yē":"椰",
"zhuī,chuí":"椎",
"léng,lēng,líng":"棱",
"hān":"酣憨",
"sū":"酥",
"záo":"凿",
"qiào,qiáo":"翘",
"zhā,chā":"喳",
"bǒ":"跛",
"há,gé":"蛤",
"qiàn,kàn":"嵌",
"bāi":"掰",
"yān,ā":"腌",
"wàn":"腕",
"dūn,duì":"敦",
"kuì,huì":"溃",
"jiǒng":"窘",
"sāo,sǎo":"骚",
"pìn":"聘",
"bǎ":"靶",
"xuē":"靴薛",
"hāo":"蒿",
"léng":"楞",
"kǎi,jiē":"楷",
"pín,bīn":"频",
"zhuī":"锥",
"tuí":"颓",
"sāi":"腮",
"liú,liù":"馏",
"nì,niào":"溺",
"qǐn":"寝",
"luǒ":"裸",
"miù":"谬",
"jiǎo,chāo":"剿",
"áo,āo":"熬",
"niān":"蔫",
"màn,wàn":"蔓",
"chá,chā":"碴",
"xūn,xùn":"熏",
"tiǎn":"舔",
"sēng":"僧",
"da,dá":"瘩",
"guǎ":"寡",
"tuì,tùn":"褪",
"niǎn":"撵碾",
"liáo,liāo":"撩",
"cuō,zuǒ":"撮",
"ruǐ":"蕊",
"cháo,zhāo":"嘲",
"biē":"憋鳖",
"hēi,mò":"嘿",
"zhuàng,chuáng":"幢",
"jī,qǐ":"稽",
"lǒu":"篓",
"lǐn":"凛檩",
"biě,biē":"瘪",
"liáo,lào,lǎo":"潦",
"chéng,dèng":"澄",
"lèi,léi":"擂",
"piáo":"瓢",
"shà":"霎",
"mò,má":"蟆",
"qué":"瘸",
"liáo,liǎo":"燎",
"liào,liǎo":"瞭",
"sào,sāo":"臊",
"mí,méi":"糜",
"ái":"癌",
"tún":"臀",
"huò,huō,huá":"豁",
"pù,bào":"瀑",
"chuō":"戳",
"zǎn,cuán":"攒",
"cèng":"蹭",
"bò,bǒ":"簸",
"bó,bù":"簿",
"bìn":"鬓",
"suǐ":"髓",
"ráng":"瓤",
};


/***/ }),

/***/ 815:
/***/ (function(module, exports) {

// 带音标字符。
module.exports = {
  "ā": "a1",
  "á": "a2",
  "ǎ": "a3",
  "à": "a4",
  "ē": "e1",
  "é": "e2",
  "ě": "e3",
  "è": "e4",
  "ō": "o1",
  "ó": "o2",
  "ǒ": "o3",
  "ò": "o4",
  "ī": "i1",
  "í": "i2",
  "ǐ": "i3",
  "ì": "i4",
  "ū": "u1",
  "ú": "u2",
  "ǔ": "u3",
  "ù": "u4",
  "ü": "v0",
  "ǘ": "v2",
  "ǚ": "v3",
  "ǜ": "v4",
  "ń": "n2",
  "ň": "n3",
  "": "m2",
};


/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assign = __webpack_require__(869);
// XXX: Symbol when web support.
const PINYIN_STYLE = {
  NORMAL: 0,       // 普通风格，不带音标。
  TONE: 1,         // 标准风格，音标在韵母的第一个字母上。
  TONE2: 2,        // 声调以数字形式在拼音之后，使用数字 0~4 标识。
  TO3NE: 5,        // 声调以数字形式在声母之后，使用数字 0~4 标识。
  INITIALS: 3,     // 仅需要声母部分。
  FIRST_LETTER: 4, // 仅保留首字母。
};
const DEFAULT_OPTIONS = {
  style: PINYIN_STYLE.TONE, // 风格
  segment: false,           // 分词。
  heteronym: false,         // 多音字
};

// 声母表。
const INITIALS = "b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,zh,ch,sh,z,c,s".split(",");
// 韵母表。
//const FINALS = "ang,eng,ing,ong,an,en,in,un,er,ai,ei,ui,ao,ou,iu,ie,ve,a,o,e,i,u,v".split(",");
// 带音标字符。
const PHONETIC_SYMBOL = __webpack_require__(815);
const RE_PHONETIC_SYMBOL = new RegExp("([" + Object.keys(PHONETIC_SYMBOL).join("") + "])", "g");
const RE_TONE2 = /([aeoiuvnm])([0-4])$/;

/*
 * 格式化拼音为声母（Initials）形式。
 * @param {String}
 * @return {String}
 */
function initials(pinyin) {
  for (let i = 0, l = INITIALS.length; i < l; i++){
    if (pinyin.indexOf(INITIALS[i]) === 0) {
      return INITIALS[i];
    }
  }
  return "";
}

class Pinyin {
  constructor (dict) {
    this._dict = dict;
  }

  // @param {String} hans 要转为拼音的目标字符串（汉字）。
  // @param {Object} options, 可选，用于指定拼音风格，是否启用多音字。
  // @return {Array} 返回的拼音列表。
  convert (hans, options) {

    if (typeof hans !== "string") {
      return [];
    }

    options = assign({}, DEFAULT_OPTIONS, options);

    let pys = [];
    let nohans = "";

    for(let i = 0, firstCharCode, words, l = hans.length; i < l; i++){

      words = hans[i];
      firstCharCode = words.charCodeAt(0);

      if(this._dict[firstCharCode]){

        // ends of non-chinese words.
        if(nohans.length > 0){
          pys.push([nohans]);
          nohans = ""; // reset non-chinese words.
        }

        pys.push(this.single_pinyin(words, options));

      }else{
        nohans += words;
      }
    }

    // 清理最后的非中文字符串。
    if(nohans.length > 0){
      pys.push([nohans]);
      nohans = ""; // reset non-chinese words.
    }
    return pys;
  }

  // 单字拼音转换。
  // @param {String} han, 单个汉字
  // @return {Array} 返回拼音列表，多音字会有多个拼音项。
  single_pinyin (han, options) {

    if (typeof han !== "string") {
      return [];
    }
    if (han.length !== 1) {
      return this.single_pinyin(han.charAt(0), options);
    }

    let hanCode = han.charCodeAt(0);

    if (!this._dict[hanCode]) {
      return [han];
    }

    let pys = this._dict[hanCode].split(",");
    if(!options.heteronym){
      return [Pinyin.toFixed(pys[0], options.style)];
    }

    // 临时存储已存在的拼音，避免多音字拼音转换为非注音风格出现重复。
    let py_cached = {};
    let pinyins = [];
    for(let i = 0, py, l = pys.length; i < l; i++){
      py = Pinyin.toFixed(pys[i], options.style);
      if(py_cached.hasOwnProperty(py)){
        continue;
      }
      py_cached[py] = py;

      pinyins.push(py);
    }
    return pinyins;
  }

  /**
   * 格式化拼音风格。
   *
   * @param {String} pinyin TONE 风格的拼音。
   * @param {ENUM} style 目标转换的拼音风格。
   * @return {String} 转换后的拼音。
   */
  static toFixed (pinyin, style) {
    let tone = ""; // 声调。
    let first_letter;
    let py;
    switch(style){
    case PINYIN_STYLE.INITIALS:
      return initials(pinyin);

    case PINYIN_STYLE.FIRST_LETTER:
      first_letter = pinyin.charAt(0);
      if (PHONETIC_SYMBOL.hasOwnProperty(first_letter)) {
        first_letter = PHONETIC_SYMBOL[first_letter].charAt(0);
      }
      return first_letter;

    case PINYIN_STYLE.NORMAL:
      return pinyin.replace(RE_PHONETIC_SYMBOL, (function($0, $1_phonetic){
        return PHONETIC_SYMBOL[$1_phonetic].replace(RE_TONE2, "$1");
      }));

    case PINYIN_STYLE.TO3NE:
      return pinyin.replace(RE_PHONETIC_SYMBOL, (function($0, $1_phonetic){
        return PHONETIC_SYMBOL[$1_phonetic];
      }));

    case PINYIN_STYLE.TONE2:
      py = pinyin.replace(RE_PHONETIC_SYMBOL, (function($0, $1){
        // 声调数值。
        tone = PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$2");

        return PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$1");
      }));
      return py + tone;

    case PINYIN_STYLE.TONE:
    default:
      return pinyin;
    }
  }

  /**
   * 比较两个汉字转成拼音后的排序顺序，可以用作默认的拼音排序算法。
   *
   * @param {String} hanA 汉字字符串 A。
   * @return {String} hanB 汉字字符串 B。
   * @return {Number} 返回 -1，0，或 1。
   */
  compare (hanA, hanB) {
    const pinyinA = this.convert(hanA, DEFAULT_OPTIONS);
    const pinyinB = this.convert(hanB, DEFAULT_OPTIONS);
    return String(pinyinA).localeCompare(pinyinB);
  }

  static get STYLE_NORMAL () {
    return PINYIN_STYLE.NORMAL;
  }
  static get STYLE_TONE () {
    return PINYIN_STYLE.TONE;
  }
  static get STYLE_TONE2 () {
    return PINYIN_STYLE.TONE2;
  }
  static get STYLE_TO3NE () {
    return PINYIN_STYLE.TO3NE;
  }
  static get STYLE_INITIALS () {
    return PINYIN_STYLE.INITIALS;
  }
  static get STYLE_FIRST_LETTER () {
    return PINYIN_STYLE.FIRST_LETTER;
  }
  static get DEFAULT_OPTIONS () {
    return DEFAULT_OPTIONS;
  }
}

module.exports = Pinyin;


/***/ }),

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 解压拼音库。
// @param {Object} dict_combo, 压缩的拼音库。
// @param {Object} 解压的拼音库。
function buildPinyinCache(dict_combo){
  let hans;
  let uncomboed = {};

  for(let py in dict_combo){
    hans = dict_combo[py];
    for(let i = 0, han, l = hans.length; i < l; i++){
      han = hans.charCodeAt(i);
      if(!uncomboed.hasOwnProperty(han)){
        uncomboed[han] = py;
      }else{
        uncomboed[han] += "," + py;
      }
    }
  }

  return uncomboed;
}

const PINYIN_DICT = buildPinyinCache(__webpack_require__(814));
const Pinyin = __webpack_require__(816);
const pinyin = new Pinyin(PINYIN_DICT);

module.exports = pinyin.convert.bind(pinyin);
module.exports.compare = pinyin.compare.bind(pinyin);
module.exports.STYLE_NORMAL = Pinyin.STYLE_NORMAL;
module.exports.STYLE_TONE = Pinyin.STYLE_TONE;
module.exports.STYLE_TONE2 = Pinyin.STYLE_TONE2;
module.exports.STYLE_TO3NE = Pinyin.STYLE_TO3NE;
module.exports.STYLE_INITIALS = Pinyin.STYLE_INITIALS;
module.exports.STYLE_FIRST_LETTER = Pinyin.STYLE_FIRST_LETTER;


/***/ }),

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(84);
var router_guard_service_1 = __webpack_require__(287);
exports.ROUTES = [{
        path: 'login',
        loadChildren: function() { return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 1132))  .then( (function(module) { return module['LoginModule']; }) ); }
    }, {
        path: 'register',
        loadChildren: function() { return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 1135))  .then( (function(module) { return module['RegisterModule']; }) ); }
    }, {
        path: 'main',
        canActivate: [router_guard_service_1.default],
        loadChildren: function() { return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 1133))  .then( (function(module) { return module['MainModule']; }) ); }
    }, {
        path: 'list',
        loadChildren: function() { return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 1131))  .then( (function(module) { return module['ListModule']; }) ); }
    }, {
        path: 'map/:pointer',
        loadChildren: function() { return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 1134))  .then( (function(module) { return module['MapModule']; }) ); }
    }, {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }];
exports.routing = router_1.RouterModule.forRoot(exports.ROUTES, {
    useHash: true
});


/***/ }),

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.chatAction = {
    changeActivePerson: '[chat] change active person',
    deleteConversationItem: '[chat] delete conversation item',
    receiveMessage: '[chat] receive message',
    sendSinglePic: '[chat] send single picture',
    sendGroupPic: '[chat] send group pic',
    sendSingleFile: '[chat send single file',
    sendGroupFile: 'send group file',
    sendSingleMessage: '[chat] send single message',
    sendGroupMessage: '[chat] send group message',
    sendMsgComplete: 'send message complete',
    getConversation: '[chat] get conversation',
    getConversationSuccess: '[chat] get conversation success',
    getAllMessage: '[chat] get all message',
    getAllMessageSuccess: '[chat] get all message success',
    getResourceUrl: '[chat] get resource url',
    getResourceUrlSuccess: '[chat] get resource url success',
    saveDraft: '[chat] save draft',
    watchOtherInfo: '[chat] watch other info',
    watchOtherInfoSuccess: '[chat] watch other info success',
    hideOtherInfo: '[chat] hide other info',
    groupSetting: '[chat] group setting',
    groupInfo: '[chat] group info',
    searchUserSuccess: '[chat] search user success',
    getSourceUrl: '[chat] get source url',
    dispatchConversationList: '[chat] dispatch conversation list',
    groupDescription: '[chat] group description',
    groupName: '[chat] group name',
    updateGroupInfo: '[chat] update group info',
    getMemberAvatarUrl: '[chat] get member avatar url',
    getSingleAvatarUrl: '[chat] get single avatar url',
    changeNoDisturb: '[chat] change no disturb',
    changeNoDisturbSuccess: '[chat] change no disturb success',
    createOtherChat: '[chat] create other chat'
};


/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(65);
var effects_1 = __webpack_require__(97);
var store_1 = __webpack_require__(64);
var router_1 = __webpack_require__(84);
var common_1 = __webpack_require__(116);
var actions_1 = __webpack_require__(148);
var util_1 = __webpack_require__(212);
// const storageKey = 'msgId' + global.user;
var ChatEffect = (function () {
    function ChatEffect(actions$, store$, router, storageService) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.router = router;
        this.storageService = storageService;
        this.util = new util_1.Util();
        // 获取会话列表
        this.getConversation$ = this.actions$
            .ofType(actions_1.chatAction.getConversation)
            .map(effects_1.toPayload)
            .switchMap((function () {
            var that = _this, conversationObj = common_1.global.JIM.getConversation()
                .onSuccess((function (info) {
                console.log('会话列表', info.conversations);
                info.conversations = info.conversations.reverse();
                that.store$.dispatch({
                    type: actions_1.chatAction.getConversationSuccess,
                    payload: {
                        conversation: info.conversations
                    }
                });
                var msgId = JSON.parse(that.storageService.get('msgId' + common_1.global.user));
                that.store$.dispatch({
                    type: actions_1.chatAction.getAllMessageSuccess,
                    payload: {
                        storage: true,
                        msgId: msgId
                    }
                });
                var _loop_1 = function (i) {
                    if (info.conversations[i].avatar && info.conversations[i].avatar !== '' && info.conversations[i].type === 3) {
                        common_1.global.JIM.getResource({ 'media_id': info.conversations[i].avatar })
                            .onSuccess((function (urlInfo) {
                            info.conversations[i].avatarUrl = urlInfo.url;
                            that.store$.dispatch({
                                type: actions_1.chatAction.getConversationSuccess,
                                payload: {
                                    conversation: info.conversations
                                }
                            });
                        })).onFail((function (error) {
                        }));
                    }
                };
                // 获取头像url
                for (var i = 0; i < info.conversations.length; i++) {
                    _loop_1(i);
                }
                // 获取免打扰列表
                common_1.global.JIM.getNoDisturb()
                    .onSuccess((function (data) {
                    console.log('noDisturbObj:', data);
                    that.store$.dispatch({
                        type: actions_1.chatAction.getConversationSuccess,
                        payload: {
                            noDisturb: data.no_disturb
                        }
                    });
                })).onFail((function (data) {
                    console.log('error:' + JSON.stringify(data));
                }));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(conversationObj)
                .map((function () {
                return { type: '[chat] get conversation useless' };
            }));
        }));
        // 获取messageList 图片消息url
        this.getSourceUrl$ = this.actions$
            .ofType(actions_1.chatAction.getSourceUrl)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this, resourceArray = [], msg = info.messageList[info.active.activeIndex].msgs;
            var _loop_2 = function (i) {
                var msgBody = msg[i].content.msg_body;
                if (msgBody.media_id && !msgBody.media_url) {
                    common_1.global.JIM.getResource({ 'media_id': msgBody.media_id })
                        .onSuccess((function (urlInfo) {
                        msg[i].content.msg_body.media_url = urlInfo.url;
                        that.store$.dispatch({
                            type: actions_1.chatAction.getAllMessageSuccess,
                            payload: info.messageList
                        });
                    })).onFail((function (error) {
                        msg[i].content.msg_body.media_url = '';
                        that.store$.dispatch({
                            type: actions_1.chatAction.getAllMessageSuccess,
                            payload: info.messageList
                        });
                    }));
                }
            };
            for (var i = 0; i < msg.length; i++) {
                _loop_2(i);
            }
            return rxjs_1.Observable.of('getSourceUrl')
                .map((function () {
                return { type: '[chat] get source url useless' };
            }));
        }));
        // 获取messageList avatar url
        this.getMemberAvatarUrl$ = this.actions$
            .ofType(actions_1.chatAction.getMemberAvatarUrl)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this, msg = info.messageList[info.active.activeIndex].msgs;
            var _loop_3 = function (i) {
                if (msg[i].content.msg_body.extras) {
                    common_1.global.JIM.getResource({ 'media_id': msg[i].content.msg_body.extras.media_id })
                        .onSuccess((function (urlInfo) {
                        msg[i].content.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: actions_1.chatAction.getAllMessageSuccess,
                            payload: info.messageList
                        });
                    })).onFail((function (error) {
                    }));
                }
            };
            for (var i = 0; i < msg.length; i++) {
                _loop_3(i);
            }
            return rxjs_1.Observable.of('getMemberAvatarUrl')
                .map((function () {
                return { type: '[chat] get member avatar url useless' };
            }));
        }));
        // 获取所有漫游同步消息及资源路径
        this.getAllMessage$ = this.actions$
            .ofType(actions_1.chatAction.getAllMessage)
            .map(effects_1.toPayload)
            .map((function (data) {
            var that = _this;
            // let count = 0,
            //     resourceArray = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].msgs.length; j++) {
                    if (j + 1 < data[i].msgs.length || data[i].msgs.length === 1) {
                        var index = void 0;
                        if (j === 0) {
                            index = 0;
                        }
                        else {
                            index = j + 1;
                        }
                        var time = new Date(data[i].msgs[index].ctime_ms), timeGap = (time.getTime() - data[i].msgs[j].ctime_ms) / 1000 / 60;
                        if (timeGap > 5 || j === 0) {
                            data[i].msgs[index].time_show = _this.util.reducerDate(data[i].msgs[index].ctime_ms);
                            // let now = new Date(),
                            //     msgYear = time.getFullYear(),
                            //     nowYear = now.getFullYear(),
                            //     msgMonth = time.getMonth() + 1,
                            //     nowMonth = now.getMonth() + 1,
                            //     msgDate = time.getDate(),
                            //     nowDate = now.getDate(),
                            //     msgDay = time.getDay();
                            // if(msgYear !== nowYear){
                            //     data[i].msgs[index].time_show = 'year';                                
                            // }else if(msgMonth !== nowMonth || (msgMonth === nowMonth && nowDate - msgDate > 6)){
                            //     data[i].msgs[index].time_show = 'month';
                            // }else if(nowDate - msgDate <= 6 && nowDate - msgDate > 2){
                            //     data[i].msgs[index].time_show = 'day';
                            // }else if(nowDate - msgDate === 2){
                            //     data[i].msgs[index].time_show = 'the day before';
                            // }else if(nowDate - msgDate === 1){
                            //     data[i].msgs[index].time_show = 'yesterday';
                            // }else if(nowDate === msgDate){
                            //     data[i].msgs[index].time_show = 'today';
                            // }
                        }
                    }
                    // if(data[i].msgs[j].content.msg_body.media_id){
                    //     count ++;
                    //     global.JIM.getResource({'media_id' : data[i].msgs[j].content.msg_body.media_id})
                    //         .onSuccess(function(urlInfo){
                    //             // data[i].msgs[j].content.msg_body.media_url = urlInfo.url;
                    //             // that.store$.dispatch({type: chatAction.getAllMessageSuccess, payload: data});
                    //             resourceArray.push({
                    //                 key: data[i].key,
                    //                 media_id: data[i].msgs[j].content.msg_body.media_id,
                    //                 url: urlInfo.url
                    //             });
                    //             if(resourceArray.length === count){
                    //                 that.store$.dispatch({
                    //                     type: chatAction.getResourceUrl, 
                    //                     payload: resourceArray
                    //                 });
                    //             }
                    //         }).onFail(function(error){
                    //             // data[i].msgs[j].content.msg_body.media_url = '';
                    //             // that.store$.dispatch({type: chatAction.getAllMessageSuccess, payload: data});
                    //             resourceArray.push({
                    //                 key: data[i].msgs[j].key,
                    //                 media_id: data[i].msgs[j].content.msg_body.media_id,
                    //                 url: ''
                    //             });
                    //             if(resourceArray.length === count){
                    //                 that.store$.dispatch({
                    //                     type: chatAction.getResourceUrl, 
                    //                     payload: resourceArray
                    //                 });
                    //             }
                    //         });
                    // }
                }
            }
            var msgId = JSON.parse(_this.storageService.get('msgId' + common_1.global.user));
            _this.store$.dispatch({
                type: actions_1.chatAction.getConversationSuccess,
                payload: {
                    storage: true,
                    msgId: msgId
                }
            });
            return { type: actions_1.chatAction.getAllMessageSuccess, payload: data };
        }));
        // 发送单人消息
        this.sendMessage$ = this.actions$
            .ofType(actions_1.chatAction.sendSingleMessage)
            .map(effects_1.toPayload)
            .filter((function (data) {
            if (!data.singleMsg.content) {
                return false;
            }
            return data;
        }))
            .switchMap((function (text) {
            var that = _this, msgObj = common_1.global.JIM.sendSingleMsg(text.singleMsg)
                .onSuccess((function (data, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                });
            })).onFail((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 3
                    }
                });
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(msgObj)
                .map((function () {
                return { type: '[chat] send single message useless' };
            }));
        }));
        // 发送群组消息
        this.sendGroupMessage$ = this.actions$
            .ofType(actions_1.chatAction.sendGroupMessage)
            .map(effects_1.toPayload)
            .filter((function (data) {
            if (!data.groupMsg.content) {
                return false;
            }
            return data;
        }))
            .switchMap((function (text) {
            var that = _this, groupMessageObj = common_1.global.JIM.sendGroupMsg(text.groupMsg)
                .onSuccess((function (data, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                });
                console.log('success:' + JSON.stringify(data));
            })).onFail((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: text.msgs.msgKey,
                        key: text.key,
                        success: 3
                    }
                });
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(groupMessageObj)
                .map((function () {
                return { type: '[chat] send group message useless' };
            }));
        }));
        // 发送单个图片
        this.sendSinglePic$ = this.actions$
            .ofType(actions_1.chatAction.sendSinglePic)
            .map(effects_1.toPayload)
            .switchMap((function (img) {
            var that = _this, singlePicObj = common_1.global.JIM.sendSinglePic(img.singlePicFormData)
                .onSuccess((function (info, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                });
            })).onFail((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 3
                    }
                });
            }));
            return rxjs_1.Observable.of(singlePicObj)
                .map((function () {
                return { type: '[chat] send single picture useless' };
            }));
        }));
        // 发送群组图片
        this.sendGroupPic$ = this.actions$
            .ofType(actions_1.chatAction.sendGroupPic)
            .map(effects_1.toPayload)
            .switchMap((function (img) {
            var that = _this, sendGroupPicObj = common_1.global.JIM.sendGroupPic(img.groupPicFormData)
                .onSuccess((function (info, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                });
            })).onFail((function (data, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: img.msgs.msgKey,
                        key: img.key,
                        success: 3
                    }
                });
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(sendGroupPicObj)
                .map((function () {
                return { type: '[chat] send group pic useless' };
            }));
        }));
        // 发送单个文件
        this.sendSingleFile$ = this.actions$
            .ofType(actions_1.chatAction.sendSingleFile)
            .map(effects_1.toPayload)
            .switchMap((function (file) {
            var that = _this, sendSingleFileObj = common_1.global.JIM.sendSingleFile(file.singleFile)
                .onSuccess((function (data, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                });
                console.log('success:' + JSON.stringify(data));
            })).onFail((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 3
                    }
                });
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(sendSingleFileObj)
                .map((function () {
                return { type: '[chat] send single file useless' };
            }));
        }));
        // 发送群组文件
        this.sendGroupFile$ = this.actions$
            .ofType(actions_1.chatAction.sendGroupFile)
            .map(effects_1.toPayload)
            .switchMap((function (file) {
            var that = _this, sendgroupFileObj = common_1.global.JIM.sendGroupFile(file.groupFile)
                .onSuccess((function (data, msgs) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 2,
                        msgId: msgs.msg_id
                    }
                });
                console.log('success:' + JSON.stringify(data));
            })).onFail((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.sendMsgComplete,
                    payload: {
                        msgKey: file.msgs.msgKey,
                        key: file.key,
                        success: 3
                    }
                });
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(sendgroupFileObj)
                .map((function () {
                return { type: '[chat] send group file useless' };
            }));
        }));
        // 查看别人的资料
        this.watchOtherInfo$ = this.actions$
            .ofType(actions_1.chatAction.watchOtherInfo)
            .map(effects_1.toPayload)
            .switchMap((function (other) {
            var that = _this, OtherInfoObj = common_1.global.JIM.getUserInfo({
                'username': other.username
            }).onSuccess((function (data) {
                // 如多当前会话是要查看资料的人的话，不用请求avatarUrl, 直接使用单钱会话的avatarUrl
                if (other.active.type === 3) {
                    that.store$.dispatch({
                        type: actions_1.chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    });
                    return;
                }
                common_1.global.JIM.getResource({ 'media_id': data.user_info.avatar })
                    .onSuccess((function (urlInfo) {
                    data.user_info = Object.assign({}, data.user_info, { 'avatarUrl': urlInfo.url });
                    that.store$.dispatch({
                        type: actions_1.chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    });
                })).onFail((function (error) {
                    that.store$.dispatch({
                        type: actions_1.chatAction.watchOtherInfoSuccess,
                        payload: {
                            info: data.user_info,
                            show: true
                        }
                    });
                }));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(OtherInfoObj)
                .map((function () {
                return { type: '[chat] watch other info useless' };
            }));
        }));
        // 获取群组信息和群成员信息
        this.groupInfo$ = this.actions$
            .ofType(actions_1.chatAction.groupSetting)
            .map(effects_1.toPayload)
            .filter((function (data) {
            if (data.show === false || data.active.type === 3 || data.isCache) {
                return false;
            }
            return data;
        }))
            .switchMap((function (info) {
            var that = _this, groupInfoObj = common_1.global.JIM.getGroupInfo({ 'gid': info.active.key })
                .onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.groupInfo,
                    payload: {
                        groupInfo: data.group_info
                    }
                });
                console.log('success:' + JSON.stringify(data));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            var groupMemberObj = common_1.global.JIM.getGroupMembers({ 'gid': info.active.key })
                .onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.chatAction.groupInfo,
                    payload: {
                        memberList: data.member_list
                    }
                });
                var _loop_4 = function (i) {
                    if (data.member_list[i].avatar) {
                        common_1.global.JIM.getResource({ 'media_id': data.member_list[i].avatar })
                            .onSuccess((function (urlInfo) {
                            data.member_list[i].avatarUrl = urlInfo.url;
                            that.store$.dispatch({
                                type: actions_1.chatAction.groupInfo,
                                payload: {
                                    memberList: data.member_list
                                }
                            });
                        })).onFail((function (error) {
                        }));
                    }
                };
                for (var i = 0; i < data.member_list.length; i++) {
                    _loop_4(i);
                }
                console.log('success:' + JSON.stringify(data));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(groupInfoObj)
                .map((function () {
                return { type: '[chat] group info useless' };
            }));
        }));
        // 更新群组资料
        this.updateGroupInfo$ = this.actions$
            .ofType(actions_1.chatAction.updateGroupInfo)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this, groupInfoObj = common_1.global.JIM.updateGroupInfo({
                'group_name': info.name,
                'group_description': info.desc,
                'gid': info.gid
            }).onSuccess((function (data) {
                if (info.actionType && info.actionType === 'modifyName') {
                    that.store$.dispatch({
                        type: actions_1.chatAction.groupName,
                        payload: info
                    });
                }
                else {
                    that.store$.dispatch({
                        type: actions_1.chatAction.groupDescription,
                        payload: {
                            data: data,
                            show: false
                        }
                    });
                }
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(groupInfoObj)
                .map((function () {
                return { type: '[chat] update group info useless' };
            }));
        }));
        // 切换群组免打扰
        this.changeNoDisturb$ = this.actions$
            .ofType(actions_1.chatAction.changeNoDisturb)
            .map(effects_1.toPayload)
            .switchMap((function (active) {
            var that = _this;
            if (active.noDisturb) {
                common_1.global.JIM.delGroupNoDisturb({ 'gid': active.key })
                    .onSuccess((function (data) {
                    console.log('delete:', data);
                    that.store$.dispatch({
                        type: actions_1.chatAction.changeNoDisturbSuccess,
                        payload: active
                    });
                })).onFail((function (data) {
                    console.log('error:' + JSON.stringify(data));
                }));
            }
            else {
                var changeNoDisturbObj = common_1.global.JIM.addGroupNoDisturb({ 'gid': active.key })
                    .onSuccess((function (data) {
                    console.log('add:', data);
                    that.store$.dispatch({
                        type: actions_1.chatAction.changeNoDisturbSuccess,
                        payload: active
                    });
                })).onFail((function (data) {
                    console.log('error:' + JSON.stringify(data));
                }));
            }
            return rxjs_1.Observable.of('changeNoDisturbObj')
                .map((function () {
                return { type: '[chat] change no disturb useless' };
            }));
        }));
    }
    return ChatEffect;
}());
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "getConversation$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "getSourceUrl$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "getMemberAvatarUrl$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "getAllMessage$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "sendMessage$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "sendGroupMessage$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "sendSinglePic$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "sendGroupPic$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "sendSingleFile$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "sendGroupFile$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "watchOtherInfo$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "groupInfo$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "updateGroupInfo$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ChatEffect.prototype, "changeNoDisturb$", void 0);
ChatEffect = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
        store_1.Store,
        router_1.Router,
        common_1.StorageService])
], ChatEffect);
exports.ChatEffect = ChatEffect;


/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(820));


/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.chatInit = {
    conversation: [],
    messageList: [],
    newMessage: {},
    groupList: [],
    activePerson: {
        key: '',
        name: '',
        nickName: '',
        activeIndex: -1,
        noDisturb: false,
        avatarUrl: ''
    },
    defaultPanelIsShow: true,
    actionType: '',
    otherInfo: {
        info: {},
        show: false
    },
    blackMenu: {
        menu: [],
        show: false
    },
    searchUserResult: {
        result: {},
        isSearch: false
    },
    recentMsg: [],
    msgId: [],
    groupDeacriptionShow: false,
    selfInfo: {
        info: {
            avatarUrl: ''
        }
    },
    imageViewer: []
};


/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(822));


/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(149);
var actions_2 = __webpack_require__(148);
var model_1 = __webpack_require__(823);
var actions_3 = __webpack_require__(150);
var common_1 = __webpack_require__(116);
var util_1 = __webpack_require__(212);
var util = new util_1.Util();
exports.chatReducer = function (state, _a) {
    if (state === void 0) { state = model_1.chatInit; }
    var type = _a.type, payload = _a.payload;
    state.actionType = type;
    switch (type) {
        case actions_2.chatAction.getConversationSuccess:
            // 初始化会话
            if (!payload.storage && payload.conversation) {
                state.conversation = payload.conversation;
            }
            else if (!payload.storage && payload.noDisturb) {
                addNoDisturb(state, payload.noDisturb);
            }
            else if (state.messageList.length > 0 && state.messageList[0].msgs.length > 0 && state.conversation.length > 0 && state.conversation[0].type) {
                unreadNum(state, payload);
                console.log('00000000000', state.conversation, state.messageList);
                filterRecentMsg(state);
                state.msgId = filterMsgId(state, 'init');
            }
            if (state.messageList.length > 0 || payload.conversation) {
                completionMessageList(state);
            }
            break;
        case actions_2.chatAction.getAllMessageSuccess:
            // 登陆后，离线消息同步消息列表
            if (!payload.storage) {
                state.messageList = payload;
                state.imageViewer = filterImageViewer(state);
            }
            else if (state.messageList.length > 0 && state.messageList[0].msgs.length > 0 && state.conversation.length > 0 && state.conversation[0].type) {
                unreadNum(state, payload);
                console.log('11111111111', state.conversation, state.messageList);
                filterRecentMsg(state);
                state.msgId = filterMsgId(state, 'init');
            }
            if (state.conversation.length > 0) {
                completionMessageList(state);
            }
            break;
        // 接收消息
        case actions_2.chatAction.receiveMessage:
            addMessage(state, payload);
            var newMsgKey = [];
            for (var i = 0; i < payload.messages.length; i++) {
                newMsgKey.push({
                    key: payload.messages[i].from_uid || payload.messages[i].from_gid
                });
            }
            state.msgId = filterMsgId(state, 'update', newMsgKey);
            break;
        // 发送单聊文本消息
        case actions_2.chatAction.sendSingleMessage:
        // 发送群组文本消息
        case actions_2.chatAction.sendGroupMessage:
        // 发送单聊图片消息
        case actions_2.chatAction.sendSinglePic:
        // 发送群组图片消息
        case actions_2.chatAction.sendGroupPic:
        // 发送单聊文件消息
        case actions_2.chatAction.sendSingleFile:
        // 发送群组文件消息
        case actions_2.chatAction.sendGroupFile:
            // 判断是否是重发消息
            if (!payload.msgs.repeatSend) {
                addMessage(state, payload);
            }
            break;
        // 发送消息成功（包括所有类型的消息）
        case actions_2.chatAction.sendMsgComplete:
            sendMsgComplete(state, payload);
            if (payload.success === 2) {
                state.msgId = filterMsgId(state, 'update', [{ key: payload.key }]);
            }
            break;
        case actions_2.chatAction.changeActivePerson:
            // 更换当前会话用户
            state.activePerson = payload.item;
            state.defaultPanelIsShow = payload.defaultPanelIsShow;
            emptyUnreadNum(state, payload.item);
            state.msgId = filterMsgId(state, 'update', [{ key: state.activePerson.key }]);
            changeActivePerson(state);
            break;
        // 删除本地会话列表
        case actions_2.chatAction.deleteConversationItem:
            deleteConversationItem(state, payload);
            break;
        case actions_3.contactAction.selectContactItem:
            state.defaultPanelIsShow = false;
            state.activePerson = payload;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
        case actions_2.chatAction.getResourceUrl:
            // 获取静态资源路径
            messageListUrl(state, payload);
            break;
        // 保存草稿
        case actions_2.chatAction.saveDraft:
            state.messageList[payload[1].activeIndex].draft = payload[0];
            for (var i = 0; i < state.conversation.length; i++) {
                if (payload[1].key == state.conversation[i].key) {
                    state.conversation[i].draft = payload[0];
                }
            }
            break;
        // 搜索用户
        case actions_1.mainAction.searchUser:
            state.searchUserResult = searchUser(state, payload);
            break;
        case actions_1.mainAction.selectSearchUser:
            state.defaultPanelIsShow = false;
            state.activePerson = payload;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
        // 成功查看别人的信息
        case actions_2.chatAction.watchOtherInfoSuccess:
            if (state.activePerson.type === 3) {
                payload.info.avatarUrl = state.activePerson.avatarUrl;
            }
            state.otherInfo = payload;
            break;
        // 隐藏别人的信息框
        case actions_2.chatAction.hideOtherInfo:
            state.otherInfo = payload;
            break;
        // 获取群组信息
        case actions_2.chatAction.groupInfo:
            if (payload.groupInfo) {
                state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo = payload.groupInfo;
            }
            if (payload.memberList) {
                sortGroupMember(payload.memberList);
                state.messageList[state.activePerson.activeIndex].groupSetting.memberList = payload.memberList;
            }
            break;
        // 显示隐藏群组设置
        case actions_2.chatAction.groupSetting:
            var msg = state.messageList[state.activePerson.activeIndex];
            if (!msg.groupSetting) {
                state.messageList[state.activePerson.activeIndex] = Object.assign({}, msg, { groupSetting: {} });
            }
            state.messageList[state.activePerson.activeIndex].groupSetting.show = payload.show;
            break;
        case actions_1.mainAction.createSingleChatSuccess:
            state.otherInfo.info = payload;
            state.otherInfo.show = true;
            break;
        case actions_1.mainAction.createGroupSuccess:
            state.activePerson = payload;
            state.defaultPanelIsShow = false;
            selectUserResult(state, payload);
            changeActivePerson(state);
            state.groupList.push(payload);
            break;
        case actions_2.chatAction.createOtherChat:
            if (payload.username) {
                payload.name = payload.username;
            }
            if (payload.uid) {
                payload.key = payload.uid;
            }
            if (payload.nickname) {
                payload.nickName = payload.nickname;
            }
            state.activePerson = payload;
            state.defaultPanelIsShow = false;
            selectUserResult(state, payload);
            changeActivePerson(state);
            break;
        case actions_3.contactAction.getGroupListSuccess:
            state.groupList = payload;
            break;
        case actions_1.mainAction.exitGroupSuccess:
            deleteConversationItem(state, payload);
            state.defaultPanelIsShow = true;
            state.messageList[state.activePerson.activeIndex].groupSetting.show = false;
            for (var i = 0; i < state.groupList.length; i++) {
                if (state.groupList[i].gid === payload.gid) {
                    state.groupList.splice(i, 1);
                    break;
                }
            }
            break;
        case actions_1.mainAction.addBlackListSuccess:
            deleteConversationItem(state, payload.deleteItem);
            if (state.activePerson.type === 3) {
                state.defaultPanelIsShow = true;
            }
            state.otherInfo.show = false;
            break;
        case actions_1.mainAction.deleteMemberSuccess:
            deleteGroupItem(state, payload);
            break;
        case actions_2.chatAction.groupDescription:
            state.groupDeacriptionShow = payload.show;
            if (payload.data) {
                state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo.desc = payload.data.group_description;
            }
            break;
        case actions_2.chatAction.groupName:
            state.activePerson.name = state.messageList[state.activePerson.activeIndex].groupSetting.groupInfo.name = payload.name;
            break;
        // 成功获取个人信息
        case actions_1.mainAction.showSelfInfo:
            // 获取个人信息成功
            if (payload.info) {
                state.selfInfo.info = Object.assign({}, state.selfInfo.info, payload.info);
            }
            if (payload.avatar) {
                state.selfInfo.info.avatarUrl = payload.avatar.url;
            }
            break;
        case actions_2.chatAction.getSingleAvatarUrl:
            var msgs = state.messageList[state.activePerson.activeIndex].msgs;
            for (var i = 0; i < msgs.length; i++) {
                if (msgs[i].content.from_id !== common_1.global.user) {
                    msgs[i].content.avatarUrl = state.activePerson.avatarUrl;
                }
            }
            break;
        case actions_1.mainAction.addGroupMemberSuccess:
            state.messageList[state.activePerson.activeIndex].groupSetting.memberList = state.messageList[state.activePerson.activeIndex].groupSetting.memberList.concat(payload);
            break;
        case actions_2.chatAction.changeNoDisturbSuccess:
            for (var i = 0; i < state.conversation.length; i++) {
                if (payload.key == state.conversation[i].key) {
                    state.conversation[i].noDisturb = !state.conversation[i].noDisturb;
                    break;
                }
            }
            break;
        default:
    }
    return state;
};
// 删除群成员
function deleteGroupItem(state, payload) {
    for (var i = 0; i < state.messageList[state.activePerson.activeIndex].groupSetting.memberList.length; i++) {
        if (state.messageList[state.activePerson.activeIndex].groupSetting.memberList[i].uid === payload.deleteItem.uid) {
            state.messageList[state.activePerson.activeIndex].groupSetting.memberList.splice(i, 1);
            break;
        }
    }
}
// 离线消息15天后消失，而会话列表依然存在，导致不一一对应，所以补全离线消息
function completionMessageList(state) {
    for (var i = 0; i < state.conversation.length; i++) {
        var flag = false;
        for (var j = 0; j < state.messageList.length; j++) {
            if (state.conversation[i].key == state.messageList[j].key) {
                flag = true;
                break;
            }
        }
        if (flag === false) {
            state.messageList.push({
                key: state.conversation[i].key,
                msgs: []
            });
        }
    }
}
function addNoDisturb(state, noDisturb) {
    for (var i = 0; i < noDisturb.users.length; i++) {
        for (var j = 0; j < state.conversation.length; j++) {
            if (noDisturb.users[i].username == state.conversation[j].name && state.conversation[j].type == 3) {
                state.conversation[j].noDisturb = true;
                break;
            }
        }
    }
    for (var i = 0; i < noDisturb.groups.length; i++) {
        for (var j = 0; j < state.conversation.length; j++) {
            if (noDisturb.groups[i].gid == state.conversation[j].key && state.conversation[j].type == 4) {
                state.conversation[j].noDisturb = true;
                break;
            }
        }
    }
}
function filterImageViewer(state) {
    if (state.activePerson.activeIndex < 0) {
        return [];
    }
    var imgResult = [];
    for (var j = 0; j < state.messageList[state.activePerson.activeIndex].msgs.length; j++) {
        var content = state.messageList[state.activePerson.activeIndex].msgs[j].content;
        if (content.msg_type === 'image') {
            imgResult.push({
                src: content.msg_body.media_url,
                width: content.msg_body.width,
                height: content.msg_body.height
            });
        }
    }
    return imgResult;
}
function changeActivePerson(state) {
    if (state.activePerson.group === true && state.activePerson.gid) {
        state.activePerson.key = state.activePerson.gid;
    }
    for (var i = 0; i < state.messageList.length; i++) {
        if (state.messageList[i].key == state.activePerson.key) {
            state.activePerson.activeIndex = i;
            break;
        }
    }
    state.imageViewer = filterImageViewer(state);
}
function filterRecentMsg(state) {
    console.log('000011111', state.conversation.length, state.messageList.length);
    for (var i = 0; i < state.conversation.length; i++) {
        for (var j = 0; j < state.messageList.length; j++) {
            if (state.conversation[i].key == state.messageList[j].key) {
                var msgs = state.messageList[j].msgs;
                if (msgs.length > 0) {
                    msgs[msgs.length - 1].conversation_time_show = util.reducerDate(msgs[msgs.length - 1].ctime_ms);
                    state.conversation[i].recentMsg = msgs[msgs.length - 1];
                }
                break;
            }
        }
    }
}
function filterMsgId(state, operation, payload) {
    if (operation === 'init') {
        var msgId = [];
        for (var i = 0; i < state.conversation.length; i++) {
            for (var j = 0; j < state.messageList.length; j++) {
                if (state.conversation[i].key == state.messageList[j].key) {
                    var msgs = state.messageList[j].msgs;
                    if (!state.conversation[i].unreadNum && msgs.length > 0) {
                        msgId.push({
                            key: state.messageList[j].key,
                            msgId: msgs[msgs.length - 1].msg_id
                        });
                    }
                    else {
                        if (state.conversation[i].unreadNum !== msgs.length && msgs.length > 0) {
                            msgId.push({
                                key: state.messageList[j].key,
                                msgId: msgs[msgs.length - 1 - state.conversation[i].unreadNum].msg_id
                            });
                        }
                    }
                    break;
                }
            }
        }
        return msgId;
    }
    else if (operation === 'update') {
        var msgId = void 0;
        for (var i = 0; i < state.messageList.length; i++) {
            for (var j = 0; j < payload.length; j++) {
                if (Number(state.messageList[i].key) === Number(payload[j].key)) {
                    if (state.messageList[i].msgs.length > 0) {
                        msgId = state.messageList[i].msgs[state.messageList[i].msgs.length - 1].msg_id;
                    }
                    var flag = true;
                    if (msgId) {
                        for (var i_1 = 0; i_1 < state.msgId.length; i_1++) {
                            if (state.msgId[i_1].key == payload[j].key) {
                                flag = false;
                                state.msgId[i_1] = {
                                    key: payload[j].key,
                                    msgId: msgId
                                };
                                break;
                            }
                        }
                    }
                    if (flag) {
                        state.msgId.push({
                            key: payload[j].key,
                            msgId: msgId
                        });
                    }
                    break;
                }
            }
        }
        return state.msgId;
    }
}
// 将群主放在第一位
function sortGroupMember(memberList) {
    for (var i = 0; i < memberList.length; i++) {
        if (memberList[i].flag === 1) {
            var temp = memberList.splice(i, 1);
            memberList.unshift(temp[0]);
            break;
        }
    }
}
function unreadNum(state, payload) {
    if (!payload.msgId) {
        return;
    }
    for (var a = 0; a < state.messageList.length; a++) {
        var flag = false;
        // 当localstorage里面存储了该会话人的msgId
        for (var i = 0; i < payload.msgId.length; i++) {
            if (state.messageList[a].key == payload.msgId[i].key) {
                flag = true;
                for (var j = 0; j < state.messageList[a].msgs.length; j++) {
                    if (state.messageList[a].msgs[j].msg_id == payload.msgId[i].msgId) {
                        var unreadNum_1 = state.messageList[a].msgs.length - 1 - j;
                        for (var b = 0; b < state.conversation.length; b++) {
                            if (state.messageList[a].key == state.conversation[b].key) {
                                state.conversation[b].unreadNum = unreadNum_1;
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        // 当localstorage里面没有存储该会话人的msgId
        if (flag === false) {
            for (var b = 0; b < state.conversation.length; b++) {
                if (state.messageList[a].key == state.conversation[b].key) {
                    state.conversation[b].unreadNum = state.messageList[a].msgs.length;
                    break;
                }
            }
        }
    }
}
// 完成消息的发送接口的调用后返回状态
function sendMsgComplete(state, payload) {
    for (var i = 0; i < state.messageList.length; i++) {
        if (state.messageList[i].key == payload.key) {
            for (var j = state.messageList[i].msgs.length - 1; j >= 0; j--) {
                if (state.messageList[i].msgs[j].msgKey && payload.msgKey == state.messageList[i].msgs[j].msgKey) {
                    if (payload.msgId) {
                        state.messageList[i].msgs[j].msg_id = payload.msgId;
                    }
                    state.messageList[i].msgs[j].success = payload.success;
                    return;
                }
            }
        }
    }
}
// 删除本地的会话列表
function deleteConversationItem(state, payload) {
    console.log(333, payload);
    for (var i = 0; i < state.conversation.length; i++) {
        if (state.conversation[i].key == payload.item.key || state.conversation[i].key == payload.item.uid) {
            state.conversation.splice(i, 1);
            break;
        }
    }
    if (payload.item.key == state.activePerson.key) {
        state.defaultPanelIsShow = true;
    }
}
// 添加消息到消息面板
function addMessage(state, payload) {
    // 自己发消息将消息添加到消息列表   
    if (payload.key) {
        // 更新imageViewer的数组
        if (payload.msgs && payload.msgs.content.from_id === common_1.global.user && payload.msgs.content.msg_type === 'image') {
            state.imageViewer.push({
                src: payload.msgs.content.msg_body.media_url,
                width: payload.msgs.content.msg_body.width,
                height: payload.msgs.content.msg_body.height
            });
        }
        for (var i = 0; i < state.messageList.length; i++) {
            if (state.messageList[i].key == payload.key && state.messageList[i].key) {
                var msgs = state.messageList[i].msgs;
                if (msgs.length === 0) {
                    payload.msgs.time_show = 'today';
                    msgs.push(payload.msgs);
                    state.newMessage = payload.msgs;
                    break;
                }
                if ((payload.msgs.ctime_ms - msgs[msgs.length - 1].ctime_ms) / 1000 / 60 > 5) {
                    payload.msgs.time_show = 'today';
                }
                // payload.msgs.content.msg_body.text = payload.msgs.content.msg_body.text.replace('[a]','haha');
                msgs.push(payload.msgs);
                state.newMessage = payload.msgs;
            }
        }
        // 将当前会话放在第一位
        for (var a = 0; a < state.conversation.length; a++) {
            if (state.conversation[a].key == payload.key) {
                payload.msgs.conversation_time_show = util.reducerDate(payload.msgs.ctime_ms);
                state.conversation[a].recentMsg = payload.msgs;
                var item = state.conversation.splice(a, 1);
                state.conversation.unshift(item[0]);
                break;
            }
        }
        // 清空会话草稿标志
        for (var i = 0; i < state.conversation.length; i++) {
            if ((payload.key == state.conversation[i].key && payload.msgs.content.msg_type == 'text')) {
                state.conversation[i].draft = '';
                break;
            }
        }
        // 接收到别人的消息添加到消息列表        
    }
    else {
        for (var j = 0; j < payload.messages.length; j++) {
            // 更新imageViewer的数组
            if (payload.messages[j].msg_type === 3 && payload.messages[j].from_uid == state.activePerson.key && payload.messages[j].content.msg_type === 'image') {
                state.imageViewer.push({
                    src: payload.messages[j].content.msg_body.media_url,
                    width: payload.messages[j].content.msg_body.width,
                    height: payload.messages[j].content.msg_body.height
                });
            }
            if (payload.messages[j].msg_type === 4 && payload.messages[j].from_gid == state.activePerson.key && payload.messages[j].content.msg_type === 'image') {
                state.imageViewer.push({
                    src: payload.messages[j].content.msg_body.media_url,
                    width: payload.messages[j].content.msg_body.width,
                    height: payload.messages[j].content.msg_body.height
                });
            }
            var flag = false;
            // 如果发送人在会话列表里
            for (var i = 0; i < state.messageList.length; i++) {
                var groupMsg = payload.messages[j].msg_type === 4 && state.messageList[i].key == payload.messages[j].from_gid, singleMsg = payload.messages[j].msg_type === 3 && state.messageList[i].key == payload.messages[j].from_uid;
                if (groupMsg || singleMsg) {
                    var msgs = state.messageList[i].msgs;
                    if (msgs.length === 0 || (payload.messages[j].ctime_ms - msgs[msgs.length - 1].ctime_ms) / 1000 / 60 > 5) {
                        payload.messages[j].time_show = 'today';
                    }
                    payload.messages[j].content.avatarUrl = state.selfInfo.info.avatarUrl;
                    msgs.push(payload.messages[j]);
                    state.newMessage = payload.messages[j];
                    flag = true;
                    break;
                }
            }
            for (var a = 0; a < state.conversation.length; a++) {
                var groupMsg = payload.messages[j].msg_type === 4 && state.conversation[a].key == payload.messages[j].from_gid, singleMsg = payload.messages[j].msg_type === 3 && state.conversation[a].key == payload.messages[j].from_uid;
                if (groupMsg || singleMsg) {
                    var groupNoActive = payload.messages[j].msg_type === 4 && state.activePerson.key != payload.messages[j].from_gid, singleNoActive = payload.messages[j].msg_type === 3 && state.activePerson.key != payload.messages[j].from_uid;
                    if (groupNoActive || singleNoActive) {
                        if (!state.conversation[a].unreadNum) {
                            state.conversation[a].unreadNum = 1;
                        }
                        else {
                            state.conversation[a].unreadNum++;
                        }
                    }
                    var item = state.conversation.splice(a, 1);
                    state.conversation.unshift(item[0]);
                    payload.messages[j].conversation_time_show = util.reducerDate(payload.messages[j].ctime_ms);
                    state.conversation[0].recentMsg = payload.messages[j];
                    return;
                }
            }
            // 如果发送人不在会话列表里            
            if (flag === false) {
                payload.messages[j].time_show = 'today';
                var msg = {
                    key: payload.messages[j].from_uid,
                    msgs: [
                        payload.messages[j]
                    ],
                    draft: '',
                    content: payload.messages[j].content
                };
                state.newMessage = msg;
                state.messageList.push(msg);
                var conversationItem = {
                    avatar: "",
                    key: payload.messages[j].from_uid,
                    mtime: payload.messages[j].ctime_ms,
                    name: payload.messages[j].content.from_id,
                    nickName: payload.messages[j].content.from_name,
                    type: payload.messages[j].msg_type
                };
                state.conversation.unshift(conversationItem);
                payload.messages[j].time_show = util.reducerDate(payload.messages[j].ctime_ms);
                state.conversation[0].recentMsg = payload.messages[j];
            }
        }
    }
}
// 添加资源路径
function messageListUrl(state, payload) {
    for (var i = 0; i < payload.length; i++) {
        for (var j = 0; j < state.messageList.length; j++) {
            if (payload[i].key == state.messageList[j].key) {
                for (var a = 0; a < state.messageList[j].msgs.length; a++) {
                    if (payload[i].media_id == state.messageList[j].msgs[a].content.msg_body.media_id) {
                        state.messageList[j].msgs[a].content.msg_body.media_url = payload[i].url;
                    }
                }
            }
        }
    }
}
// 搜索用户、群组
function searchUser(state, payload) {
    if (payload === '') {
        return {
            result: {
                groupArr: [],
                singleArr: []
            },
            isSearch: false
        };
    }
    var singleArr = [], groupArr = [];
    for (var i = 0; i < state.conversation.length; i++) {
        var existNickName = state.conversation[i].nickName && state.conversation[i].nickName.toLowerCase().indexOf(payload.toLowerCase()) != -1;
        var existName = state.conversation[i].name && state.conversation[i].name.toLowerCase().indexOf(payload.toLowerCase()) != -1;
        var existSingle = state.conversation[i].type === 3;
        if (existSingle && existNickName) {
            state.conversation[i].existNickName = true;
            singleArr.push(state.conversation[i]);
        }
        else if (existSingle && existName) {
            state.conversation[i].existName = true;
            singleArr.push(state.conversation[i]);
        }
    }
    for (var i = 0; i < state.groupList.length; i++) {
        var existGroup = (state.groupList[i].name.toLowerCase().indexOf(payload.toLowerCase()) != -1);
        if (existGroup) {
            groupArr.push(state.groupList[i]);
        }
    }
    return {
        result: {
            singleArr: singleArr,
            groupArr: groupArr
        },
        isSearch: true
    };
}
// 选择搜索的用户、发起单聊
function selectUserResult(state, payload) {
    if (payload.gid) {
        payload.key = payload.gid;
    }
    var conversation = state.conversation, flag = false;
    for (var i = 0; i < conversation.length; i++) {
        if ((conversation[i].key == payload.key && payload.key)) {
            var item = conversation.splice(i, 1);
            conversation.unshift(item[0]);
            flag = true;
            break;
        }
    }
    if (flag === false) {
        conversation.unshift(payload);
        state.messageList.push({
            key: payload.key,
            msgs: []
        });
    }
}
// 切换当前会话时,清空未读消息数目
function emptyUnreadNum(state, payload) {
    for (var i = 0; i < state.conversation.length; i++) {
        if (state.conversation[i].key == payload.key) {
            if (state.conversation[i].unreadNum) {
                state.conversation[i].unreadNum = 0;
                break;
            }
        }
    }
}


/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(824));


/***/ }),

/***/ 826:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.contactAction = {
    selectContactItem: '[contact] select contact item',
    getGroupList: '[contact] get group list',
    getGroupListSuccess: '[contact] get group list success'
};


/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(65);
var effects_1 = __webpack_require__(97);
var store_1 = __webpack_require__(64);
var router_1 = __webpack_require__(84);
var common_1 = __webpack_require__(116);
var actions_1 = __webpack_require__(150);
var ContactEffect = (function () {
    function ContactEffect(actions$, store$, router) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.router = router;
        // 获取群组列表
        this.getGroupList$ = this.actions$
            .ofType(actions_1.contactAction.getGroupList)
            .map(effects_1.toPayload)
            .switchMap((function () {
            var that = _this;
            var groupListObj = common_1.global.JIM.getGroups()
                .onSuccess((function (data) {
                console.log(66666, data);
                that.store$.dispatch({
                    type: actions_1.contactAction.getGroupListSuccess,
                    payload: data.group_list
                });
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(groupListObj)
                .map((function () {
                return { type: '[main] get group list useless' };
            }));
        }));
    }
    return ContactEffect;
}());
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], ContactEffect.prototype, "getGroupList$", void 0);
ContactEffect = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
        store_1.Store,
        router_1.Router])
], ContactEffect);
exports.ContactEffect = ContactEffect;


/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(827));


/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.contactInit = {
    actionType: '',
    groupList: [],
    conversation: []
};


/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(829));


/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(150);
var model_1 = __webpack_require__(830);
var actions_2 = __webpack_require__(149);
var actions_3 = __webpack_require__(148);
var util_1 = __webpack_require__(212);
var util = new util_1.Util();
exports.contactReducer = function (state, _a) {
    if (state === void 0) { state = model_1.contactInit; }
    var type = _a.type, payload = _a.payload;
    state.actionType = type;
    switch (type) {
        case actions_1.contactAction.getGroupListSuccess:
            state.groupList = util.sortByLetter(payload);
            break;
        case actions_2.mainAction.createGroupSuccess:
            state.groupList = flagGroup(util.insertSortByLetter(state.groupList, payload));
            state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload));
            break;
        case actions_3.chatAction.dispatchConversationList:
            state.conversation = flagGroup(util.sortByLetter(payload));
            break;
        case actions_2.mainAction.createSingleChatSuccess:
            if (!isSingleExist(state, payload)) {
                state.conversation = flagGroup(util.insertSortByLetter(state.conversation, payload));
            }
            break;
    }
    return state;
};
// 判断是否已经存在这个单聊
function isSingleExist(state, payload) {
    for (var i = 0; i < state.conversation.length; i++) {
        for (var j = 0; j < state.conversation[i].data.length; j++) {
            if (Number(state.conversation[i].data[j].key) === Number(payload.key)) {
                return true;
            }
        }
    }
    return false;
}
// 判断某字母是否全是群组的数据
function flagGroup(payload) {
    for (var i = 0; i < payload.length; i++) {
        if (payload[i].data.length > 0) {
            var flag = true;
            for (var j = 0; j < payload[i].data.length; j++) {
                if (payload[i].data[j].type == 3) {
                    flag = false;
                    break;
                }
            }
            if (flag === true) {
                payload[i].allGroup = true;
            }
            else {
                payload[i].allGroup = false;
            }
        }
    }
    return payload;
}


/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(831));


/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var global_1 = __webpack_require__(96);
__webpack_require__(1129);
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        // 创建JIM 对象
        global_1.global.JIM = new JMessage();
        //异常断线监听
        global_1.global.JIM.onDisconnect((function () {
            console.log("【disconnect】");
        }));
    };
    return AppComponent;
}());
AppComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'my-app',
        template: __webpack_require__(545),
        styles: [__webpack_require__(547)]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAction = {
    login: '[login] login',
    loginSuccess: '[login] login success',
    loginFailed: '[login] login failed',
    passwordBlur: '[login] password blur',
    isButtonAvailableAction: '[login] is button available action'
};


/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(836));


/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(65);
var effects_1 = __webpack_require__(97);
var store_1 = __webpack_require__(64);
var actions_1 = __webpack_require__(304);
var global_1 = __webpack_require__(96);
var LoginEffect = (function () {
    function LoginEffect(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        // 登录
        this.login$ = this.actions$
            .ofType(actions_1.loginAction.login)
            .map(effects_1.toPayload)
            .filter((function (val) {
            if (!val.isButtonAvailable) {
                return false;
            }
            return val;
        }))
            .switchMap((function (val) {
            var that = _this;
            var loginObj = global_1.global.JIM.login({
                'username': val.username,
                'password': val.password,
                'is_md5': val.md5
            })
                .onSuccess((function (data) {
                global_1.global.user = data.username;
                that.store$.dispatch({
                    type: actions_1.loginAction.loginSuccess,
                    payload: val
                });
            })).onFail((function (data) {
                that.store$.dispatch({
                    type: actions_1.loginAction.loginFailed,
                    payload: data
                });
            })).onTimeout((function (data) {
                console.log('timeout:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(loginObj)
                .map((function (data) {
                return { type: '[login] login useless', payload: null };
            }));
        }));
    }
    return LoginEffect;
}());
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], LoginEffect.prototype, "login$", void 0);
LoginEffect = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
        store_1.Store])
], LoginEffect);
exports.LoginEffect = LoginEffect;


/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(838));


/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(304);
var loginInit = {
    isLoginSuccess: false,
    loginTip: '',
    isButtonAvailable: false,
    actionType: 'init',
    userInfo: {
        username: '',
        password: ''
    },
    loginRemember: false
};
exports.loginReducer = function (state, _a) {
    if (state === void 0) { state = loginInit; }
    var type = _a.type, payload = _a.payload;
    if (type) {
        state.actionType = type;
    }
    switch (type) {
        case actions_1.loginAction.login:
            break;
        case actions_1.loginAction.loginSuccess:
            state.isLoginSuccess = true;
            state.loginTip = '';
            state.userInfo.username = payload.username;
            state.userInfo.password = payload.password;
            state.loginRemember = payload.loginRemember;
            break;
        case actions_1.loginAction.loginFailed:
            state.isLoginSuccess = false;
            state.loginTip = '用户名或密码错误';
            break;
        case actions_1.loginAction.isButtonAvailableAction:
            isButtonAvailable(state, payload);
            break;
        default:
    }
    return state;
};
function isButtonAvailable(state, payload) {
    if (payload.password.length > 0 && payload.username.length > 0) {
        state.isButtonAvailable = true;
    }
    else {
        state.isButtonAvailable = false;
    }
}


/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mainAction = {
    getSelfInfo: '[main] get self info',
    showSelfInfo: '[main] show self info',
    updateSelfInfo: '[main] update self info',
    updateSelfAvatar: '[main] update self avatar',
    changeListTab: '[main] change list tab',
    logoutAction: '[main] logout action',
    createGroupShow: '[main] create group show',
    createGroup: '[main] create group',
    addGroupMember: '[main] add group member',
    addGroupMemberSuccess: '[main] add group member success',
    createGroupSuccess: '[main] create group success',
    modifyPasswordShow: '[main] modify password show',
    modifyPassword: '[main] modify password',
    searchUser: '[main] search user',
    selectSearchUser: '[main] select search user',
    hideModalTip: '[main] hide modal tip',
    showModalTip: '[main] show modal tip',
    addBlackListAction: '[main] add black list action',
    addBlackListSuccess: '[main] add black list success',
    createSingleChatShow: '[main] create single chat show',
    createSingleChatAction: '[main] create single chat action',
    createSingleChatSuccess: '[main] create single chat success',
    createSingleChatError: '[main] create single chat error',
    blackMenu: '[main] black menu',
    blackMenuSuccess: '[main] black menu success',
    delSingleBlack: '[main] delete single black',
    delSingleBlackSuccess: '[main] delete single black success',
    hideBlackMenu: '[main] hide black menu',
    selectGroupItem: '[main] select group item',
    exitGroupAction: '[main] exit group action',
    exitGroupSuccess: '[main] exit group success',
    deleteMemberAction: '[main] delete member action',
    deleteMemberSuccess: '[main] delete member success',
    createGroupSearchAction: '[main] create group search action',
    createGroupSearchComplete: '[main] create group search complete'
};


/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(841));


/***/ }),

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(65);
var effects_1 = __webpack_require__(97);
var store_1 = __webpack_require__(64);
var router_1 = __webpack_require__(84);
var actions_1 = __webpack_require__(149);
var common_1 = __webpack_require__(116);
var moment = __webpack_require__(3);
var tools_1 = __webpack_require__(151);
var MainEffect = (function () {
    function MainEffect(actions$, store$, router) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.router = router;
        // 获取个人信息
        this.getSelfInfo$ = this.actions$
            .ofType(actions_1.mainAction.getSelfInfo)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this, usrInfoObj;
            usrInfoObj = common_1.global.JIM.getUserInfo({
                'username': common_1.global.user
            }).onSuccess((function (data) {
                if (!data.user_info.avatar) {
                    that.store$.dispatch({
                        type: actions_1.mainAction.showSelfInfo,
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                    return;
                }
                common_1.global.JIM.getResource({ 'media_id': data.user_info.avatar })
                    .onSuccess((function (urlInfo) {
                    data.user_info.avatarUrl = urlInfo.url;
                    that.store$.dispatch({
                        type: actions_1.mainAction.showSelfInfo,
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                })).onFail((function (error) {
                    data.user_info.avatarUrl = '';
                    that.store$.dispatch({
                        type: actions_1.mainAction.showSelfInfo,
                        payload: {
                            info: data.user_info,
                            show: false
                        }
                    });
                }));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(usrInfoObj)
                .map((function () {
                return { type: '[main] get selfInfo useless' };
            }));
        }));
        // 退出登录
        this.logoutAction$ = this.actions$
            .ofType(actions_1.mainAction.logoutAction)
            .map(effects_1.toPayload)
            .switchMap((function () {
            var loginOutObj = common_1.global.JIM.loginOut();
            return rxjs_1.Observable.of(loginOutObj)
                .map((function () {
                _this.router.navigate(['/login']);
                return { type: '[main] login out useless' };
            }));
        }));
        // 更新个人信息  
        this.updateSelfInfo$ = this.actions$
            .ofType(actions_1.mainAction.updateSelfInfo)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this;
            var updateSelfInfo = common_1.global.JIM.updateSelfInfo(info)
                .onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.showSelfInfo,
                    payload: {
                        info: info
                    }
                });
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(updateSelfInfo)
                .map((function () {
                return { type: '[main] update self info useless' };
            }));
        }));
        // 更新个人头像信息  
        this.updateSelfAvatar$ = this.actions$
            .ofType(actions_1.mainAction.updateSelfAvatar)
            .map(effects_1.toPayload)
            .switchMap((function (avatar) {
            var that = _this;
            var updateSelfAvatar = common_1.global.JIM.updateSelfAvatar({ 'avatar': avatar.formData })
                .onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.showSelfInfo,
                    payload: {
                        avatar: avatar
                    }
                });
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(updateSelfAvatar)
                .map((function () {
                return { type: '[main] update self info useless' };
            }));
        }));
        // 创建群聊
        this.createGroup$ = this.actions$
            .ofType(actions_1.mainAction.createGroup)
            .map(effects_1.toPayload)
            .switchMap((function (groupInfo) {
            var that = _this;
            var createGroupObj = common_1.global.JIM.createGroup({
                'group_name': groupInfo.groupName,
                'group_description': groupInfo.groupDescription
            }).onSuccess((function (data) {
                data.ctime = moment().format("YYYY-MM-DD HH:mm:ss");
                var groupObj = {
                    appkey: common_1.authPayload.appKey,
                    ctime: data.ctime,
                    desc: data.group_description,
                    gid: data.gid,
                    mtime: data.ctime,
                    name: data.group_name,
                    group: true,
                    type: 4
                };
                // 如果有其他成员
                if (groupInfo.memberUsernames.length > 0) {
                    common_1.global.JIM.addGroupMembers({
                        'gid': data.gid,
                        'member_usernames': groupInfo.memberUsernames
                    }).onSuccess((function (data) {
                        that.store$.dispatch({
                            type: actions_1.mainAction.createGroupSuccess,
                            payload: groupObj
                        });
                        console.log('success:' + JSON.stringify(data));
                    })).onFail((function (data) {
                        console.log('error:' + JSON.stringify(data));
                    }));
                }
                else {
                    that.store$.dispatch({
                        type: actions_1.mainAction.createGroupSuccess,
                        payload: groupObj
                    });
                }
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(createGroupObj)
                .map((function () {
                return { type: '[main] create group useless' };
            }));
        }));
        // 添加群聊成员
        this.addGroupMember$ = this.actions$
            .ofType(actions_1.mainAction.addGroupMember)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this;
            var addGroupMemberObj = common_1.global.JIM.addGroupMembers({
                'gid': info.activeGroup.key,
                'member_usernames': info.memberUsernames
            }).onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.addGroupMemberSuccess,
                    payload: info.detailMember
                });
                console.log(111111, data);
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(addGroupMemberObj)
                .map((function () {
                return { type: '[main] create group useless' };
            }));
        }));
        // 修改密码
        this.modifyPassword$ = this.actions$
            .ofType(actions_1.mainAction.modifyPassword)
            .map(effects_1.toPayload)
            .switchMap((function (passwordInfo) {
            var that = _this;
            var passwordInfoObj = common_1.global.JIM.updateSelfPwd({
                'old_pwd': tools_1.md5(passwordInfo.old_pwd),
                'new_pwd': tools_1.md5(passwordInfo.new_pwd),
                'is_md5': true
            })
                .onSuccess((function (data) {
                common_1.global.JIM.loginOut();
                that.store$.dispatch({
                    type: actions_1.mainAction.modifyPasswordShow,
                    payload: false
                });
                that.store$.dispatch({
                    type: actions_1.mainAction.showModalTip,
                    payload: {
                        show: true,
                        info: {
                            title: '提示',
                            tip: '密码修改成功',
                            actionType: '[main] modify password alert',
                            success: 1 // 1 代表成功 2代表失败
                        }
                    }
                });
                console.log(data);
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(passwordInfoObj)
                .map((function () {
                return { type: '[main] modify password useless' };
            }));
        }));
        // 创建单聊
        this.createSingleChatAction$ = this.actions$
            .ofType(actions_1.mainAction.createSingleChatAction)
            .map(effects_1.toPayload)
            .switchMap((function (singleName) {
            var that = _this;
            var createSingleChatObj = common_1.global.JIM.getUserInfo({
                'username': singleName
            }).onSuccess((function (data) {
                var user = data.user_info, item = {
                    avatar: user.avatar,
                    key: user.key || user.uid,
                    mtime: user.mtime,
                    name: user.username,
                    nickName: user.nickname,
                    username: user.username,
                    nickname: user.nickname,
                    type: 3,
                    signature: user.signature,
                    gender: user.gender,
                    region: user.region,
                    avatarUrl: ''
                };
                if (item.avatar) {
                    common_1.global.JIM.getResource({ 'media_id': data.user_info.avatar })
                        .onSuccess((function (urlInfo) {
                        item.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: actions_1.mainAction.createSingleChatSuccess,
                            payload: item
                        });
                    })).onFail((function (error) {
                    }));
                }
                that.store$.dispatch({
                    type: actions_1.mainAction.createSingleChatSuccess,
                    payload: item
                });
            })).onFail((function (data) {
                if (data.code == 882002) {
                    that.store$.dispatch({
                        type: actions_1.mainAction.createSingleChatError,
                        payload: {
                            show: true,
                            info: '查无此人'
                        }
                    });
                }
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(createSingleChatObj)
                .map((function () {
                return { type: '[main] create single chat action useless' };
            }));
        }));
        // 创建群聊搜索联系人
        this.createGroupSearchAction$ = this.actions$
            .ofType(actions_1.mainAction.createGroupSearchAction)
            .map(effects_1.toPayload)
            .switchMap((function (keywords) {
            var that = _this;
            var createGroupSearchObj = common_1.global.JIM.getUserInfo({
                'username': keywords
            }).onSuccess((function (data) {
                var user = data.user_info, item = {
                    avatar: "",
                    avatarUrl: "",
                    key: user.key || user.uid,
                    mtime: user.mtime,
                    name: user.username,
                    nickName: user.nickname,
                    type: 3
                };
                if (user.avatar !== "") {
                    common_1.global.JIM.getResource({ 'media_id': user.avatar })
                        .onSuccess((function (urlInfo) {
                        item.avatarUrl = urlInfo.url;
                        that.store$.dispatch({
                            type: actions_1.mainAction.createGroupSearchComplete,
                            payload: item
                        });
                    })).onFail((function (error) {
                        that.store$.dispatch({
                            type: actions_1.mainAction.createGroupSearchComplete,
                            payload: item
                        });
                    }));
                }
                else {
                    that.store$.dispatch({
                        type: actions_1.mainAction.createGroupSearchComplete,
                        payload: item
                    });
                }
            })).onFail((function (data) {
                if (data.code == 882002) {
                    that.store$.dispatch({
                        type: actions_1.mainAction.createGroupSearchComplete,
                        payload: null
                    });
                }
            }));
            return rxjs_1.Observable.of(createGroupSearchObj)
                .map((function () {
                return { type: '[main] create group search action useless' };
            }));
        }));
        // 获取黑名单列表
        this.blackMenuShow$ = this.actions$
            .ofType(actions_1.mainAction.blackMenu)
            .map(effects_1.toPayload)
            .switchMap((function () {
            var that = _this;
            var blackMenuObj = common_1.global.JIM.getBlacks()
                .onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.blackMenuSuccess,
                    payload: {
                        show: true,
                        menu: data.black_list
                    }
                });
                console.log('success:' + JSON.stringify(data.black_list));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(blackMenuObj)
                .map((function () {
                return { type: '[main] black menu show useless' };
            }));
        }));
        // 移出黑名单列表
        this.delSingleBlack$ = this.actions$
            .ofType(actions_1.mainAction.delSingleBlack)
            .map(effects_1.toPayload)
            .switchMap((function (user) {
            var that = _this;
            var delSingleBlackObj = common_1.global.JIM.delSingleBlacks({
                'member_usernames': [{
                        'username': user.username,
                        'appkey': common_1.authPayload.appKey
                    }]
            }).onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.delSingleBlackSuccess,
                    payload: user
                });
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(delSingleBlackObj)
                .map((function () {
                return { type: '[main] delete single black useless' };
            }));
        }));
        // 加入黑名单
        this.addBlackListAction$ = this.actions$
            .ofType(actions_1.mainAction.addBlackListAction)
            .map(effects_1.toPayload)
            .switchMap((function (active) {
            var that = _this;
            var addBlackListObj = common_1.global.JIM.addSingleBlacks({
                'member_usernames': [{
                        'username': active.name || active.username,
                        'appkey': common_1.authPayload.appKey
                    }]
            }).onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.addBlackListSuccess,
                    payload: {
                        show: false,
                        info: {},
                        deleteItem: {
                            item: active
                        }
                    }
                });
                console.log('success:' + JSON.stringify(data));
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(addBlackListObj)
                .map((function () {
                return { type: '[main] add black list useless' };
            }));
        }));
        // 退出群聊
        this.exitGroupAction$ = this.actions$
            .ofType(actions_1.mainAction.exitGroupAction)
            .map(effects_1.toPayload)
            .filter((function (data) {
            if (!data) {
                return false;
            }
            else {
                return data;
            }
        }))
            .switchMap((function (gid) {
            var that = _this, exitGroupObj = common_1.global.JIM.exitGroup({ 'gid': gid })
                .onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.exitGroupSuccess,
                    payload: {
                        tipModal: {
                            show: false,
                            info: {}
                        },
                        item: {
                            key: gid
                        }
                    }
                });
            })).onFail((function (data) {
                console.log('error:' + JSON.stringify(data));
            }));
            return rxjs_1.Observable.of(exitGroupObj)
                .map((function () {
                return { type: '[main] exit group useless' };
            }));
        }));
        // 退出群聊
        this.deleteMemberAction$ = this.actions$
            .ofType(actions_1.mainAction.deleteMemberAction)
            .map(effects_1.toPayload)
            .switchMap((function (info) {
            var that = _this, deleteMember = common_1.global.JIM.delGroupMembers({
                'gid': info.group.key,
                'member_usernames': [
                    { 'username': info.deleteItem.username }
                ]
            }).onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.mainAction.deleteMemberSuccess,
                    payload: {
                        tipModal: {
                            show: false,
                            info: {}
                        },
                        deleteItem: info.deleteItem,
                        group: info.group
                    }
                });
            })).onFail((function (data) {
                // 同上
            }));
            return rxjs_1.Observable.of(deleteMember)
                .map((function () {
                return { type: '[main] delete group member useless' };
            }));
        }));
    }
    return MainEffect;
}());
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "getSelfInfo$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "logoutAction$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "updateSelfInfo$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "updateSelfAvatar$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "createGroup$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "addGroupMember$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "modifyPassword$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "createSingleChatAction$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "createGroupSearchAction$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "blackMenuShow$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "delSingleBlack$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "addBlackListAction$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "exitGroupAction$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], MainEffect.prototype, "deleteMemberAction$", void 0);
MainEffect = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
        store_1.Store,
        router_1.Router])
], MainEffect);
exports.MainEffect = MainEffect;


/***/ }),

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(843));


/***/ }),

/***/ 843:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mainInit = {
    selfInfo: {
        info: {
            avatar: '',
            avatarUrl: ''
        },
        show: false
    },
    listTab: 0,
    createGroup: {
        show: false,
        info: {}
    },
    logoutShow: false,
    modifyPasswordShow: false,
    searchUserResult: {
        result: {
            singleArr: [],
            groupArr: []
        },
        isSearch: false
    },
    actionType: '',
    tipModal: {
        show: false,
        info: {}
    },
    createSingleChat: {
        show: false,
        info: ''
    },
    blackMenu: {
        menu: [],
        show: false
    },
    createGroupSearch: {
        info: null
    }
};


/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(845));


/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(149);
var model_1 = __webpack_require__(842);
var actions_2 = __webpack_require__(150);
var actions_3 = __webpack_require__(148);
exports.mainReducer = function (state, _a) {
    if (state === void 0) { state = model_1.mainInit; }
    var type = _a.type, payload = _a.payload;
    state.actionType = type;
    switch (type) {
        // 成功获取个人信息
        case actions_1.mainAction.showSelfInfo:
            if (payload.show !== 'undefined') {
                state.selfInfo.show = payload.show;
            }
            // 获取个人信息成功
            if (payload.info) {
                state.selfInfo.info = Object.assign({}, state.selfInfo.info, payload.info);
            }
            if (payload.avatar) {
                state.selfInfo.info.avatarUrl = payload.avatar.url;
            }
            break;
        case actions_1.mainAction.changeListTab:
            // 切换好友或者最近列表
            state.listTab = payload;
            break;
        case actions_2.contactAction.selectContactItem:
            state.listTab = 0;
            break;
        case actions_1.mainAction.createGroupShow:
            // 是否显示创建群组模块
            console.log(33333, payload);
            state.createGroup = payload;
            break;
        case actions_1.mainAction.createGroupSuccess:
            // 创建群组成功
            state.createGroup.show = false;
            state.listTab = 0;
            break;
        case actions_1.mainAction.addGroupMemberSuccess:
            console.log(44444, payload);
            state.createGroup.show = false;
            state.listTab = 0;
            break;
        // 修改密码
        case actions_1.mainAction.modifyPasswordShow:
            state.modifyPasswordShow = payload;
            break;
        case actions_3.chatAction.searchUserSuccess:
            state.searchUserResult = payload;
            break;
        case actions_1.mainAction.selectSearchUser:
            state.listTab = 0;
            state.searchUserResult = {
                result: {
                    groupArr: [],
                    singleArr: []
                },
                isSearch: false
            };
            break;
        // 提示框
        case actions_1.mainAction.showModalTip:
        case actions_1.mainAction.hideModalTip:
        case actions_1.mainAction.addBlackListSuccess:
        case actions_1.mainAction.exitGroupSuccess:
        case actions_1.mainAction.deleteMemberSuccess:
            state.tipModal = payload;
            break;
        // 显示创建单聊模态框
        case actions_1.mainAction.createSingleChatShow:
            state.createSingleChat = payload;
            break;
        // 创建单聊成功
        case actions_1.mainAction.createSingleChatSuccess:
            state.createSingleChat = {
                show: false,
                info: ''
            };
            state.listTab = 0;
            break;
        // 创建单聊失败或关闭单聊
        case actions_1.mainAction.createSingleChatError:
            state.createSingleChat = payload;
            break;
        // 创建群聊搜索联系人
        case actions_1.mainAction.createGroupSearchComplete:
            state.createGroupSearch.info = payload;
            break;
        // 成功获取黑名单列表
        case actions_1.mainAction.blackMenuSuccess:
            state.blackMenu = payload;
            break;
        // 隐藏黑名单列表
        case actions_1.mainAction.hideBlackMenu:
            state.blackMenu = payload;
            break;
        case actions_1.mainAction.delSingleBlack:
            delSingleBlackLoading(state, payload, true);
            break;
        case actions_1.mainAction.delSingleBlackSuccess:
            delSingleBlackLoading(state, payload, false);
            break;
        default:
    }
    return state;
};
function delSingleBlackLoading(state, payload, loadingValue) {
    for (var i = 0; i < state.blackMenu.menu.length; i++) {
        if (state.blackMenu.menu[i].username === payload.username) {
            state.blackMenu.menu[i].loading = loadingValue;
            break;
        }
    }
}


/***/ }),

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAction = {
    register: '[register] register',
    registerSuccess: '[register] register success',
    registerFailed: '[register] register failed',
    isButtonAvailableAction: '[register] is button available action',
    isUsernameAvailableAction: '[register] is username available action',
    usernameTip: '[register] username tip',
    password: '[register] password',
    passwordTip: '[register] password tip',
    repeatPasswordTip: '[register] repeat password tip'
};


/***/ }),

/***/ 847:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(848));


/***/ }),

/***/ 848:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(65);
var effects_1 = __webpack_require__(97);
var store_1 = __webpack_require__(64);
var actions_1 = __webpack_require__(305);
var global_1 = __webpack_require__(96);
var tools_1 = __webpack_require__(151);
var RegisterEffect = (function () {
    function RegisterEffect(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        // 注册
        this.register$ = this.actions$
            .ofType(actions_1.registerAction.register)
            .map(effects_1.toPayload)
            .filter((function (val) {
            if (!val.isButtonAvailable) {
                return false;
            }
            if (val.password !== val.repeatPassword) {
                _this.store$.dispatch({
                    type: actions_1.registerAction.repeatPasswordTip,
                    payload: '您两次输入的密码不一致'
                });
                return false;
            }
            else {
                _this.store$.dispatch({
                    type: actions_1.registerAction.repeatPasswordTip,
                    payload: ''
                });
            }
            if (val.username.length > 128
                || val.username.length < 4
                || /[\u4e00-\u9fa5]/ig.test(val.username)
                || !/^[0-9a-zA-Z]/ig.test(val.username)
                || val.password.length > 128
                || val.password.length < 4
                || !/^([a-zA-Z]|[0-9]|_|\.|-|@]){4,}$/ig.test(val.username)) {
                return false;
            }
            return val;
        }))
            .switchMap((function (val) {
            var that = _this, registerObj = global_1.global.JIM.register({
                'username': val.username,
                'password': tools_1.md5(val.password),
                'is_md5': true
            }).onSuccess((function (data) {
                that.store$.dispatch({
                    type: actions_1.registerAction.registerSuccess,
                    payload: {
                        show: true,
                        info: {
                            title: '提示',
                            tip: '注册成功',
                            actionType: '[main] register success',
                            success: 1
                        }
                    }
                });
            })).onFail((function (data) {
                var usernameTip = '';
                if (data.code === 882002) {
                    usernameTip = '用户名已存在';
                }
                else {
                    usernameTip = '注册失败';
                }
                that.store$.dispatch({
                    type: actions_1.registerAction.registerFailed,
                    payload: usernameTip
                });
            }));
            return rxjs_1.Observable.of(registerObj)
                .map((function () {
                return { type: '[register] register useless' };
            }));
        }));
        // 用户名是否被注册
        this.isUsernameAvailable$ = this.actions$
            .ofType(actions_1.registerAction.isUsernameAvailableAction)
            .map(effects_1.toPayload)
            .filter((function (val) {
            if (val.username.length === 0) {
                val.usernameTip = '';
                return val;
            }
            var usernameTip;
            if (val.username.length > 128 || val.username.length < 4) {
                usernameTip = '用户名为4-128位字符';
            }
            else if (/[\u4e00-\u9fa5]/ig.test(val.username)) {
                usernameTip = '用户名不支持中文';
            }
            else if (!/^[0-9a-zA-Z]/ig.test(val.username)) {
                usernameTip = '用户名以字母或数字开头';
            }
            else if (!/^([a-zA-Z]|[0-9]|_|\.|-|@]){4,}$/ig.test(val.username)) {
                usernameTip = '支持字母、数字、下划线、英文点、减号、@';
            }
            else {
                usernameTip = '';
            }
            val.usernameTip = usernameTip;
            return val;
        }))
            .switchMap((function (val) {
            var usernameObj = {};
            if (val.usernameTip !== '') {
                _this.store$.dispatch({
                    type: actions_1.registerAction.usernameTip,
                    payload: val.usernameTip
                });
            }
            else {
                _this.store$.dispatch({
                    type: actions_1.registerAction.usernameTip,
                    payload: ''
                });
            }
            return rxjs_1.Observable.of(usernameObj)
                .map((function () {
                return { type: '[register] is username available useless' };
            }));
        }));
        // 正则验证密码
        this.password = this.actions$
            .ofType(actions_1.registerAction.password)
            .map(effects_1.toPayload)
            .filter((function (val) {
            var passwordTip;
            if (val.password.length > 128 || val.password.length < 4 && val.password != '') {
                passwordTip = '密码长度为4-128字节';
            }
            else {
                passwordTip = '';
            }
            _this.store$.dispatch({
                type: actions_1.registerAction.passwordTip,
                payload: passwordTip
            });
            return val;
        }))
            .map((function (val) {
            return { type: '[register] password useless' };
        }));
    }
    return RegisterEffect;
}());
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], RegisterEffect.prototype, "register$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], RegisterEffect.prototype, "isUsernameAvailable$", void 0);
tslib_1.__decorate([
    effects_1.Effect(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], RegisterEffect.prototype, "password", void 0);
RegisterEffect = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
        store_1.Store])
], RegisterEffect);
exports.RegisterEffect = RegisterEffect;


/***/ }),

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(850));


/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(305);
var registerInit = {
    isRegisterSuccess: false,
    usernameTip: '',
    passwordTip: '',
    repeatPasswordTip: '',
    isButtonAvailable: false,
    tipModal: {
        show: false,
        info: {}
    }
};
exports.registerReducer = function (state, _a) {
    if (state === void 0) { state = registerInit; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actions_1.registerAction.register:
            break;
        case actions_1.registerAction.registerSuccess:
            state.isRegisterSuccess = true;
            state.usernameTip = '';
            state.tipModal = payload;
            break;
        case actions_1.registerAction.registerFailed:
            state.isRegisterSuccess = false;
            state.usernameTip = payload;
            break;
        case actions_1.registerAction.usernameTip:
            state.usernameTip = payload;
            break;
        case actions_1.registerAction.passwordTip:
            state.passwordTip = payload;
            break;
        case actions_1.registerAction.isButtonAvailableAction:
            isButtonAvailable(state, payload);
            break;
        case actions_1.registerAction.repeatPasswordTip:
            state.repeatPasswordTip = payload;
            break;
        default:
    }
    return state;
};
function isButtonAvailable(state, payload) {
    if (payload.username.length > 0 && payload.password.length > 0 && payload.repeatPassword.length > 0) {
        state.isButtonAvailable = true;
    }
    else {
        state.isButtonAvailable = false;
    }
}


/***/ }),

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiConfig = [
    {
        imgNum: 1,
        text: '微笑'
    },
    {
        imgNum: 2,
        text: '撇嘴'
    },
    {
        imgNum: 3,
        text: '色'
    },
    {
        imgNum: 4,
        text: '发呆'
    },
    {
        imgNum: 5,
        text: '得意'
    },
    {
        imgNum: 6,
        text: '流泪'
    },
    {
        imgNum: 7,
        text: '害羞'
    },
    {
        imgNum: 8,
        text: '闭嘴'
    }, {
        imgNum: 9,
        text: '睡'
    },
    {
        imgNum: 10,
        text: '大哭'
    },
    {
        imgNum: 11,
        text: '尴尬'
    },
    {
        imgNum: 12,
        text: '发怒'
    },
    {
        imgNum: 13,
        text: '调皮'
    },
    {
        imgNum: 14,
        text: '呲牙'
    },
    {
        imgNum: 15,
        text: '惊讶'
    },
    {
        imgNum: 16,
        text: '难过'
    },
    {
        imgNum: 17,
        text: '酷'
    },
    {
        imgNum: 18,
        text: '冷汗'
    },
    {
        imgNum: 19,
        text: '抓狂'
    },
    {
        imgNum: 20,
        text: '吐'
    },
    {
        imgNum: 21,
        text: '偷笑'
    },
    {
        imgNum: 22,
        text: '愉快'
    },
    {
        imgNum: 23,
        text: '白眼'
    },
    {
        imgNum: 24,
        text: '傲慢'
    }, {
        imgNum: 25,
        text: '饥饿'
    },
    {
        imgNum: 26,
        text: '困'
    },
    {
        imgNum: 27,
        text: '惊恐'
    },
    {
        imgNum: 28,
        text: '流汗'
    },
    {
        imgNum: 29,
        text: '憨笑'
    },
    {
        imgNum: 30,
        text: '悠闲'
    },
    {
        imgNum: 31,
        text: '奋斗'
    },
    {
        imgNum: 32,
        text: '咒骂'
    },
    {
        imgNum: 33,
        text: '疑问'
    },
    {
        imgNum: 34,
        text: '嘘'
    },
    {
        imgNum: 35,
        text: '晕'
    },
    {
        imgNum: 36,
        text: '疯了'
    },
    {
        imgNum: 37,
        text: '衰'
    },
    {
        imgNum: 38,
        text: '骷髅'
    },
    {
        imgNum: 39,
        text: '敲打'
    },
    {
        imgNum: 40,
        text: '再见'
    }, {
        imgNum: 41,
        text: '擦汗'
    },
    {
        imgNum: 42,
        text: '抠鼻'
    },
    {
        imgNum: 43,
        text: '鼓掌'
    },
    {
        imgNum: 44,
        text: '糗大了'
    },
    {
        imgNum: 45,
        text: '坏笑'
    },
    {
        imgNum: 46,
        text: '左哼哼'
    },
    {
        imgNum: 47,
        text: '右哼哼'
    },
    {
        imgNum: 48,
        text: '哈欠'
    },
    {
        imgNum: 49,
        text: '鄙视'
    },
    {
        imgNum: 50,
        text: '委屈'
    },
    {
        imgNum: 51,
        text: '快哭了'
    },
    {
        imgNum: 52,
        text: '阴险'
    },
    {
        imgNum: 53,
        text: '亲亲'
    },
    {
        imgNum: 54,
        text: '吓'
    },
    {
        imgNum: 55,
        text: '可怜'
    },
    {
        imgNum: 56,
        text: '菜刀'
    },
    {
        imgNum: 57,
        text: '西瓜'
    }, {
        imgNum: 58,
        text: '啤酒'
    },
    {
        imgNum: 59,
        text: '篮球'
    },
    {
        imgNum: 60,
        text: '乒乓'
    },
    {
        imgNum: 61,
        text: '咖啡'
    },
    {
        imgNum: 62,
        text: '饭'
    },
    {
        imgNum: 63,
        text: '猪头'
    },
    {
        imgNum: 64,
        text: '玫瑰'
    },
    {
        imgNum: 65,
        text: '凋谢'
    },
    {
        imgNum: 66,
        text: '嘴唇'
    },
    {
        imgNum: 67,
        text: '爱心'
    },
    {
        imgNum: 68,
        text: '心碎'
    },
    {
        imgNum: 69,
        text: '蛋糕'
    },
    {
        imgNum: 70,
        text: '闪电'
    },
    {
        imgNum: 71,
        text: '炸弹'
    },
    {
        imgNum: 72,
        text: '刀'
    },
    {
        imgNum: 73,
        text: '足球'
    }, {
        imgNum: 74,
        text: '瓢虫'
    },
    {
        imgNum: 75,
        text: '便便'
    },
    {
        imgNum: 76,
        text: '月亮'
    },
    {
        imgNum: 77,
        text: '太阳'
    },
    {
        imgNum: 78,
        text: '礼物'
    },
    {
        imgNum: 79,
        text: '拥抱'
    },
    {
        imgNum: 80,
        text: '强'
    },
    {
        imgNum: 81,
        text: '弱'
    },
    {
        imgNum: 82,
        text: '握手'
    },
    {
        imgNum: 83,
        text: '胜利'
    },
    {
        imgNum: 84,
        text: '抱拳'
    },
    {
        imgNum: 85,
        text: '勾引'
    },
    {
        imgNum: 86,
        text: '拳头'
    },
    {
        imgNum: 87,
        text: '差劲'
    },
    {
        imgNum: 88,
        text: '爱你'
    },
    {
        imgNum: 89,
        text: 'NO'
    }, {
        imgNum: 90,
        text: 'OK'
    },
    {
        imgNum: 91,
        text: '爱情'
    },
    {
        imgNum: 92,
        text: '飞吻'
    },
    {
        imgNum: 93,
        text: '跳跳'
    },
    {
        imgNum: 94,
        text: '发抖'
    },
    {
        imgNum: 95,
        text: '怄火'
    },
    {
        imgNum: 96,
        text: '转圈'
    },
    {
        imgNum: 97,
        text: '磕头'
    },
    {
        imgNum: 98,
        text: '回头'
    },
    {
        imgNum: 99,
        text: '跳绳'
    },
    {
        imgNum: 100,
        text: '投降'
    },
    {
        imgNum: 101,
        text: '激动'
    },
    {
        imgNum: 102,
        text: '乱舞'
    },
    {
        imgNum: 103,
        text: '献吻'
    },
    {
        imgNum: 104,
        text: '左太极'
    },
    {
        imgNum: 105,
        text: '右太极'
    }
];
exports.jpushConfig = [
    {
        imgNum: 1,
        text: ''
    },
    {
        imgNum: 2,
        text: ''
    },
    {
        imgNum: 3,
        text: ''
    },
    {
        imgNum: 4,
        text: ''
    },
    {
        imgNum: 5,
        text: ''
    },
    {
        imgNum: 6,
        text: ''
    },
    {
        imgNum: 7,
        text: ''
    },
    {
        imgNum: 8,
        text: ''
    }, {
        imgNum: 9,
        text: ''
    },
    {
        imgNum: 10,
        text: ''
    },
    {
        imgNum: 11,
        text: ''
    },
    {
        imgNum: 12,
        text: ''
    },
    {
        imgNum: 13,
        text: ''
    },
    {
        imgNum: 14,
        text: ''
    },
    {
        imgNum: 15,
        text: ''
    },
    {
        imgNum: 16,
        text: ''
    },
    {
        imgNum: 17,
        text: ''
    },
    {
        imgNum: 18,
        text: ''
    },
    {
        imgNum: 19,
        text: ''
    },
    {
        imgNum: 20,
        text: ''
    },
    {
        imgNum: 21,
        text: ''
    },
    {
        imgNum: 22,
        text: ''
    },
    {
        imgNum: 23,
        text: ''
    },
    {
        imgNum: 24,
        text: ''
    }
];


/***/ }),

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var Rx_1 = __webpack_require__(65);
var ModalConfigService = (function () {
    function ModalConfigService() {
        this.modalConfig = new Rx_1.BehaviorSubject(false);
        this.topic$ = this.modalConfig.asObservable();
    }
    ModalConfigService.prototype.updataModal = function (message) {
        this.modalConfig.next(message);
    };
    return ModalConfigService;
}());
ModalConfigService = tslib_1.__decorate([
    core_1.Injectable()
], ModalConfigService);
exports.ModalConfigService = ModalConfigService;
var InfoCountService = (function () {
    function InfoCountService() {
        this.userCount = new Rx_1.BehaviorSubject(false);
        this.userCount$ = this.userCount.asObservable();
    }
    InfoCountService.prototype.isCount = function (message) {
        this.userCount.next(message);
    };
    return InfoCountService;
}());
exports.InfoCountService = InfoCountService;


/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.md5 = function (string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    ;
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    ;
    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    ;
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    ;
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
};


/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pinyin = __webpack_require__(817);
var Util = (function () {
    function Util() {
    }
    /**
     * 将input file转化成formData对象
     * params id: string , input file的id
     * return FormData对象
     */
    Util.prototype.getFileFormData = function (id) {
        var fd = new FormData();
        var file = document.getElementById(id);
        if (!file.files[0]) {
            throw new Error('获取文件失败');
        }
        fd.append(file.files[0].name, file.files[0]);
        return fd;
    };
    /**
     * fileReader预览图片返回img url
     * params file: input file 对象, callback 回调函数
     * return null
     */
    Util.prototype.imgReader = function (file, callback) {
        var files = file.files[0];
        if (!/image\/\w+/.test(files.type)) {
            alert("文件必须为图片！");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(files);
        var img = new Image();
        var promise = new Promise(function (resolve, reject) {
            reader.onload = function (e) {
                img.src = this.result;
                var that = this;
                img.onload = function () {
                    var width = img.naturalWidth;
                    var height = img.naturalHeight;
                    resolve({
                        src: that.result,
                        width: width,
                        height: height
                    });
                };
            };
        });
        promise.then((function (value) {
            callback(value);
        }), (function (value) {
        }));
    };
    /**
     * fileReader预览图片url
     * params file: input file 对象
     */
    Util.prototype.fileReader = function (file) {
        var files = file.files[0];
        if (!/image\/\w+/.test(files.type)) {
            alert("文件必须为图片！");
            return new Promise(function (resolve, reject) {
                reject();
            });
        }
        var reader = new FileReader();
        reader.readAsDataURL(files);
        return new Promise(function (resolve) {
            reader.onload = function (e) {
                resolve(this.result);
            };
        });
    };
    /**
     * 对象深度拷贝
     * params oldObj: Object   需要拷贝的对象
     * return Object 新对象
     */
    Util.prototype.deepCopy = function (oldObj) {
        var newObject = {};
        if (oldObj) {
            if (oldObj.constructor === Object) {
                newObject = new oldObj.constructor();
            }
            else {
                newObject = new oldObj.constructor(oldObj.valueOf());
            }
            for (var key in oldObj) {
                if (newObject[key] !== oldObj[key]) {
                    if (typeof (oldObj[key]) === 'object') {
                        newObject[key] = this.deepCopy(oldObj[key]);
                    }
                    else {
                        newObject[key] = oldObj[key];
                    }
                }
            }
            newObject.toString = oldObj.toString;
            newObject.valueOf = oldObj.valueOf;
            return newObject;
        }
    };
    /**
     * contenteditable输入框插入表情
     * params field: object  输入框dom对象， value: string 需要插入的内容
     */
    Util.prototype.insertAtCursor = function (field, value, selectPastedContent) {
        var sel, range;
        // if (field.nodeName == 'PRE') {
        field.focus();
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement('div');
                el.innerHTML = value;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    }
                    else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
        //  else if ((sel = document.selection) && sel.type !== 'Control') {
        //     var originalRange = sel.createRange();
        //     originalRange.collapse(true);
        //     sel.createRange().pasteHTML(html);
        //     if (selectPastedContent) {
        //         range = sel.createRange();
        //         range.setEndPoint('StartToStart', originalRange);
        //         range.select();
        //     }
        // }
        // } else {
        //     if (document.selection) {
        //         field.focus();
        //         sel = document.selection.createRange();
        //         sel.text = value;
        //         sel.select();
        //     }
        //     else if (field.selectionStart || field.selectionStart === 0) {
        //         var startPos = field.selectionStart;
        //         var endPos = field.selectionEnd;
        //         var restoreTop = field.scrollTop;
        //         field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
        //         if (restoreTop > 0) {
        //             field.scrollTop = restoreTop;
        //         }
        //         field.focus();
        //         field.selectionStart = startPos + value.length;
        //         field.selectionEnd = startPos + value.length;
        //     } else {
        //         field.value += value;
        //         field.focus();
        //     }
        // }
    };
    /**
     * contenteditable输入框光标聚焦到最后
     * params obj: object  输入框dom对象
     */
    Util.prototype.focusLast = function (obj) {
        // if (window.getSelection) {//ie11 10 9 ff safari
        // obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
        // }
        // else if (document.selection) {//ie10 9 8 7 6 5
        //     var range = document.selection.createRange();//创建选择对象
        //     //var range = document.body.createTextRange();
        //     range.moveToElementText(obj);//range定位到obj
        //     range.collapse(false);//光标移至最后
        //     range.select();
        // }
    };
    /**
     * 判断字符串首字母是否是中文
     * params str: string  需要操作的字符串
     * return boolean
     */
    Util.prototype.firstLetterIsChinese = function (str) {
        var re = /^[\\u4e00-\\u9fa5]/;
        if (re.test(str))
            return false;
        return true;
    };
    /**
     * 将数组中的字符串按照首字母及中文拼音首字母排序
     * params payload: 数组  需要排序的数组
     * return 排好序的数组array
     */
    Util.prototype.sortByLetter = function (payload) {
        console.log(555555, payload);
        var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], result = [], defaultResult = {
            letter: 'unknow',
            data: []
        }, flag = false;
        for (var j = 0; j < letter.length; j++) {
            var temp = {
                letter: letter[j],
                data: []
            };
            for (var i = 0; i < payload.length; i++) {
                var name_1 = payload[i].name, firstLetter = name_1.charAt(0);
                if (name_1 === '' && j === 0)
                    defaultResult.data.push(payload[i]);
                if (name_1 === '')
                    continue;
                if (name_1.match(/^[a-zA-Z]/)) {
                    if (firstLetter.toUpperCase() === letter[j])
                        temp.data.push(payload[i]);
                }
                else if (this.firstLetterIsChinese(name_1)) {
                    var py = pinyin(firstLetter, {
                        style: pinyin.STYLE_NORMAL
                    });
                    if (py[0][0].charAt(0).toUpperCase() === letter[j])
                        temp.data.push(payload[i]);
                }
                else if (flag === false) {
                    defaultResult.data.push(payload[i]);
                }
            }
            result = result.concat(temp);
            flag = true;
        }
        result.push(defaultResult);
        return result;
    };
    /**
     * 将元素插入按首字母排序的数组中
     * params arr: 之前排好序的数组 array， payload: object  需要插入的元素
     * return 插入元素之后的数组array
     */
    Util.prototype.insertSortByLetter = function (arr, payload) {
        var name = payload.name, firstLetter = payload.name.charAt(0);
        if (name.match(/^[a-zA-Z]/)) {
            firstLetter = firstLetter.toUpperCase();
        }
        else if (this.firstLetterIsChinese(name)) {
            var py = pinyin(firstLetter, {
                style: pinyin.STYLE_NORMAL
            });
            firstLetter = py[0][0].charAt(0).toUpperCase();
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].letter === firstLetter) {
                arr[i].data.push(payload);
                break;
            }
        }
        return arr;
    };
    /**
     * 将接收到的地理定位坐标转化为百度地图
     * params obj: 坐标对象
     * return null
     */
    Util.prototype.theLocation = function (obj) {
        // 百度地图API功能
        var point = new BMap.Point(obj.longitude, obj.latitude);
        var map = new BMap.Map(obj.id);
        map.centerAndZoom(point, 11);
        if (obj.scroll) {
            map.enableScrollWheelZoom(true);
        }
        // map.disableDragging();
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        map.panTo(point);
    };
    /**
     * 将时间转化成需要的格式
     * params msgTime: 需要转换的时间毫秒数
     * return string 时间的标识，根据标识可以再页面应用不同的date管道
     *
     * 当天 --- today
     * 昨天和前天 --- yesterday或the day before
     * 近7天（排除今天，昨天，前天） --- day
     * 今年其他时间 --- month
     * 今年之前的时间 --- year
     */
    Util.prototype.reducerDate = function (msgTime) {
        var time = new Date(msgTime), now = new Date(), msgYear = time.getFullYear(), nowYear = now.getFullYear(), msgMonth = time.getMonth() + 1, nowMonth = now.getMonth() + 1, msgDate = time.getDate(), nowDate = now.getDate(), msgDay = time.getDay();
        if (msgYear !== nowYear) {
            return 'year';
        }
        else if (msgMonth !== nowMonth || (msgMonth === nowMonth && nowDate - msgDate > 6)) {
            return 'month';
        }
        else if (nowDate - msgDate <= 6 && nowDate - msgDate > 2) {
            return 'day';
        }
        else if (nowDate - msgDate === 2) {
            return 'the day before';
        }
        else if (nowDate - msgDate === 1) {
            return 'yesterday';
        }
        else if (nowDate === msgDate) {
            return 'today';
        }
    };
    return Util;
}());
exports.Util = Util;


/***/ }),

/***/ 855:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hmr_1 = __webpack_require__(554);
var HMR = (function () {
    function HMR(appRef) {
        this.appRef = appRef;
    }
    HMR.prototype.hmrOnInit = function (store) {
        if (!store)
            return;
    };
    HMR.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map((function (cmp) { return cmp.location.nativeElement; }));
        // recreate elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // remove styles
        hmr_1.removeNgStyles();
    };
    HMR.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    };
    return HMR;
}());
exports.HMR = HMR;


/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(210);
var app_module_1 = __webpack_require__(542);
var global_1 = __webpack_require__(96);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .then((function (componentRef) {
    console.log('setting global');
    global_1.global.injector = componentRef.injector;
}));


/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map((function (n) {
			return test2[n];
		}));
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach((function (letter) {
			test3[letter] = letter;
		}));
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.global = {
    injector: null,
    JIM: null,
    user: '',
    password: ''
};


/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_effects__ = __webpack_require__(310);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Effect", (function() { return __WEBPACK_IMPORTED_MODULE_0__src_effects__["a"]; }));
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeEffects", (function() { return __WEBPACK_IMPORTED_MODULE_0__src_effects__["b"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_actions__ = __webpack_require__(307);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Actions", (function() { return __WEBPACK_IMPORTED_MODULE_1__src_actions__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_effects_module__ = __webpack_require__(555);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EffectsModule", (function() { return __WEBPACK_IMPORTED_MODULE_2__src_effects_module__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_effects_subscription__ = __webpack_require__(309);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EffectsSubscription", (function() { return __WEBPACK_IMPORTED_MODULE_3__src_effects_subscription__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_util__ = __webpack_require__(556);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toPayload", (function() { return __WEBPACK_IMPORTED_MODULE_4__src_util__["a"]; }));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_bootstrap_listener__ = __webpack_require__(308);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "runAfterBootstrapEffects", (function() { return __WEBPACK_IMPORTED_MODULE_5__src_bootstrap_listener__["a"]; }));






//# sourceMappingURL=index.js.map

/***/ })

},[858]);