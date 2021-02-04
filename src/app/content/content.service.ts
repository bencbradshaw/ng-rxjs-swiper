import { Injectable} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OnePage, pages } from './content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  pageData$: BehaviorSubject<OnePage> = new BehaviorSubject(null);
  constructor(private router: Router) {   
      this.router.events.pipe(   
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(data => {
        this.pageData$.next(pages[data['url']]);
      });
    }
}
