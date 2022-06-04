import { Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { DogOverviewComponent } from './dog-overview/dog-overview.component';
import { HelpComponent } from './help/help.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { SettingsComponent } from './settings/settings.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { TrainingOverviewComponent } from './training-overview/training-overview.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent /*, canActivate: [AuthGuardService] */ },
  { path: 'clients', component: ClientOverviewComponent, /*canActivate: [AuthGuardService] */ },
  { path: 'dogs', component: DogOverviewComponent, /*canActivate: [AuthGuardService]*/ },
  { path: 'trainings', component: TrainingOverviewComponent, /*canActivate: [AuthGuardService]*/ },
  { path: 'settings', component: SettingsComponent },

  { path: 'client/:clientID', component: ClientDetailsComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'dog/:dogID', component: DogDetailsComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'training/:trainingID', component: TrainingDetailsComponent /*, canActivate: [AuthGuardService] */ },

  { path: 'help', component: HelpComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'privacy-notice', component: PrivacyNoticeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  @Input() searchString: string;
}
