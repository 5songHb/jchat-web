import { pinyin, md5 } from '../tools';
import { authPayload } from '../common';

declare let BMap;

export class Util {
    constructor(){}
    /**
     * 将input file转化成formData对象
     * params id: string , input file的id
     * return FormData对象
     */
    getFileFormData(file, type: string){
        let fd = new FormData();
        if(!file.files[0]) {
            throw new Error('获取文件失败');
        }
        console.log(555, file.files[0].name);
        if(type === 'file'){
            let index = file.files[0].name.lastIndexOf('.'),
                ext = file.files[0].name.substring(index),
                doc = ['.ppt', '.pptx', '.doc', '.docx', '.pdf', '.xls', '.xlsx', '.txt', '.wps'],
                video = [],
                audio = [],
                image = [],
                other = [];
        }
        fd.append(file.files[0].name, file.files[0]);
        return fd;
    }
    /**
     * fileReader预览图片返回img url
     * params file: input file 对象, callback 回调函数
     * return null
     */
    imgReader(file, callback?: Function){
        let files = file.files[0];
        if(!/image\/\w+/.test(files.type)){ 
            alert("文件必须为图片！"); 
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(files);
        let img = new Image(),
            promise = new Promise(function(resolve,reject){
            reader.onload = function(e){
                img.src = this.result;
                let that = this;
                img.onload = function(){
                    let width = img.naturalWidth;
                    let height = img.naturalHeight;
                    resolve({
                        src: that.result, 
                        width, 
                        height
                    });
                }
            }
        });
        promise.then(function(value){
            callback(value);
        },function(value){

        })
    }
    /**
     * fileReader预览图片url
     * params file: input file 对象
     */
    fileReader(file){
        let files = file.files[0];
        if(!files.type){
            return;
        }
        if(!/image\/\w+/.test(files.type)){ 
            alert("文件必须为图片！"); 
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(files);
        return new Promise((resolve) => {
            reader.onload = function(e){
                resolve(this.result);
            }
        })
    }
    /**
     * 对象深度拷贝
     * params oldObj: Object   需要拷贝的对象
     * return Object 新对象
     */
    // deepCopy(oldObj) {
    //     let newObject = {};
    //     if(oldObj){
    //         if (oldObj.constructor === Object) {
    //             newObject = new oldObj.constructor();
    //         } else {
    //             newObject = new oldObj.constructor(oldObj.valueOf());
    //         }
    //         for (const key in oldObj) {
    //             if (newObject[key] !== oldObj[key]) {
    //                 if (typeof(oldObj[key]) === 'object') {
    //                     newObject[key] = this.deepCopy(oldObj[key]);
    //                 } else {
    //                     newObject[key] = oldObj[key];
    //                 }
    //             }
    //         }
    //         newObject.toString = oldObj.toString;
    //         newObject.valueOf = oldObj.valueOf;
    //         return newObject;
    //     }
    // }
    /**
     * contenteditable输入框插入表情
     * params field: object  输入框dom对象， value: string 需要插入的内容
     */
    
    insertAtCursor (field, value, selectPastedContent) {
        let sel, range;
        // if (field.nodeName == 'PRE') {
            field.focus();
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    let el = document.createElement('div');
                    el.innerHTML = value;
                    let frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    let firstNode = frag.firstChild;
                    range.insertNode(frag);

                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        if (selectPastedContent) {
                            range.setStartBefore(firstNode);
                        } else {
                            range.collapse(true);
                        }
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }
            //  else if ((sel = document.selection) && sel.type !== 'Control') {
            //     let originalRange = sel.createRange();
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
        //         let startPos = field.selectionStart;
        //         let endPos = field.selectionEnd;
        //         let restoreTop = field.scrollTop;
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
    }
    /**
     * contenteditable输入框光标聚焦到最后
     * params obj: object  输入框dom对象
     */
    focusLast(obj) {
        // if (document.selection) {//ie10 9 8 7 6 5
        //     let range = document.selection.createRange();//创建选择对象
        //     //let range = document.body.createTextRange();
        //     range.moveToElementText(obj);//range定位到obj
        //     range.collapse(false);//光标移至最后
        //     range.select();
        // }else 
        if (window.getSelection) {//ie11 10 9 ff safari
            let range = window.getSelection();//创建range
            range.selectAllChildren(obj);//range 选择obj下所有子内容
            // range.collapseToEnd();//光标移至最后
            range.collapse(obj, obj.childNodes.length);
        }
    }
    /**
     * 判断字符串首字母是否是中文
     * params str: string  需要操作的字符串
     * return boolean
     */
    firstLetterIsChinese(str){
      let re=/^[\\u4e00-\\u9fa5]/;
      if (re.test(str)) return false ;
      return true ;
    }
    /**
     * 将数组中的字符串按照首字母及中文拼音首字母排序
     * params payload: 数组  需要排序的数组
     * return 排好序的数组array
     */
    sortByLetter(payload){
        let letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            result = [],
            defaultResult = {
                letter: '#',
                data: []
            },
            flag = false;
        for(let i=0;i<letter.length;i++){
            result.push({
                letter: letter[i],
                data: []
            })
        }
        result.push({
            letter: '#',
            data: []
        });
        for(let i=0;i<payload.length;i++){
            let flag = false;     
            for(let j=0;j<result.length;j++){
                let name = (payload[i].nickName && payload[i].nickName !== '') ? payload[i].nickName : payload[i].name,
                    firstLetter = name.charAt(0);
                if(name === ''){
                    break;
                }
                if(name.match(/^[a-zA-Z]/)){
                    if(firstLetter.toUpperCase() === result[j].letter){
                        result[j].data.push(payload[i]);
                        flag = true;
                        break;
                    }
                }else if(this.firstLetterIsChinese(name)){
                    let py = pinyin(firstLetter,{
                        style: pinyin.STYLE_NORMAL
                    });
                    if(py[0][0].charAt(0).toUpperCase() === result[j].letter){
                        result[j].data.push(payload[i]);
                        flag = true;
                        break;
                    }
                }
            }
            if(!flag){
                result[result.length - 1].data.push(payload[i]);
            }
        }
        return result;
    }
    /**
     * 将元素插入按首字母排序的数组中
     * params arr: 之前排好序的数组 array， payload: object  需要插入的元素
     * return 插入元素之后的数组array
     */
    insertSortByLetter(arr, payload){
        let name = (payload.nickName && payload.nickName !== '') ? payload.nickName : payload.name,
            firstLetter = name.charAt(0);
        if(name.match(/^[a-zA-Z]/)){
            firstLetter = firstLetter.toUpperCase();
        }else if(this.firstLetterIsChinese(name)){
            let py = pinyin(firstLetter,{
                style: pinyin.STYLE_NORMAL
            });
            firstLetter = py[0][0].charAt(0).toUpperCase();
        }else{
            firstLetter = '#';
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i].letter === firstLetter){
                arr[i].data.push(payload);
                break;
            }
        }
        return arr;
    }
    /**
     * 将接收到的地理定位坐标转化为百度地图
     * params obj: 坐标对象
     * return null
     */
    theLocation(obj){
        // 百度地图API功能
        let point = new BMap.Point(obj.longitude, obj.latitude),
            map = new BMap.Map(obj.id);
        map.centerAndZoom(point,13);
        if(obj.scroll){
            map.enableScrollWheelZoom(true);
        }
        // map.disableDragging();
        let marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(point);
    }
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
    reducerDate(msgTime){
        let time = new Date(msgTime),
            now = new Date(),
            msgYear = time.getFullYear(),
            nowYear = now.getFullYear(),
            nowHour = now.getHours(),
            nowMinute = now.getMinutes(),
            nowSecond = now.getSeconds(),
            nowTime = now.getTime(),
            todayTime = nowHour * 60 * 1000 * 60 + nowMinute * 1000 * 60 + nowSecond * 1000,
            gapDate = (nowTime - todayTime - msgTime) / 1000 / 60 / 60 / 24;
            
        if(msgYear !== nowYear){
            return 'year';                                
        }else if(gapDate > 6){
            return 'month';
        }else if(gapDate <= 6 && gapDate > 2){
            return 'day';
        }else if(gapDate <= 2 && gapDate > 1){
            return 'the day before';
        }else if(gapDate <= 1 && gapDate > 0){
            return 'yesterday';
        }else if(gapDate <= 0){
            return 'today';
        }
    }
    /**
     * 判断两个时间间隔是否超过5分钟
     * params oldTime: number, newTime: number
     */
    fiveMinutes(oldTime, newTime){
        let gap = newTime - oldTime;
        if(gap / 1000 / 60 > 5){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 生成JIM初始化的签名
     * params timestamp: 当前的时间毫秒数
     * return string 签名
     */
    createSignature(timestamp : number){
        return md5(`appkey=${authPayload.appKey}&timestamp=${timestamp}&random_str=${authPayload.randomStr}&key=${authPayload.masterkey}`);
    }
}
