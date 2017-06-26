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
        
    }
    private modalTip(info){
        if(info){
            this.modalTipEmit.emit(info);
        }else{
            this.modalTipEmit.emit();            
        }
    }
}