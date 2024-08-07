import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MembresiaComponent } from './pages/membresia/membresia.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { ConsultaUsuariosComponent } from './pages/consulta-usuarios/consulta-usuarios.component';
import { RutinasComponent } from './pages/rutinas/rutinas.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'dashboard',
    component: MainPageComponent,
    children: [
      { path: 'membresia', component: MembresiaComponent },
      { path: 'ejercicios', component: EjerciciosComponent },
      { path: 'usuarios', component: ConsultaUsuariosComponent },
      { path: 'rutinas', component: RutinasComponent}
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
