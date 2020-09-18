import { Component, OnInit, ViewChild } from '@angular/core';
import {Contact} from '../models/contact';
import {ContactService} from '../services/contactService';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  selectOption: string = "1";
  sortByProp: string = "firstName";
  sortOrder:boolean = false;
  contacts: Contact[];
  addContactForm: FormGroup;
  searchString: string = "";
  constructor(private contactService: ContactService) { 
    this.addContactForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contnumber: new FormControl('', [Validators.required,Validators.pattern("[0-9]{10}")]),
    });

    this.contacts = this.contactService.getContacts();

  }

  get firstnameg(){
    return this.addContactForm.get("firstname");
  }
  get lastnameg(){
    return this.addContactForm.get("lastname");
  }
  get contnumberg(){
    return this.addContactForm.get("contnumber");
  }

  addRequest(){
    if(this.addContactForm.valid){
      var addContact = new Contact( this.addContactForm.get("firstname").value, this.addContactForm.get("lastname").value, this.addContactForm.get("contnumber").value);
      if(this.contactService.addContact(addContact)){
        this.contacts = this.contactService.getContacts();

        
        this.addContactForm.controls["firstname"].reset();
        this.addContactForm.controls["lastname"].reset();
        this.addContactForm.controls["contnumber"].reset();

        alert("Contact Added");
        
      }else{
        alert("Duplicate Value");
      }
    }
  }

  updateSort(){
     switch(this.selectOption){
      case "1":
        this.sortByProp = "firstName";
        this.sortOrder = false;
        break;
      case "2":
        this.sortByProp = "firstName";
        this.sortOrder = true;
        break;
      case "3":
        this.sortByProp = "lastName";
        this.sortOrder = false;
        break;
      case "4":
        this.sortByProp = "lastName";
        this.sortOrder = true;
        break;
      case "5":
        this.sortByProp = "countNum";
        this.sortOrder = false;
        break;
      case "6":
        this.sortByProp = "contNum";
        this.sortOrder = true;
        break;
     }
  }

  updateContacts(){
    this.contacts = this.contactService.getContacts();
  }
  ngOnInit(): void {
  }

}
