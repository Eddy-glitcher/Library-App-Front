import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const  AuthRoutes = [
  { path : 'register', component : RegisterComponent },
  { path : 'login', component : LoginComponent },
  { path : '**', redirectTo : 'register'}
];
