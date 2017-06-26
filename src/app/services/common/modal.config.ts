import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class ModalConfigService {
    private modalConfig: BehaviorSubject<any> = new BehaviorSubject(false);
    topic$ = this.modalConfig.asObservable();
    updataModal(message: any) {
        this.modalConfig.next(message);
    }
}

export class InfoCountService {
    private userCount: BehaviorSubject<any> = new BehaviorSubject(false);
    userCount$ = this.userCount.asObservable();
    isCount(message: any) {
        this.userCount.next(message);
    }
}