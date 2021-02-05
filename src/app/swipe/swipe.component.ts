import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwiperService } from 'ng-rxjs-swiper';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
  providers: [SwiperService]
})
export class SwipeComponent implements OnInit {
  @ViewChild('main') main: ElementRef;
  sub: Subscription;
  imageLoaded: boolean = false;
  message: any = 'idle';
  constructor(
    private router:Router,
    private swiper: SwiperService,
    private titleService: Title
  ) { }

  
  ngOnInit(): void {

  }
  
  ngAfterViewInit(): void {
      this.sub = this.swiper.listenForAll$(this.main).subscribe(direction =>{
        if(direction){
          this.message = direction;
        }
      })
  };

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }
}
