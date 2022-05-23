import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(array: any[]): any[] {
    return array.filter(item=>item.firstName.includes('M'));
  }

}
