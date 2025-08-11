import {RenderMode, ServerRoute} from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'contact',
    renderMode: RenderMode.Server
  },
  {
    path: 'products',
    renderMode: RenderMode.Server
  },
  {
    path: 'response',
    renderMode: RenderMode.Server
  },
  // Wildcard route для SSR
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
