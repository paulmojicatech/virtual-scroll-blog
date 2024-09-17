import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'no-virtualization',
    loadComponent: () => import('./no-virtualization/no-virtualization.component').then(m => m.NoVirtualizationComponent)
  },
  {
    path: 'virtual-scroll',
    loadComponent: () => import('./virtual-scroll/virtual-scroll.component').then(m => m.VirtualScrollComponent)
  },
  {
    path: 'deferred-view',
    loadComponent: () => import('./deferred-view/deferred-view.component').then(m => m.DeferredViewComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'no-virtualization'
  }
];
