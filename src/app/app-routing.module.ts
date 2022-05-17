import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { DogOverviewComponent } from './dog-overview/dog-overview.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientOverviewComponent },
  { path: 'dogs', component: DogOverviewComponent },

  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'privacy-notice', component: PrivacyNoticeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
