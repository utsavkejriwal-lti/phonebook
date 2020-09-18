import {Pipe , PipeTransform} from '@angular/core';
import {Contact} from '../models/contact';

@Pipe({
    name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform{
    transform(value: Contact[], searchString: string){
        
        if(searchString == ""){
            return value;
        }
        var x:string = searchString.toLowerCase();
       var filteredContact: Contact[] = [];
       var i:number = 0;
       for(var i:number = 0; i < value.length; i++) {
           if(value[i].firstName.toLowerCase().includes(x)){
                filteredContact.push(value[i]);
           }else if(value[i].lastName.toLowerCase().includes(x)){
                filteredContact.push(value[i]);
           }else if(value[i].contNum.includes(x)){
                filteredContact.push(value[i]);
           } else if((value[i].firstName.toLowerCase() + " " + value[i].lastName.toLowerCase()).includes(x)){
                filteredContact.push(value[i]);
           }
           
           
        }
        return filteredContact;
       
    }
}