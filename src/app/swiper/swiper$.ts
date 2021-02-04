import { ElementRef, Injectable, OnDestroy} from '@angular/core';
import { fromEvent, Observable,merge, timer } from 'rxjs';
import { filter, map, skipUntil } from 'rxjs/operators';

interface DetectParams {
    name: string;
    command: 'forward' | 'back';
    startX?: number;
    startY?:number;
    endX?:number;
    endY?: number;
}

@Injectable()

export class Swiper$ implements OnDestroy {

    keyEventToDirection = {
        'Backspace' : 'back',
        'ArrowDown': 'forward',
        'ArrowUp' : 'back',
        'Enter' : 'forward',
        'Return' : 'forward',
        ' ': 'forward'
    }

    mouseevent = {
        delta: 50,
        startX:null,
        startY:null,
        xDown:null,
        yDown:null,
        swipeUp:null,
        swipeDown:null,
        diffX:null,
        diffY:null
    }

    mobileSwipeEvent = {
        delta: 75,
        xDown:null,
        yDown:null,
        xUp:null,
        yUp:null,
        swipeUp:null,
        swipeDown:null,
        diffX:null,
        diffY:null
    }
    id: number;
    constructor(){
        this.id = Math.random();
        // console.log('started swiper$. instance id:', this.id);
    }

    listenForAll$(element: ElementRef):Observable<'forward'| 'back'>{
        return merge(
            this.listenForMouseSwipe$(element),
            this.listenForMobileSwipe$(element),
            this.listenForKeyboard$(),
            this.listenForScroll$(element)
        ).pipe(
            map(val => val.command)
        )
    }

    listenForMouseSwipe$(element: ElementRef): Observable<DetectParams>{
        return merge(
            fromEvent(element.nativeElement, 'mousedown'),
            fromEvent(element.nativeElement, 'mouseup')
        ).pipe(
            map(event => {
                const thisEvent: MouseEvent = event as MouseEvent;
                const detect: DetectParams = {
                    name: thisEvent.type,
                    command: null,
                }
                if(thisEvent.type === 'mousedown'){
                    this.mouseevent.startX = thisEvent.pageX;
                    this.mouseevent.startY = thisEvent.pageY;
                }
                if(thisEvent.type === 'mouseup'){
                    this.mouseevent.diffY = Math.abs(thisEvent.pageY - this.mouseevent.startY);
                    this.mouseevent.swipeDown = this.mouseevent.startY < thisEvent.pageY ;
                    this.mouseevent.swipeUp = this.mouseevent.startY > thisEvent.pageY ;
                }
                if (this.mouseevent.swipeUp && (this.mouseevent.diffY > this.mouseevent.delta) ) {
                    this.resetMouseEvent();
                    detect.command = 'forward';
                  }
                  if (this.mouseevent.swipeDown && (this.mouseevent.diffY > this.mouseevent.delta) ) {
                    this.resetMouseEvent();
                    detect.command = 'back';
                  }
            
                return detect;
            })
        )
    }

    resetMouseEvent(){
        this.mouseevent = {
            delta: 50,
            startX:null,
            startY:null,
            xDown:null,
            yDown:null,
            swipeUp:null,
            swipeDown:null,
            diffX:null,
            diffY:null
        };
    }

    listenForMobileSwipe$(element: ElementRef):Observable<DetectParams>{
        return merge(
                fromEvent(element.nativeElement, 'touchstart', {passive: true}),
                fromEvent(element.nativeElement, 'touchmove', {passive: true})
            ).pipe(
        map(event => {
            const thisEvent: TouchEvent = event as TouchEvent;
            const detect: DetectParams = {
                name: event['key'],
                command: null,
            }

            if(thisEvent.type === 'touchstart'){
                this.mobileSwipeEvent.xDown = thisEvent.touches[0].clientX;
                this.mobileSwipeEvent.yDown = thisEvent.touches[0].clientY;
            }
            if(thisEvent.type === 'touchmove'){
                this.mobileSwipeEvent.xUp = thisEvent.touches[0].clientX;
                this.mobileSwipeEvent.yUp = thisEvent.touches[0].clientY;
                this.mobileSwipeEvent.diffX = Math.abs(this.mobileSwipeEvent.xUp - this.mobileSwipeEvent.xDown);
                this.mobileSwipeEvent.diffY = Math.abs(this.mobileSwipeEvent.yUp - this.mobileSwipeEvent.yDown);
                this.mobileSwipeEvent.swipeDown = this.mobileSwipeEvent.yDown < this.mobileSwipeEvent.yUp;
                this.mobileSwipeEvent.swipeUp = this.mobileSwipeEvent.yDown > this.mobileSwipeEvent.yUp;
            }
            if(this.mobileSwipeEvent.swipeUp && this.mobileSwipeEvent.diffY > this.mobileSwipeEvent.delta){
                detect.command = 'forward';
                this.resetMobileSwipeEvent();
            }
            if(this.mobileSwipeEvent.swipeDown && this.mobileSwipeEvent.diffY > this.mobileSwipeEvent.delta){
                detect.command = 'back';
                this.resetMobileSwipeEvent();
            }

            return detect;
        })
            )
    }

    resetMobileSwipeEvent(){
        this.mobileSwipeEvent = {
            delta: 75,
            xDown:null,
            yDown:null,
            xUp:null,
            yUp:null,
            swipeUp:null,
            swipeDown:null,
            diffX:null,
            diffY:null
        }
    }

    listenForKeyboard$():Observable<DetectParams>{
        return fromEvent(document, 'keydown').pipe(
            skipUntil(timer(500)),
            filter(event => {
                return (
                    event['key'] === 'Backspace' ||
                    event['key'] === 'ArrowDown' ||
                    event['key'] === 'ArrowUp' ||
                    event['key'] === 'Enter' ||
                    event['key'] === 'Return' ||
                    event['key'] === ' '
                )
            }),
            map(event => {
                const detect: DetectParams = {
                    name: event['key'],
                    command: this.keyEventToDirection[event['key']],
                }
                return detect;
            })
        )
    }

    listenForScroll$(element: ElementRef):Observable<DetectParams>{
        return fromEvent(element.nativeElement, 'wheel', {passive: true}).pipe(
            skipUntil(timer(2000)),
            map(event => {
                const wheelEvent:WheelEvent = event as WheelEvent;
                const detect: DetectParams = {
                    name: wheelEvent.deltaY > 0 ? 'wheeldown' : 'wheelup',
                    command: wheelEvent.deltaY > 0 ? 'back' : 'forward',
                }
                return detect;
            })
        );
    }

    ngOnDestroy(){
        // console.log('destroyed swiper$. instance id:', this.id);
    }
}