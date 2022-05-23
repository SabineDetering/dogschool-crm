import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortJSONArray'
})
export class SortJSONArrayPipe implements PipeTransform {

  transform(array: any[], prop: string, direction: string): any[] {
    return array.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
    });
  }



  // sortJSONArray(array: any[], prop: string, direction: 'desc' | 'asc') {
  //   return array.sort((a, b) => {
  //     return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
  //   });
  // }

}
