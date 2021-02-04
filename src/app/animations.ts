import { trigger, style, transition, animate, query, group} from '@angular/animations';
export const globalAnimationDefaultTiming = 350;
const cubicBezier = 'cubic-bezier(.12,1.09,.87,.98)';
const defaultStart =  query(':enter, :leave', [
  style({
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  })
]);

const slideInFromBottom = [
  style({ position: 'relative'}),
  defaultStart,
  query(':enter', [
    style({ bottom: '-100vh', 'z-index': 10})
  ]),
  query(':enter', [
    animate(`${globalAnimationDefaultTiming}ms ${cubicBezier}`, style({ transform: 'translateY(-100%)', 'z-index': 10 }))
  ]),
  query('router-outlet ~ *', [style({}), animate(1, style({}))], { optional: true })

]
const slideInFromTop = [
  style({ position: 'relative'}),
  defaultStart,
  query(':enter', [
    style({ top: '-100vh', 'z-index': 10})
  ]),
  group([
    query(':enter', [
      animate(`${globalAnimationDefaultTiming}ms ${cubicBezier}`, style({ transform: 'translateY(100%)', 'z-index': 10 }))
    ])
  ]),
  query('router-outlet ~ *', [style({}), animate(1, style({}))], { optional: true })

]


export let slideInOutAnimations =
  trigger('routeAnimations', [
    transition('one => two', slideInFromBottom),
    transition('two => one', slideInFromTop),
    transition('two => three', slideInFromBottom),
    transition('three => two', slideInFromTop),
    transition('three => one', slideInFromBottom),
    transition('one => three', slideInFromTop)
  ]);
