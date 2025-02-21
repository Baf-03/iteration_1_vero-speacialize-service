import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { WalletComponent } from './wallet/wallet.component';
import { CustomerBookingComponent } from './customer-booking/customer-booking.component';
import { SingUpProviderComponent } from './sing-up-provider/sing-up-provider.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { LoginProviderComponent } from './login-provider/login-provider.component';
import { ProviderJobsComponent } from './provider-jobs/provider-jobs.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { GigsComponent } from './gigs/gigs.component';
import { GigsListing } from './gigs-provider/gigs_listing.component';
import { PartTimeCleanersComponent } from './hire-me/part-time-cleaners.component';
import { GigsFormComponent } from './gigs-form/gigs-form.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DynamicStepsFormComponent } from './multi-form/multi-step-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    component: AboutComponent,
  },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
  {
    path: 'how-it-works',
    component: HowItWorkComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsComponent,
  },
  {
    path: 'login-customer',
    component: LoginComponent,
  },
  {
    path: 'sign-up-customer/:token',
    component: SignupComponent,
  },
  {
    path: 'sign-up-provider',
    component: SingUpProviderComponent,
  },
  {
    path: 'otp/:phone',
    component: OtpComponent,
  },
  { path: 'gigs', component: GigsComponent },
  { path: 'gigs-listing', component: GigsListing },
  { path: 'gigs-hire', component: PartTimeCleanersComponent },
  
  {
    path: 'wallet',
    component: WalletComponent,
  },
  {
    path: 'jobs',
    component: CustomerBookingComponent,
  },
  { path: 'gigs-form', component: GigsFormComponent },
  { path: 'profile-gigs', component: ProfilePageComponent },
  {
    path: 'provider-dashboard',
    component: ProviderDashboardComponent,
  },
  {
    path: 'multi-form',
    component: DynamicStepsFormComponent,
  },
  {
    path: 'provider-login',
    component: LoginProviderComponent,
  },
  {
    path: 'provider-jobs',
    component: ProviderJobsComponent,
  },
  {
    path: 'provider-profile',
    component: ProviderProfileComponent,
  },
];
