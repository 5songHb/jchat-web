import { MarketModule } from './market/market.module';
import { MainComponent } from './main.component';
export const MAIN_ROUTER = [{
    path: '',
    component: MainComponent,
    children: [{
        path: 'market',
        loadChildren: './market#MarketModule'
    }]
}];