import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './components/content/login/login.component';
import { LegalNoticeComponent } from './components/content/legal-notice/legal-notice.component';
import { DataPrivacyComponent } from './components/content/data-privacy/data-privacy.component';
import { HomeComponent } from './components/content/home/home.component';
import { ProfileComponent } from './components/content/profile/profile.component';
import { ProfileProductOverviewComponent } from './components/content/profile-product-overview/profile-product-overview.component';
import { ShoppingCartComponent } from './components/content/shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './components/content/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'data-privacy', component: DataPrivacyComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-products', component: ProfileProductOverviewComponent, canActivate: [AuthGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, LegalNoticeComponent, DataPrivacyComponent, HomeComponent, ProfileComponent, ProfileProductOverviewComponent, ShoppingCartComponent]