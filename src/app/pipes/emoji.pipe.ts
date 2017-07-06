import { Pipe, PipeTransform } from '@angular/core';
declare let Emoji;

/**
 * 将毫秒数转化成星期几
 */
@Pipe({
    name: 'emoji'
})
export class EmojiPipe implements PipeTransform {
  transform(text) {
    return Emoji.emoji(text);
  }
}