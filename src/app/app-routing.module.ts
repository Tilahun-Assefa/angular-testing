import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule), canActivate: [AuthGuard]  },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard]  },
  { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule), canActivate: [AuthGuard]  },
  { path: 'search', loadChildren: () => import('./search-form/search.module').then(m => m.SearchModule), canActivate: [AuthGuard]  },
  { path: 'music-search', loadChildren: () => import('./music-search/music-search.module').then(m => m.MusicSearchModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
