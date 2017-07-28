import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将毫秒数转化固定的日期格式，为了解决angular2原生的date管道在IE11下的兼容问题
 */
@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(time, str: string): string {
    let t = new Date(time),
				y = t.getFullYear(),
				mo = this.change(t.getMonth() + 1),
				d = this.change(t.getDate()),
				h = this.change(t.getHours()),
				mi = this.change(t.getMinutes()),
				s = this.change(t.getSeconds()),
        newTime = '',
        arr = str.split(' ');
				str = str.trim();
				// yy-MM-dd HH:mm
		    if(arr.length === 2){
		      let arr2 = arr[0].split('-');
		      if(arr2.length === 3){
		       	newTime += (y + '-' + mo + '-' + d + ' ');
		      }else if(arr2.length === 2){
		      	newTime += (mo + '-' + d + ' ');
		      }
		      let arr3 = arr[1].split(':');
		      if(arr3.length === 3){
		       	newTime += (h + ':' + mi + ':' + s);
		      }else if(arr3.length === 2){
		      	newTime += (h + ':' + mi);
		      }
					return(newTime);
				// HH:mm
		    }else if(arr.length === 1){
					if(arr[0].match(/:/g)){
						let arr2 = arr[0].split(':');
						if(arr2.length === 3){
							newTime += (h + ':' + mi + ':' + s);
						}else if(arr2.length === 2){
							newTime += (h + ':' + mi);
						}
					}else if(arr[0].match(/-/g)){
						let arr2 = arr[0].split('-');
						if(arr2.length === 3){
							newTime += (y + '-' + mo + '-' + d);
						}else if(arr2.length === 2){
							newTime += (mo + '-' + d);
						}
					}
		      return newTime;
		    }else{
		    	return time;
		    }
  }
  change(num){
		return num < 10 ? '0' + num : num.toString();
  }
}