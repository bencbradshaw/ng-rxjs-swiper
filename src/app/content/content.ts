type Markdown = string;
export interface OnePage {
    path: string;
    name: string;
    title: string;
    heading: string;
    subheading: string;
    text?: string;
    md?: Markdown;
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
        name: 'ng-rxjs-swiper demo',
        title: 'ng-rxjs-swiper demo',
        heading: 'ng-rxjs-swipe',
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
        md: `
            # in your module
            \`\`\` typescript
            import { NgRxJsSwiperModule } from 'ng-rxjs-swiper'; 
            ...
            imports: [
                NgRxJsSwiperModule
            ]
            \`\`\`
            # in your component
            \`\`\` typescript
            import {SwiperService} from 'ng-rxjs-swiper';
            ...
            providers: [SwiperService]
            ...
            constructor (private swiper: SwiperService)
            \`\`\`
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
        name: 'Usage',
        title: 'Usage',
        heading: 'Usage',
        subheading: '',
        text: '',
        md: `
            # in your component
            \`\`\` typescript
            this.swiper.listenForAll$(element).subscribe(direction => {
                console.log(direction)
            })
            \`\`\`
        `,
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
