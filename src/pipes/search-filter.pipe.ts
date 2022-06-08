import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  /**
   * the data of each JSON in the array is reduced to a string 
   * if searchString is included in this string, the JSON is included in the result 
   * @param array - JSON array with table data
   * @param searchString  - the string to match
   * @returns - filtered JSON array
   */
  transform(array: any[], searchString: string): any[] {

    return array?.filter(dataRow => {
      let dataString = '';
      for (let key in dataRow) {
        if (!key.endsWith('ID') && !key.endsWith('Ids')) { 
          if (key.endsWith('Phone')) {//phone numbers
            dataString += dataRow[key]['areaCode'] + dataRow[key]['number'];
          }else if (key.endsWith('ate')) {//dates
            dataString += new Date(dataRow[key]).toLocaleDateString();
          } else if (key == 'ownerData') {
            for (let i = 0; i < dataRow[key].length;i++){
              dataString += dataRow[key][i]['firstName'].toLowerCase() + dataRow[key][i]['lastName'].toLowerCase();
            }
          }
          else {
            dataString += dataRow[key]?.toString().toLowerCase();
          }
      }
      }
      return dataString.includes(searchString);
    });

  }

}
