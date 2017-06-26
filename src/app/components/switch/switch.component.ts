import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';


@Component({
    selector: 'switch-component',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})

export class SwitchComponent implements OnInit {
    @Input()
        private state;
    @Output()
        private changeSwitch: EventEmitter<any> = new EventEmitter();
    private position;
    constructor(
    ) {

    }
    public ngOnInit() {
        if(this.state){
            this.position = 'switchRight';
        }else{
            this.position = 'switchLeft';
        }
    }
    ngDoCheck(){
        if(this.state){
            this.position = 'switchRight';
        }else{
            this.position = 'switchLeft';
        }
    }
    private changeSwitchAction(){
        this.changeSwitch.emit();
    }
}