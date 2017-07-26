import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将不同后缀名的文件分类
 */
@Pipe({
    name: 'fileType'
})
export class FileTypePipe implements PipeTransform {
  transform(ext) {
    if(ext === ''){
        return 'other';
    }
    const audio = ['.wav', '.mp3', '.wma', '.midi'],
          document = ['ppt', 'pptx', 'doc', 'docx', 'pdf', 'xls', 'xlsx', 'txt', 'wps'],
          video = ['mp4', 'mov', 'rm', 'rmvb', 'wmv', 'avi', '3gp', 'mkv'],
          image = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    let newType = '';
    if(audio.indexOf(ext) !== -1){
        newType = 'audio';
    }else if(document.indexOf(ext) !== -1){
        newType = 'document';
    }else if(video.indexOf(ext) !== -1){
        newType = 'video';
    }else if(image.indexOf(ext) !== -1){
        newType = 'image';
    }else{
        newType = 'other';
    }
    return newType;
  }
}