import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact.component';
import { GroupListModule } from '../../components/group-list';
import { ContactListModule } from '../../components/contact-list';
import { LinkmanListModule } from '../../components/linkman-list';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GroupListModule,
    ContactListModule,
    LinkmanListModule
  ],
  exports: [
      ContactComponent
  ],
  providers: []
})
export class ContactModule {}
