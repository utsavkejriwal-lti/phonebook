import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactService} from '../services/contactService';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;
  @Output() updateCont = new EventEmitter();

  editContactForm: FormGroup;

  constructor(private contactService: ContactService) { 
    this.editContactForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contnumber: new FormControl('', [Validators.required,Validators.pattern("[0-9]{10}")]),
    });

    
  }

  get firstnameg(){
    return this.editContactForm.get("firstname");
  }
  get lastnameg(){
    return this.editContactForm.get("lastname");
  }
  get contnumberg(){
    return this.editContactForm.get("contnumber");
  }

  deleteContact(){
    if(this.contactService.deleteContact(this.contact)){
      alert("Contact Deleted");
      this.updateCont.emit(true);
    }else{
      alert("Please try again later");
    }
    
  }

  editContact(){
    
      if(this.editContactForm.valid){
        
        let newCont = new Contact( this.editContactForm.get("firstname").value,  this.editContactForm.get("lastname").value,  this.editContactForm.get("contnumber").value)
        if(this.contactService.editContact(this.contact, newCont)){
          alert("Contact Edited");
          this.updateCont.emit(true);
        }else{
          alert("Please try again later");
        }
      }else{
        alert("Please try again later");
      }
  }

  ngOnInit(): void {
    this.editContactForm.setValue({
      firstname: this.contact.firstName,
      lastname: this.contact.lastName,
      contnumber: this.contact.contNum
  });
  }

}
