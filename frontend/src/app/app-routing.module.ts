import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyphotosComponent } from './myphotos/myphotos.component';
import { FavphotosComponent } from './favphotos/favphotos.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import { PhotoDetailComponent} from './photo-detail/photo-detail.component'


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'myphotos', component: MyphotosComponent},
      {path: 'favphotos', component: FavphotosComponent},
      {path: 'photo/:id', component: PhotoDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
