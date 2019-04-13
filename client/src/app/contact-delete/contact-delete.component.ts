import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.scss']
})
export class ContactDeleteComponent implements OnInit {

  @Input() deleteID: string; // Receive input from list component

  @Output() deleteEvent = new EventEmitter<any>(); // Emit delete event popup close to refresh list

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
  }


  confirmDelete(event) {
    const confirmDeleteId = event.target.dataset.id;
    this.contactService.deleteContact(confirmDeleteId).subscribe();
    this.deleteEvent.emit();
  }

  cancelDelete() {
    this.deleteEvent.emit();
  }
}
