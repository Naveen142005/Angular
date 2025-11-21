import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector:'[hover]',
    standalone:true
})

export class hover{
    constructor (private ele: ElementRef) {
        this.ele.nativeElement.style.transition = 'all 0.4s ease'
    }

    @HostListener('mouseover')
    onOver(){
        this.ele.nativeElement.style.color = 'green'
    }
    @HostListener('mouseout')
    onOut() {
        this.ele.nativeElement.style.color = '';
    }
}