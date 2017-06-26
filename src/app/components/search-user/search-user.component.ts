import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
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
            transition('out => in', animate(200))
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
    @Input()
        searchUserResult;
    @Output()
        private searchUser: EventEmitter<any> = new EventEmitter();
    @Output()
        private selectUserResult: EventEmitter<any> = new EventEmitter();
    constructor() {

    }
    public ngOnInit() {
        const file = document.getElementById("searchInput");
        Observable.fromEvent(file, "keyup")
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
    }
    private selectSearchItem(item){
        this.selectUserResult.emit(item);
    }
    private showSearchInput(){
        this.searchInputIsShow = false;
        this.inputAnimate = 'in';
        setTimeout(function(){
            document.getElementById('searchInput').focus();
        },200);
    }
}