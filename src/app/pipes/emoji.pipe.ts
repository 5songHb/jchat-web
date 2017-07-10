import { Pipe, PipeTransform } from '@angular/core';
declare let Emoji;

/**
 * 将原始表情转化成unicode编码
 */
@Pipe({
    name: 'emoji'
})
export class EmojiPipe implements PipeTransform {
  transform(text) {
    return Emoji.emoji(text);
  }
}