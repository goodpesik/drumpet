import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

  transform(items: any[], filter: boolean): any {
    let result: {}[];

    if (!items || filter) {
        return items;
    }
    result = items.filter(item => !item.isOutdated);

    if(!result.length) {
      result = [{noposts:true}];
    }

    return result;
}

}
