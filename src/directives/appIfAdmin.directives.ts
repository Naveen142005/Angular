import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[isAdmin]'
})

export class isAdmin{
    constructor (
        private template : TemplateRef<any>,
        private container : ViewContainerRef
    ){}

    @Input() set isAdmin(b: boolean){
        this.container.clear()

        if (b){
            this.container.createEmbeddedView(this.template)
        }
    }
}