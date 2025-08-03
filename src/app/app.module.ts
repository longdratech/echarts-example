import {NgModule} from '@angular/core';
import {BrowserModule, platformBrowser} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ModuleEchartsComponent} from './module-echarts.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  declarations: [AppComponent, ModuleEchartsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

