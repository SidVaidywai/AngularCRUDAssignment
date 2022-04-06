
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'age'
})
export class AgePipeComponent implements PipeTransform {


  
      transform(value: any): any {
          
                  let currentYear:any = new Date().getFullYear();
                  let dateofBirth:any = new Date(value).getFullYear();
                  let age = currentYear - dateofBirth;
  
                 
  
          return age;
      }
  
  }

  
