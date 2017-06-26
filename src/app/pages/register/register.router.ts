import { RegisterComponent } from './register.component';
export const REGISTER_ROUTER = [{
    path: '',
    children: [{
        path: '',
        component: RegisterComponent
    }]
}];