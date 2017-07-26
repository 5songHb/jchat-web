import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将数字向下取整
 */
@Pipe({
    name: 'floor'
})
export class FloorPipe implements PipeTransform {
  transform(time): number {
    return Math.floor(Number(time));
  }
}