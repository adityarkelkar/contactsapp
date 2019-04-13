import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.scss']
})
export class ContactUpdateComponent implements OnInit {

  // Set the ngModel variables for edit form values
  public contactId: any;
  public fname: any;
  public lname: any;
  public email: any;
  public phoneNumber: any;

  @Input() contactInfo: string;
  @Output() closeEvent = new EventEmitter<any>();

  // Inject the ContactsService into the component
  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    // Edit contact REST Call. Get the values to pre populate contact data in edit form
    this.contactService.editContact(this.contactInfo)
    .subscribe(data => {
      this.contactId = data._id;
      this.fname = data.name.split(' ')[0];
      this.lname = data.name.split(' ')[1];
      this.phoneNumber = data.phoneNumber;
      this.email = data.email;
    });
  }

  onSubmit(e: any) {
    const formData = e.value;
    const fullName = formData.contact_fname + ' ' + formData.contact_lname;
    formData.contact_name =  fullName;
    this.contactService.updateContact(formData)
    .subscribe(data => {
      this.closeUpdateForm();
    });
  }

  closeUpdateForm() {
    this.closeEvent.emit();
  }

}
