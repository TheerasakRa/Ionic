import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/loginauth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    // path: 'homeresult/:uname/:uem/:upwd/:uimg',
    path: 'homeresult/:dataobj',
    loadChildren: () => import('./pages/homeresult/homeresult.module').then( m => m.HomeresultPageModule)
  },
  {
    path: 'homedb',
    loadChildren: () => import('./pages/homedb/homedb.module').then( m => m.HomedbPageModule)
  },
  {
    path: 'loginauth',
    loadChildren: () => import('./pages/loginauth/loginauth.module').then( m => m.LoginauthPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
