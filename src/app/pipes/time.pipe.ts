import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将毫秒数转化成星期几
 */
@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(time, str: string): string {
    
    return time;
  }
}