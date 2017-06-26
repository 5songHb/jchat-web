import { Directive, ElementRef, Input, OnInit, HostListener, OnChanges } from '@angular/core';


@Directive({ selector: '[myModel]' })

export class myModelDirective implements OnInit{
    @Input()
        myModel;
    constructor(private el: ElementRef) {
       
    }
    ngOnChanges(){
        this.el.nativeElement.innerHTML = this.myModel.draft || '';
    }
    ngOnInit(){
        this.el.nativeElement.innerHTML = this.myModel.draft || '';
    }
    @HostListener('blur') onBlur() {
        this.myModel.draft = this.el.nativeElement.innerHTML;
    }
    @HostListener('keyup') onkeyup() {
        this.myModel.draft = this.el.nativeElement.innerHTML;
    }
}