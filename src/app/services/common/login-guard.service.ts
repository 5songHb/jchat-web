import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy,HashLocationStrategy } from '@angular/common';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private activatedRoute: ActivatedRoute
    ){}
    canActivate(){
        let reg = new RegExp('/#/main$');
        if(reg.test(window.location.href)){
            window.location.reload();
        }
        return true;
    }
}