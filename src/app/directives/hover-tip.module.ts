import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { hoverEventDirective } from './hover-tip.directive';

@NgModule({
  declarations: [
    hoverEventDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      hoverEventDirective
  ],
  providers: []
})
export class HoverEventModule {}