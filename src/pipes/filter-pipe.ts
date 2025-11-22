import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, search: any): any{
        return value.filter ((item: any) => {
           return item.author.includes(search) || 
             item.title.includes(search);
        })
    }
}