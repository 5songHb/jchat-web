import { md5 } from '../tools';
// 签名算法
let timestamp = new Date().getTime(),
    randomStr = '404',
    appKey = '4f7aef34fb361292c566a1cd',
    masterkey = '054d6103823a726fc12d0466',
    signature = md5(`appkey=${appKey}&timestamp=${timestamp}&random_str=${randomStr}&key=${masterkey}`);

export const authPayload = {
    appKey,
    randomStr,
    signature,
    timestamp,
    flag: 1
}
// 自定义滚动条配置
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
export const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  minScrollbarLength: 40
};
// js中静态资源的七牛路径，因为webpack不能将js的文件路径编译，所以需要手动配置
export const imgRouter = 'http://7xo28s.com1.z0.glb.clouddn.com/web-jchat/0.0.1/';