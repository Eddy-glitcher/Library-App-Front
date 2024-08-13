import { RegisterComponent } from "./register/register.component";

export const  AuthRoutes = [
  { path : 'register', component : RegisterComponent },
  { path : '**', redirectTo : 'register'}
];
