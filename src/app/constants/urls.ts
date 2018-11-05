import {isDevMode} from '@angular/core';

export const API_URL = isDevMode() ? 'http://localhost:4200/' : 'https://maksym-plotnikov.github.io/test-app/';
export const BASE_ROUTE = '/products';