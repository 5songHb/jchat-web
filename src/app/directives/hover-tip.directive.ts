import { Directive, ElementRef, Input, OnInit, HostListener, OnChanges } from '@angular/core';

/**
 * hover提示
 */
@Directive({ selector: '[hoverEvent]' })

export class hoverEventDirective implements OnInit{
    @Input()
        private hoverEvent;
    constructor(private el: ElementRef) {
       
    }
    ngOnInit(){
        
    }
    @HostListener('mouseenter') onMouseenter() {
        this.hoverEvent.show = true;
    }
    @HostListener('mouseleave') onMouseleave() {
        this.hoverEvent.show = false;
    }
}