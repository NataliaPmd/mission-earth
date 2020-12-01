import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill'

//Modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    QuillModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
