import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
}, {
  path: 'log',
  loadChildren: () => import('./pages/log/log.module').then(m => m.LogPageModule)
}, {
  path: 'notification',
  loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
