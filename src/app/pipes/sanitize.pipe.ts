import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * 防止xss攻击(html, url)
 */
@Pipe({
    name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(
    private _sanitizer: DomSanitizer
  ) { }
  transform(value: string, type: string) {
    if(type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml(value);
    }else if(type === 'url'){
      return this._sanitizer.bypassSecurityTrustUrl(value);
    }
  }
}