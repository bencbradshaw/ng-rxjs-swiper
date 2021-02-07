
import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, Observable,merge, timer } from 'rxjs';
import { filter, map, skipUntil } from 'rxjs/operators';

type TriggerTypes = 'keyboard' | 'mouse' | 'swipe' | 'scroll';
type DetailedDirection = 'LtoR' | 'RtoL' | 'TtoB' | 'BtoT';

export interface SwipeEvent {
    from: TriggerTypes;
    direction: 'forward' | 'back';
    details: DetailedDirection | string;
}
@Injectable()

export class SwiperService {

    private keyEventToDirection = {
        'Backspace' : 'back',
        'ArrowDown': 'forward',
        'ArrowUp' : 'back',
        'Enter' : 'forward',
        'Return' : 'forward',
        ' ': 'forward'
    }

    private mouseevent = {
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

    private mobileSwipeEvent = {
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

    constructor(){}

    private resetMouseEvent(){
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

    private resetMobileSwipeEvent(){
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

    listenForMouseSwipe$(element: ElementRef): Observable<SwipeEvent>{
        return merge(
            fromEvent(element.nativeElement, 'mousedown'),
            fromEvent(element.nativeElement, 'mouseup')
        ).pipe(
            map(event => {
                const ev: MouseEvent = event as MouseEvent;
                const swipeEvent: SwipeEvent = {
                    from: 'mouse',
                    direction : null,
                    details: null
                }
                if(ev.type === 'mousedown'){
                    this.mouseevent.startX = ev.pageX;
                    this.mouseevent.startY = ev.pageY;
                }
                if(ev.type === 'mouseup'){
                    this.mouseevent.diffY = Math.abs(ev.pageY - this.mouseevent.startY);
                    this.mouseevent.swipeDown = this.mouseevent.startY < ev.pageY ;
                    this.mouseevent.swipeUp = this.mouseevent.startY > ev.pageY ;
                }
                if (this.mouseevent.swipeUp && (this.mouseevent.diffY > this.mouseevent.delta) ) {
                    this.resetMouseEvent();
                    swipeEvent.direction = 'forward';
                    swipeEvent.details = 'BtoT';
                }
                if (this.mouseevent.swipeDown && (this.mouseevent.diffY > this.mouseevent.delta) ) {
                    this.resetMouseEvent();
                    swipeEvent.direction = 'back';
                    swipeEvent.details = 'TtoB';
                }
                return swipeEvent
            })
        )
    }

    listenForMobileSwipe$(element: ElementRef):Observable<SwipeEvent>{
        return merge(
                fromEvent(element.nativeElement, 'touchstart', {passive: true}),
                fromEvent(element.nativeElement, 'touchmove', {passive: true})
            ).pipe(
        map(event => {
            const thisEvent: TouchEvent = event as TouchEvent;
            const swipeEvent: SwipeEvent = {
                from: 'swipe',
                direction: null,
                details: null
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
                swipeEvent.direction = 'forward';
                swipeEvent.details = 'BtoT';
                this.resetMobileSwipeEvent();
            }
            if(this.mobileSwipeEvent.swipeDown && this.mobileSwipeEvent.diffY > this.mobileSwipeEvent.delta){
                swipeEvent.direction = 'back';
                swipeEvent.details = 'TtoB';
                this.resetMobileSwipeEvent();
            }
            return swipeEvent;
        })
            )
    }

    listenForKeyboard$():Observable<SwipeEvent>{
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
                const swipeEvent: SwipeEvent = {
                    from: 'keyboard',
                    direction: this.keyEventToDirection[event['key']],
                    details: event['key']
                }
                return swipeEvent;
            })
        )
    }

    listenForScroll$(element: ElementRef):Observable<SwipeEvent>{
        return fromEvent(element.nativeElement, 'wheel', {passive: true}).pipe(
            skipUntil(timer(2000)),
            map(event => {
                const wheelEvent:WheelEvent = event as WheelEvent;
                const swipeEvent: SwipeEvent = {
                    from: 'scroll',
                    direction: wheelEvent.deltaY > 0 ? 'back' : 'forward',
                    details: wheelEvent.deltaY > 0 ? 'ScrollUp' : 'ScrollDown'
                }
                return swipeEvent;
            })
        );
    }

    listenForAll$(element: ElementRef):Observable<SwipeEvent>{
        return merge(
            this.listenForMouseSwipe$(element),
            this.listenForMobileSwipe$(element),
            this.listenForKeyboard$(),
            this.listenForScroll$(element)
        ).pipe(
            map(val => val.direction ? val: null)
        )
    }

}