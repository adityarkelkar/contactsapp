import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';

const routes: Routes = [
  { path: 'list', component: ContactListComponent },
  { path: 'add', component: ContactAddComponent },
  { path: 'edit', component: ContactUpdateComponent },
  { path: 'delete', component: ContactDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Good practice to include the routing components in an array and import it wherever required
export const routingComponents = [ContactListComponent, ContactAddComponent, ContactUpdateComponent, ContactDeleteComponent];

