import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxLookupModule, DxNumberBoxModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { InvoiceFormComponent } from '../_autogen/form-components/invoice-form/invoice-form.component';

class MissingTranslationsInterceptor implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (!environment.production) {
      const langKeys = JSON.parse(localStorage.getItem("translation-keys") ?? "{}") || {};
      const module = params.key.split('.')[0];
      const key = params.key.split('.')[1];
      if (!langKeys.hasOwnProperty(module))
        langKeys[module] = {};
      if (key && (langKeys.hasOwnProperty(module) && !langKeys.hasOwnProperty(module).hasOwnProperty(key))) {
        if (!langKeys[module][key])
          console.error(`MISSING LANGUAGE KEY - ${localStorage.getItem("translation-keys")} ${module} ${key}`);
        langKeys[module][key] = key[0] + key?.split(/(?=[A-Z])/).join(' ').toLowerCase().substring(1);
      }
      localStorage.setItem("translation-keys", JSON.stringify(langKeys));
    };
    return params.key;
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    InvoiceFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxDataGridModule,
    DxTagBoxModule,
    DxDropDownBoxModule,
    DxLookupModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationsInterceptor },
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
