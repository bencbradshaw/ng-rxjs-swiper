# ng-rxjs-swiper
[Live Demo](https://bencbradshaw.github.io)

## import into module
``` typescript

import { NgRxJsSwiperModule } from 'ng-rxjs-swiper';

...
    imports: [NgRxJsSwiperModule]
...


```
## in your component, must subscribe and unsubsribe
``` typescript
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwiperService } from 'ng-rxjs-swiper';

@Component({
  selector: 'app-root',
  template: `
    <main #main>
        App Component
    </main>
  ` ,
  styleUrls: ['./app.component.scss'],
  providers: [SwiperService]
})
export class MainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('main') main: ElementRef;
  sub: Subscription;

  constructor(private swiper: SwiperService) { }

  // ViewChild must be referenced in AfterViewInit
  ngAfterViewInit(): void {
      this.sub = this.swiper.listenForAll$(this.main).subscribe(direction =>{
        if(direction){
            console.log(direction);
        }
      })
  };

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

}
```
