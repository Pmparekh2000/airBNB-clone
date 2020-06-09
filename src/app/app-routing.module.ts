import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then( m => m.PlacesPageModule)
  },
  {
    path: 'discover',
    loadChildren: () => import('./places/discover/discover.module')
  },
  {
    path: 'place-detail',
    loadChildren: () => import('./places/discover/place-detail/place-detail.module')
  },
  {
    path: 'offer',
    loadChildren: () => import('./places/offer/offer.module')
  },
  {
    path: 'edit-offer',
    loadChildren: () => import('./places/offer/edit-offer/edit-offer.module')
  },
  {
    path: 'new-offer',
    loadChildren: () => import('./places/offer/new-offer/new-offer.module')
  },
  {
    path: 'offer-bookings',
    loadChildren: () => import('./places/offer/offer-bookings/offer-bookings.module')
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
