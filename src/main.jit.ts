import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { global } from './app/services/common/global';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((componentRef: any) => {
    console.log('setting global');
    global.injector = componentRef.injector;
  })