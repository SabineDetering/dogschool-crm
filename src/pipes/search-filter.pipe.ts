import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(array: any[], searchString: string): any[] {

    return array?.filter(dataRow => {
      let dataString = '';
      for (let key in dataRow) {
        if (!key.endsWith('ID')) { 
          if (key.endsWith('Phone')) {
            dataString += dataRow[key]['areaCode'] + dataRow[key]['number'];
          }
        dataString += dataRow[key].toString().toLowerCase();
      }
      }
      console.log(dataString);
      return dataString.includes(searchString);
    });

  }

}
