import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { global } from '../../services/common/global';

@Component({
    selector: 'image-viewer-component',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss']
})

export class ImageViewerComponent implements OnInit {
    @Input()
        private imageViewer;
    @Output()
        private closeViewer: EventEmitter<any> = new EventEmitter();
    private ratio = 1;
    private ratioTip = '';
    private moveFlag = false;
    private position = {
        left: 0,
        top:0,
        width: 0,
        height: 0
    }
    private initPosition = {
        width: 0,
        height: 0
    }
    private offset = {
        x: 0,
        y: 0
    }
    private imgHidden = false;
    public ngOnInit() {
        if(!this.imageViewer){
            this.imageViewer = {
                result: [],
                active: {
                    src: '',
                    width: 0,
                    height: 0
                },
                show: false
            }
        }
        this.initImviewer();
    }
    private initImviewer(){
        let body = (document.getElementsByTagName('body')[0] as HTMLBodyElement);
        if(this.imageViewer.active.width / body.offsetWidth > this.imageViewer.active.height / body.offsetHeight && this.imageViewer.active.width > body.offsetWidth * 0.6){
            this.position.width = this.initPosition.width = body.offsetWidth * 0.6;
            this.position.height = this.initPosition.height = body.offsetWidth / this.imageViewer.active.width * 0.6 * this.imageViewer.active.height;
        }else if(this.imageViewer.active.width / body.offsetWidth < this.imageViewer.active.height / body.offsetHeight && this.imageViewer.active.height > body.offsetHeight * 0.6){
            this.position.height = this.initPosition.height = body.offsetHeight * 0.6;
            this.position.width = this.initPosition.width = body.offsetHeight / this.imageViewer.active.height * 0.6 * this.imageViewer.active.width;
        }else{
            this.position.height = this.initPosition.height = this.imageViewer.active.height;
            this.position.width = this.initPosition.width = this.imageViewer.active.width;
        }
        this.position.left = (body.offsetWidth - this.position.width) / 2;
        this.position.top = (body.offsetHeight - this.position.height) / 2;
    }
    @HostListener("window:resize", ['$event']) onResize(event) {
        this.initImviewer();
    }
    @HostListener("window:mousemove", ['$event']) onMousemove(event) {
        if(this.moveFlag){
            this.position.left = event.clientX - this.offset.x;
            this.position.top = event.clientY - this.offset.y + 60;
        }
    }
    private wheelScroll(event){
        let delta;
        if (event.deltaY) {
            delta = event.deltaY > 0 ? 1 : -1;
        } else if (event.wheelDelta) {
            delta = - event.wheelDelta / 120;
        } else if (event.detail) {
            delta = event.detail > 0 ? 1 : -1;
        }
        this.zoomTo(this.ratio + 0.2 * -delta);
    }
    private imgMousedown(event){
        this.moveFlag = true;
        this.offset = {
            x: event.offsetX,
            y: event.offsetY
        }
    }
    private imgMouseup(){
        this.moveFlag = false;
    }
    private zoomTo(ratio: number){
        if(ratio > 10){
            this.showTip('已经是最大了');
        }else if(ratio < 0.2){
            this.showTip('无法再缩小了');
        }else{
            let body = (document.getElementsByTagName('body')[0] as HTMLBodyElement);
            this.ratio = ratio = Number(ratio.toFixed(1));
            this.position.left = this.position.left + (this.position.width - this.initPosition.width * ratio) / 2;
            this.position.top = this.position.top + (this.position.height - this.initPosition.height * ratio) / 2;
            this.position.width = this.initPosition.width * ratio;
            this.position.height = this.initPosition.height * ratio;
        }
    }
    private showTip(text: string){
        this.ratioTip = text;
        setTimeout(function(){
            this.ratioTip = ''; 
        }.bind(this), 1000);
    }
    private zoomIn(){
        this.zoomTo(this.ratio + 0.2);
    }
    private zoomOut(){
        this.zoomTo(this.ratio - 0.2);
    }
    private prev(){
        for(let i=0;i<this.imageViewer.result.length;i++){
            if(this.imageViewer.result[i].src === this.imageViewer.active.src){
                let index = i > 0 ? i - 1: i;
                this.imageViewer.active = this.imageViewer.result[index];
                if(index !== i){
                    this.imgHidden = true;
                    this.imageViewer.active = this.imageViewer.result[index];                    
                    this.initImviewer();
                    this.ratio = 1;
                }else{
                    this.showTip('已经是第一张了');
                }
                break;
            }
        }
    }
    private next(){
        for(let i=0;i<this.imageViewer.result.length;i++){
            if(this.imageViewer.result[i].src === this.imageViewer.active.src){
                let index = i < this.imageViewer.result.length - 1 ? i + 1: i;
                if(index !== i){
                    this.imgHidden = true;
                    this.imageViewer.active = this.imageViewer.result[index];                    
                    this.initImviewer();
                    this.ratio = 1;
                }else{
                    this.showTip('已经是最后一张了');
                }
                break;
            }
        }
    }
    private closeViewerAction(){
        this.imageViewer.show = false;
    }
    private imgLoad(){
        this.imgHidden = false;
    }
}