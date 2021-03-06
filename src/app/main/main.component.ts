import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ContentService } from '../content/content.service';
import { OnePage} from '../content/content';
import { SwiperService } from 'ng-rxjs-swiper';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SwiperService]
})
export class MainComponent implements OnInit,AfterViewInit, OnDestroy {
  @ViewChild('main') main: ElementRef;
  sub: Subscription;
  pageData: OnePage;
  imageLoaded: boolean = false;
  destroyed$: Subject<boolean> = new Subject();
  constructor(
    private router:Router,
    private swiper: SwiperService,
    private contentService: ContentService,
    private titleService: Title
  ) { }

  
  ngOnInit(): void {
    this.sub = this.contentService.pageData$.pipe(takeUntil(this.destroyed$)).subscribe(page=>{
      if(page){
        this.pageData = page;
        this.titleService.setTitle(page.title);
      }
    })
  }
  
  ngAfterViewInit(): void {
      this.sub = this.swiper.listenForAll$(this.main).pipe(takeUntil(this.destroyed$)).subscribe(event =>{
        if(event){
          this.router.navigate([event.direction === 'forward' ? this.pageData.forward : this.pageData.back]);
        }
      })
  };

  ngOnDestroy(){
    this.destroyed$.next(true);
  }

}
