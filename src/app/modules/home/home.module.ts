import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TestModule } from './modules/test/test.module';
import { HomeRoutingModule } from './modules/home-routing/home-routing.module';

import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotesComponent } from './components/notes/notes.component';
import { UserModule } from '../user/user.module';
import { NoteService } from 'src/app/services/note.service';

@NgModule({
  imports: [
    CommonModule,
    TestModule,
    UserModule,
    HomeRoutingModule,
    RouterModule
  ],
  declarations: [
      HomeComponent,
      HomePageComponent,
      NotesComponent
  ],
  providers: [
    NoteService
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
