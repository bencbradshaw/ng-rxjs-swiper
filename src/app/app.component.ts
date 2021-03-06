import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInOutAnimations } from 'ng-rxjs-swiper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutAnimations]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  
}
