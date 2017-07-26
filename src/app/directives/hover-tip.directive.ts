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
    @HostListener('mouseenter') onBlur() {
        this.hoverEvent.show = true;
    }
    @HostListener('mouseleave') onkeyup() {
        this.hoverEvent.show = false;
    }
}