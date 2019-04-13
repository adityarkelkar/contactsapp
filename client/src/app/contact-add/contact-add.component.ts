import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<any>(); // Emit the close popup event to refresh contacgt list
  constructor(private contactService: ContactsService) { }

  ngOnInit() {}

  // Add form popup close event
  closeAddForm() {
    this.closeEvent.emit();
  }

  // Add contact form submit function
  onSubmit(e: any) {
    const formData = e.value;
    this.contactService.addContact(formData)
    .subscribe(data => {
      this.closeAddForm();
    });
  }
}
