import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateGroupComponent } from './create-group.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from '../../services/common';
import { SearchMemberModule } from '../search-member';

@NgModule({
  declarations: [
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
     PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
     SearchMemberModule
  ],
  exports: [
      CreateGroupComponent
  ],
  providers: []
})
export class CreateGroupModule {}