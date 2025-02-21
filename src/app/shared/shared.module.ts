import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './local-storage.service';
import { LoggedInGuard } from './logged-in.guard';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './api.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LocalStorageService,
    LoggedInGuard,
    ApiService,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
})
export class SharedModule {}
