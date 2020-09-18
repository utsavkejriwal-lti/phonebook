import {Contact} from '../models/contact';

export class ContactService{
    contacts: Contact[];

    constructor(){
        this.contacts = [
            new Contact("John","Doe","7897897897"),
            new Contact("Max","Smith","7589865482"),
            new Contact("Richard","Johnson","7568789859"),
            new Contact("James","Gilbert","9856421748")
        ]
    }

    addContact(cont: Contact): boolean {
        for (let i = 0; i < this.contacts.length; i++) {
            if(this.contacts[i].contNum == cont.contNum || (this.contacts[i].firstName + this.contacts[i].lastName == cont.firstName + cont.lastName)){
                return false;
            }
            
        }

        this.contacts.push(cont);
        return true;
    }

    getContacts():Contact[]{
        return this.contacts;
    }

    getContact(contNum): Contact{
        for (let i = 0; i < this.contacts.length; i++) {
           if(this.contacts[i].contNum == contNum){
               return this.contacts[i];
           }
            
        }
        return null;
    }

    deleteContact(cont:Contact): boolean{
        let x:number;
        for (let i = 0; i < this.contacts.length; i++) {
            if(this.contacts[i].contNum == cont.contNum){
                this.contacts.splice(i,1);
                return true;
            }
        }
        return false;
    }

    editContact(oldCont: Contact, newCont: Contact): boolean{
        let x:number;
        for (let i = 0; i < this.contacts.length; i++) {
            if(this.contacts[i].contNum == oldCont.contNum){
                this.contacts.splice(i,1);
                this.contacts.push(newCont);
                return true;
            }
        }
        return false;
    }
}