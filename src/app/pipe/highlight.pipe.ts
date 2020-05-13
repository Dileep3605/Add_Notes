import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(item: any, value: any): any {
    debugger;
    if (!value) {
      return item;
    }
    var re = new RegExp(value, 'gi');
    return item.replace(re, '<mark>$&</mark>');
  }
}
