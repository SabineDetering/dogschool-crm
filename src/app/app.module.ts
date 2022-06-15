import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { DialogAddEditClientComponent } from './dialog-add-edit-client/dialog-add-edit-client.component';
import { DialogAddEditDogComponent } from './dialog-add-edit-dog/dialog-add-edit-dog.component';
import { DogOverviewComponent } from './dog-overview/dog-overview.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { TrainingOverviewComponent } from './training-overview/training-overview.component';
import { DialogAddEditTrainingComponent } from './dialog-add-edit-training/dialog-add-edit-training.component';
import { SearchFilterPipe } from 'src/pipes/search-filter.pipe';
import { SortJSONArrayPipe } from 'src/pipes/sort-jsonarray.pipe';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { DialogDeleteConfirmationComponent } from './dialog-delete-confirmation/dialog-delete-confirmation.component';
import { SettingsComponent } from './settings/settings.component';
import { ModeSwitcherComponent } from './mode-switcher/mode-switcher.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { SmallDogCardComponent } from './small-dog-card/small-dog-card.component';
import { SmallClientCardComponent } from './small-client-card/small-client-card.component';
import { SmallTrainingCardComponent } from './small-training-card/small-training-card.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientOverviewComponent,
    DialogAddEditClientComponent,
    DialogAddEditDogComponent,
    DialogAddEditTrainingComponent,
    DogOverviewComponent,
    PrivacyNoticeComponent,
    LegalNoticeComponent,
    LoginComponent,
    DashboardComponent,
    HelpComponent,
    TrainingOverviewComponent,
    SearchFilterPipe,
    SortJSONArrayPipe,
    TrainingDetailsComponent,
    DialogDeleteConfirmationComponent,
    SettingsComponent,
    ModeSwitcherComponent,
    ClientDetailsComponent,
    SmallDogCardComponent,
    SmallClientCardComponent,
    SmallTrainingCardComponent,
    DogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatListModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    DragDropModule,

    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyDQ0ZYkHfJIVpKqY4vcA8vSkH7FDmXwFY0',
      authDomain: 'dogschool-crm.firebaseapp.com',
      databaseURL: 'https://dogschool-crm-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'dogschool-crm',
      storageBucket: 'dogschool-crm.appspot.com',
      messagingSenderId: '760137668035'
    },
      () => 'your_app_name_factory',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 30, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 6, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: false,
        enableEmailVerification: false, // default: true
        useRawUserCredential: false, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
      }),
  ],
  providers: [
    { provide: PERSISTENCE, useValue: 'local' },
    AuthGuardService,
    { provide: LOCALE_ID, useValue: 'de-de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
