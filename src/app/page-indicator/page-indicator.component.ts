import { Component,OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-indicator',
  templateUrl: './page-indicator.component.html',
  styleUrls: ['./page-indicator.component.scss']
})
export class PageIndicatorComponent implements OnInit, OnDestroy {
  id: number;
  sub: Subscription;
  sub2: Subscription;
  config: any;
  parentRoute: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

     this.config = this.router.config.filter(one => one.path !== '**' && one.path !== '404');
     this.sub = this.router.events.pipe(   
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => route.firstChild),
        switchMap(route => route.data)
     )
     .subscribe(data => {
       this.id = data['number'];
     })
     this.sub2 = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(routerEvents => {
      const url: string = routerEvents['url'].toString();
      this.parentRoute = url.split('/')[1];
      const child = url.split('/')[2];
    })
  }
  ngOnDestroy(){
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
