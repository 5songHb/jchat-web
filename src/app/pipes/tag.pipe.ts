import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将毫秒数转化成星期几
 */
@Pipe({
    name: 'tag'
})
export class TagPipe implements PipeTransform {
  transform(text): string {
    text = text.replace(new RegExp('&lt;','g'),'<');
    text = text.replace(new RegExp('&gt;','g'),'>');
    return text;
  }
}