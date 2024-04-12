import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MembresiaComponent } from './pages/membresia/membresia.component';
const routes: Routes = [
  {
    path: '', children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'dashboard', component: MainPageComponent, children: [
          { path: 'membresia', component: MembresiaComponent }

        ]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
