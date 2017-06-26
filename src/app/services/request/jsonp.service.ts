import { Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonpService {
    constructor(
        private jsonp: Jsonp
    ) {
    }
    get(url, data?){
        return this.jsonp.request(url, data)
                .map(res => res.json())
    }
}