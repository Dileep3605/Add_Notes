import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any, value: any): unknown {
    if (!value) return items;
    return items.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    });
  }
}
