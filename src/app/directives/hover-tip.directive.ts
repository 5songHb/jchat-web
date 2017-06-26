import { Directive, ElementRef, Input, OnInit, HostListener, OnChanges } from '@angular/core';


@Directive({ selector: '[hoverEvent]' })

export class hoverEventDirective implements OnInit{
    @Input()
        hoverEvent;
    constructor(private el: ElementRef) {
       
    }
    ngOnInit(){
        
    }
    @HostListener('mouseenter') onBlur() {
        this.hoverEvent.show = true;
    }
    @HostListener('mouseleave') onkeyup() {
        this.hoverEvent.show = false;
    }
}