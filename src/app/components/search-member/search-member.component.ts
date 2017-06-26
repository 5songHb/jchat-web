import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
    constructor() {

     }
    public ngOnInit() {
        
    }
    public ngAfterViewInit(){
        const file = document.getElementById(this.searchResult.id);
        Observable.fromEvent(file, "keyup")
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
        document.getElementById(this.searchResult.id).focus();
        this.searchKeyword = '';
        this.clearInput.emit();
    }
    private searchBtnAction(){
        this.searchBtn.emit(this.searchKeyword);
    }
    private changeCheckedAction(item){
        this.changeChecked.emit(item);
    }
}