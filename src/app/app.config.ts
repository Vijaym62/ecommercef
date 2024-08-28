import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenHttpIntercepter } from './core/token-http-intercepter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideAnimationsAsync(),
     provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptors([tokenHttpIntercepter])),
    
  ]
};
