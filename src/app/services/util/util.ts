import { pinyin, md5 } from '../tools';
import { authPayload } from '../common';

declare let BMap;

export class Util {
    constructor(){}
    /**
     * 将input file转化成formData对象
     * @param file: Object
     * @return Object FormData对象
     */
    getFileFormData(file){
        let fd = new FormData();
        fd.append(file.files[0].name, file.files[0]);
        return fd;
    }
    /**
     * 发送文件时截取后缀名作为拓展字段
     * @param name string
     * @return string 后缀名
     */
    getExt(name){
        const index = name.lastIndexOf('.');
        return index === -1 ? '' : name.substring(index + 1);
    }
    /**
     * fileReader预览图片返回img url
     * @param file: Object, input file 对象
     * @param callback: function 回调函数
     */
    imgReader(file, callback ?: Function, callback2 ?: Function){
        let files = file.files[0];
        if(!/image\/\w+/.test(files.type)){
            callback();
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(files);
        let img = new Image(),
            promise = new Promise((resolve, reject) => {
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
            }).catch(() => {
                console.log("Promise Rejected");
            })
        promise.then((value) => {
            callback2(value);
        }, (error) => {

        }).catch(() => {
            console.log("Promise Rejected");
        });
    }
    /**
     * fileReader预览图片url
     * @param file: Object, input file 对象
     */
    fileReader(file, callback ?: Function){
        let files = file.files[0];
        if(!files.type && files.type !== ''){
            return false;
        }
        if(!/image\/\w+/.test(files.type)){
            callback();
            return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(files);
        return new Promise((resolve, reject) => {
            reader.onload = function(e){
                resolve(this.result);
            }
        }).catch(() => {
            console.log("Promise Rejected");
        });
    }
    /**
     * contenteditable输入框插入内容（表情、粘贴文本等）
     * @param field: Object  输入框dom对象
     * @param value: string 需要插入的内容
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
     * @param obj: Object  输入框dom对象
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
            range.collapse(obj, obj.childNodes.length);//光标移至最后
        }
    }
    /**
     * 判断字符串首字母是否是中文
     * @param str: string  需要操作的字符串
     * @return boolean
     */
    firstLetterIsChinese(str){
      const re = /^[\\u4e00-\\u9fa5]/;
      if (re.test(str)) return false ;
      return true ;
    }
    /**
     * 将数组中的字符串按照首字母及中文拼音首字母排序
     * @param payload: array 需要排序的数组
     * @return array 排好序的数组array
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
        for(let item of payload){
            let flag = false;     
            for(let j=0;j<result.length;j++){
                let name = (item.nickName && item.nickName !== '') ? item.nickName : item.name,
                    firstLetter = name.charAt(0);
                if(name === ''){
                    break;
                }
                if(name.match(/^[a-zA-Z]/)){
                    if(firstLetter.toUpperCase() === result[j].letter){
                        result[j].data.push(item);
                        flag = true;
                        break;
                    }
                }else if(this.firstLetterIsChinese(name)){
                    let py = pinyin(firstLetter,{
                        style: pinyin.STYLE_NORMAL
                    });
                    if(py[0][0].charAt(0).toUpperCase() === result[j].letter){
                        result[j].data.push(item);
                        flag = true;
                        break;
                    }
                }
            }
            if(!flag){
                result[result.length - 1].data.push(item);
            }
        }
        return result;
    }
    /**
     * 将元素插入按首字母排序的数组中
     * @param arr: array 之前排好序的数组 
     * @param payload: Object  需要插入的元素
     * @return array 插入元素之后的数组
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
     * @param obj: Object 坐标对象
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
     * @param msgTime: 需要转换的时间毫秒数
     * @return string 时间的标识，根据标识可以再页面应用不同的date管道
     * 
     * 当天 --- today
     * 昨天和前天 --- yesterday或the day before
     * 近7天（排除今天，昨天，前天） --- day
     * 今年其他时间 --- month
     * 今年之前的时间 --- year
     */
    reducerDate(msgTime){
        const time = new Date(msgTime),
            now = new Date(),
            msgYear = time.getFullYear(),
            nowYear = now.getFullYear(),
            nowHour = now.getHours(),
            nowMinute = now.getMinutes(),
            nowSecond = now.getSeconds(),
            nowTime = now.getTime(),
            todayTime = nowHour * 60 * 1000 * 60 + nowMinute * 1000 * 60 + nowSecond * 1000,
            gapDate = (nowTime - todayTime - msgTime) / 1000 / 60 / 60 / 24;
        let showTime = '';
        if(msgYear !== nowYear){
            showTime = 'year';                                
        }else if(gapDate > 6){
            showTime = 'month';
        }else if(gapDate <= 6 && gapDate > 2){
            showTime = 'day';
        }else if(gapDate <= 2 && gapDate > 1){
            showTime = 'the day before';
        }else if(gapDate <= 1 && gapDate > 0){
            showTime = 'yesterday';
        }else if(gapDate <= 0){
            showTime = 'today';
        }else{
            showTime = '';
        }
        return showTime;
    }
    /**
     * 判断两个时间间隔是否超过5分钟
     * @param oldTime: number
     * @param newTime: number
     * @return boolean
     */
    fiveMinutes(oldTime, newTime){
        const gap = newTime - oldTime;
        if(gap / 1000 / 60 > 5){
            return true;
        }
        return false;
    }
    /**
     * 生成JIM初始化的签名
     * @param timestamp: number 当前的时间毫秒数
     * @return string 签名
     */
    createSignature(timestamp : number){
        return md5(`appkey=${authPayload.appKey}&timestamp=${timestamp}&random_str=${authPayload.randomStr}&key=${authPayload.masterkey}`);
    }
}
