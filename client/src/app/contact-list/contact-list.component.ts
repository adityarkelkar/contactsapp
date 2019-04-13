import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public contacts = [];
  public showAddDialog = false;
  public showDeleteDialog = false;
  public showUpdateDialog = false;
  public deleteID;
  public contactInfo;

  // Inject the ContactsService into the component
  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    // Get all contacts from server on page load
    this.contactService.getAllContacts()
      .subscribe(data => {
        this.contacts = [];
        this.contacts = data;
      });
  }

  // Search keyup event. Refresh the contact list everytime a new API call is made
  searchContact(event) {
    const searchVal: string = event.target.value;
    this.refresh(searchVal);
  }

  // Function to reload the contact list based on search parameters
  public refresh(searchVal: string) {
    if (searchVal === '') {
      this.ngOnInit();
    } else {
      this.contactService.searchContact(searchVal)
        .subscribe(data => {
          this.contacts = data;
        });
    }
  }

  // Show delete popup on button click
  deleteContact(event) {
    const delId = event.target.attributes.id.value;
    this.showDeleteDialog = !this.showDeleteDialog;
    this.deleteID = delId;
  }

  // Close popup function and refresh contact list
  closePopup() {
    this.showDeleteDialog = !this.showDeleteDialog;
    this.ngOnInit();
  }

  // Open the add contact popup
  addContactPopup() {
    this.showAddDialog = !this.showAddDialog;
    this.ngOnInit();
  }

  // Close button click event for edit
  closeEditPopup() {
    this.showUpdateDialog = !this.showUpdateDialog;
    this.ngOnInit();
  }

  // Show edit contact popup
  editContactPopup(e) {
    this.showUpdateDialog = !this.showUpdateDialog;
    this.contactInfo = e.target.id;
  }
}
