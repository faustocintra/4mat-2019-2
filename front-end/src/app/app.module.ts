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

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppMenuComponent,
    AppFooterComponent,
    ProfessorListComponent,
    ConfirmDlgComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmDlgComponent  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
