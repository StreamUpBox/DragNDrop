import { Component, Input } from '@angular/core';

@Component({
    selector: 'hello-en',
    template: `<h1>I am rectangle button</h1>`,
    styles: [`h1 { font-family: Lato; }`]
})
export class BasicRectangleButton {
    @Input() name: string;
}

@Component({
    selector: 'hello-tw',
    template: `<h1>I am circle button</h1>`,
    styles: [`h1 { font-family: Lato; }`]
})
export class BasicCircleButton {
    @Input() name: string;
}