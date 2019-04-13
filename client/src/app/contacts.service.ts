import { ContactList } from './interfaces/contactlist';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

/**
 * Common service which contains all REST API calls
 * This service will be injected into the components to be used when required
 */
@Injectable({
  providedIn: 'root'
})


export class ContactsService {
  private list = 'http://localhost:3000/contact/list';
  private add = 'http://localhost:3000/contact/add';
  private edit = 'http://localhost:3000/contact/edit/';
  private update = 'http://localhost:3000/contact/update/';
  private search = 'http://localhost:3000/contact/search/';
  private delete = 'http://localhost:3000/contact/delete/';

  // Inject the HTTPClient module into the service
  constructor(private http: HttpClient) { }

  // Get all contacts
  getAllContacts(): Observable<ContactList[]> {
    return this.http.get<ContactList[]>(this.list);
  }

  // Add Contact
  addContact(params: {}): Observable<any> {
    return this.http.post(this.add, params);
  }

  // Edit Contact
  editContact(editId: string): Observable<ContactList> {
    return this.http.get<ContactList>(this.edit + editId);
  }

  // Update contact
  updateContact(params: {}): Observable<any> {
    return this.http.post(this.update, params);
  }

  // Search Contacts
  searchContact(parameter: string): Observable<ContactList[]> {
    return this.http.get<ContactList[]>(this.search + parameter);
  }

  // Delete Contact
  deleteContact(delId: string): Observable<any> {
    return this.http.get(this.delete + delId);
  }
}
