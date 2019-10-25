import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppHeaderComponent } from './ui/app-header/app-header.component';
import { AppMenuComponent } from './ui/app-menu/app-menu.component';
import { AppFooterComponent } from './ui/app-footer/app-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { MatDialogModule } from '@angular/material';
import { ProfessorFormComponent } from './professor/professor-form/professor-form.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppMenuComponent,
    AppFooterComponent,
    ProfessorListComponent,
    ConfirmDlgComponent,
    ProfessorFormComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [
    ConfirmDlgComponent  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
