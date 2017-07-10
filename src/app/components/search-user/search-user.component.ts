import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition, animate, HostListener, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
const avatarErrorIcon = require('../../../assets/images/single-avatar.png');

@Component({
    selector: 'search-user-component',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.scss'],
    animations: [
        trigger('flyIn', [
            state('in', style({transform: 'translateX(-260px)'})),
            state('out', style({transform: 'translateX(0)'})),
            transition('out => in', animate(200)),
            transition('in => out', animate(200))
        ])
    ]
})

export class SearchUserComponent implements OnInit {
    private searchKeyword;
    private searchInputIsShow = true;
    private inputAnimate = 'out';
    private singleShowText = '显示全部';
    private groupShowText = '显示全部';
    private singleHeight = '200px';
    private groupHeight = '200px';
    private fileDom;
    @Input()
        searchUserResult;
    @Output()
        private searchUser: EventEmitter<any> = new EventEmitter();
    @Output()
        private selectUserResult: EventEmitter<any> = new EventEmitter();
    constructor(
        private elementRef: ElementRef
    ) {

    }
    public ngOnInit() {
        this.fileDom = this.elementRef.nativeElement.querySelector("#searchInput");
        Observable.fromEvent(this.fileDom, "keyup")
            .debounceTime(300)
            .subscribe((event:any) => {
                this.searchUser.emit(event.target.value);
            });
    }
    ngOnChanges(){
        if(!this.searchUserResult.isSearch){
            this.searchKeyword = '';
        }
    }
    @HostListener('window:click') onClickWindow(){
        this.searchKeyword = '';
        this.searchUser.emit(this.searchKeyword);
        this.inputAnimate = 'out';
        this.searchInputIsShow = true;
    }
    private singleShowAll(){
        if(this.singleShowText === '显示全部'){
            this.singleShowText = '收起';
            this.singleHeight = 'none';
        }else{
            this.singleShowText = '显示全部';
            this.singleHeight = '200px';
        }
    }
    private groupShowAll(){
        if(this.groupShowText === '显示全部'){
            this.groupShowText = '收起';
            this.groupHeight = 'none';
        }else{
            this.groupShowText = '显示全部';
            this.groupHeight = '200px';
        }
    }
    private avatarErrorIcon(event) {
        event.target.src = avatarErrorIcon;
    }
    private clearInput(){
        this.searchKeyword = '';
        this.searchUser.emit(this.searchKeyword);
        this.fileDom.focus();
    }
    private selectSearchItem(item){
        this.selectUserResult.emit(item);
    }
    private showSearchInput(){
        this.searchInputIsShow = false;
        this.inputAnimate = 'in';
        setTimeout(function(){
            this.fileDom.focus();
        }.bind(this),200);
    }
    private stopPropagation(event){
        event.stopPropagation();
    }
}