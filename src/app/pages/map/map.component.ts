import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../services/util';

@Component({
    selector: 'app-map',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
    private util = new Util();
    private errorTipShow = false;
    constructor(
        private activatedRoute: ActivatedRoute
    ) {}
    public ngOnInit() {
        let pointer = this.activatedRoute.snapshot.params.pointer;
        let arr = pointer.split('&');
        arr[0] = Number(arr[0]);
        arr[1] = Number(arr[1]);
        if (Number.isNaN(arr[0]) || Number.isNaN(arr[1])) {
            this.errorTipShow = true;
        } else {
            this.util.theLocation({
                id: 'mapContainer',
                longitude: arr[0],
                latitude: arr[1],
                scroll: true
            });
        }
    }
}
