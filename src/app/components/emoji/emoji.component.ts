import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

import { Util } from '../../services/util';
import { imgRouter } from '../../services/common';

@Component({
    selector: 'emoji-component',
    templateUrl: './emoji.component.html',
    styleUrls: ['./emoji.component.scss']
})

export class EmojiComponent implements OnInit {
    @Input()
        emojiInfo;
    @Output()
        private jpushEmojiSelect: EventEmitter<any> = new EventEmitter();
    private util = new Util();
    private imgRouter = imgRouter;
    private tab = 0;

    constructor(
        private elementRef: ElementRef
    ) {

    }
    ngOnInit() {
        
    }
    @HostListener('window:click') onClick(){
        if(this.emojiInfo.show === true){
            this.emojiInfo.show = false;
        }
    }
    private stopPagation(event){
        event.stopPropagation();
    }
    private emojiSelectAction(idName){
        let contentId = document.getElementById(this.emojiInfo.contentId),
            insertHtml = this.elementRef.nativeElement.querySelector('#' + idName).innerHTML;
        this.util.insertAtCursor(contentId, insertHtml, false);
    }
    // private changeTab(event, index){
    //     this.tab = index;
    // }
}