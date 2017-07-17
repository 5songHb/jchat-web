import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { indexReducer } from './pages/index/reducers';
import { loginReducer } from './pages/login/reducers';
import { LoginEffect } from './pages/login/effects';
import { registerReducer } from './pages/register/reducers';
import { RegisterEffect } from './pages/register/effects';
import { mainReducer } from './pages/main/reducers/';
import { MainEffect } from './pages/main/effects';
// import { ChatPanelEffect } from './pages/main/effects';

import { chatReducer } from './pages/chat/reducers/';
import { ChatEffect } from './pages/chat/effects';

import { contactReducer } from './pages/contact/reducers';
import { ContactEffect } from './pages/contact/effects';

// import { LoginService } from './services/request/login';
import { RouterGuard } from './services/common';
import { TipModalModule } from './components/tip-modal';

import { HMR } from '../config/hmr';
import { routing } from './app.router';
import { AppComponent } from './pages/index/index.component';
import { StorageService } from './services/common';

import '../assets/css/common.scss';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        StoreModule.provideStore({ indexReducer, loginReducer, registerReducer, mainReducer, chatReducer, contactReducer }),
        EffectsModule.run(LoginEffect),
        EffectsModule.run(RegisterEffect),
        EffectsModule.run(MainEffect),
        EffectsModule.run(ChatEffect),
        EffectsModule.run(ContactEffect),
        TipModalModule
        // StoreDevtoolsModule.instrumentOnlyWithExtension(),
        
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        // LoginService
        RouterGuard,
        StorageService
    ]
})
export class AppModule extends HMR {
    constructor(public appRef: ApplicationRef) {
        super(appRef);
    }
}
