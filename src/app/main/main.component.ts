import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from '../content/content.service';
import { OnePage} from '../content/content';
import { Swiper$ } from 'ngx-swiper$';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [Swiper$]
})
export class MainComponent implements OnInit,AfterViewInit, OnDestroy {
  @ViewChild('main') main: ElementRef;
  sub: Subscription;
  pageData: OnePage;
  imageLoaded: boolean = false;
  constructor(
    private router:Router,
    private swiper$: Swiper$,
    private contentService: ContentService,
    private titleService: Title
  ) { }

  
  ngOnInit(): void {
    this.sub = this.contentService.pageData$.subscribe(page=>{
      if(page){
        this.pageData = page;
        this.titleService.setTitle(page.title);
      }
    })
  }
  
  ngAfterViewInit(): void {
      this.sub = this.swiper$.listenForAll$(this.main).subscribe(direction =>{
        if(direction){
          this.router.navigate([direction === 'forward' ? this.pageData.forward : this.pageData.back]);
        }
      })
  };

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

}
