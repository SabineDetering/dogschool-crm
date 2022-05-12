import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { DogOverviewComponent } from './dog-overview/dog-overview.component';

const routes: Routes = [
  { path: '', component: ClientOverviewComponent },
  { path: 'clients', component: ClientOverviewComponent },
  { path: 'dogs', component: DogOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
