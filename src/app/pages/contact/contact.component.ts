import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { global, authPayload } from '../../services/common';
import { AppStore } from '../../app.store';
import { contactAction } from './actions';
import { mainAction } from '../main/actions';
import { chatAction } from '../chat/actions';

@Component({
    selector: 'contact-component',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
    private contactStream$;
    private groupList = [];
    private tab = 1;
    private conversation = [];
    constructor(
        private store$: Store<AppStore>
    ){}
    public ngOnInit() {
        this.subscribeStore();
        this.store$.dispatch({
            type: contactAction.getGroupList, 
            payload: null
        });
    }
    private subscribeStore(){
        this.contactStream$ = this.store$.select((state) => {
            let contactState = state['contactReducer'];
            console.log('contact',contactState);
            this.stateChanged(contactState);
            return state;
        }).subscribe((state) => {
            
        });
    }
    private stateChanged(contactState){
        console.log('contact',contactState.actionType);
        switch(contactState.actionType){
            case contactAction.getGroupListSuccess:
                this.groupList = contactState.groupList;
                break;
            case mainAction.createGroupSuccess:
                this.groupList = contactState.groupList;
                this.conversation = contactState.conversation;
                break;
            case chatAction.dispatchConversationList:
                this.conversation = contactState.conversation;
                break;
            case mainAction.createSingleChatSuccess:
                this.conversation = contactState.conversation;
                break;
            case chatAction.updateContactInfo:
                this.groupList = contactState.groupList;
                this.conversation = contactState.conversation;
                break;
        }
    }
    private selectContactItemEmit(item){
        if(!item.type){
            item.group = true;
            item.type = 4;
        }
        this.store$.dispatch({
            type: contactAction.selectContactItem,
            payload: item
        })
    }
    private changeTabEmit(tab){
        this.tab = tab;
    }
}