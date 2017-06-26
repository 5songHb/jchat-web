import {
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Market` component loaded asynchronously');

@Component({
  selector: 'market',
  templateUrl: './market.component.html'
})
export class MarketComponent implements OnInit {
  constructor(private store$: Store<any>){

  }
  public ngOnInit() {
    this.store$.select((state) => {
      console.log(66666,state['mainReducer'])
    }).subscribe((state) => {
            
    });
    console.log('hello `Market` component');
  }

}
