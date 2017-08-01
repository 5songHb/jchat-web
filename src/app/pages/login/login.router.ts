import { LoginComponent } from './login.component';
export const LOGIN_ROUTER = [{
    path: '',
    children: [{
        path: '',
        component: LoginComponent
    }]
}];
