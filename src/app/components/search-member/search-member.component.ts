import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'search-member-component',
    templateUrl: './search-member.component.html',
    styleUrls: ['./search-member.component.scss']
})

export class SearchMemberComponent implements OnInit {
    @Input()
        private searchResult;
    @Output()
        private searchItem: EventEmitter<any> = new EventEmitter();
    @Output()
        private searchBtn: EventEmitter<any> = new EventEmitter();
    @Output()
        private clearInput: EventEmitter<any> = new EventEmitter();
    @Output()
        private searchKeyup: EventEmitter<any> = new EventEmitter();
    @Output()
        private changeChecked: EventEmitter<any> = new EventEmitter();
        
    private searchKeyword = '';
    private fileDom;
    constructor(
        private elementRef: ElementRef
    ) {

     }
    public ngOnInit() {
        
    }
    public ngAfterViewInit(){
        this.fileDom = this.elementRef.nativeElement.querySelector('#' + this.searchResult.id);
        Observable.fromEvent(this.fileDom, "keyup")
            .debounceTime(200)
            .subscribe((event:any) => {
                this.searchKeyup.emit(event.target.value);
            });
    }
    private avatarErrorIcon(event){
        event.target.src = avatarErrorIcon;
    }
    private searchItemAction(item){
        this.searchItem.emit(item);
    }
    private clearInputAction(){
        this.fileDom.focus();
        this.searchKeyword = '';
        this.clearInput.emit();
    }
    private searchBtnAction(){
        this.searchBtn.emit(this.searchKeyword);
    }
    private changeCheckedAction(input, item){
        console.log(666, input.checked, item.checked)
        this.changeChecked.emit(item);
    }
}