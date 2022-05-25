import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";

import {LoadingComponent} from './components/loading/loading.component';
import {UnloadingComponent} from './components/unloading/unloading.component';
import {ModalComponent} from "./components/modal/modal.component";
import {NgxCsvParserModule} from 'ngx-csv-parser';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    UnloadingComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCsvParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
