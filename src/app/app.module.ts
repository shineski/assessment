import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './modules/product/product.module';
import { JwtHttpInterceptor } from './core/interceptors/jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule
  ],
  providers: [ JwtHttpInterceptor ],
  bootstrap: [AppComponent]
})
export class AppModule { }
