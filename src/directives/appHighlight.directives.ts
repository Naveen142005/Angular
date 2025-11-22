import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
    
})

export class appHighlight{
    constructor (private ele: ElementRef, private render: Renderer2) {}

    @HostListener('mouseover')
    over(){
        this.render.setStyle(document.body, 'background', 'yellow')
        this.render.setStyle(document.body, 'color', 'black')
    }

    @HostListener('mouseout')
    out(){
        this.render.removeStyle(document.body, 'background');
        this.render.setStyle(document.body, 'color', 'white')
    }
    
}