import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationModule } from './location/location.module';
import { HomeComponent } from './home/home.component';
import { VehicleModule } from './vehicle/vehicle.module';
import { AssessorModule } from './assessor/assessor.module';
import { BankingModule } from './banking/banking.module';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  declarations: [		
    AppComponent,
    HomeComponent,
    ManagerComponent
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LocationModule,
    VehicleModule,
    AssessorModule,
    BankingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
