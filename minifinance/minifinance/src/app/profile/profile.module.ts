import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm,ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';;

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {
 

}
