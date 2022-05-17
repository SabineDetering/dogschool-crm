import { NgModule } from '@angular/core';
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
import { MatInputModule} from '@angular/material/input';
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

import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
// import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { DialogAddClientComponent } from './dialog-add-client/dialog-add-client.component';
import { DialogAddDogComponent } from './dialog-add-dog/dialog-add-dog.component';
import { DogOverviewComponent } from './dog-overview/dog-overview.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientOverviewComponent,
    DialogAddClientComponent,
    DialogAddDogComponent,
    DogOverviewComponent,
    PrivacyNoticeComponent,
    LegalNoticeComponent,
    LoginComponent
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

    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuth,
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    // NgxAuthFirebaseUIModule.forRoot({
    //   apiKey: 'AIzaSyDQ0ZYkHfJIVpKqY4vcA8vSkH7FDmXwFY0',
    //   authDomain: 'dogschool-crm.firebaseapp.com',
    //   databaseURL: 'https://dogschool-crm-default-rtdb.europe-west1.firebasedatabase.app',
    //   projectId: 'dogschool-crm',
    //   storageBucket: 'dogschool-crm.appspot.com',
    //   messagingSenderId: '760137668035'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
