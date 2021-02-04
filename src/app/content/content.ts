export interface OnePage {
    path: string;
    name: string;
    title: string;
    heading: string;
    subheading: string;
    text?: string;
    forward?: string;
    forwardUrl?: string;
    back: string;
    css: any;
    backgroundVideo?: string;
    backgroundImage?: string;
    showSwipePrompt?: boolean;
    showPageIndicator?: boolean;
    actionButton?: {
        [key: string]: string,
    },
    animation: string;
    number: number;
}

interface Pages {
    [key: string]: OnePage;
}

export let pages: Pages = {
    '/': {
        path: '',
        name: 'ngx-swiper$',
        title: 'ngx-swiper$',
        heading: 'ngx-swiper$',
        subheading: 'An RxJS swiper observable',
        text: 'Give it a go! Swipe up!',
        forward: '/set-up',
        back: "/usage",
        css: {
            color: 'white',
            'text-shadow': '1px 1px 7px #3f3f3f',
            'font-family': 'Syncopate, sans-serif'
        },
        backgroundImage: 'url(assets/bg-images/blue-splash_small.jpg)',
        showSwipePrompt: true,
        showPageIndicator: true,
        animation: 'one',
        number: 1
    },
    '/set-up': {
        path: 'set-up',
        name: 'set-up',
        title: 'Set Up',
        heading: 'Set Up',
        subheading: '',
        text: `
        <strong>in your module:<strong> <br><br>
        import { NgxSwiperModule } from 'ngx-swiper$'; <br>
        ...<br>
        imports: [
            NgxSwiperModule
        ]<br><br>
        in your component:<br><br>
        import {Swiper$} from 'ngx-swiper$';<br>
        ...<br>
        providers: [Swiper$]<br>
        ...<br>
        constructor (private swiper$: Swiper$)<br>
        `,
        forward: '/usage',
        back: '/',
        css: {
            color: 'white',
            'text-shadow': '1px 1px 7px #3f3f3f',
            'font-family': 'Syncopate, sans-serif'

        },
        backgroundImage: 'url(assets/bg-images/blue-pink-splash_small.jpg)',
        showSwipePrompt: true,
        showPageIndicator: true,
        animation: 'two',
        number: 2
    },
    '/usage': {
        path: 'usage',
        name: 'usage',
        title: 'usage',
        heading: 'usage',
        subheading: 'this.swiper$.subscribe(direction  => {console.log(direction)})',
        text: 'Susbcribe to the swiper and watch direction',
        forward: '/',
        back: '/set-up',
        css: {
            color: 'white',
            'text-shadow': '1px 1px 7px #3f3f3f',
            'font-family': 'Syncopate, sans-serif'
        },
        backgroundImage: 'url(assets/bg-images/blue-yellow-splash_small.jpg)',
        showSwipePrompt: true,
        showPageIndicator: true,
        animation: 'three',
        number: 3
    }
}
