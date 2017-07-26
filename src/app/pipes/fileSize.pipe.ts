import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将文件的大小格式化
 */
@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(size) {
    let newSize = '';
    if(size > 1024 * 1024){
        newSize = (size / (1024 * 1024)).toFixed(2) + 'M';
    }else{
        newSize = (size / 1024).toFixed(2) + 'KB';
    }
    return newSize;
  }
}