import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将文件对象的filename随机生成文件名
 */
@Pipe({
    name: 'src'
})
export class SrcPipe implements PipeTransform {
  transform(src): string {
    let ext = src.split('data:image/')[1],
		        name = '',
		        randomArr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    ext = ext.split(';base64')[0];
    for(let i=0;i<15;i++){
      let index = Math.floor(Math.random() * 52);
      name += randomArr[index];
    }
    return name + '.' + ext;
  }
}