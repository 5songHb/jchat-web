import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'video-component',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit, AfterViewInit {
    @Input()
        private url;
    @Output()
        private colseVideo: EventEmitter<any> = new EventEmitter();
    private state = 'pause';
    private video;
    constructor(
        private cdr: ChangeDetectorRef
    ) {

    }
    public ngOnInit() {
        
    }
    public ngAfterViewInit(){
        this.video = (document.getElementById('videoTag') as HTMLVideoElement);
        this.cdr.detectChanges();
    }
    private closeModal(){
        this.colseVideo.emit();
    }
    private play(){
        this.video.play();
        this.state = 'play';
        console.log(this.video.duration ,this.video.currentTime)
    }
    private pause(){
        this.video.pause();
        this.state = 'pause';
    }
    private videoEnd(){
        this.state = 'pause';
    }
    private changeCurrentTime(event){
        console.log(event.offsetX, event.offsetX / 438)
        this.video.currentTime = event.offsetX / 438 * this.video.duration;
    }
}