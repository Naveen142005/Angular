import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[auto_focus]'
})

export class auto_focus{
    constructor (private ele: ElementRef) {}

    ngAfterViewInit(){
        this.ele.nativeElement.focus()
    }
}