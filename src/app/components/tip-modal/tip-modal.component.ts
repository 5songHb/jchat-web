import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tip-modal-component',
    templateUrl: './tip-modal.component.html',
    styleUrls: ['./tip-modal.component.scss']
})

export class TipModalComponent implements OnInit {
    @Input()
        private info;
    @Output()
        private modalTipEmit: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    ngOnInit() {
        if(this.info && this.info.success){
            setTimeout(function(){
                this.modalTipEmit.emit();
            }.bind(this), 1500);
        }
    }
    private stopPropagation(event){
        event.stopPropagation();
    }
    private modalTip(event, info){
        event.stopPropagation();
        if(info){
            this.modalTipEmit.emit(info);
        }else{
            this.modalTipEmit.emit();
        }
    }
}