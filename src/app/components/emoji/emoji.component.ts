import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

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

    constructor() {

    }
    ngOnInit() {
        // let that = this,
        //     html = document.getElementsByTagName('html')[0];
        // html.addEventListener('click',function(){
        //     if(that.emojiInfo.show == true){
        //         that.emojiInfo.show = false;
        //     }
        // },false);
    }
    @HostListener('window:click') onClick(){
        if(this.emojiInfo.show == true){
            this.emojiInfo.show = false;
        }
    }
    private stopPagation(event){
        event.stopPropagation();
    }
    private emojiSelectAction(item){
        let contentId = document.getElementById(this.emojiInfo.contentId),
            insertHtml = `<img src="${imgRouter}assets/images/spacer.gif" class="emoji-face-normal emoji-face-input${item.imgNum - 1}" />`;
        this.util.insertAtCursor(contentId,insertHtml,false);
    }
    private jpushEmojiSelectAction(item){
        this.jpushEmojiSelect.emit(item);
    }
    private changeTab(event, index){
        this.tab = index;
    }
}